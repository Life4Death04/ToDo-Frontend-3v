import axios from 'axios';
import api from './axios';

type Response = {
    message?: string | null, 
    token?: string | null,
    user?: {
        email?: string | null
        password?: string | null
    },
    todos?: {
        id: number,
        content: string,
        check: true | false,
        authorId: number
    }
}

export const fetchUserTodos = async(userId: string):Promise<Response> =>{
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