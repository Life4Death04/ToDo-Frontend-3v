import axios from 'axios'
import api from './axios';
// -------------------- Types --------------------
type BACKEND_ROUTES_USERS = {
    REGISTER: string;
    LOGIN: string;
    FETCH: (userId: number) => string;
}

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

type FetchUserDataResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
    phoneNumber?: string;
    createdAt: Date;
    emailVerified: boolean;
}

type Credentials = {
    email: string,
    password: string
}
// -------------------- Backend Routes --------------------
const BACKEND_ROUTES: BACKEND_ROUTES_USERS = {
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    FETCH: (userId: number) => `/user/find/${userId}`
}

//Protected Routes
/*
    After logged in and having our token, we should create protected routes where we use the token as a security element to keep in sync our actions with the token
*/
// -------------------- Register User --------------------
export const registerUser = async(newUser: NewUser): Promise<Response> =>{
    try{
        const res = await axios.post(BACKEND_ROUTES.REGISTER, newUser);
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error registering user`)
        }
        throw new Error(`Unexpected error registering user`);
    }
}

// -------------------- Login User --------------------
export const loginUser = async(credentials: Credentials): Promise<Response> => {
    try{
        const res = await api.post(BACKEND_ROUTES.LOGIN, credentials)
        return res.data

    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error registering user`)
        }
        throw new Error(`Unexpected error registering user`)
    }
}

// -------------------- Fetching User Data --------------------
export const fetchUserData = async(userId: number): Promise<FetchUserDataResponse> =>{
    try{
        const res = await api.get(BACKEND_ROUTES.FETCH(userId));
        return res.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching user data`)
        }
        throw new Error(`Unexpected error fetching user data`)
    }
}