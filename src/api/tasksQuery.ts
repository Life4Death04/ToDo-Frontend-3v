import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteUserTask, fetchUserTasks } from "./task.api";

type QueryKeys = {
    fetchTasks: string
}

const queryKeys: QueryKeys = {
    fetchTasks: 'userTasks'
}

export const useFetchUserTasks = (userId: number) =>{
    return useQuery({
        queryKey: [queryKeys.fetchTasks, userId],
        queryFn: () => fetchUserTasks(userId)
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