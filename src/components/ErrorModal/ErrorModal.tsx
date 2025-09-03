import { ButtonIcon } from "../Common/CommonComponents";

type ErrorModalProps = {
    errorType?: string,
    errorMessage?: string
}
const errorType:string = 'Error registering user';
const errorMessage:string = 'User already exists';

/**
 * ErrorModal
 * Small inline error modal used to display quick error notifications.
 *
 * @param {string} [errorType] - Short title or type of the error
 * @param {string} [errorMessage] - Human readable error message
 */
export function ErrorModal(/* { errorType, errorMessage }: ErrorModalProps */){

    return(
        <div className="flex items-center justify-center px-2 py-4 ml-auto mt-2 xsm:w-xs sm:w-fit rounded-2xl shadow-lg bg-red-200 border border-red-500">
            <i className="fa-solid fa-circle-exclamation text-red-500 text-2xl md:text-3xl bg-transparent "></i>
            <p className="bg-transparent mx-2 text-gray-500 xsm:text-sm md:text-base">{errorType}: {errorMessage}</p>
            <ButtonIcon iconStyle="fa-solid fa-x" buttonStyle="text-red-400 bg-transparen" />
        </div>
    );
}