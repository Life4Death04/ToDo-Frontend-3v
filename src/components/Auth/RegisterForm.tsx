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
    fieldErrors?: Partial<ErrorTypes>
}

type ErrorTypes = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const errorMessages:ErrorTypes = {
    email: "Email already in use",
    password: "Passwords don't match"
}

// -------------------- Main Register Component --------------------
/**
 * RegisterForm
 *
 * Controlled registration form. The parent container must supply all input
 * values and handlers. This component shows a success message when `isSuccess`
 * is true and maps `fieldErrors` to specific inputs.
 *
 * Props:
 * @param values - controlled values for firstName, lastName, email, password, confirmPassword
 * @param onChange - input change handler
 * @param onSubmit - form submit handler
 * @param isPending - whether registration request is in progress
 * @param error - optional server error object
 * @param isSuccess - whether registration succeeded (used to show a message)
 * @param fieldErrors - optional per-field error messages
 *
 * Usage example:
 * <RegisterForm values={values} onChange={handleChange} onSubmit={handleSubmit} isPending={loading} isSuccess={created} fieldErrors={fieldErrors} />
 */
export default function RegisterForm({ values, onChange, onSubmit, isPending, error, isSuccess, fieldErrors }: RegisterFormProps){
    return(
        <main className="flex items-center justify-center">
            <section className="bg-white text-center mx-auto w-max-auth shadow-2xl rounded-xl p-8 pt-4 bg0">
                <Header {...headerText}></Header>
                <form className="flex flex-col content-around" onSubmit={onSubmit}>
                        <div className="flex justify-between gap-8">
                            <Input 
                                type="text" 
                                name="firstName"
                                label="first name" 
                                placeholder="Enter your first name" 
                                value={values.firstName} 
                                onChange={onChange}
                                error={fieldErrors?.firstName ? new Error(fieldErrors.firstName) : undefined}>
                            </Input>
                            <Input 
                                type="text" 
                                name="lastName"
                                label="last name" 
                                placeholder="Enter your last name"
                                value={values.lastName}
                                onChange={onChange}
                                error={fieldErrors?.lastName ? new Error(fieldErrors.lastName) : undefined}>
                            </Input>
                        </div>
                        <Input 
                            type="email" 
                            name="email"
                            label="email" 
                            placeholder="Enter your email address" 
                            required={true}
                            value={values.email}
                            onChange={onChange}
                            error={(error?.message === errorMessages.email) ? error : undefined}
                        >
                        </Input>
                        <Input 
                            type="password" 
                            name="password"
                            label="password" 
                            placeholder="Enter your password" 
                            required={true}
                            value={values.password}
                            onChange={onChange}
                            error={fieldErrors?.password ? new Error(fieldErrors.password) : undefined}
                        >
                        </Input>
                        <Input 
                            type="password" 
                            name="confirmPassword"
                            label="confirm password" 
                            placeholder="Confirm your password" 
                            required={true}
                            value={values.confirmPassword}
                            onChange={onChange}
                            error={fieldErrors?.confirmPassword ? new Error(fieldErrors.confirmPassword) : undefined}
                        >
                        </Input>
                        <SubmitBtn {...submitBtnContent} isPending={isPending}></SubmitBtn>
                        {isSuccess && <p className="bg-green-100 text-green-800 border border-green-800 mt-4 w-fit mx-auto px-2 py-1 rounded-lg xsm:text-xs md:text-sm lg:text-base">User created successfully</p>}
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    );
}