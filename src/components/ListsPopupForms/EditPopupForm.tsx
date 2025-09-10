import { ButtonIcon, Button, FormMockup } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import { useEffect } from "react";
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
    useEffect(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }, []); // runs on mount

    return (
        <FormMockup
            isOpen={true}
            header="Edit List"
            onClose={onClose}
            onSubmit={onSubmit}
            submitText="Save Changes"
            isSubmitLoading={false}
            leftSlot={<Button onClick={onDelete} textButton="Delete List" buttonStyle="bg-red-500 font-normal lg:font-bold text-white"></Button>}
        >
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
        </FormMockup>
    );
}