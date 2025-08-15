import axios from 'axios'

let registerUrl:string = 'http://localhost:3000/user/register';

type NewUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type Response = {
    message: string | null, 
    token?: string | null,
    user: {
        email: string | null
        password?: string | null
    }
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

type Credentials = {
    email: string,
    password: string
}

export const loginUser = async(credentials: Credentials): Promise<Response> => {
    try{
        const res = await axios.post('http://localhost:3000/user/login', credentials)
        return res.data

    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error registering user`)
        }
        throw new Error(`Unexpected error registering user`)
    }
}