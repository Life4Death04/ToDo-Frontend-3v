import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createList, fetchListData, fetchLists, updateList } from "../api/lists.api";
import type { List } from "../types";


type QueryKeys = {
    fetchLists: string;
    createList: string;
    fetchListData: string;
    updateList: string;
}

const queryKeys: QueryKeys = {
    fetchLists: 'lists',
    createList: 'createNewList',
    fetchListData: 'listData',
    updateList: 'updateList'
}

export const useFetchLists = () => {
    return useQuery({
        queryKey: [queryKeys.fetchLists],
        queryFn: fetchLists
    })
}

export const useCreateList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [queryKeys.createList],
        mutationFn: createList,
        onSuccess: () => {
            // Invalidate the fetchLists query to refetch the data
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchLists]});
        }
    })
}

export const useFetchListData = (listId: number) => {
    return useQuery({
        queryKey: [queryKeys.fetchListData, listId],
        queryFn: () => fetchListData(listId)
    })
}

export const useUpdateList = (listId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [queryKeys.updateList, listId],
        mutationFn: (listData: List) => updateList(listId, listData),
        onSuccess: () => {
            // Invalidate the fetchLists query to refetch the data
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchListData]});
        }
    })
}