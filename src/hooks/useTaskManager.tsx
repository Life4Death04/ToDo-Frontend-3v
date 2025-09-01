import { useState, useCallback } from "react";
import { useCreateTask, useDeleteUserTask } from "./useTasks";
import { useFetchListData } from "./useLists";
import { useFetchUserTasks } from "./useTasks"; // assume exists: fetch all tasks for user
import { useQueryClient } from "@tanstack/react-query";

type UseTasksManagerOpts = { userId: number; listId?: number };

export function useTasksManager({ userId, listId }: UseTasksManagerOpts) {
  // popup + form state (shared)
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState<any>({
    taskName: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "TODO",
    listId: listId ?? undefined,
    authorId: userId,
  });

  const queryClient = useQueryClient();

  // fetch tasks depending on listId presence
  const listQuery = listId ? useFetchListData(listId) : null;
  const allTasksQuery = !listId ? useFetchUserTasks(userId) : null;

  const listTitle = listId ? listQuery?.data?.list?.title : "My Tasks";
  const tasks = listId ? listQuery?.data?.list?.tasks ?? [] : allTasksQuery?.data?.tasks ?? [];
  const isLoading = listId ? listQuery?.isLoading : allTasksQuery?.isLoading;
  const isError = listId ? listQuery?.isError : allTasksQuery?.isError;
  const error = listId ? listQuery?.error : allTasksQuery?.error;

  // mutations
  const createTask = useCreateTask();
  const deleteTask = useDeleteUserTask(userId);

  const toggleCreate = useCallback(() => setCreateOpen(v => !v), []);
  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

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
        setCreateOpen(false)
        queryClient.invalidateQueries({queryKey: listId ? ['listData', listId] : ['tasks', userId]});
    },
    });
  }, [form, createTask, userId, listId]);

  const handleDelete = useCallback((taskId: number) => {
    deleteTask.mutate(taskId, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: listId ? ['listData', listId] : ['tasks', userId]});
        }
    });
  }, [deleteTask]);

  return {
    tasks,
    listTitle,
    isLoading,
    isError,
    error,
    isCreateOpen,
    toggleCreate,
    form,
    setForm,
    handleChange,
    handleSubmit,
    handleDelete,
  };
}