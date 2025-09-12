//------------------ENHANCED VERSION BY CHAT GPT (AGENT MODE)-----------------------------------
import { Select, SelectArea, options, FormMockup } from "../Common/CommonComponents";
import { Input } from "../Common/CommonComponents";
import type { Task, ListsSummary } from '../../types';
import React from 'react';
import { useTranslation } from "react-i18next";

type FormData = Partial<Task>;
/* type Lists = Array<{ id: number; title: string; color: string;  }> | undefined; */
type Lists = ListsSummary[];
type PopupFormProps = {
    values: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    lists?: Lists;
    dueDatePlaceholder: string;
    header: string;
    submitText: string;
    isOpen: boolean;
    formErrors?: Error | null;
};

// --------------------PopupForm  Component--------------------
/**
 * PopupForm component for adding a new task
 *
 * @param {FormData} values - controlled form values
 * @param {(e: React.ChangeEvent<any>) => void} onChange - change handler
 * @param {(e: React.FormEvent) => void} onSubmit - submit handler
 * @param {() => void} onClose - close handler
 * @param {Lists|undefined} lists - optional lists to populate the list selector
 * @returns JSX.Element
 */
export default function TaskPopupForm({values, onChange, onSubmit, onClose, lists, dueDatePlaceholder, header, submitText, isOpen, formErrors}: PopupFormProps) {
    const { t } = useTranslation("translation");
    return (
        <FormMockup
            isOpen={isOpen}
            header={header}
            onClose={onClose}
            onSubmit={onSubmit}
            submitText={submitText}
            isSubmitLoading={false}
        >
            {/* Task Name Input */}
                    <Input
                        name="taskName" 
                        type="text"
                        value={values.taskName || ''}
                        label={t('tasks.popup.labels.taskName')}
                        placeholder={t('tasks.popup.labels.enterTaskName')}
                        onChange={onChange} 
                        error={formErrors} // Input expects Error | null
                    />

                    {/* Due Date Input */}
                    <Input
                        name="dueDate" 
                        type="date"
                        value={values.dueDate ? new Date(values.dueDate).toISOString().split('T')[0] : ''}
                        label={dueDatePlaceholder}
                        onChange={onChange} 
                    />

                    {/* Priority Select */}
                    <Select 
                        label={t('tasks.popup.labels.priority')}
                        type="priority"
                        options={options[0].priority}
                        currentValue={values.priority}
                        onChange={onChange}
                    />
                    
                    {/* List Select (optional) */}
                    <Select 
                        label={t('tasks.popup.labels.list')}
                        type="listId"
                        options={lists}
                        onChange={onChange}
                        currentValue={values.listId}
                    />

                    {/* Description Textarea */}
                    <div className="text-left flex-grow mb-5">
                        <SelectArea
                            label={t('tasks.popup.labels.description')}
                            value={values.description || ""}
                            onChange={onChange}
                        />
                    </div>

                    {/* Additional controls (status, assignee, etc.) */}
                    <Select 
                        label={t('tasks.popup.labels.status')}
                        type="status"
                        options={options[1].status}
                        currentValue={values.status} 
                        onChange={onChange}
                    />
        </FormMockup>
    );
}