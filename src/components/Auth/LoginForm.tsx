import { Link } from "react-router";
import type { ChangeEvent, FormEvent } from "react";
import type { FormData } from "../../containers/LoginContainer";
import { 
    Footer, 
    Header, 
    Input, 
    SubmitBtn,
    Button,  
} from "../Common/CommonComponents";
import { useTranslation } from "react-i18next";

// -------------------- Types --------------------
type LoginFormProps = {
    onSubmit: (e: FormEvent) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    values: FormData
    isPending: boolean
    isError: boolean
    error: Error | null
    onLanguageChange: () => void
}

type ErrorTypes = {
    email: string;
    password: string;
}

const errorMessages: ErrorTypes = {
    email: 'Email not registered',
    password: 'Invalid password or email',
}

// -------------------- Main Login Component --------------------
/**
 * LoginForm
 *
 * Controlled login form component. The parent container should own form state
 * and provide handlers for input changes and form submission.
 *
 * Props:
 * @param onSubmit - form submit handler (receives the native FormEvent)
 * @param onChange - input change handler for controlled inputs
 * @param values - controlled form values object (expects `email` and `password`)
 * @param isPending - set to true while submit is in progress (used by SubmitBtn)
 * @param isError - boolean flag indicating an error state (not used directly here)
 * @param error - optional Error object used to show field-level errors
 *
 * Usage example:
 * <LoginForm values={values} onChange={handleChange} onSubmit={handleSubmit} isPending={isSubmitting} error={error} />
 */
export default function LoginForm({onSubmit, onChange, values, isPending, error, onLanguageChange}: LoginFormProps) {
    const { t } = useTranslation("translation");
    return(
        <main className="h-screen flex items-center justify-center border-2 bg-white">
            <section className="mx-auto text-center w-max-auth h-fit shadow-2xl rounded-xl p-8">
                <Header 
                    textH2={t("auth.header.login.title")}
                    label={t("auth.header.login.subtitle")}
                />
                <form onSubmit={onSubmit} className="flex flex-col content-around mt-6 mb-4">
                        <Input 
                            type="email" 
                            name="email" 
                            label={t("auth.login.email")}
                            value={values.email}
                            required={true} 
                            placeholder={t("auth.register.placeholders.email")}
                            onChange={onChange}
                            error={(error?.message === errorMessages.email) ? error : undefined}
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            label={t("auth.login.password")}
                            value={values.password}
                            required={true} 
                            placeholder={t("auth.login.placeholders.password")}
                            onChange={onChange}
                            error={(error?.message === errorMessages.password) ? error : undefined}
                        />
                        <div className="flex justify-between mb-4">
                            <div className="">
                                <input type="checkbox" className="mr-2 size-3.5"/>
                                <label>
                                    Remember me
                                </label>
                            </div>
                            <Link to="/">
                                <button className=" text-orange font-bold hover:cursor-pointer">
                                    Forgot password?
                                </button>
                            </Link>
                        </div>
                        <SubmitBtn 
                            buttonText={t("auth.login.submit")}
                            isPending={isPending} 
                        />
                </form>
                <Footer 
                    label={t("auth.login.noAccount")}
                    buttonText={t("auth.login.register")}
                    buttonUrl="/register"
                />

                <div className="mt-4">
                    <Button 
                        textButton={'EN / ES'}
                        iconStyle="fa-solid fa-earth-americas"
                        onClick={onLanguageChange}
                    />
                </div>
            </section>
        </main>
    )
}
