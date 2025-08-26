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

type ButtonProps = {
    onClick?: () => void,
    iconStyle?: string,
    textButton?: string,
    buttonStyle?: string,
}

// -------------------- Input Component --------------------
export function Input({ type, value, name, label, required, placeholder, onChange }:InputCompTypes){
    return(
        <div className="text-left flex-grow mb-5">
            <label className="block font-bold mb-2 capitalize">
                {label}
            </label>
            <input 
                className="lg:px-4 lg:py-3 border-2 border-black/20 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                type={type} 
                value={value} 
                onChange={onChange} 
                required={required} 
                name={name} 
                placeholder={placeholder}
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
        <footer className="mt-4">
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
        <button type="submit" className="bg-orange text-white rounded-md xsm:p-2 xsm:text-sm xsm:text-semibold lg:p-3 lg:font-bold lg:text-lg  hover:cursor-pointer hover:bg-orange-strong">{isPending ? 'Loading...' : buttonText}</button>
    );
}

// -------------------- Reusable Button Component --------------------
export function Button({ onClick, textButton, buttonStyle }: ButtonProps){
    return(
        <button className={`bg-orange text-white font-bold xsm:p-2 sm:text-xl lg:text-2xl sm:p-3 lg:p-4 rounded-xl hover:cursor-pointer hover:bg-orange-strong ${buttonStyle}`} onClick={onClick}>
            {textButton}
        </button>
    );
}

// -------------------- Reusable Button Icon Component --------------------
export function ButtonIcon({ onClick, iconStyle, textButton, buttonStyle }: ButtonProps){
    return(
        <button className={`hover:cursor-pointer hover:text-orange xsm:px-2 sm:px-3 py-2 ${buttonStyle}`} onClick={onClick}>
            <i className={`${iconStyle} xsm:text-base lg:text-lg`} aria-hidden={true}>{textButton}</i>
        </button>
    );
}
