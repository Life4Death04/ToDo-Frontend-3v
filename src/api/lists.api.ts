import axios from 'axios';
import api from './axios';
import type { FetchListsResponse, CreateListResponse, List, FetchListDataResponse, UpdateListDataResponse, DeleteListDataResponse } from '../types';

type BACKEND_ROUTES_LISTS = {
    FETCH_LISTS: string;
    CREATE_LIST: string;
    FETCH_LIST_DATA: (listId:number) => string;
    UPDATE_LIST_DATA: (listId:number) => string;    
    DELETE_LIST: (listId:number) => string;
}

const BACKEND_ROUTES: BACKEND_ROUTES_LISTS = {
    FETCH_LISTS: '/lists/',
    CREATE_LIST: '/lists/',
    FETCH_LIST_DATA: (listId:number) => `/lists/${listId}`,
    UPDATE_LIST_DATA: (listId:number) => `/lists/${listId}`,
    DELETE_LIST: (listId:number) => `/lists/${listId}`
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

export const createList = async (list: Omit<List, 'id' | 'tasks'>): Promise<CreateListResponse> => {
    try{
        const response = await api.post(BACKEND_ROUTES.CREATE_LIST, list);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error creating list`)
        }else{
            throw new Error(`Unexpected error creating list`)
        }
    }
}

export const fetchListData = async (listId:number): Promise<FetchListDataResponse> =>{
    try{
        const response = await api.get(BACKEND_ROUTES.FETCH_LIST_DATA(listId));
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching list data`)
        }else{
            throw new Error(`Unexpected error fetching list data`)
        }
    }
}

export const updateList = async (listId:number, listData: List): Promise<UpdateListDataResponse> =>{
    try{
        const response = await api.put(BACKEND_ROUTES.UPDATE_LIST_DATA(listId), listData);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error updating list`)
        }else{
            throw new Error(`Unexpected error updating list`)
        }
    }
}

export const deleteList = async (listId: number): Promise<DeleteListDataResponse> => {
    try{
        const response = await api.delete(BACKEND_ROUTES.DELETE_LIST(listId));
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error deleting list`)
        }else{
            throw new Error(`Unexpected error deleting list`)
        }
    }
}