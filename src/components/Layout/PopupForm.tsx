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
import { useCreateTodo } from "../../api/tasksQuery";

type PopupFormProps = {
    handleClose: () => void;
    userId: number;
}

type FormData = {
    content: string;
    authorId: number;
}

export default function PopupForm({handleClose, userId}: PopupFormProps) {
    const { mutate, isSuccess } = useCreateTodo();
    const [formData, setFormData] = useState<FormData>({
        content: '',
        authorId: Number(userId),
    });

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => (
            {
                ...prev, 
                [name]: value 
            }
        ));
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate(formData);
        isSuccess && handleClose();
    }

    return (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full bg-black/50">
            <section className="rounded-2xl bg-white px-3 py-2 xsm:w-70 sm:w-110 lg:w-150">
                <div className="flex justify-between items-center xsm:text-lg font-semibold border-b border-gray-400">
                    <h2>Add New Task</h2>
                    <Button iconStyle="fa-solid fa-x" onClick={handleClose}/>
                </div>
                <form onSubmit={(e) => {
                    onSubmit(e);
                }} className="my-4 text-center">
                    {/* <Input
                        name="taskName" 
                        type="text"
                        value={formData.taskName}
                        label="Task Name"
                        placeholder="Enter task name"
                        onChange={onChange} 
                    /> */}
                    <Input
                        name="dueDate" 
                        type="text"
                        value=""
                        label="Due Date"
                        placeholder="mm/dd/yyyy"
                        onChange={onChange} 
                    />
                    <Input
                        name="content" 
                        type="text"
                        value={formData.content}
                        label="Content"
                        placeholder="Enter task content"
                        onChange={onChange} 
                    />
                    <Input
                        name="due date" 
                        type="text"
                        value=""
                        label="Due Date"
                        placeholder="mm/dd/yyyy"
                        onChange={onChange} 
                    />
                    <SubmitBtn buttonText="Add Task" isPending={false}/>
                </form>
            </section>
        </div>
    );
}