import { useQuery } from "@tanstack/react-query";
import { fetchUserTodos } from "./task.api";

type QueryKeys = {
    fetchTodos: string
}

const queryKeys: QueryKeys = {
    fetchTodos: 'todos'
}

export const useFetchUserTodos = (userId: string) =>{
    return useQuery({
        queryKey: [queryKeys.fetchTodos, userId],
        queryFn: ({queryKey}) => fetchUserTodos(queryKey[1])
    })
}