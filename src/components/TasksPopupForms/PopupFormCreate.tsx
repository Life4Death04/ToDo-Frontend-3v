//------------------ENHANCED VERSION BY CHAT GPT (AGENT MODE)-----------------------------------
import { ButtonIcon, Select, options } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import { useSettings } from "../../contexts/SettingsContext";
import type { Task, ListsSummary } from '../../types';
import { getDueDatePlaceholder } from "../../utils/taskHelpers";

type FormData = Partial<Task>;
/* type Lists = Array<{ id: number; title: string; color: string;  }> | undefined; */
type Lists = ListsSummary[];
type PopupFormProps = {
    values: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    lists?: Lists;
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
export default function PopupForm({values, onChange, onSubmit, onClose, lists}: PopupFormProps) {
    const { settings } = useSettings();
    // Use the internal DateFormat union value (e.g. "MM_DD_YYYY"), not a display string.
    const dateFormat = settings?.dateFormat ?? 'MM_DD_YYYY';
    console.log(getDueDatePlaceholder(dateFormat))
    return (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-fit py-4 bg-black/50">
            {/* Panel */}
            <section className="rounded-lg bg-white px-3 py-2 xsm:w-70 sm:w-110 lg:w-150 xsm:m-2 sm:m-0 dark:bg-background-dark">
                {/* Header: title + close */}
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400 dark:border-gray-600">
                    <h2 className="dark:text-text-dark-white">Add New Task</h2>
                    <ButtonIcon iconStyle="fa-solid fa-x" onClick={onClose}/>
                </div>

                {/* Form: inputs */}
                <form onSubmit={(e) => {
                    onSubmit(e);
                }} className="my-2 text-center">
                    {/* Task Name Input */}
                    <Input
                        name="taskName" 
                        type="text"
                        value={values.taskName || ''}
                        label="Task Name"
                        placeholder="Enter task name"
                        onChange={onChange} 
                    />

                    {/* Due Date Input */}
                    <Input
                        name="dueDate" 
                        type="date"
                        value={values.dueDate ? new Date(values.dueDate).toISOString().split('T')[0] : ''}
                        label={`Due Date (${getDueDatePlaceholder(dateFormat)})`}
                        onChange={onChange} 
                    />

                    {/* Priority Select */}
                    <Select 
                        label="Priority"
                        type="priority"
                        options={options[0].priority}
                        currentValue={values.priority}
                        onChange={onChange}
                    />
                    
                    {/* List Select (optional) */}
                    <Select 
                        label="List"
                        type="listId"
                        options={lists}
                        onChange={onChange}
                        currentValue={values.listId}
                    />

                    {/* Description Textarea */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize dark:text-text-dark-white">Description</label>
                        <textarea
                        className="lg:px-4 lg:py-3 border-2 max-h-30 min-h-30 border-black/20 rounded-lg w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base dark:text-text-dark-white"
                        name="description" 
                        value={values.description || ""}
                        placeholder="Enter task content"
                        onChange={onChange}
                        ></textarea>
                    </div>

                    {/* Additional controls (status, assignee, etc.) */}
                    <Select 
                        label="Status"
                        type="status"
                        options={options[1].status}
                        currentValue={values.status}
                        onChange={onChange}
                    />
                    <SubmitBtn buttonText={'Add Task'} isPending={false}/>
                </form>
            </section>
        </div>
    );
}