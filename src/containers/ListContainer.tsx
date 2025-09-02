/* import { TasksTable } from "../components/TasksTable/TasksTable";
import { useFetchListData } from "../hooks/useLists";
import { useCreateTask, useDeleteUserTask } from "../hooks/useTasks";
import { useParams } from "react-router";
import { useState } from "react";
import PopupFormCreate from "../components/TasksPopupForms/PopupFormCreate";
import { useQueryClient } from "@tanstack/react-query"; */

import type { PriorityTypes, Task, List } from "../types";
type FormData = Partial<Task>;

// export function ListContainer(){
//     const [isPopupCreateOpen, setIsPopupCreateOpen] = useState<boolean>(false);
//     const [isPopupEditOpen, setIsPopupEditOpen] = useState<boolean>(false);
//     const [formCreateData, setFormCreateData] = useState<FormData>({
//         taskName: '',
//         description: '',
//         dueDate: '',
//         priority: 'LOW',
//         status: 'TODO',
//         authorId: undefined,
//     })
    
//     const queryClient = useQueryClient();

//     const { userId: userIdParam } = useParams();
//     const userId = Number(userIdParam);

//     // simple validation
//     if(!userIdParam || Number.isNaN(userId)){
//         return <div>Invalid User ID</div>;
//     }

//     const { id: listIdParam } = useParams();
//     const listId = Number(listIdParam);

//     // simple validation
//     if(!listIdParam || Number.isNaN(listId)){
//         return <div>Invalid List ID</div>;
//     }

//     const createTaskMutation = useCreateTask();
//     const { data, isLoading, isError, error } = useFetchListData(listId);
//     const deleteUserTask = useDeleteUserTask(userId);

//     const filteredList = data?.list.tasks.filter((task:FormData) => listId === task.listId) ?? [];

//     const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
//         const {name, value} = e.target;
//         setFormCreateData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     }

//     const handleSubmitData = (e: React.FormEvent<HTMLFormElement>) =>{
//         e.preventDefault();
//         const submitData = {
//             taskName: formCreateData.taskName || '',
//             description: formCreateData.description || '',
//             dueDate: formCreateData.dueDate ? new Date(formCreateData.dueDate).toISOString() : undefined,
//             priority: formCreateData.priority as PriorityTypes,
//             status: formCreateData.status || 'TODO',
//             authorId: Number(userId),
//             listId: Number(listId)
//         }

//         createTaskMutation.mutate(submitData, {
//             onSuccess: () => {
//                 setIsPopupCreateOpen(false);
//             }
//         });
//     }

//     const handleDelete = (taskId: number) => {
//         deleteUserTask.mutate(taskId); // mutation expects taskId parameter
//     }

//     const handlePopupForm = () =>{
//         setIsPopupCreateOpen(prev => !prev)
//     }

//     const handleAdd = () => {
//         handlePopupForm();
//     }

//     return(
//         <main className="py-6">
//             <TasksTable
//                 tableTitle={data?.list.title || "My Tasks"}
//                 userTasks={filteredList}
//                 deleteUserTask={handleDelete}
//                 handleAddUserTask={handleAdd}
//                 isLoading={isLoading}
//                 isError={isError}
//                 error={error}
//                 handleArchive={() => {}}
//                 handleEdit={() => {}}
//             />

//             {/* popup form to create a new task (conditionally rendered) */}
//             {isPopupCreateOpen && <PopupFormCreate values={formCreateData} onChange={handleChangeCreate} onSubmit={handleSubmitData} onClose={handlePopupForm} />}
//             {/* {isPopupEditOpen && <PopupFormEdit values={formEditData} onChange={handleChangeEdit} onSubmit={handleSubmitEditedData} onClose={handlePopupFormEdit} />} */}
//         </main> 
//     );
// }

import { useParams, useNavigate } from "react-router";
import { useTasksManager } from "../hooks/useTaskManager";
import PopupFormCreate from "../components/TasksPopupForms/PopupFormCreate";
import { TasksTable } from "../components/TasksTable/TasksTable";
import PopupFormEdit from "../components/TasksPopupForms/PopupFormEdit";
import CreatePopupForm from "../components/ListsPopupForms/CreatePopupForm";
import { useListManager } from "../hooks/useListManager";
import EditPopupForm from "../components/ListsPopupForms/EditPopupForm";

export function ListContainer(){  
  const { id: listIdParam, userId: userIdParam } = useParams();
  const listId = Number(listIdParam);
  const userId = Number(userIdParam);
  const navigate = useNavigate();

  const {
    listTitle, 
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
    handleSubmitEdit
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

  /* const onDeleteClick = async () => {
    // opcional: mostrar confirmación aquí
    const nextId = await handleDeleteList();
    console.log(nextId)
    if (nextId) {
      navigate(`/accounts/${userId}/lists/${nextId}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }; */

  return (
    <main className="py-6">
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
      />
      {isCreateOpen && <PopupFormCreate values={form} onChange={handleChange} onSubmit={handleSubmit} onClose={toggleCreate} />}
      {isEditOpen && <PopupFormEdit values={editForm} onChange={handleChangeEdit} onSubmit={handleSubmitEdit} onClose={toggleEdit} />}
      <CreatePopupForm values={formList} onChange={handleChangeList} onSubmit={handleSubmitList} />
      {isEditListOpen && <EditPopupForm values={editFormList!} onChange={handleChangeEditList} onSubmit={handleSubmitEditedList} onClose={toggleEditList} onDelete={handleDeleteList} />}
    </main>
  );
}