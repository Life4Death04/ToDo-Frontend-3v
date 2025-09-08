import type { ChangeEvent } from "react";
import { Link } from "react-router";
import type { ListsSummary } from "../../types";

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
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    isLoading?: boolean,
    isError?: boolean,
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

type PageMockupProps = {
    header: string;
    children: React.ReactNode;
    leftSlot?: React.ReactNode;
}

type ToggleButtonsProps = {
    isEditting: boolean;
    onEdit: () => void;
    isSubmitLoading: boolean;
}

// -------------------- Input Component --------------------
/**
 * Input
 * Controlled input component used across auth and forms.
 * @param {string} type - input type (text, email, date, etc.)
 * @param {string} value - controlled value
 * @param {string} name - input name attribute
 * @param {string} label - visible label text
 * @param {boolean} required - whether the input is required
 * @param {string} placeholder - placeholder text
 * @param {string} dimensions - optional extra dimension classes
 * @param {Error|null} error - optional field error to show
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} onChange - change handler
 * @returns JSX.Element
 */
export function Input({ type, value, name, label, required, placeholder, onChange, error, dimensions, disabled, isLoading, isError }:InputCompTypes){
    return(
        <div className="text-left flex-grow mb-5">
            {/* Label */}
            <label className="block font-bold mb-2 capitalize xsm:text-xs md:text-sm dark:text-text-dark-white">
                {label}
            </label>

            {/* Show generic error if isError is true */}
            {isError && <p className="text-red-500 text-sm mt-1">Oops, we couldn't fetch the data :c</p>}

            {/* Control */}
            {isLoading ? (
                <div className="animate-pulse h-10 bg-gray-200 rounded-lg w-full xsm:text-xs xsm:p-3 md:text-sm lg:text-md"></div>
            ) : (
            <input 
                className={`lg:px-4 lg:py-3 border-2 border-black/20 rounded-lg w-full xsm:text-xs xsm:p-3 md:text-sm lg:text-md dark:text-text-dark-white  ${error &&'border-red-500'} ${dimensions} ${disabled ? 'bg-gray-200 cursor-not-allowed dark:bg-dark-gray' : 'bg-gray-100 dark:bg-dark-gray'}`}
                type={type} 
                value={value} 
                onChange={onChange} 
                required={required} 
                name={name} 
                placeholder={placeholder}
                disabled={disabled}
            />
            )}

            {/* Error */}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}

// -------------------- Header Component --------------------
/**
 * Header
 * Simple header used on auth pages (logo + titles).
 * @param {string} textH2 - main heading
 * @param {string} label - sub-label text
 */
export function Header({textH2, label}: HeaderProps){
    return(
        <header className="mb-6">
            {/* Logo */}
            <img className="mx-auto xsm:w-20 md:w-25" src="../icon-main.png"></img>

            {/* Titles */}
            <h1 className="xsm:text-2xl md:text-4xl font-bold">TaskMaster</h1>
            <h2 className="text-gray-700 xsm:text-xl md:text-2xl font-bold mt-2 mb-1">{textH2}</h2>
            <label className="text-gray-500 xsm:text-base md:text-xl">{label}</label>
        </header>
    );
}

// -------------------- Footer Component --------------------
/**
 * Footer
 * Small footer with a prompt and navigation button (used in auth forms).
 * @param {string} label - prompt text
 * @param {string} buttonUrl - navigation URL
 * @param {string} buttonText - button label
 */
export function Footer({label, buttonUrl, buttonText}: FooterProps){
    return(
        <footer className="mt-4">
            {/* Prompt */}
            <label className="xsm:text-xs md:text-sm lg:text-base">{label}</label>

            {/* Action */}
            <Link to={`${buttonUrl}`}>
                <button className="text-orange font-bold hover:cursor-pointer xsm:text-xs md:text-sm lg:text-base">{buttonText}</button>
            </Link>
        </footer>
    );
}

// -------------------- Submit Button Component --------------------
/**
 * SubmitBtn
 * Standard submit button; toggles text when `isPending`.
 * @param {string} buttonText - text to show when not pending
 * @param {boolean} isPending - show loading text when true
 */
export function SubmitBtn({buttonText, isPending}: SubmitBtnProps){
    return(
        <button type="submit" className="bg-orange text-white rounded-lg shadow-md xsm:p-2 xsm:text-sm xsm:font-bold md:text-base lg:px-3 lg:py-2 hover:cursor-pointer hover:bg-orange-strong">{isPending ? 'Loading...' : buttonText}</button>
    );
}

// -------------------- Reusable Button Component --------------------
/**
 * Button
 * Reusable button with optional click handler and custom classes.
 * @param {() => void} onClick - click handler
 * @param {string} textButton - button text
 * @param {string} buttonStyle - extra classes
 */
export function Button({ onClick, textButton, buttonStyle, iconStyle }: ButtonProps){
    return(
        <button className={`xsm:p-2 xsm:text-sm md:text-base lg:text-base lg:px-3 lg:py-2 rounded-lg hover:cursor-pointer ${buttonStyle ? buttonStyle : 'hover:bg-orange-strong bg-orange text-white font-bold'}`} onClick={onClick}>
            {iconStyle && <i className={`${iconStyle} mr-2`}></i>}
            {textButton}
        </button>
    );
}
// -------------------- Reusable Button Icon Component --------------------
/**
 * ButtonIcon
 * Icon-only button used for small controls (close, edit, etc.).
 * @param {() => void} onClick - click handler
 * @param {string} iconStyle - icon class names
 * @param {string} textButton - optional text inside the icon
 * @param {string} buttonStyle - extra classes
 */
export function ButtonIcon({ onClick, iconStyle, textButton, buttonStyle }: ButtonProps){
    return(
        <button className={`hover:cursor-pointer xsm:px-2 sm:px-3 py-2 ${buttonStyle}`} onClick={onClick}>
            <i className={`${iconStyle} text-gray-500 xsm:text-base lg:text-lg hover:text-orange dark:text-text-dark`} aria-hidden={true}>{textButton}</i>
        </button>
    );
}
// --------------------------- Reusable Select Component ---------------------------
/**
 * Type: Priority, List, Status
 * Style: Default or custom
 * options + values: Priority, List, Status, Customs
 */
type OptionValuesType = {
    value: string | number | undefined,
    label: string,
    id?: number,
    title?: string,
}

type OptionTypes = OptionValuesType[] | ListsSummary[];

type SelectProps  = {
    type: 'priority' | 'listId' | 'status' | 'dateFormat' | 'language',
    options:  OptionTypes | undefined,
    currentValue: string | number | undefined,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    label: string,
    disabled?: boolean,
    inputName?: string,
    isLoading?: boolean,
    isError?: boolean,
}

export const priorityOptions: OptionValuesType[] = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
];

export const statusOptions: OptionValuesType[] = [
    { value: 'TODO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' },
];

export const dateFormatOptions: OptionValuesType[] = [
    { value: 'MM_DD_YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD_MM_YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY_MM_DD', label: 'YYYY/MM/DD' },
]

export const languageOptions: OptionValuesType[] = [
    { value: 'EN', label: 'English' },
    { value: 'ES', label: 'Spanish' },
]

export const options = [
    {priority: priorityOptions},
    {status: statusOptions},
    {dateFormat: dateFormatOptions},
    {language: languageOptions}
];

export function Select({onChange, options, currentValue, type, label, disabled, inputName, isLoading, isError}: SelectProps){
    return(
        <div className="text-left flex-grow mb-5">
            <label className="block font-bold mb-2 capitalize dark:text-text-dark-white">
                {label}
            </label>
            <select 
                className="lg:px-4 lg:py-3 border border-black/20 bg-gray-200 rounded-lg w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base dark:bg-dark-gray dark:text-text-dark-white"
                name={inputName ? inputName : type}
                value={currentValue}
                onChange={onChange}
                disabled={disabled}
            >
                {isLoading && <option>Loading...</option>}
                {isError && <option>Oops, we couldn't fetch the data :c</option>}
                {type === 'listId' && <option value="null">None</option>}
                {options?.map((option) => (
                    <option key={option.id || option.value} value={option.value || option.id}>
                        {(type === 'priority' || type === 'status' || type === 'dateFormat' || type === 'language') && option.label}
                        {type === 'listId' && option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

// -------------------- Page Mockup Component --------------------
export function PageMockup({header, children, leftSlot}: PageMockupProps){
    return(
        <section className="bg-white shadow-2xl rounded-lg xsm:p-4 md:p-8 dark:bg-background-dark">
            <h2 className="text-xl font-bold dark:text-text-dark-white">{header}</h2>
            {leftSlot}
            <div className="flex items-center my-6 mb-8 xsm:justify-center xsm:gap-4 lg:justify-start lg:gap-8">
                {children}
            </div>
        </section>
    );
}

// -------------------- Profile Image Component --------------------
export function ProfileImage({initials}: {initials: string}){
    return(
        <div className="flex items-center my-6 mb-8 xsm:justify-center xsm:gap-4 lg:justify-start lg:gap-8">
            <div className="flex items-center justify-center font-bold text-white bg-orange text-4xl xsm:w-24 rounded-full xsm:h-24 xsm:text-4xl sm:text-5xl sm:w-28 sm:h-28 lg:w-32 lg:h-32 lg:">
                {initials}
            </div>
        </div>
    )
}

// -------------------- Toggle Buttons --------------------
export function ToggleButtons({isEditting, onEdit, isSubmitLoading}: ToggleButtonsProps){
    return(
        <div className="mt-8 lg:flex md:justify-center lg:border-t lg:border-gray-400 lg:pt-4 lg:justify-end">
            {isEditting ? 
                <div className="flex gap-4 xsm:flex-col-reverse sm:flex-row sm:justify-center">
                    <Button textButton="Cancel" buttonStyle="bg-gray-200 font-bold text-black hover:bg-gray-300 dark:bg-light-gray dark:text-text-dark-white" onClick={onEdit}/>
                    <SubmitBtn buttonText="Save Changes" isPending={isSubmitLoading} />
                </div>
                : 
                <Button textButton="Edit" buttonStyle="xsm:w-full sm:w-auto sm:px-6 lg:px-8 bg-orange hover:bg-orange-strong text-white font-bold" onClick={onEdit}></Button>
            }
        </div>
    )
}