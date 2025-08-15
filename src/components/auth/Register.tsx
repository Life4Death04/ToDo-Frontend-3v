import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRegisterNewUser } from "../../api/usersQuery";
import { Input, Header, type HeaderProps, type FooterProps, Footer, SubmitBtn } from "./AuthComponents";

const headerText: HeaderProps = {
    textH2: 'Create Account',
    label: `Let's get you started!`
}

const footerContent: FooterProps = {
    label: `You already have an account? `,
    buttonUrl: `/`,
    buttonText: `Login`
}

const submitBtnContent = {
    buttonText: `Register`,
}

type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Register(){
    const {mutate, isPending, isError, error, isSuccess} = useRegisterNewUser();
    const [errorMsg, setErrorMsg] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>):void{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleOnSubmit(e: FormEvent):void{
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            setErrorMsg(true)
            return;
        }
        setErrorMsg(false)
        const {firstName, lastName, email, password} = formData;
        mutate({firstName, lastName, email, password})
    }

    return(
        <main className="h-screen flex items-center justify-center">
            <section className="text-center mx-auto w-max-auth shadow-2xl rounded-xl p-8 pt-4">
                <Header {...headerText}></Header>
                <form className="flex flex-col content-around gap-2" onSubmit={handleOnSubmit}>
                        <div className="flex justify-between gap-8">
                            <Input 
                                type="text" 
                                name="firstName"
                                label="first name" 
                                placeholder="first name" 
                                value={formData.firstName} 
                                onChange={handleChange}>
                            </Input>
                            <Input 
                                type="text" 
                                name="lastName"
                                label="last name" 
                                placeholder="last name"
                                value={formData.lastName}
                                onChange={handleChange}>
                            </Input>
                        </div>
                        <Input 
                            type="email" 
                            name="email"
                            label="email" 
                            placeholder="email address" 
                            required={true}
                            value={formData.email}
                            onChange={handleChange}>
                        </Input>
                        <Input 
                            type="password" 
                            name="password"
                            label="password" 
                            placeholder="password" 
                            required={true}
                            value={formData.password}
                            onChange={handleChange}>
                        </Input>
                        {errorMsg && <p>Password Invalidation!</p>}
                        <Input 
                            type="password" 
                            name="confirmPassword"
                            label="confirm password" 
                            placeholder="confirm your password" 
                            required={true}
                            value={formData.confirmPassword}
                            onChange={handleChange}>
                        </Input>
                        {/* <button type="submit" className="bg-orange text-white font-bold  rounded-md p-3 mt-4 mb-2 hover:cursor-pointer hover:bg-orange-strong">Register</button> */}
                        <SubmitBtn {...submitBtnContent} isPending={isPending}></SubmitBtn>
                        {isError && <p>{error.message}</p>}
                        {isSuccess && <p>User created successfully</p>}
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    );
}