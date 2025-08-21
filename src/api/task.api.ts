import axios from 'axios';
import api from './axios';

type Todo = {
        id: number,
        content: string,
        status: true | false,
        authorId: number
    }

/* type Response = {
    message?: string | null, 
    token?: string | null,
    user?: {
        email?: string | null
        password?: string | null
    }
} */

type FetchTodosResponse = {
    todos?: Todo[];
}

export const fetchUserTodos = async(userId: string):Promise<FetchTodosResponse> =>{
    try{
        const res = await api.get(`http://localhost:3000/task/${userId}`)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching User's todos`)
        }else{
            throw new Error(`Unexpected error fetching User's todos`)
        }
    }
}

export const deleteUserTodo = async(authorId: string, taskId: number): Promise<void> =>{
    try{
        await api.delete(`http://localhost:3000/task/deleteTask/${authorId}/${taskId}`)
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error deleting User's todo`)
        }else{
            throw new Error(`Unexpected error deleting User's todo`)
        }
    }
}