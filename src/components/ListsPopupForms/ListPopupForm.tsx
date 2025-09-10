import React, { useEffect } from 'react';
import { useModal } from "../../contexts/ModalContext";
import { FormMockup } from "../Common/CommonComponents";
import { Input } from "../Common/CommonComponents";
import type { List } from "../../types";

type ListSummary = Pick<List, 'title' | 'color'>;

type CreatePopupFormProps = {
    values: ListSummary;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    header: string;
    submitText: string;
}

/**
 * CreatePopupForm
 * Modal form to create a new list. Controlled by ModalContext via `useModal()`.
 *
 * @param {ListSummary} values - controlled values for the form
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - input change handler
 * @param {(e: React.FormEvent) => void} onSubmit - form submit handler
 */
export default function ListPopupForm({ values, onChange, onSubmit, header, submitText }: CreatePopupFormProps){
    const { isCreateListOpen, closeCreateList } = useModal();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []); // runs on mount

    if(!isCreateListOpen) return null;

    return(
        <FormMockup
            isOpen={isCreateListOpen}
            header={header}
            onClose={closeCreateList}
            onSubmit={onSubmit}
            submitText={submitText}
            isSubmitLoading={false}
        >
            {/* Input: List Title */}
            <Input 
                name="title"
                type="text" 
                value={values.title}
                label="List Title"
                placeholder="Enter list title"
                onChange={onChange}
            />

            {/* Input: List Color */}
            <Input 
                name="color"
                type="color" 
                value={values.color}
                label="List Color"
                dimensions="xsm:h-20 md:h-40"
                onChange={onChange}
            />
        </FormMockup>
    );
}

// /* Modal overlay */
//         <div className="absolute top-0 left-0 right-0 flex items-center h-screen justify-center">
//             {/* Modal content / panel */}
//             <section  className="rounded-lg bg-white p-4 xsm:w-70 sm:w-110 lg:w-150 xsm:m-2 sm:m-0 dark:bg-background-dark">
//                 {/* Header: title and close button */}
//                 <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400 dark:text-text-dark-white">
//                     <h2>Create New List</h2>
//                     <ButtonIcon iconStyle="fa-solid fa-x" onClick={closeCreateList}/>
//                 </div>

//                 {/* Form: create list inputs and submit */}
//                 <form className="mt-4 text-center" onSubmit={onSubmit}>
//                     {/* Input: List Title */}
                    

//                     {/* Actions: submit button */}
//                     <SubmitBtn buttonText="Create List" isPending={false} />
//                 </form>
//             </section>
//         </div>