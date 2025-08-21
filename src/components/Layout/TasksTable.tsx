import { useFetchUserTodos, useDeleteUserTodo } from "../../api/tasksQuery";
import { useParams } from "react-router";

export function TasksTable(){
    const { userId } = useParams<{ userId: string }>();
    const {data, isError, error, isLoading} = useFetchUserTodos(userId!);
    const deleteUserTodo = useDeleteUserTodo(userId!)
    const userTodos = data?.todos;

    const handleDelete = (taskId: number) => {
        deleteUserTodo.mutate(taskId); //Passing the param, to the mutationFn.
    }

    return(
        <section className="px-2 pl-4 pt-4">
            <h1 className="font-bold mb-4 xsm:text-xl md:text-2xl lg:text-3xl">My Tasks</h1>
            <header className="items-center bg-gray-100 px-4 py-2 text-gray-400 border-gray-400 border-b font-bold xsm:hidden lg:flex">
                <span className="flex-2">Task Name</span> {/* //flex-[2] */}
                <span className="flex-1">Due Date</span>
                <span className="flex-1">Priority</span>
                <span className="flex-1">Status</span>
                <span className="w-20 text-right">Actions</span>
            </header>
            <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-gray-200">
                {isLoading && <li>Loading...</li>}
                {isError && <li>Error: {error.message}</li>}
                {!userTodos?.length && (
                    <NoTaskMessage />
                )}
                {userTodos?.map(todo => (
                    <TaskItem 
                        key={todo.id}
                        content={todo.content}
                        onDelete={() => handleDelete(todo.id)}
                    />
                ))}
                
            </ul>
        </section>
    );
}

type CurrentStatusTask = 'Not Started' | 'In Progress' | 'Completed';

type TaskItemProps = {
    content: string,
    dueDate?: string,
    priority?: string,
    status?: CurrentStatusTask,
    onDelete: () => void,
}

function getCheckIcon(isChecked: boolean){
    return isChecked ? (
        <i className="fa-solid fa-square-check text-orange xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden:true></i>
    ) : (
        <i className="fa-regular fa-square xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden:true></i>
    )
}

function TaskItem({content, dueDate, priority, status, onDelete}: TaskItemProps){
    return(
        <li className="lg:flex lg:gap-3 bg-white lg:border-b-1 lg:border-gray-400 xsm:p-3 py-3 px-4 xsm:shadow-xl lg:shadow-none xsm:rounded-lg lg:rounded-none">
            <div className="flex gap-2 items-center flex-[2]">
                <button>
                    {getCheckIcon(status === 'Completed')}
                </button>
                <span className="xsm:text-sm md:text-base lg:text-lg overflow break-words">
                    {content}
                </span>
                <Button iconStyle="fa-solid fa-pen" buttonStyle="text-gray-400"></Button>
                <div className="ml-auto mt-auto text-center w-20 lg:self-center lg:hidden">
                    <i className="fa-regular fa-trash-can xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden:true></i>
                </div>
            </div>
            <div className="flex xsm:flex-col lg:flex-row lg:items-center xsm:gap-3 xsm:mt-2 lg:mt-0 flex-[3]">
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1">
                    {dueDate}
                </span>
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1 text-red-500 font-bold">
                    {priority}
                </span>
                <div className="lg:flex-1"> 
                    <span className="xsm:text-xs md:text-sm lg:text-base xsm:w-fit bg-amber-100 px-2 py-1 rounded-xl text-amber-500 font-bold">
                        {status}
                    </span>
                </div>
            </div>
            <div className="ml-auto mt-auto text-center w-20 lg:block lg:self-center xsm:hidden">
                <Button onClick={onDelete} iconStyle="fa-regular fa-trash-can"></Button>
            </div>
        </li>
    );
}

function NoTaskMessage(){
    return(
        <li className="mx-auto w-full text-center py-12 border-b border-gray-300">
            <span className="text-2xl text-black/60">No tasks yet</span>
            <p className="pt-3 pb-5 text-gray-400">Looks like you're all caught up!</p>
            <button className="bg-orange text-white text-xl px-3 py-2 rounded-xl font-semibold hover:cursor-pointer hover:bg-orange-buttons">
                + Create Task
            </button>
        </li>
    );
}

type ButtonProps = {
    onClick?: () => void,
    iconStyle: string,
    buttonStyle?: string,
}

function Button({ onClick, iconStyle, buttonStyle }: ButtonProps){
    return(
        <button className={`hover:cursor-pointer hover:text-orange px-4 py-2 ${buttonStyle}`} onClick={onClick}>
            <i className={`${iconStyle} xsm:text-base lg:text-lg`} aria-hidden:true></i>
        </button>
    );
}