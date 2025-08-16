import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./users.api";
import { useNavigate } from "react-router";

type Messages = {
    success: string,
    error: string
}

let messages: Messages = {
    success: `Action completed Successfully`,
    error: `Something went wrong`
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