import { IndicatorPanels } from "../components/Indicators/Indicators";
import { TasksTable } from "../components/TasksTable/TasksTable";
import { useParams } from "react-router";
import { useFetchUserTasks, useDeleteUserTask, useToggleTaskArchived, useCreateTask, useUpdateTask } from "../hooks/useTasks";
import { useState } from "react";
import type { PriorityTypes, Task, List } from "../types";
import PopupFormCreate from "../components/TasksPopupForms/PopupFormCreate";
import PopupFormEdit from "../components/TasksPopupForms/PopupFormEdit";
import CreatePopupForm from "../components/ListsPopupForms/CreatePopupForm";
import { useCreateList } from "../hooks/useLists";
import { useModal } from "../contexts/ModalContext";
/**
 * Home (page)
 *
 * Responsibilities:
 * - Validate `userId` from route params.
 * - Fetch user's tasks using `useFetchUserTasks(userId)`.
 * - Provide derived metrics to `IndicatorPanels`.
 * - Pass task list + handlers to `TasksTable`.
 * - Show `PopupForm` to create a new task.
 *
 * Notes:
 * - Defaults are applied when spreading props to children so strict `number` types
 *   and arrays don't receive `undefined`.
 */
/* type PopupFormModes = 'EDIT' | 'CREATE'; */

type FormData = Partial<Task>;

export default function HomeContainer(){
    // ---------------------- Local UI State ----------------------
    const [formCreateData, setFormCreateData] = useState<FormData>({
        taskName: '',
        description: '',
        dueDate: '',
        priority: 'LOW',
        status: 'TODO',
        authorId: undefined,
    });
    const [formEditData, setFormEditData] = useState<Partial<FormData>>({})
    const [formListData, setFormListData] = useState<Pick<List,'title' | 'color'>>({
        title: '',
        color: '#000000'
    })
    const [isPopupCreateOpen, setIsPopupCreateOpen] = useState<boolean>(false);
    const [isPopupEditOpen, setIsPopupEditOpen] = useState<boolean>(false);

    // ---------------------- Route Params ------------------------
    // read and validate userId from route params
    const { userId: userIdParam } = useParams();
    const userId = Number(userIdParam);

    // simple validation
    if(!userIdParam || Number.isNaN(userId)){
        return <div>Invalid User ID</div>;
    }

    // ---------------------- Data Hooks -------------------------
    // fetch user's tasks (the hook is expected to return a shaped `data`)
    const { closeCreateList } = useModal();
    const createTaskMutation = useCreateTask();
    const updateTaskMutation = useUpdateTask();
    const createListMutation = useCreateList();
    const { data, isLoading, isError, error } = useFetchUserTasks(userId);

    // mutation for toggling a user task's archived status (scoped to this userId)
    const toggleTaskArchived = useToggleTaskArchived(userId);

    // mutation for deleting a user task (scoped to this userId)
    const deleteUserTask = useDeleteUserTask(userId);

    // -------------------- Data Filtered-------------------------
    const totalTasks = data?.totalTasks ?? 0;
    const completedTasks = data?.completedTasks ?? 0;
    // ---------------------- Event Handlers ---------------------
    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;
        setFormCreateData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeList = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormListData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;
        setFormEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmitData = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const submitData = {
            taskName: formCreateData.taskName || '',
            description: formCreateData.description || '',
            dueDate: formCreateData.dueDate ? new Date(formCreateData.dueDate).toISOString() : undefined,
            priority: formCreateData.priority as PriorityTypes,
            status: formCreateData.status || 'TODO',
            authorId: Number(userId),
            listId: undefined,
        }

        createTaskMutation.mutate(submitData, {
            onSuccess: () => {
                setIsPopupCreateOpen(false);
            }
        });
    }

    const handleSubmitEditedData = (e: React.FormEvent<HTMLFormElement>) =>{
        const submitData = {
            ...formEditData,
            dueDate: formEditData.dueDate ? new Date(formEditData.dueDate).toISOString() : undefined
        }
        console.log(submitData)
        updateTaskMutation.mutate(submitData, {
            onSuccess: () => {
                setIsPopupEditOpen(false);
            }
        });
    }

    const handleSubmitList = (e: React.FormEvent) =>{
        e.preventDefault();
        const submitData = {
            title: formListData.title || '',
            color: formListData.color || '#000000',
            authorId: userId,
        }

        createListMutation.mutate(submitData, {
            onSuccess: () => {
                closeCreateList();
            }
        });
        console.log(submitData)
    }

    // handler passed down to `TasksTable` to delete a task by id
    const handleDelete = (taskId: number) => {
        deleteUserTask.mutate(taskId); // mutation expects taskId parameter
    }

    // toggle popup for creating a new task
    const handlePopupForm = () => {
        setIsPopupCreateOpen(prev => !prev);
    }

    const handlePopupFormEdit = () => {
        setIsPopupEditOpen(prev => !prev);
    }

    // archiving a task
    const handleArchive = (taskId: number) => {
        toggleTaskArchived.mutate(taskId);
    }

    const handleAdd = () =>{
        handlePopupForm();
    }

    const handleUpdate = (taskId: number) => {
        const taskToUpdate = data?.tasks?.find(task => task.id === taskId);
        setFormEditData(taskToUpdate!);
        handlePopupFormEdit();
    }
    // ---------------------- Render -----------------------------
    return(
        <section className="relative">
            {/* summary panels */}
            <IndicatorPanels 
                totalTasks={totalTasks} 
                completedTasks={completedTasks} 
            />

            {/* tasks list + actions */}
            <TasksTable 
                tableTitle={'All My Tasks'}
                userTasks={data?.tasks} 
                deleteUserTask={handleDelete} 
                handleAddUserTask={handleAdd} 
                isLoading={isLoading} 
                isError={isError} 
                error={error} 
                handleArchive={handleArchive}
                handleEdit={handleUpdate} 
            />

            {/* popup form to create a new task (conditionally rendered) */}
            {isPopupCreateOpen && <PopupFormCreate values={formCreateData} onChange={handleChangeCreate} onSubmit={handleSubmitData} onClose={handlePopupForm} />}
            {/* {isPopupEditOpen && <PopupFormEdit userId={userId} initialValue={formEditData} handleClose={handlePopupFormEdit} />} */}
            {isPopupEditOpen && <PopupFormEdit values={formEditData} onChange={handleChangeEdit} onSubmit={handleSubmitEditedData} onClose={handlePopupFormEdit} />}
            <CreatePopupForm values={formListData} onChange={handleChangeList} onSubmit={handleSubmitList} />
        </section>
    );
}