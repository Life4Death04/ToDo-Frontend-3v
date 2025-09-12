import RegisterForm from "../components/Auth/RegisterForm";
import { useEffect, useState } from "react";
import { useRegisterNewUser } from "../hooks/useUsers";
import i18n from "../i18n";

export type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type ErrorTypes = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
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

    useEffect(() => {
        const storedLang = localStorage.getItem('language');

        if (storedLang) {
            i18n.changeLanguage(storedLang.toLowerCase());
        }
    }, []);
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        // clear field-specific validation error while typing
        setFieldErrors(prev => ({ ...prev, [name]: '' }));

    }

    function handleOnSubmit(e: React.FormEvent):void{
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        const errors: Partial<ErrorTypes> = {};

        // names: 1-50 chars
        if (!firstName || firstName.trim().length < 1 || firstName.trim().length > 50) {
            errors.firstName = 'First name must be between 1 and 50 characters';
        }
        if (!lastName || lastName.trim().length < 1 || lastName.trim().length > 50) {
            errors.lastName = 'Last name must be between 1 and 50 characters';
        }

        // password length
        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // password confirmation (only set if length ok)
        if (!errors.password && password !== confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // clear any previous errors
        setFieldErrors({});

        mutate({ firstName, lastName, email, password });
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
        <RegisterForm 
            values={formData}
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            isError={isError}
            isPending={isPending}
            error={error}
            isSuccess={isSuccess}
            fieldErrors={fieldErrors}
            onLanguageChange={handleLanguageChange}
        />
    );
}