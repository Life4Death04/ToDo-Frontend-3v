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

// -------------------- Main Login Component --------------------
export default function LoginForm({onSubmit, onChange, values, isPending, isError, error}: LoginFormProps) {
    return(
        <main className="h-screen flex items-center justify-center">
            <section className="mx-auto text-center w-max-auth shadow-2xl rounded-xl p-8">
                <Header {...headerText}></Header>
                <form onSubmit={onSubmit} className="flex flex-col content-around mt-6 mb-4">
                        <Input 
                            type="email" 
                            name="email" 
                            label="email"
                            value={values.email}
                            required={true} 
                            placeholder="Enter your email address"
                            onChange={onChange}>
                        </Input>
                        <Input 
                            type="password" 
                            name="password" 
                            label="password"
                            value={values.password}
                            required={true} 
                            placeholder="Enter your password"
                            onChange={onChange}>
                        </Input>
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
                        <SubmitBtn {...submitBtnContent} isPending={isPending}></SubmitBtn>
                        {isError && <p>{error?.message}</p>}
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    )
}
