//------------------ENHANCED VERSION BY CHAT GPT (AGENT MODE)-----------------------------------
import { ButtonIcon } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import type { Task } from '../../types';

type PopupFormProps = {
    values?: Partial<Task>;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

// --------------------PopupForm  Component--------------------
/**
 * PopupForm component for adding a new task
 * @param {function} handleClose - Function to close the popup
 * @param {number} userId - ID of the user
 * @returns JSX.Element
 */
export default function PopupFormEdit({values, onChange, onSubmit, onClose}: PopupFormProps) {
    return (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
            <section className="rounded-2xl bg-white px-3 py-2 xsm:w-70 sm:w-110 lg:w-150">
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                    <h2>Add New Task</h2>
                    <ButtonIcon iconStyle="fa-solid fa-x" onClick={onClose}/>
                </div>
                <form onSubmit={(e) => {
                    onSubmit(e);
                }} className="my-4 text-center">
                    {/* Task Name Input */}
                    <Input
                        name="taskName" 
                        type="text"
                        value={(values?.taskName || '')}
                        label="Task Name"
                        placeholder="Enter task name"
                        onChange={onChange} 
                    />
                    {/* Due Date Input */}
                    <Input
                        name="dueDate" 
                        type="date"
                        value={(values?.dueDate ? new Date(values.dueDate).toISOString().split('T')[0] : '')}
                        label="Due Date"
                        placeholder="mm/dd/yyyy"
                        onChange={onChange} 
                    />
                    {/* Priority Select - Make a component */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Priority
                        </label>
                        <select
                            className="lg:px-4 lg:py-3 border border-black/20 bg-gray-200 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                            name="priority"
                            value={values?.priority}
                            onChange={onChange}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    {/* Description Textarea - Make a component */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Description
                        </label>
                        <textarea
                        className="lg:px-4 lg:py-3 border-2 max-h-30 min-h-30 border-black/20 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                        name="description" 
                        value={values?.description || ""}
                        placeholder="Enter task content"
                        onChange={onChange}
                        ></textarea>
                    </div>
                    {/* Status Select - Make a component*/}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Status
                        </label>
                        <select
                            className="lg:px-4 lg:py-3 border border-black/20 bg-gray-200 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                            name="status"
                            value={values?.status}
                            onChange={onChange}
                        >
                            <option value="TODO">To do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    {/* Submit Button */}
                    <SubmitBtn buttonText={'Update Task'} isPending={false}/>
                </form>
            </section>
        </div>
    );
}