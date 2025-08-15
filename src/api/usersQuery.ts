import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./users.api";

type messagesType = {
    success: string,
    error: string
}

let messages: messagesType = {
    success: `User Registered Successfully`,
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