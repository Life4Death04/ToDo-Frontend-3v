import type { ChangeEvent } from "react";
import { Link } from "react-router";

// -------------------- Types --------------------
type InputCompTypes = {
    type: string,
    value: string,
    name: string,
    label: string,
    required?: false | true,
    placeholder?: string,
    dimensions?: string,
    error?: Error | null ,
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
export function Input({ type, value, name, label, required, placeholder, onChange, error, dimensions }:InputCompTypes){
    return(
        <div className="text-left flex-grow mb-5">
            <label className="block font-bold mb-2 capitalize xsm:text-xs md:text-sm">
                {label}
            </label>
            <input 
                className={`lg:px-4 lg:py-3 border-2 border-black/20 rounded-lg w-full xsm:text-xs xsm:p-3 md:text-sm lg:text-md ${error ? 'border-red-500' : ''} ${dimensions}`}
                type={type} 
                value={value} 
                onChange={onChange} 
                required={required} 
                name={name} 
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}

// -------------------- Header Component --------------------
export function Header({textH2, label}: HeaderProps){
    return(
        <header className="mb-6">
            <img className="mx-auto xsm:w-20 md:w-25" src="../icon-main.png"></img>
            <h1 className="xsm:text-2xl md:text-4xl font-bold">TaskMaster</h1>
            <h2 className="text-gray-700 xsm:text-xl md:text-2xl font-bold mt-2 mb-1">{textH2}</h2>
            <label className="text-gray-500 xsm:text-base md:text-xl">{label}</label>
        </header>
    );
}

// -------------------- Footer Component --------------------
export function Footer({label, buttonUrl, buttonText}: FooterProps){
    return(
        <footer className="mt-4">
            <label className="xsm:text-xs md:text-sm lg:text-base">{label}</label>
            <Link to={`${buttonUrl}`}>
                <button className="text-orange font-bold hover:cursor-pointer xsm:text-xs md:text-sm lg:text-base">{buttonText}</button>
            </Link>
        </footer>
    );
}

// -------------------- Submit Button Component --------------------
export function SubmitBtn({buttonText, isPending}: SubmitBtnProps){
    return(
        <button type="submit" className="bg-orange text-white rounded-md xsm:p-2 xsm:text-sm md:text-base xsm:text-semibold lg:p-3 lg:font-bold lg:text-lg hover:cursor-pointer hover:bg-orange-strong">{isPending ? 'Loading...' : buttonText}</button>
    );
}

// -------------------- Reusable Button Component --------------------
export function Button({ onClick, textButton, buttonStyle }: ButtonProps){
    return(
        <button className={`bg-orange text-white font-bold xsm:p-2 sm:text-xl lg:text-xl sm:p-3 lg:p-4 rounded-xl hover:cursor-pointer hover:bg-orange-strong ${buttonStyle}`} onClick={onClick}>
            {textButton}
        </button>
    );
}

// -------------------- Reusable Button Icon Component --------------------
export function ButtonIcon({ onClick, iconStyle, textButton, buttonStyle }: ButtonProps){
    return(
        <button className={`hover:cursor-pointer xsm:px-2 sm:px-3 py-2 ${buttonStyle}`} onClick={onClick}>
            <i className={`${iconStyle} text-gray-500 xsm:text-base lg:text-lg hover:text-orange`} aria-hidden={true}>{textButton}</i>
        </button>
    );
}
