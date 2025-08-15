import { Link } from "react-router";

type InputCompTypes = {
    type: string,
    name: string,
    required?: false | true,
    placeholder: string
};

export function Input({type, name, required, placeholder}:InputCompTypes){
    return(
        <div className="text-left flex-grow">
            <label className="block font-bold mb-2 capitalize">
                {name}
            </label>
            <input 
                className="px-4 py-3 border-2 border-black/20 rounded-2xl w-full"
                type={type} 
                /* value={formData.email} 
                onChange={handleChange}  */
                required={required} 
                name={name} 
                placeholder={`Enter your ${placeholder}`}
            />
        </div>
    );
}

export type HeaderProps = {
    textH2: string,
    label: string,
}

export function Header({textH2, label}: HeaderProps){
    return(
        <header className="mb-6">
            <img className="mx-auto" src="../icon-main.png"></img>
            <h1 className="text-4xl font-bold">TaskMaster</h1>
            <h2 className="text-6xl font-bold my-3">{textH2}</h2>
            <label className="text-black/60">{label}</label>
        </header>
    );
}

export type FooterProps = {
    label: string,
    buttonUrl: string,
    buttonText: string
}

export function Footer({label, buttonUrl, buttonText}: FooterProps){
    return(
        <footer>
            <label>{label}</label>
            <Link to={`${buttonUrl}`}>
                <button className="text-orange font-bold hover:cursor-pointer">{buttonText}</button>
            </Link>
        </footer>
    );
}