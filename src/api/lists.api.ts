import axios from 'axios';
import api from './axios';
import type { FetchListsResponse } from '../types';

type BACKEND_ROUTES_LISTS = {
    FETCH_LISTS: string;
}

const BACKEND_ROUTES: BACKEND_ROUTES_LISTS = {
    FETCH_LISTS: '/lists/',
}

export const fetchLists = async (): Promise<FetchListsResponse> => {
    try{
        const response = await api.get(BACKEND_ROUTES.FETCH_LISTS);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching lists`);
        }else{
            throw new Error(`Unexpected error fetching lists`);
        }
    }
}