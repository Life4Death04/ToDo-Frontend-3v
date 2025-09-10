import { useParams } from "react-router";
import { useTasksManager } from "../hooks/useTaskManager";
import { TasksTable } from "../components/TasksTable/TasksTable";
import { useListManager } from "../hooks/useListManager";
import TaskPopupForm from "../components/TasksPopupForm/TaskPopupForm";
import { getDueDatePlaceholder } from "../utils/taskHelpers";
import { useSettings } from "../contexts/SettingsContext";
import ListPopupForm from "../components/ListsPopupForms/ListPopupForm";
import { useModal } from "../contexts/ModalContext";

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

  const { settings } = useSettings();

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
    openEditListWith,
    listData,
    formErrors
  } = useListManager({ listId, userId });

  // -------------------- Due Date Format --------------------
  // Use the internal DateFormat union value (e.g. "MM_DD_YYYY"), not a display string.
  const dateFormat = settings?.dateFormat ?? 'MM_DD_YYYY';
  const dueDatePlaceholder = `Due Date (${getDueDatePlaceholder(dateFormat)})`
  // -------------------- Modal Context --------------------
  const { toggleCreateList, toggleEditList, isEditListOpen, isCreateListOpen } = useModal();
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

      <TaskPopupForm 
        isOpen={isCreateOpen}
        header="Add New Task"
        submitText="Create Task"
        lists={listArray}
        values={form} 
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
        isOpen={isCreateListOpen}
        header="Create New List"
        submitText="Create List" 
        values={formList} 
        onChange={handleChangeList} 
        onSubmit={handleSubmitList} 
        onClose={toggleCreateList}
        formErrors={formErrors.title}
      />

      <ListPopupForm 
        isOpen={isEditListOpen}
        header="Edit List"
        submitText="Save Changes"
        values={editFormList!} 
        onChange={handleChangeEditList} 
        onSubmit={handleSubmitEditedList} 
        onClose={toggleEditList} 
        onDelete={handleDeleteList} 
        formErrors={formErrors.title}
      />
    </main>
  );
}