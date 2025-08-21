import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserTodo, deleteUserTodo, fetchUserTodos } from "./task.api";

type QueryKeys = {
    fetchTodos: string
}

const queryKeys: QueryKeys = {
    fetchTodos: 'userTodos'
}

export const useFetchUserTodos = (userId: string) =>{
    return useQuery({
        queryKey: [queryKeys.fetchTodos, userId],
        queryFn: () => fetchUserTodos(userId)
    })
}

export const useCreateuserTodo = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUserTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTodos]})
        }
    })
}

export const useDeleteUserTodo = (authorId: string) =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: number /*This parameter is what we need to pass to the mutation function*/) => deleteUserTodo(authorId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchTodos, authorId]})
        }
    })
}