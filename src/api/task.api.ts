import axios from 'axios';
import api from './axios';

type Todo = {
    id: number,
    content: string,
    check: true | false,
    authorId: number
}

type FetchTodosResponse = {
    todos?: Todo[];
}

type CreateTodoResponse = {
    message: string;
    todo: Todo;
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

export const addUserTodo = async(todo: Omit<Todo, 'id' | 'check'>):Promise<CreateTodoResponse> =>{
    try{
        const res = await api.post(`http://localhost:3000/task/create`, todo);
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error creating User's todo`)
        }else{
            throw new Error(`Unexpected error creating User's todo`)
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