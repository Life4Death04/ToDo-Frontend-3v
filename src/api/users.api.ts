import axios from 'axios'
import api from './axios';

let registerUrl:string = 'http://localhost:3000/user/register';

type NewUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type Response = {
    message?: string | null, 
    token?: string | null,
    user?: {
        email?: string | null
        password?: string | null
    }
}

type Credentials = {
    email: string,
    password: string
}

export const registerUser = async(newUser: NewUser): Promise<Response> =>{
    try{
        const res = await axios.post(registerUrl, newUser);
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error registering user`)
        }
        throw new Error(`Unexpected error registering user`);
    }
}

export const loginUser = async(credentials: Credentials): Promise<Response> => {
    try{
        const res = await api.post('http://localhost:3000/user/login', credentials)
        return res.data

    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error registering user`)
        }
        throw new Error(`Unexpected error registering user`)
    }
}

//Protected Routes
/*
    After logged in and having our token, we should create protected routes where we use the token as a security element to keep in sync our actions with the token
*/