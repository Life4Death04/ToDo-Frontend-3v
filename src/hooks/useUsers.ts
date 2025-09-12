import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser, fetchUserData, fetchMeData, updateUserData } from "../api/users.api";
import { useNavigate } from "react-router";

// -------------------- Types --------------------
type QueryKeys = {
    fetchUserData: string
    fetchMeData: string
    updateUserData: string
}

type Messages = {
    success: string,
    error: string
}
// -------------------- Static Values --------------------
const queryKeys: QueryKeys = {
    fetchUserData: 'userData',
    fetchMeData: 'me',
    updateUserData: 'updateUserData'
}

const messages: Messages = {
    success: `Action completed Successfully`,
    error: `Something went wrong`
}
// -------------------- Register Hook --------------------
export const useRegisterNewUser = () =>{
    /**
     * useRegisterNewUser
     * Mutation hook to register a new user. Calls `registerUser` API.
     */
    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            console.log(messages.success)
        }
    })
}
// -------------------- Login Hook --------------------
export const useLoginUser = () =>{
    const navigate = useNavigate();
    /**
     * useLoginUser
     * Mutation hook to authenticate a user. Stores token and navigates
     * to the user's account on success.
     */
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data:any) => {
            
            localStorage.setItem("token", data.token)
            navigate(`/accounts/${data.user.id}`)
        }
    })
}
// -------------------- Logout Hook --------------------
//Logout (just remove the token from the local storage and redirect it to the login)
export const useLogoutUser = () =>{
    const navigate = useNavigate();
    /**
     * logout
     * Removes authentication token and redirects to the login page.
     */
    function logout(){
        localStorage.removeItem("token");
        document.documentElement.classList.remove('dark');
        navigate('/');
    }

    return logout;
}
// -------------------- Fetching User Data Hook --------------------
export const useFetchUserData = (userId: number) =>{
    return useQuery({
        queryKey: [queryKeys.fetchUserData, userId],
        queryFn: () => fetchUserData(userId)
    })
}
// -------------------- Fetching User Data Hook --------------------
export const useFetchMeData = () =>{
    return useQuery({
        queryKey: [queryKeys.fetchMeData],
        queryFn: fetchMeData
    })
}

// -------------------- Updating User Data Hook --------------------
export const useUpdateUserData = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.fetchMeData] });
        }
    })
}