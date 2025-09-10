import { useState, useCallback } from "react";
import { useCreateTask, useDeleteUserTask, useUpdateTask, useToggleTaskArchived, useToggleTaskStatus } from "./useTasks";
import { useFetchListData, useFetchLists } from "./useLists";
import { useFetchUserTasks } from "./useTasks"; // assume exists: fetch all tasks for user
import { useSettings } from "../contexts/SettingsContext";
import { useQueryClient } from "@tanstack/react-query";
import type { Task, } from "../types";

type UseTasksManagerOpts = { userId: number; listId?: number, isArchivedView?: boolean };
type TaskForm = Omit<Task, 'id'> & Partial<Pick<Task, 'dueDate' | 'description' | 'listId' | 'archived'>>;

/**
 * useTasksManager
 * Central hook to manage tasks for the dashboard or a specific list.
 *
 * - Manages create/edit modal visibility and form state
 * - Fetches tasks either for a user or for a specific list
 * - Exposes CRUD mutation handlers (create, update, delete) and invalidation
 *
 * @param {UseTasksManagerOpts} userId 
 * @param {UseTasksManagerOpts} listId 
 * @returns object with tasks, loading states, form state and handlers
 */
export function useTasksManager({ userId, listId, isArchivedView }: UseTasksManagerOpts) {
  // popup + form state (shared)
  const { settings } = useSettings();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false); // edit popup state
  const [form, setForm] = useState<TaskForm>({
    taskName: "",
    description: "",
    dueDate: "",
    priority: settings?.defaultPriority ?? "LOW",
    status: settings?.defaultStatus ?? "TODO",
    listId: listId ?? undefined,
    authorId: userId,
    archived: undefined,
  });

  // validation errors for the form (e.g. taskName required)
  const [formErrors, setFormErrors] = useState<{ taskName?: Error | null }>({});

  // edit form holds the current task being edited
  const [editForm, setEditForm] = useState<any>({});

  const queryClient = useQueryClient();

  // fetch tasks depending on listId presence
  const listQuery = listId ? useFetchListData(listId) : null;
  const lists = useFetchLists();
  const allTasksQuery = !listId ? useFetchUserTasks(userId) : null; // fetch non-archived tasks
  const toggleArchive = useToggleTaskArchived(userId);

  const listTitle = listId ? listQuery?.data?.title : "My Tasks";
  const tasks = listId ? listQuery?.data?.unarchivedTasks ?? [] : allTasksQuery?.data?.unarchivedTasks ?? [];
  const archivedTasks = allTasksQuery?.data?.archivedTasks ?? [];
  const archivedTasksCount = archivedTasks.length;
  const isLoading = listId ? listQuery?.isLoading : allTasksQuery?.isLoading;
  const isError = listId ? listQuery?.isError : allTasksQuery?.isError;
  const error = listId ? listQuery?.error : allTasksQuery?.error;
  const listArray = lists.data?.lists;

  // mutations
  const createTask = useCreateTask();
  const deleteTask = useDeleteUserTask(userId);
  const updateTask = useUpdateTask();
  const toggleTaskStatus = useToggleTaskStatus();

  const toggleCreate = useCallback(() => {
    setCreateOpen(v => !v)
    setForm({
      taskName: "",
      description: "",
      dueDate: "",
      priority: settings?.defaultPriority ?? "LOW",
      status: settings?.defaultStatus ?? "TODO",
      listId: listId,
      authorId: userId,
      archived: isArchivedView ? true : undefined,
    })
  // clear validation errors when toggling the create form
  setFormErrors({});
  }, [listId, userId]);
  const toggleEdit = useCallback(() => setEditOpen(v => !v), []);

  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev: TaskForm) => ({ 
        ...prev, 
        [name]: value 
      }));
    // clear field-specific validation errors as user types
    if (name === 'taskName') setFormErrors(prev => ({ ...prev, taskName: null }));
  }, []);

  // handle changes for the edit form
  const handleChangeEdit = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setEditForm((prev: Partial<Task>) => ({ ...prev, [name]: value }));
  }, []);

  // open edit modal prefilled with task values
  const openEditWith = useCallback((taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    const archivedTask = archivedTasks.find(t => t.id === taskId);
    // clear validation errors when toggling the create form
    setFormErrors({});
    if (!task && archivedTask) {
      setEditForm(archivedTask);
      setEditOpen(prev => !prev);
    }
    if (task) {
      setEditForm(task);
      setEditOpen(prev => !prev);
    }
  }, [tasks]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e?.preventDefault?.();
    const payload = {
      taskName: String(form.taskName || ""),
      description: form.description || "",
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      priority: form.priority,
      status: form.status,
      authorId: Number(userId),
      listId: Number(form.listId) || undefined,
      archived: form.archived
    };
    // prevent creating tasks with empty names - surface as a validation error (don't throw)
    if (!payload.taskName || payload.taskName.trim() === '') {
      setFormErrors({ taskName: new Error('Task name is required') });
      return;
    }
    createTask.mutate(payload, {
      onSuccess: () => {
        setCreateOpen(prev => !prev);
        setForm({
          taskName: "",
          description: "",
          dueDate: "",
          priority: "LOW",
          status: "TODO",
          listId: listId ?? undefined,
          authorId: userId,
          archived: undefined,
        })
        // clear validation errors on success
        setFormErrors({});
        queryClient.invalidateQueries({ queryKey: listId ? ['listData', listId] : ['tasks', userId] });
        console.log(payload)
      },
    });
  }, [form, createTask, userId, listId, queryClient]);

  // submit edited task
  const handleSubmitEdit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault?.();
    const payload = {
      ...editForm,
      dueDate: editForm?.dueDate ? new Date(editForm.dueDate).toISOString() : undefined,
    };
    // prevent creating tasks with empty names - surface as a validation error (don't throw)
    if (!payload.taskName || payload.taskName.trim() === '') {
      setFormErrors({ taskName: new Error('Task name is required') });
      return;
    }
    updateTask.mutate(payload, {
      onSuccess: () => {
        setEditOpen(false);
        queryClient.invalidateQueries({ queryKey: listId ? ['listData', listId] : ['tasks', userId] });
      }
    });
  }, [editForm, updateTask, listId, userId, queryClient]);

  const handleDelete = useCallback((taskId: number) => {
    deleteTask.mutate(taskId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: listId ? ['listData', listId] : ['tasks', userId] });
      }
    });
  }, [deleteTask, listId, userId, queryClient]);

  const handleArchive = useCallback((taskId: number) => {
    toggleArchive.mutate(taskId);
  }, [toggleArchive]);

  const handleToggleStatus = useCallback((taskId: number) => {
    toggleTaskStatus.mutate(taskId);
  }, [toggleTaskStatus]);

  return {
    archivedTasks,
    archivedTasksCount,
    tasks,
    listTitle,
    listArray,
    isLoading,
    isError,
    error,
    isCreateOpen,
    toggleCreate,
    form,
    setForm,
    handleChange,
    handleSubmit,
    isEditOpen,
    toggleEdit,
    editForm,
    setEditForm,
    handleChangeEdit,
    openEditWith,
    handleSubmitEdit,
    handleDelete,
    handleArchive,
    handleToggleStatus,
  formErrors,
  setFormErrors,
  };
}