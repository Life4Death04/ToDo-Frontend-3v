import type { ChangeEvent } from "react";
import { Link } from "react-router";

// -------------------- Types --------------------
type InputCompTypes = {
    type: string,
    value: string,
    name: string,
    label: string,
    required?: false | true,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export type HeaderProps = {
    textH2: string,
    label: string,
}

export type FooterProps = {
    label: string,
    buttonUrl: string,
    buttonText: string
}

export type SubmitBtnProps = {
    buttonText: string,
    isPending: false | true
}

// -------------------- Input Component --------------------
export function Input({ type, value, name, label, required, placeholder, onChange }:InputCompTypes){
    return(
        <div className="text-left flex-grow">
            <label className="block font-bold mb-2 capitalize">
                {label}
            </label>
            <input 
                className="px-4 py-3 border-2 border-black/20 rounded-2xl w-full"
                type={type} 
                value={value} 
                onChange={onChange} 
                required={required} 
                name={name} 
                placeholder={`Enter your ${placeholder}`}
            />
        </div>
    );
}

// -------------------- Header Component --------------------
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

// -------------------- Footer Component --------------------
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

// -------------------- Submit Button Component --------------------
export function SubmitBtn({buttonText, isPending}: SubmitBtnProps){
    return(
        <button type="submit" className="bg-orange text-white font-bold rounded-md p-3 hover:cursor-pointer hover:bg-orange-strong">{isPending ? 'Loading...' : buttonText}</button>
    );
}