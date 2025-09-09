import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteUserTask, fetchUserTasks, toggleTaskArchived, updateTask } from "../api/task.api";
import type { Task } from '../types'
import { fetchUserSettings, updateUserSettings } from "../api/users.api";

type QueryKeys = {
    fetchTasks: string
    fetchListData: string
    fetchUserSettings: string
}

const queryKeys: QueryKeys = {
    fetchTasks: 'userTasks',
    fetchListData: 'listData',
    fetchUserSettings: 'userSettings'
}
/**
 * useFetchUserTasks
 * Fetches all tasks for a user and returns a transformed result with
 * tasks, totalTasks and completedTasks counts.
 * @param {number} userId - id of the user whose tasks will be fetched
 */

export const useFetchUserTasks = (userId: number) =>{
    return useQuery({
    queryKey: [queryKeys.fetchTasks, userId],
    queryFn: fetchUserTasks,
        //This select allow us to transform the data returned by the query
        select: (data) => ({
            unarchivedTasks: data?.tasks.filter(task => !task.archived) ?? [], //Could be an empty array if no tasks found
            archivedTasks: data?.tasks.filter(task => task.archived) ?? [],
        })
    })
}

/**
 * useCreateTask
 * Mutation hook for creating a new task and invalidating the user's tasks
 * cache on success.
 */
export const useCreateTask = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks]})
        }
    })
}

/**
 * useDeleteUserTask
 * Returns a mutation to delete a task for a given author and refreshes
 * the author's task cache on success.
 * @param {number} authorId - user id owning the task
 */
export const useDeleteUserTask = (authorId: number) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number /*This parameter is what we need to pass to the mutation function*/) => deleteUserTask(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks, authorId]})
        }
    })
}

/**
 * useToggleTaskArchived
 * Toggle archived flag for a task owned by authorId.
 * @param {number} authorId - owner id to scope cache invalidation
 */
export const useToggleTaskArchived = (authorId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number) => toggleTaskArchived(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks, authorId]})
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchListData]})
        }
    })
}

/**
 * useUpdateTask
 * Mutation used to update a task. Invalidates tasks cache on success.
 */
export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskToUpdate: Partial<Task>) => updateTask(taskToUpdate),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks]})
        }
    })
}

// -------------------- Settings Hooks --------------------
/**
 * useFetchUserSettings
 * Fetches settings for the current user.
 */
export const useFetchUserSettings = (enabled = true) =>{
    return useQuery({
        queryKey: [queryKeys.fetchUserSettings],
        queryFn: fetchUserSettings, 
        enabled,
        retry: false,
    })
}

/**
 * useUpdateUserSettings
 * Mutation hook to update user settings and invalidate the settings
 * cache on success.
 */
export const useUpdateUserSettings = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchUserSettings]})
        }
    })
}