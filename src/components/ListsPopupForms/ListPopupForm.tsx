import React from 'react';
import { FormMockup } from "../Common/CommonComponents";
import { Input } from "../Common/CommonComponents";
import type { List } from "../../types";
import { useTranslation } from 'react-i18next';

type CreatePopupFormProps = {
    isOpen: boolean;
    values: Partial<List>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    header: string;
    submitText: string;
    onClose: () => void;
    onDelete?: () => void;
    formErrors?: Error | null;
}

/**
 * CreatePopupForm
 * Modal form to create a new list. Controlled by ModalContext via `useModal()`.
 *
 * @param {ListSummary} values - controlled values for the form
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - input change handler
 * @param {(e: React.FormEvent) => void} onSubmit - form submit handler
 */
export default function ListPopupForm({ isOpen, values, onChange, onSubmit, header, submitText, onClose, onDelete, formErrors }: CreatePopupFormProps){
    const { t } = useTranslation("translation");
    return(
        <FormMockup
            isOpen={isOpen}
            header={header}
            onClose={onClose}
            onSubmit={onSubmit}
            submitText={submitText}
            isSubmitLoading={false}
            leftSlot={onDelete && <button onClick={onDelete} className="bg-red-500 font-normal lg:font-bold text-white px-4 py-2 rounded hover:bg-red-600 transition">Delete List</button>}
        >
            {/* Input: List Title */}
            <Input 
                name="title"
                type="text" 
                value={values.title || ''}
                label={t('lists.form.title')}
                placeholder={t('lists.form.placeholderTitle')}
                onChange={onChange}
                error={formErrors} // Input expects Error | null
            />

            {/* Input: List Color */}
            <Input 
                name="color"
                type="color" 
                value={values.color || '#000000'}
                label={t('lists.form.color')}
                dimensions="xsm:h-20 md:h-40"
                onChange={onChange}
            />
        </FormMockup>
    );
}