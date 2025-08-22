import { IndicatorPanels } from "../Layout/Indicators";
import { TasksTable } from "../Layout/TasksTable";
import { useParams } from "react-router";
import { useFetchUserTasks, useDeleteUserTask } from "../../api/tasksQuery";
import { useState } from "react";
import PopupForm from "../Layout/PopupForm";

export default function Home(){
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const userId = Number(useParams().userId);
    const {data, isLoading, isError, error} = useFetchUserTasks(userId!);
    const deleteUserTask = useDeleteUserTask(userId!)
    const totalTasks = data?.tasks?.length || 0;

    const completedTasks = data?.tasks?.filter(task => task.status === 'DONE').length || 0;

    const handleDelete = (taskId: number) => {
        deleteUserTask.mutate(taskId); //Passing the param, to the mutationFn.
    }

    const handlePopupForm = () => {
        setIsPopupOpen(!isPopupOpen);
    }
    
    return(
        <section className="relative">
            <IndicatorPanels totalTasks={totalTasks} completedTasks={completedTasks}/>
            <TasksTable handleAddUserTask={handlePopupForm} userTasks={data?.tasks} deleteUserTask={handleDelete} isLoading={isLoading} isError={isError} error={error}/>
            {isPopupOpen && <PopupForm userId={Number(userId)} handleClose={handlePopupForm}/>}
        </section>
    );
}