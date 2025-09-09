import { useParams } from "react-router";
import { useTasksManager } from "../hooks/useTaskManager";
import PopupFormCreate from "../components/TasksPopupForms/PopupFormCreate";
import { TasksTable } from "../components/TasksTable/TasksTable";
import PopupFormEdit from "../components/TasksPopupForms/PopupFormEdit";
import CreatePopupForm from "../components/ListsPopupForms/CreatePopupForm";
import { useListManager } from "../hooks/useListManager";
import EditPopupForm from "../components/ListsPopupForms/EditPopupForm";

/**
 * ListContainer
 * Container for a single list view. Reads `listId` and `userId` from route
 * params, initializes task and list hooks and renders the per-list tasks
 * table and relevant popup forms (create/edit list, create/edit task).
 *
 * Behavior:
 * - validates route params via Number conversion at the hook call sites
 * - exposes callbacks wired from `useTasksManager` and `useListManager`
 *
 * @returns JSX.Element
 */
export function ListContainer(){  
  const { id: listIdParam, userId: userIdParam } = useParams();
  const listId = Number(listIdParam);
  const userId = Number(userIdParam);

  const {
    listTitle, 
    listArray,
    tasks, 
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
  } = useTasksManager({ userId, listId });

  const { 
    formList, 
    editFormList,
    handleChangeList,
    handleChangeEditList, 
    handleSubmitList,
    handleSubmitEditedList,
    handleDeleteList,
    toggleEditList,
    openEditListWith,
    isEditListOpen,
    listData
  } = useListManager({ listId, userId });
  return (
    <main className="xsm:p-2 sm:p-4 md:p-6">
      <TasksTable
        tableTitle={listTitle || "My Tasks"}
        isEditTable={true}
        onEditTable={() => openEditListWith(listData!)}
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

      {isCreateOpen && 
      <PopupFormCreate 
        lists={listArray}
        values={form} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        onClose={toggleCreate} 
      />}

      {isEditOpen && 
      <PopupFormEdit 
        lists={listArray}
        values={editForm} 
        onChange={handleChangeEdit} 
        onSubmit={handleSubmitEdit} 
        onClose={toggleEdit} 
      />}

      <CreatePopupForm 
        values={formList} 
        onChange={handleChangeList} 
        onSubmit={handleSubmitList} 
      />

      {isEditListOpen && 
      <EditPopupForm 
        values={editFormList!} 
        onChange={handleChangeEditList} 
        onSubmit={handleSubmitEditedList} 
        onClose={toggleEditList} 
        onDelete={handleDeleteList} 
      />}
    </main>
  );
}