import { Link } from "react-router";
import { Footer, Header, Input, type FooterProps, type HeaderProps } from "./AuthComponents";

const headerText: HeaderProps = {
    textH2: `Welcome Back!`,
    label: `Let's get you signed in.`
}

const footerContent: FooterProps = {
    label: `Don't have an account? `,
    buttonUrl: `/accounts/register`,
    buttonText: `Register`
}

export default function Login(){
    return(
        <main className="h-screen flex items-center justify-center">
            <section className="mx-auto text-center w-max-auth shadow-2xl rounded-xl p-8">
                <Header {...headerText}></Header>
                <form className="flex flex-col content-around gap-6 mt-6 mb-4">
                        <Input type="email" name="email" required={true} placeholder="email address"></Input>
                        <Input type="password" name="password" required={true} placeholder="password"></Input>
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
                        <button type="submit" className="bg-orange text-white font-bold  rounded-md p-3 hover:cursor-pointer hover:bg-orange-strong">Login</button>
                </form>
                <Footer {...footerContent}></Footer>
            </section>
        </main>
    )
}
