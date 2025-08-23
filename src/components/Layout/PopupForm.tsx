// import { useState } from "react";
// import { Button } from "../Common/CommonComponents";
// import { Input, SubmitBtn } from "../Common/CommonComponents";
// import { useCreateuserTodo } from "../../api/tasksQuery";
// import { useParams } from "react-router";

// type PopupFormProps = {
//     handleClose: () => void;
// }

// type FormData = {
//     content: string;
//     authorId: number;
// }

// export default function PopupForm({handleClose}: PopupFormProps) {
//     const authorId = useParams().userId;
//     const { mutate } = useCreateuserTodo();
//     const [formData, setFormData] = useState<FormData>({
//         content: '',
//         authorId: Number(authorId),
//     });

//     function onChange(e: React.ChangeEvent<HTMLInputElement>) {
//         const { name, value } = e.target;
//         setFormData((prev) => (
//             {
//                 ...prev, 
//                 [name]: value 
//             }
//         ));
//     }

//     function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         mutate(formData);
//     }

//     return (
//         <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
//             <section className="rounded-2xl bg-white px-3 py-2 xsm:w-70 sm:w-110 lg:w-150">
//                 <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
//                     <h2>Add New Task</h2>
//                     <Button iconStyle="fa-solid fa-x" onClick={handleClose}/>
//                 </div>
//                 <form onSubmit={(e) => {
//                     onSubmit(e);
//                     handleClose();
//                 }} className="my-4 text-center">
//                     {/* <Input
//                         name="taskName" 
//                         type="text"
//                         value={formData.taskName}
//                         label="Task Name"
//                         placeholder="Enter task name"
//                         onChange={onChange} 
//                     /> */}
//                     <Input
//                         name="dueDate" 
//                         type="text"
//                         value=""
//                         label="Due Date"
//                         placeholder="mm/dd/yyyy"
//                         onChange={onChange} 
//                     />
//                     <Input
//                         name="content" 
//                         type="text"
//                         value={formData.content}
//                         label="Content"
//                         placeholder="Enter task content"
//                         onChange={onChange} 
//                     />
//                     <Input
//                         name="due date" 
//                         type="text"
//                         value=""
//                         label="Due Date"
//                         placeholder="mm/dd/yyyy"
//                         onChange={onChange} 
//                     />
//                     <SubmitBtn buttonText="Add Task" isPending={false}/>
//                 </form>
//             </section>
//         </div>
//     );
// }

//------------------ENHANCED VERSION BY CHAT GPT (AGENT MODE)-----------------------------------
import { useState } from "react";
import { Button } from "../Common/CommonComponents";
import { Input, SubmitBtn } from "../Common/CommonComponents";
import { useCreateTask } from "../../api/tasksQuery";

// -------------------- Types --------------------
type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';
type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

type PopupFormProps = {
    handleClose: () => void;
    userId: number;
}

type FormData = {
    taskName: string;
    description?: string;
    dueDate?: string;
    priority: PriorityTypes;
    status: StatusTypes;
    authorId: number;
}
// --------------------PopupForm  Component--------------------
/**
 * PopupForm component for adding a new task
 * @param {function} handleClose - Function to close the popup
 * @param {number} userId - ID of the user
 * @returns JSX.Element
 */
export default function PopupForm({handleClose, userId}: PopupFormProps) {
    const { mutate } = useCreateTask();
    const [formData, setFormData] = useState<FormData>({
        taskName: '',
        description: '',
        dueDate: undefined,
        priority: 'LOW',
        status: 'TODO',
        authorId: Number(userId),
    });

    /**
     * Handle changes to any input, textarea or select
     * @param {e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} - Change event
     */
    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => (
            {
                ...prev, 
                [name]: value 
            }
        ));
    }

    /**
     * Handle form submission
     * Converts dueDate to ISO string if present.
     * Calls the mutation to create the task and closes the popup on success
     * @param {e: React.FormEvent<HTMLFormElement>} - Submit event
     */
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const submitData = {
            ...formData,
             dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined
        }

        mutate(submitData, {
            onSuccess: () => {
                handleClose();
            }
        });
    }

    return (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-screen bg-black/50">
            <section className="rounded-2xl bg-white px-3 py-2 xsm:w-70 sm:w-110 lg:w-150">
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                    <h2>Add New Task</h2>
                    <Button iconStyle="fa-solid fa-x" onClick={handleClose}/>
                </div>
                <form onSubmit={(e) => {
                    onSubmit(e);
                }} className="my-4 text-center">
                    {/* Task Name Input */}
                    <Input
                        name="taskName" 
                        type="text"
                        value={formData.taskName}
                        label="Task Name"
                        placeholder="Enter task name"
                        onChange={onChange} 
                    />
                    {/* Due Date Input */}
                    <Input
                        name="dueDate" 
                        type="date"
                        value={formData.dueDate || ''}
                        label="Due Date"
                        placeholder="mm/dd/yyyy"
                        onChange={onChange} 
                    />
                    {/* Priority Select */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Priority
                        </label>
                        <select
                            className="lg:px-4 lg:py-3 border border-black/20 bg-gray-200 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                            name="priority"
                            value={formData.priority}
                            onChange={onChange}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    {/* Description Textarea */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Description
                        </label>
                        <textarea
                        className="lg:px-4 lg:py-3 border-2 max-h-30 min-h-30 border-black/20 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                        name="description" 
                        value={formData.description || ''}
                        placeholder="Enter task content"
                        onChange={onChange}
                        ></textarea>
                    </div>
                    {/* Status Select */}
                    <div className="text-left flex-grow mb-5">
                        <label className="block font-bold mb-2 capitalize">
                            Status
                        </label>
                        <select
                            className="lg:px-4 lg:py-3 border border-black/20 bg-gray-200 rounded-2xl w-full xsm:text-sm xsm:p-3 md:text-md lg:text-base"
                            name="status"
                            value={formData.status}
                            onChange={onChange}
                        >
                            <option value="TODO">To do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    {/* Submit Button */}
                    <SubmitBtn buttonText="Add Task" isPending={false}/>
                </form>
            </section>
        </div>
    );
}