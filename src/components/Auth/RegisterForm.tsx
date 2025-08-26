import type { ChangeEvent, FormEvent } from "react";

import type { FormData } from "../../containers/RegisterContainer";
import { 
    Input, 
    Header, 
    Footer, 
    SubmitBtn, 
    type HeaderProps, 
    type FooterProps, 
    type SubmitBtnProps 
} from "../Common/CommonComponents";

// -------------------- Static Content --------------------
const headerText: HeaderProps = {
    textH2: 'Create Account',
    label: `Let's get you started!`
}

const footerContent: FooterProps = {
    label: `You already have an account? `,
    buttonUrl: `/`,
    buttonText: `Login`
}

const submitBtnContent: SubmitBtnProps = {
    buttonText: 'Register',
    isPending: false,
}

// -------------------- Types --------------------
type RegisterFormProps = {
    values: FormData,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: FormEvent) => void,
    isError: boolean,
    isPending: boolean,
    isSuccess: boolean,
    error: Error | null,
}

// -------------------- Main Register Component --------------------
export default function RegisterForm({ values, onChange, onSubmit, isError, isPending, error, isSuccess }: RegisterFormProps){
    return(
        <main className="flex items-center justify-center">
            <section className="text-center mx-auto w-max-auth shadow-2xl rounded-xl p-8 pt-4">
                <Header {...headerText}></Header>
                <form className="flex flex-col content-around" onSubmit={onSubmit}>
                        <div className="flex justify-between gap-8">
                            <Input 
                                type="text" 
                                name="firstName"
                                label="first name" 
                                placeholder="Enter your first name" 
                                value={values.firstName} 
                                onChange={onChange}>
                            </Input>
                            <Input 
                                type="text" 
                                name="lastName"
                                label="last name" 
                                placeholder="Enter your last name"
                                value={values.lastName}
                                onChange={onChange}>
                            </Input>
                        </div>
                        <Input 
                            type="email" 
                            name="email"
                            label="email" 
                            placeholder="Enter your email address" 
                            required={true}
                            value={values.email}
                            onChange={onChange}>
                        </Input>
                        <Input 
                            type="password" 
                            name="password"
                            label="password" 
                            placeholder="Enter your password" 
                            required={true}
                            value={values.password}
                            onChange={onChange}>
                        </Input>
                        {isError && <p>Password Invalidation!</p>}
                        <Input 
                            type="password" 
                            name="confirmPassword"
                            label="confirm password" 
                            placeholder="Confirm your password" 
                            required={true}
                            value={values.confirmPassword}
                            onChange={onChange}>
                        </Input>
                        {/* <button type="submit" className="bg-orange text-white font-bold  rounded-md p-3 mt-4 mb-2 hover:cursor-pointer hover:bg-orange-strong">Register</button> */}
                        <SubmitBtn {...submitBtnContent} isPending={isPending}></SubmitBtn>
                        {isError && <p>{error?.message}</p>}
                        {isSuccess && <p>User created successfully</p>}
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    );
}