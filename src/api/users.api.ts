import axios from 'axios'
import api from './axios';
import type { Settings, UpdateSettingsResponse, UpdateUserResponse, User } from '../types';
// -------------------- Types --------------------
type BACKEND_ROUTES_USERS = {
    REGISTER: string;
    LOGIN: string;
    FETCH: (userId: number) => string;
    UPDATE: (user: User) => string;
}

type BACKEND_ROUTES_SETTINGS = {
    FETCH: string;
    UPDATE: string;
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
    createdAt?: Date;
    emailVerified?: boolean;
}

type Credentials = {
    email: string,
    password: string
}
// -------------------- Backend Routes --------------------
const BACKEND_ROUTES: BACKEND_ROUTES_USERS = {
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    FETCH: (userId: number) => `/user/find/${userId}`,
    UPDATE: (user: User) => `/user/update/${user.id}`,
}

const SETTINGS_ROUTES: BACKEND_ROUTES_SETTINGS = {
    FETCH: '/settings/',
    UPDATE: '/settings/'
}

//Protected Routes
/*
    After logged in and having our token, we should create protected routes where we use the token as a security element to keep in sync our actions with the token
*/
// -------------------- Register User --------------------
export const registerUser = async(newUser: NewUser): Promise<Response> =>{
    try{
        const res = await api.post(BACKEND_ROUTES.REGISTER, newUser);
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

export const fetchMeData = async(): Promise<FetchUserDataResponse> =>{
    try{
        const res = await api.get('/user/getUser');
        return res.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching user data`)
        }
        throw new Error(`Unexpected error fetching user data`)
    }
}

// -------------------- Update User Data --------------------
export const updateUserData = async(dataToUpdate: User): Promise<UpdateUserResponse> =>{
    try{
        const response = await api.put(BACKEND_ROUTES.UPDATE(dataToUpdate), dataToUpdate);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error updating user data`)
        }
        throw new Error(`Unexpected error updating user data`)
    }
}

// -------------------------------------------------------- Settings -------------------------------------------------
// --------------------- Fetch User Settings --------------------
export const fetchUserSettings = async(): Promise<Settings> =>{
    try{
        const res = await api.get(SETTINGS_ROUTES.FETCH);
        return res.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error fetching user settings`)
        }
        throw new Error(`Unexpected error fetching user settings`)
    }
}

// --------------------- Update User Settings --------------------
export const updateUserSettings = async(dataToUpdate: Settings): Promise<UpdateSettingsResponse> =>{
    try{
        const response = await api.put(SETTINGS_ROUTES.UPDATE, dataToUpdate);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || `Error updating user settings`)
        }
        throw new Error(`Unexpected error updating user settings`)
    }
}