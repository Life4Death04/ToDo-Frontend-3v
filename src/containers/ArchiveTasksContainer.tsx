import { TasksTable } from "../components/TasksTable/TasksTable";
import  TaskPopupForm  from "../components/TasksPopupForm/TaskPopupForm";
import { useParams } from "react-router";
import { useTasksManager } from "../hooks/useTaskManager";
import { useListManager } from "../hooks/useListManager";
import ListPopupForm from "../components/ListsPopupForms/ListPopupForm";
import { useSettings } from "../contexts/SettingsContext";
import { getDueDatePlaceholder } from "../utils/taskHelpers";

export function ArchiveTasksContainer(){
    //---------------------- Route Params ------------------------
    //read and validate userId from route params
    const {userId: userIdParam} = useParams();
    const userId = Number(userIdParam);

    //simple validation
    if(!userIdParam || Number.isNaN(userId)){
        return <div>Invalid User ID</div>;
    }

    //---------------------- Custom Hooks ----------------------
    const { settings } = useSettings();

    const {
        archivedTasks,
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
        handleToggleStatus
    } = useTasksManager({ userId, isArchivedView: true });   
    
    const {
        formList, 
        handleChangeList,
        handleSubmitList
    } = useListManager({ userId });

    // -------------------- Due Date Format --------------------
    // Use the internal DateFormat union value (e.g. "MM_DD_YYYY"), not a display string.
    const dateFormat = settings?.dateFormat ?? 'MM_DD_YYYY';
    const dueDatePlaceholder = `Due Date (${getDueDatePlaceholder(dateFormat)})`
    return(
        <main className="xsm:p-2 sm:p-4 md:p-6">
            <TasksTable 
                tableTitle={"Archived Tasks"}
                userTasks={archivedTasks}
                deleteUserTask={handleDelete}
                handleAddUserTask={toggleCreate}
                isLoading={isLoading}
                isError={isError}
                error={error || null}
                handleEdit={openEditWith}
                handleArchive={handleArchive}
                handleToggleStatus={handleToggleStatus} // reusing handleArchive to unarchive
            />
            
            <TaskPopupForm 
                isOpen={isCreateOpen}
                header="Add New Task"
                submitText="Create Task"
                values={form}
                lists={listArray}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClose={toggleCreate}
                dueDatePlaceholder={dueDatePlaceholder}
            />
            
            <TaskPopupForm 
                isOpen={isEditOpen}
                header="Edit Task"
                submitText="Save Changes"
                lists={listArray}
                values={editForm}
                onChange={handleChangeEdit}
                onSubmit={handleSubmitEdit}
                onClose={toggleEdit}
                dueDatePlaceholder={dueDatePlaceholder}
            />
               

            <ListPopupForm
                header="Create New List"
                submitText="Create List" 
                values={formList}
                onChange={handleChangeList}
                onSubmit={handleSubmitList}
            />
        </main>
    );
}