import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./users.api";
/* import { redirect } from "react-router"; */

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
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data:any) => {
            console.log(messages.success)
            localStorage.setItem("token", data.token)
            /* redirect() */
        }
    })
}