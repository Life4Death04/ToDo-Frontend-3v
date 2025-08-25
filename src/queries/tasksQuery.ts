import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteUserTask, fetchUserTasks, toggleUserTaskArchived, updateTask } from "../api/task.api";
import type { Task } from '../types'

type QueryKeys = {
    fetchTasks: string
}

const queryKeys: QueryKeys = {
    fetchTasks: 'userTasks'
}

export const useFetchUserTasks = (userId: number) =>{
    return useQuery({
    queryKey: [queryKeys.fetchTasks, userId],
        queryFn: fetchUserTasks,
        //This select allow us to transform the data returned by the query
        select: (data) => ({
            tasks: data?.tasks ?? [], //Could be an empty array if no tasks found
            totalTasks: data?.tasks?.length ?? 0,
            completedTasks: data?.tasks?.filter(task => task.status === 'DONE').length ?? 0
        })
    })
}

export const useCreateTask = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks]})
        }
    })
}

export const useDeleteUserTask = (authorId: number) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number /*This parameter is what we need to pass to the mutation function*/) => deleteUserTask(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks, authorId]})
        }
    })
}

export const useToggleTaskArchived = (authorId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number) => toggleUserTaskArchived(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks, authorId]})
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskToUpdate: Partial<Task>) => updateTask(taskToUpdate),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTasks]})
        }
    })
}