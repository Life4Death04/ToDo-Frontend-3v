import { useEffect, useState } from "react";
import { useLoginUser } from "../hooks/useUsers";
import LoginForm from "../components/Auth/LoginForm";
import i18n from "../i18n";

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
    useEffect(() => {
        const storedLang = localStorage.getItem('language');

        if (storedLang) {
            i18n.changeLanguage(storedLang.toLowerCase());
        }
    }, []);

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

    const handleLanguageChange = () => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            const newLang = (storedLang === 'EN') ? 'es' : 'en';
            i18n.changeLanguage(newLang);
            localStorage.setItem('language', newLang.toUpperCase());
        }else{
            const newLang = (i18n.language === 'EN') ? 'es' : 'en';
            i18n.changeLanguage(newLang);
            localStorage.setItem('language', newLang.toUpperCase());
        }
    }

    return(
        <LoginForm 
            values={formData} 
            onChange={handleChange}
            onSubmit={handleSubmit} 
            isPending={isPending}
            isError={isError}
            error={error}
            onLanguageChange={handleLanguageChange}
        />
    );
}