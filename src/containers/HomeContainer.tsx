
import { useTasksManager } from "../hooks/useTaskManager";
import { useListManager } from "../hooks/useListManager";
import { useParams } from "react-router";
import { IndicatorPanels } from "../components/Indicators/Indicators";
import { TasksTable } from "../components/TasksTable/TasksTable";
import PopupFormCreate from "../components/TasksPopupForms/PopupFormCreate";
import PopupFormEdit from "../components/TasksPopupForms/PopupFormEdit";
import CreatePopupForm from "../components/ListsPopupForms/CreatePopupForm";

/**
 * HomeContainer
 * Top-level container for the home/dashboard view. Reads `userId` from the
 * route params, wires up `useTasksManager` and `useListManager`, computes
 * basic indicators (total/completed) and renders the task table and
 * the create/edit popups.
 *
 * Behavior:
 * - validates `userId` route param and returns an error node if invalid
 * - delegates fetching/mutations to `useTasksManager` and `useListManager`
 * - passes list and task data to `TasksTable` and popup forms
 *
 * @returns JSX.Element
 */
export default function HomeContainer(){
    //---------------------- Route Params ------------------------
    //read and validate userId from route params
    const { userId: userIdParam } = useParams();
    const userId = Number(userIdParam);

    //simple validation
    if(!userIdParam || Number.isNaN(userId)){
        return <div>Invalid User ID</div>;
    }

    //---------------------- Custom Hooks ----------------------
    const {
        tasks, 
        listArray,
        isLoading, 
        isError, 
        error, 
        form,
        isCreateOpen, 
        toggleCreate, 
        handleChange, 
        handleSubmit, 
        handleDelete,
        isEditOpen, 
        toggleEdit, 
        editForm,
        handleChangeEdit, 
        openEditWith, 
        handleSubmitEdit,
        handleArchive
        } = useTasksManager({ userId });        

    const { 
        formList, 
        handleChangeList, 
        handleSubmitList 
    } = useListManager({ userId });
    // -------------------- Data Filtered-------------------------
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'DONE').length;

    // ---------------------- Render -----------------------------
    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            {/* summary panels */}
            <IndicatorPanels 
                totalTasks={totalTasks} 
                completedTasks={completedTasks} 
            />

            {/* tasks list + actions */}
            <TasksTable 
                tableTitle={'All My Tasks'}
                userTasks={tasks} 
                deleteUserTask={handleDelete} 
                handleAddUserTask={toggleCreate} 
                isLoading={isLoading} 
                isError={isError} 
                error={error || null} 
                handleEdit={openEditWith} 
                handleArchive={handleArchive}
            />

            {/* popup form to create a new task (conditionally rendered) */}
            {isCreateOpen && 
                <PopupFormCreate 
                    values={form} 
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    lists={listArray} 
                    onClose={toggleCreate} 
            />}

            {isEditOpen && 
                <PopupFormEdit 
                    values={editForm} 
                    onChange={handleChangeEdit} 
                    onSubmit={handleSubmitEdit} 
                    lists={listArray}
                    onClose={toggleEdit} 
                />
            }

            <CreatePopupForm 
                values={formList} 
                onChange={handleChangeList} 
                onSubmit={handleSubmitList} 
            />
        </main>
    );
}