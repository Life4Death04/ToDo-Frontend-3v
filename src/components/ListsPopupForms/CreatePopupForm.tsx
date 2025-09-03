import { useModal } from "../../contexts/ModalContext";
import { ButtonIcon } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import type { List } from "../../types";

type ListSummary = Pick<List, 'title' | 'color'>;

type CreatePopupFormProps = {
    values: ListSummary;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

/**
 * CreatePopupForm
 * Modal form to create a new list. Controlled by ModalContext via `useModal()`.
 *
 * @param {ListSummary} values - controlled values for the form
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - input change handler
 * @param {(e: React.FormEvent) => void} onSubmit - form submit handler
 */
export default function CreatePopupForm({ values, onChange, onSubmit }: CreatePopupFormProps){
    const { isCreateListOpen, closeCreateList } = useModal();

    if(!isCreateListOpen) return null;

    return(
        /* Modal overlay */
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
            {/* Modal content / panel */}
            <section className="rounded-lg bg-white p-4 xsm:w-70 sm:w-110 lg:w-150 xsm:m-2 sm:m-0">
                {/* Header: title and close button */}
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                    <h2>Create New List</h2>
                    <ButtonIcon iconStyle="fa-solid fa-x" onClick={closeCreateList}/>
                </div>

                {/* Form: create list inputs and submit */}
                <form className="mt-4 text-center" onSubmit={onSubmit}>
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

                    {/* Actions: submit button */}
                    <SubmitBtn buttonText="Create List" isPending={false} />
                </form>
            </section>
        </div>
    );
}