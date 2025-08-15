import { Link } from "react-router";
import { Footer, Header, Input, SubmitBtn, type FooterProps, type HeaderProps, type SubmitBtnProps } from "./AuthComponents";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLoginUser } from "../../api/usersQuery";

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


type FormData = {
    email: string,
    password: string,
}
export default function Login(){
    const {isPending, isSuccess, mutate, isError, error} = useLoginUser()
    const [formData, setFormData] = useState<FormData>({
        email: '', password: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>):void{
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e: FormEvent):void{
        e.preventDefault();
        console.log(`Email: ${formData.email} - Password: ${formData.password}`)
        mutate(formData)
    }

    return(
        <main className="h-screen flex items-center justify-center">
            <section className="mx-auto text-center w-max-auth shadow-2xl rounded-xl p-8">
                <Header {...headerText}></Header>
                <form onSubmit={handleSubmit} className="flex flex-col content-around gap-6 mt-6 mb-4">
                        <Input 
                            type="email" 
                            name="email" 
                            label="email"
                            value={formData.email}
                            required={true} 
                            placeholder="email address"
                            onChange={handleChange}>
                        </Input>
                        <Input 
                            type="password" 
                            name="password" 
                            label="password"
                            value={formData.password}
                            required={true} 
                            placeholder="password"
                            onChange={handleChange}>
                        </Input>
                        <div className="flex justify-between">
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
                        {isError && <p>{error.message}</p>}
                        {isSuccess && <p>User logged in!</p>}
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    )
}
