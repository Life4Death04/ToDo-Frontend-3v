import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, fetchUserData } from "./users.api";
import { useNavigate } from "react-router";

// -------------------- Types --------------------
type QueryKeys = {
    fetchUserData: string
}

type Messages = {
    success: string,
    error: string
}
// -------------------- Static Values --------------------
const queryKeys: QueryKeys = {
    fetchUserData: 'userData'
}

let messages: Messages = {
    success: `Action completed Successfully`,
    error: `Something went wrong`
}
// -------------------- Register Hook --------------------
export const useRegisterNewUser = () =>{
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

    function logout(){
        localStorage.removeItem("token");
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