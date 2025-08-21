import { IndicatorPanels } from "../Layout/Indicators";
import { TasksTable } from "../Layout/TasksTable";
import { useParams } from "react-router";
import { useFetchUserTodos, useDeleteUserTodo } from "../../api/tasksQuery";

export default function Home(){
    const { userId } = useParams<{ userId: string }>();
    const {data, isLoading, isError, error} = useFetchUserTodos(userId!);
    const deleteUserTodo = useDeleteUserTodo(userId!)
    const totalTasks = data?.todos?.length || 0;

    const handleDelete = (taskId: number) => {
        deleteUserTodo.mutate(taskId); //Passing the param, to the mutationFn.
    }
    
    return(
        <section>
            <IndicatorPanels totalTasks={totalTasks} />
            <TasksTable userTodos={data?.todos} deleteUserTodo={handleDelete} isLoading={isLoading} isError={isError} error={error}/>
        </section>
    );
}