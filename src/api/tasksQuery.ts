import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteUserTodo, fetchUserTodos } from "./task.api";

type QueryKeys = {
    fetchTodos: string
}

const queryKeys: QueryKeys = {
    fetchTodos: 'userTodos'
}

export const useFetchUserTodos = (userId: number) =>{
    return useQuery({
        queryKey: [queryKeys.fetchTodos, userId],
        queryFn: () => fetchUserTodos(userId)
    })
}

export const useCreateTodo = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTodos]})
        }
    })
}

export const useDeleteUserTodo = (authorId: number) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number /*This parameter is what we need to pass to the mutation function*/) => deleteUserTodo(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTodos, authorId]})
        }
    })
}