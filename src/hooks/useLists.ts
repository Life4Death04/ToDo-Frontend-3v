import { useQuery } from "@tanstack/react-query";
import { fetchLists } from "../api/lists.api";

type QueryKeys = {
    fetchLists: string;
}

const queryKeys: QueryKeys = {
    fetchLists: 'lists'
}

export const useFetchLists = () => {
    return useQuery({
        queryKey: [queryKeys.fetchLists],
        queryFn: fetchLists
    })
}