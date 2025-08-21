import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./users.api";
import { useNavigate } from "react-router";

let messages: Messages = {
    success: `Action completed Successfully`,
    error: `Something went wrong`
}

type Messages = {
    success: string,
    error: string
}

export const useRegisterNewUser = () =>{
    return useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            console.log(messages.success)
        }
    })
}

//Login Mutation
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

//Logout (just remove the token from the local storage and redirect it to the login)
export const useLogoutUser = () =>{
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("token");
        navigate('/');
    }

    return logout;
}