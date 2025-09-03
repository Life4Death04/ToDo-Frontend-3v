import { useState } from "react";
import { useLoginUser } from "../hooks/useUsers";
import LoginForm from "../components/Auth/LoginForm";

export type FormData = {
    email: string,
    password: string,
}

/**
 * LoginContainer
 * Manages controlled login form state and submits credentials using
 * `useLoginUser` hook. Validates the form at submit and forwards the
 * payload to the mutation hook.
 *
 * @returns JSX.Element
 */
export function LoginContainer(){
    const { mutate, isPending, isError, error } = useLoginUser();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return(
        <LoginForm 
            values={formData} 
            onChange={handleChange}
            onSubmit={handleSubmit} 
            isPending={isPending}
            isError={isError}
            error={error}
        />
    );
}