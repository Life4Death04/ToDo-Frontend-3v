import RegisterForm from "../components/Auth/RegisterForm";
import { useState } from "react";
import { useRegisterNewUser } from "../hooks/useUsers";

export type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function RegisterContainer(){
    const { mutate, isPending, isError, error, isSuccess } = useRegisterNewUser();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    function handleOnSubmit(e: React.FormEvent):void{
        e.preventDefault();
        mutate(formData);
    }

    return(
        <RegisterForm 
            values={formData}
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            isError={isError}
            isPending={isPending}
            error={error}
            isSuccess={isSuccess}
        />
    );
}