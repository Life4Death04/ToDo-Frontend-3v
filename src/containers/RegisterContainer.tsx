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

type ErrorTypes = {
    email: string;
    password: string;
}

/**
 * RegisterContainer
 * Controlled registration flow. Keeps local form state and field-level
 * validation for password confirmation, and invokes `useRegisterNewUser`
 * to perform the registration.
 *
 * @returns JSX.Element
 */
export default function RegisterContainer(){
    const { mutate, isPending, isError, error, isSuccess } = useRegisterNewUser();
    const [fieldErrors, setFieldErrors] = useState<Partial<ErrorTypes>>({})
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
        if(formData.password !== formData.confirmPassword){
            setFieldErrors({ password: "Passwords don't match" })
            return;
        }
        setFieldErrors({password: ''})
        const {firstName, lastName, email, password} = formData;
        mutate({firstName, lastName, email, password});
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
            fieldErrors={fieldErrors}
        />
    );
}