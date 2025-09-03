import { useState, useCallback } from "react";
import { useCreateTask, useDeleteUserTask, useUpdateTask } from "./useTasks";
import { useFetchListData, useFetchLists } from "./useLists";
import { useFetchUserTasks } from "./useTasks"; // assume exists: fetch all tasks for user
import { useQueryClient } from "@tanstack/react-query";
import type { Task, } from "../types";

type UseTasksManagerOpts = { userId: number; listId?: number };
type TaskForm = Omit<Task, 'id'> & Partial<Pick<Task, 'dueDate' | 'description' | 'listId'>>;

export function useTasksManager({ userId, listId }: UseTasksManagerOpts) {
  // popup + form state (shared)
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false); // edit popup state
  const [form, setForm] = useState<TaskForm>({
    taskName: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "TODO",
    listId: listId ?? undefined,
    authorId: userId,
  });

  // edit form holds the current task being edited
  const [editForm, setEditForm] = useState<any>({});

  const queryClient = useQueryClient();

  // fetch tasks depending on listId presence
  const listQuery = listId ? useFetchListData(listId) : null;
  const lists = useFetchLists();
  const allTasksQuery = !listId ? useFetchUserTasks(userId) : null;

  const listTitle = listId ? listQuery?.data?.list?.title : "My Tasks";
  const tasks = listId ? listQuery?.data?.list?.tasks ?? [] : allTasksQuery?.data?.tasks ?? [];
  const isLoading = listId ? listQuery?.isLoading : allTasksQuery?.isLoading;
  const isError = listId ? listQuery?.isError : allTasksQuery?.isError;
  const error = listId ? listQuery?.error : allTasksQuery?.error;
  const listArray = lists.data?.lists;

  // mutations
  const createTask = useCreateTask();
  const deleteTask = useDeleteUserTask(userId);
  const updateTask = useUpdateTask();

  const toggleCreate = useCallback(() => setCreateOpen(v => !v), []);
  const toggleEdit = useCallback(() => setEditOpen(v => !v), []);

  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm((prev: TaskForm) => ({ ...prev, [name]: value }));
  }, []);

  // handle changes for the edit form
  const handleChangeEdit = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setEditForm((prev: Partial<Task>) => ({ ...prev, [name]: value }));
  }, []);

  // open edit modal prefilled with task values
  const openEditWith = useCallback((taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditForm(task);
      setEditOpen(true);
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
      listId: listId ? Number(listId) : form.listId ? Number(form.listId) : undefined,
    };
    createTask.mutate(payload, {
      onSuccess: () => {
        setCreateOpen(false);
        queryClient.invalidateQueries({ queryKey: listId ? ['listData', listId] : ['tasks', userId] });
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

  return {
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
  };
}