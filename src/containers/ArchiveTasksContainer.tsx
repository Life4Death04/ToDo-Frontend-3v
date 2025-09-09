import { TasksTable } from "../components/TasksTable/TasksTable";
import PopupFormCreate from "../components/TasksPopupForm/TaskPopupForm";
import PopupFormEdit from "../components/TasksPopupForm/PopupFormEdit";
import CreatePopupForm from "../components/ListsPopupForms/ListPopupForm";
import { useParams } from "react-router";
import { useTasksManager } from "../hooks/useTaskManager";
import { useListManager } from "../hooks/useListManager";

export function ArchiveTasksContainer(){
    const {userId: userIdParam} = useParams();
    const userId = Number(userIdParam);

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
            
            {isCreateOpen && 
                <PopupFormCreate 
                    values={form}
                    lists={listArray}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={toggleCreate}
                />
            }
            
            {isEditOpen && 
                <PopupFormEdit 
                    lists={listArray}
                    values={editForm}
                    onChange={handleChangeEdit}
                    onSubmit={handleSubmitEdit}
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