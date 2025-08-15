import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRegisterNewUser } from "../../api/usersQuery";
import { Input, Header, type HeaderProps, type FooterProps, Footer } from "./AuthComponents";

const headerText: HeaderProps = {
    textH2: 'Create Account',
    label: `Let's get you started!`
}

const footerContent: FooterProps = {
    label: `You already have an account? `,
    buttonUrl: `/`,
    buttonText: `Login`
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

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleOnSubmit(e: FormEvent){
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
            <section className="text-center mx-auto w-max-auth shadow-2xl rounded-xl p-8 pt-4">\
                <Header {...headerText}></Header>
                <form className="flex flex-col content-around gap-2">
                        <div className="flex justify-between gap-8">
                            <Input type="text" name="first name" placeholder="first name"></Input>
                            <Input name="last name" type="text" placeholder="last name"></Input>
                        </div>
                        <Input type="email" name="email" placeholder="email address" required={true}></Input>
                        <Input type="password" name="password" placeholder="password" required={true}></Input>
                        <Input type="password" name="confirm password" placeholder="confirm your password" required={true}></Input>
                        <button type="submit" className="bg-orange text-white font-bold  rounded-md p-3 mt-4 mb-2 hover:cursor-pointer hover:bg-orange-strong">Register</button>
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    );
}