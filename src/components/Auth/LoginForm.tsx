import { Link } from "react-router";
import type { ChangeEvent, FormEvent } from "react";
import type { FormData } from "../../containers/LoginContainer";
import { 
    Footer, 
    Header, 
    Input, 
    SubmitBtn, 
    type FooterProps, 
    type HeaderProps, 
    type SubmitBtnProps 
} from "../Common/CommonComponents";

// -------------------- Static Content --------------------
const headerText: HeaderProps = {
    textH2: `Welcome Back!`,
    label: `Let's get you signed in.`
}

const footerContent: FooterProps = {
    label: `Don't have an account? `,
    buttonUrl: `/accounts/register`,
    buttonText: `Register`
}

const submitBtnContent: SubmitBtnProps = {
    buttonText: 'Login',
    isPending: false,
}

// -------------------- Types --------------------
type LoginFormProps = {
    onSubmit: (e: FormEvent) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    values: FormData
    isPending: boolean
    isError: boolean
    error: Error | null
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
export default function LoginForm({onSubmit, onChange, values, isPending, error}: LoginFormProps) {
    return(
        <main className="h-screen flex items-center justify-center border-2 bg-white">
            <section className="mx-auto text-center w-max-auth h-fit shadow-2xl rounded-xl p-8">
                <Header {...headerText} />
                <form onSubmit={onSubmit} className="flex flex-col content-around mt-6 mb-4">
                        <Input 
                            type="email" 
                            name="email" 
                            label="email"
                            value={values.email}
                            required={true} 
                            placeholder="Enter your email address"
                            onChange={onChange}
                            error={(error?.message === errorMessages.email) ? error : undefined}
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            label="password"
                            value={values.password}
                            required={true} 
                            placeholder="Enter your password"
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
                        <SubmitBtn {...submitBtnContent} isPending={isPending} />
                </form>
                <Footer {...footerContent} />
            </section>
        </main>
    )
}
