import axios from 'axios'

let registerUrl:string = 'http://localhost:3000/user/register';

type NewUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type RegisterResponse = {
    message: string, 
    user: {
        email: string
    }
}

export const registerUser = async(newUser: NewUser): Promise<RegisterResponse> =>{
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