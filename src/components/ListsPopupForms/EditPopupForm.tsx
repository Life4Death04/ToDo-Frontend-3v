import { ButtonIcon, Button } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import type { List } from "../../types";
type ListSummary = Partial<Pick<List, 'title' | 'color'>>;


type CreatePopupFormProps = {
    values: ListSummary | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    onDelete: () => void;
}

/**
 * EditPopupForm
 * Modal for editing an existing list. Receives an `onDelete` callback
 * for removing the list (caller handles navigation or side-effects).
 *
 * @param {ListSummary} values - controlled values for the form
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - input change handler
 * @param {(e: React.FormEvent) => void} onSubmit - form submit handler
 * @param {() => void} onClose - callback to close the modal
 * @param {() => void} onDelete - callback to delete the list
 */
export default function EditPopupForm({ values, onChange, onSubmit, onClose, onDelete }: CreatePopupFormProps){
    return (
        <>
            {/* Modal overlay */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
                {/* Modal content panel */}
                <section className="rounded-lg bg-white p-4 xsm:w-70 sm:w-110 lg:w-150 xsm:m-2 sm:m-0">
                    {/* Header: title + close */}
                    <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                        <h2>Create New List</h2>
                        <ButtonIcon iconStyle="fa-solid fa-x" onClick={onClose}/>
                    </div>

                    {/* Form: inputs and actions */}
                    <form className="mt-4 text-center" onSubmit={onSubmit}>
                        {/* Title input */}
                        <Input 
                            name="title"
                            type="text" 
                            value={values?.title ?? ''}
                            label="List Title"
                            placeholder="Enter list title"
                            onChange={onChange}
                        />

                        {/* Color input */}
                        <Input 
                            name="color"
                            type="color" 
                            value={values?.color ?? '#000000'}
                            label="List Color"
                            dimensions="xsm:h-20 md:h-40"
                            onChange={onChange}
                        />

                        {/* Actions: save + delete */}
                        <div className="flex gap-2 justify-between">
                            <SubmitBtn buttonText="Create List" isPending={false} />
                            <Button onClick={onDelete} textButton="Delete List" buttonStyle="bg-red-500 font-normal lg:font-bold"></Button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}