import { IndicatorPanels } from "../Layout/Indicators";
import { TasksTable } from "../Layout/TasksTable";
import { useParams } from "react-router";
import { useFetchUserTasks, useDeleteUserTask, useToggleTaskArchived } from "../../api/tasksQuery";
import { useState } from "react";
import PopupForm from "../Layout/PopupForm";
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
type PopupFormModes = 'EDIT' | 'CREATE';

export default function Home(){
    // ---------------------- Local UI State ----------------------
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [popupFormMode, setPopupFormMode] = useState<PopupFormModes>('CREATE');
    const [taskToUpdate, setTaskToUpdate] = useState<any>(null); // to hold the task data when editing

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
    const { data, isLoading, isError, error } = useFetchUserTasks(userId);

    // mutation for toggling a user task's archived status (scoped to this userId)
    const toggleTaskArchived = useToggleTaskArchived(userId);

    // mutation for deleting a user task (scoped to this userId)
    const deleteUserTask = useDeleteUserTask(userId);

    // -------------------- Data Filtered-------------------------
    const filteredTasks = data?.tasks.filter(task => !task.archived) ?? [];

    // ---------------------- Event Handlers ---------------------
    // handler passed down to `TasksTable` to delete a task by id
    const handleDelete = (taskId: number) => {
        deleteUserTask.mutate(taskId); // mutation expects taskId parameter
    }

    // toggle popup for creating a new task
    const handlePopupForm = () => {
        setIsPopupOpen(prev => !prev);
    }

    // archiving a task
    const handleArchive = (taskId: number) => {
        toggleTaskArchived.mutate(taskId);
    }

    const handleAdd = () =>{
        setPopupFormMode('CREATE');
        handlePopupForm();
    }

    const handleUpdate = (taskId: number) => {
        const taskToUpdate = data?.tasks?.find(task => task.id === taskId);
        setTaskToUpdate(taskToUpdate);
        setPopupFormMode('EDIT');
        handlePopupForm();
    }

    // ---------------------- Props objects ----------------------
    const indicatorPanelsProps = {
        totalTasks: data?.totalTasks ?? 0,
        completedTasks: data?.completedTasks ?? 0
    }

    const tasksTableProps = {
        userTasks: filteredTasks,
        deleteUserTask: handleDelete,
        handleAddUserTask: handleAdd,
        handleArchive: handleArchive,
        isLoading,
        isError,
        error,
    }

    const popupFormProps = {
        mode: popupFormMode,
        initialValue: taskToUpdate,
        userId: userId,
        handleClose: handlePopupForm
    }

    // ---------------------- Render -----------------------------
    return(
        <section className="relative">
            {/* summary panels */}
            <IndicatorPanels {...indicatorPanelsProps} />

            {/* tasks list + actions */}
            <TasksTable handleEdit={handleUpdate} {...tasksTableProps} />

            {/* popup form to create a new task (conditionally rendered) */}
            {isPopupOpen && <PopupForm {...popupFormProps} />}
        </section>
    );
}