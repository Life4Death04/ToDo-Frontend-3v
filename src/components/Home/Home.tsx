import { IndicatorPanels } from "../Layout/Indicators";
import { TasksTable } from "../Layout/TasksTable";
import { useParams } from "react-router";
import { useFetchUserTodos, useDeleteUserTodo } from "../../api/tasksQuery";
import { useState } from "react";
import PopupForm from "../Layout/PopupForm";

export default function Home(){
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const { userId } = useParams<{ userId: string }>();
    const {data, isLoading, isError, error} = useFetchUserTodos(userId!);
    const deleteUserTodo = useDeleteUserTodo(userId!)
    const totalTasks = data?.todos?.length || 0;

    const handleDelete = (taskId: number) => {
        deleteUserTodo.mutate(taskId); //Passing the param, to the mutationFn.
    }

    const handlePopupForm = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    /**TODO:
     * Add Logic to create tasks
     */

    return(
        <section className="relative">
            <IndicatorPanels totalTasks={totalTasks} />
            <TasksTable handleAddUserTask={handlePopupForm}  userTodos={data?.todos} deleteUserTodo={handleDelete} isLoading={isLoading} isError={isError} error={error}/>
            {isPopupOpen && <PopupForm handleClose={handlePopupForm}/>}
        </section>
    );
}