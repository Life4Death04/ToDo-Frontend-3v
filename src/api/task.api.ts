import axios from 'axios';
import api from './axios';
import type { Task, FetchTaskResponse, CreateTaskResponse } from '../types';

type ToggleArchivedTask = {
    message: string;
    task: Task;
}

export const fetchUserTasks = async(userId: number):Promise<FetchTaskResponse> =>{
    try{
        const res = await api.get(`http://localhost:3000/task/${userId}`)
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
        const res = await api.post(`http://localhost:3000/task/create`, task);
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
        await api.delete(`http://localhost:3000/task/delete/${authorId}/${taskId}`)
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error deleting User's task`)
        }else{
            throw new Error(`Unexpected error deleting User's todo`)
        }
    }
}

export const toggleUserTaskArchived = async(authorId: number, taskId: number): Promise<ToggleArchivedTask> =>{
    try{
        const res = await api.patch(`http://localhost:3000/task/toggleArchived/${authorId}/${taskId}`)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error toggling User's task archived status`)
        }else{
            throw new Error(`Unexpected error toggling User's task archived status`)
        }
    }
}

export const updateTask = async(taskToUpdate: Partial<Task>): Promise<CreateTaskResponse> =>{
    try{
        const res = await api.patch(`http://localhost:3000/task/update`, taskToUpdate)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error updating User's task`)
        }else{
            throw new Error(`Unexpected error updating User's task`)    
        }
    }
}