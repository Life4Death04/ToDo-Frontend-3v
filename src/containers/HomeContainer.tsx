
import { useTasksManager } from "../hooks/useTaskManager";
import { useListManager } from "../hooks/useListManager";
import { useParams } from "react-router";
import { IndicatorPanels } from "../components/Indicators/Indicators";
import { TasksTable } from "../components/TasksTable/TasksTable";
import { useSettings } from "../contexts/SettingsContext";
import { getDueDatePlaceholder } from "../utils/taskHelpers";
import TaskPopupForm from "../components/TasksPopupForm/TaskPopupForm";
import ListPopupForm from "../components/ListsPopupForms/ListPopupForm";
import { useModal } from "../contexts/ModalContext";
import { useTranslation } from "react-i18next";

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
    const { settings } = useSettings();

    const {
        archivedTasksCount,
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
        handleArchive,
        handleToggleStatus,
        formErrors
    } = useTasksManager({ userId });        

    const { 
        formList, 
        handleChangeList, 
        handleSubmitList, 
        formListErrors
    } = useListManager({ userId });
    // -------------------- Data Filtered-------------------------
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'DONE').length;
    const archivedTasks = archivedTasksCount;

    // -------------------- Due Date Format --------------------
    // Use the internal DateFormat union value (e.g. "MM_DD_YYYY"), not a display string.
    const dateFormat = settings?.dateFormat ?? 'MM_DD_YYYY';
    const dueDatePlaceholder = `Due Date (${getDueDatePlaceholder(dateFormat)})`

    // -------------------- Modal Context --------------------
    const { toggleCreateList, isCreateListOpen } = useModal();

    const { t } = useTranslation("translation");
    // ---------------------- Render -----------------------------
    return(
        <main className="xsm:p-2 sm:p-4 md:p-6 relative">
            {/* summary panels */}
            <IndicatorPanels 
                totalTasks={totalTasks} 
                completedTasks={completedTasks} 
                archivedTasks={archivedTasks}
            />

            {/* tasks list + actions */}
            <TasksTable 
                tableTitle={t('sidebar.links.allMyTasks')}
                userTasks={tasks} 
                deleteUserTask={handleDelete} 
                handleAddUserTask={toggleCreate} 
                isLoading={isLoading} 
                isError={isError} 
                error={error || null} 
                handleEdit={openEditWith} 
                handleArchive={handleArchive}
                handleToggleStatus={handleToggleStatus}
            />

            {/* popup form to create a new task (conditionally rendered) */}
            
            <TaskPopupForm 
                isOpen={isCreateOpen}
                header={t('tasks.popup.addNewTask')}
                submitText={t('tasks.popup.createTask')}
                values={form} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                lists={listArray} 
                onClose={toggleCreate} 
                dueDatePlaceholder={dueDatePlaceholder}
                formErrors={formErrors.taskName}
            />

            <TaskPopupForm 
                isOpen={isEditOpen}
                header={t('tasks.popup.editTask')}
                submitText={t('tasks.popup.saveChanges')}
                values={editForm} 
                onChange={handleChangeEdit} 
                onSubmit={handleSubmitEdit} 
                lists={listArray}
                onClose={toggleEdit}
                dueDatePlaceholder={dueDatePlaceholder}
                formErrors={formErrors.taskName}
            />
            

            <ListPopupForm 
                isOpen={isCreateListOpen}
                header={t('lists.form.createList')}
                submitText={t('lists.form.createList')} 
                values={formList} 
                onChange={handleChangeList} 
                onSubmit={handleSubmitList} 
                onClose={toggleCreateList}
                formErrors={formListErrors.title}
            />
        </main>
    );
}