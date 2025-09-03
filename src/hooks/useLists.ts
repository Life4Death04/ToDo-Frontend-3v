import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createList, deleteList, fetchListData, fetchLists, updateList } from "../api/lists.api";
import type { List } from "../types";


type QueryKeys = {
    fetchLists: string;
    createList: string;
    fetchListData: string;
    updateList: string;
    deleteList: string;
}

const queryKeys: QueryKeys = {
    fetchLists: 'lists',
    createList: 'createNewList',
    fetchListData: 'listData',
    updateList: 'updateList',
    deleteList: 'deleteList'
}

/**
 * useFetchLists
 * Fetches all lists for the current user context.
 * @returns React-Query result for lists
 */
export const useFetchLists = () => {
    return useQuery({
        queryKey: [queryKeys.fetchLists],
        queryFn: fetchLists
    })
}

/**
 * useCreateList
 * Mutation hook to create a new list. Invalidates `fetchLists` on success.
 */
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

/**
 * useFetchListData
 * Fetches a single list and its related data.
 * @param {number} listId - id of the list to fetch
 */
export const useFetchListData = (listId: number) => {
    return useQuery({
        queryKey: [queryKeys.fetchListData, listId],
        queryFn: () => fetchListData(listId)
    })
}

/**
 * useUpdateList
 * Returns a mutation to update a list by id and invalidates the list cache
 * on success.
 * @param {number} listId - id of the list to update
*/
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

/**
 * useDeleteList
 * Returns a mutation to remove a list by id and refresh the lists cache.
 * @param {number} listId - id of the list to delete
 */
export const useDeleteList = (listId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [queryKeys.deleteList, listId],
        mutationFn: () => deleteList(listId),
        onSuccess: () => {
            // Invalidate the fetchLists query to refetch the data
            queryClient.invalidateQueries({queryKey: [queryKeys.fetchLists]});
        }
    })
}