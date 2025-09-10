import axios from 'axios';
import api from './axios';
import type { Task, FetchTaskResponse, CreateTaskResponse } from '../types';
// -------------------- Types --------------------
type BACKEND_ROUTES_TASKS = {
    FETCH_USER_TASKS: string;
    CREATE_TASK: string;
    DELETE_TASK: (authorId: number, taskId: number) => string;
    TOGGLE_ARCHIVED: (authorId: number, taskId: number) => string;
    UPDATE_TASK: string;
    TOGGLE_STATUS: (taskId: number) => string;
}

type ToggleArchivedTask = {
    message: string;
    task: Task;
}

// -------------------- Backend Routes --------------------
const BACKEND_ROUTES: BACKEND_ROUTES_TASKS = {
    FETCH_USER_TASKS: `/task/get`,
    CREATE_TASK: `/task/create`,
    DELETE_TASK: (authorId: number, taskId: number) => `/task/delete/${authorId}/${taskId}`,
    TOGGLE_ARCHIVED: (authorId: number, taskId: number) => `/task/toggleArchived/${authorId}/${taskId}`,
    UPDATE_TASK: `/task/update`,
    TOGGLE_STATUS: (taskId: number) => `/task/${taskId}/toggle-status`
}

export const fetchUserTasks = async():Promise<FetchTaskResponse> =>{
    try{    
        const res = await api.get(BACKEND_ROUTES.FETCH_USER_TASKS)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching User's tasks`)
        }else{
            throw new Error(`Unexpected error fetching User's todos`)
        }
    }
}

export const createTodo = async(task: Omit<Task, 'id'>):Promise<CreateTaskResponse> =>{
    try{
        const res = await api.post(BACKEND_ROUTES.CREATE_TASK, task);
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error creating User's todo`)
        }else{
            throw new Error(`Unexpected error creating User's todo`)
        }
    }
}

export const deleteUserTask = async(authorId: number, taskId: number): Promise<void> =>{
    try{
        await api.delete(BACKEND_ROUTES.DELETE_TASK(authorId, taskId))
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error deleting User's task`)
        }else{
            throw new Error(`Unexpected error deleting User's todo`)
        }
    }
}

export const toggleTaskArchived = async(authorId: number, taskId: number): Promise<ToggleArchivedTask> =>{
    try{
        const res = await api.patch(BACKEND_ROUTES.TOGGLE_ARCHIVED(authorId, taskId))
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error toggling User's task archived status`)
        }else{
            throw new Error(`Unexpected error toggling User's task archived status`)
        }
    }
}

export const toggleTaskStatus = async(taskId: number) =>{
    try{
        const res = await api.patch(BACKEND_ROUTES.TOGGLE_STATUS(taskId))
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error toggling User's task status`)
        }else{
            throw new Error(`Unexpected error toggling User's task status`)
        }
    }
}

export const updateTask = async(taskToUpdate: Partial<Task>): Promise<CreateTaskResponse> =>{
    try{
        const res = await api.patch(BACKEND_ROUTES.UPDATE_TASK, taskToUpdate)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error updating User's task`)
        }else{
            throw new Error(`Unexpected error updating User's task`)    
        }
    }
}