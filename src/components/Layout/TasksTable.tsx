import { Button } from "../Common/CommonComponents";
import { getPriorityColor, getStatusColor, formatDueDate, getCheckIcon, getStatusBadge } from '../../utils/taskHelpers';
import type { PriorityTypes, StatusTypes} from '../../utils/taskHelpers';
/* type CurrentStatusTask = 'Not Started' | 'In Progress' | 'Completed'; */

type Task = {
    id: number,
    taskName: string;
    description?: string;
    dueDate?: string;
    priority: PriorityTypes;
    status: StatusTypes;
    authorId: number;
}

type TasksTableProps = {
    userTasks?: Task[];
    deleteUserTask: (taskId: number) => void;
    handleAddUserTask: () => void,
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

type TaskItemProps = {
    taskName: string,
    dueDate?: string,
    priority?: string,
    status?: StatusTypes,
    onDelete: () => void,
}

type AddTaskProps = {
    onClick: () => void;
}
// -------------------- Main Table Component --------------------
export function TasksTable({ userTasks, deleteUserTask, isLoading, isError, error, handleAddUserTask }: TasksTableProps){
    return(
        <section className="px-4 pl-4 pt-4">
            <header className="flex justify-between items-center mb-4">
                <h1 className="font-bold xsm:text-xl md:text-2xl lg:text-3xl">My Tasks</h1>
                <AddTaskButton onClick={handleAddUserTask} />
            </header>

            <header className="items-center bg-gray-100 px-4 py-2 text-gray-400 border-gray-400 border-b font-bold xsm:hidden lg:flex">
                <span className="flex-2">Task Name</span> {/* //flex-[2] */}
                <span className="flex-1">Due Date</span>
                <span className="flex-1">Priority</span>
                <span className="flex-1">Status</span>
                <span className="w-20 text-right">Actions</span>
            </header>

            <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-gray-200">
                {isLoading && <li>Loading...</li>}
                {isError && <li>Error: {error?.message}</li>}
                {!userTasks?.length && (
                    <NoTaskMessage />
                )}
                {userTasks?.map(task => (
                    <TaskItem 
                        key={task.id}
                        taskName={task.taskName}
                        dueDate={task.dueDate || ""}
                        priority={task.priority}
                        status={task.status as StatusTypes}
                        onDelete={() => deleteUserTask(task.id)}
                    />
                ))}
            </ul>
        </section>
    );
}
// -------------------- Task Item Component --------------------
function TaskItem({taskName, dueDate, priority, status, onDelete}: TaskItemProps){
    // use helpers from utils/taskHelpers.tsx
    return(
        <li className="lg:flex lg:gap-3 bg-white lg:border-b-1 lg:border-gray-400 xsm:p-3 py-3 px-4 xsm:shadow-xl lg:shadow-none xsm:rounded-lg lg:rounded-none">
            <div className="flex gap-2 items-center flex-[2]">
                <button>
                    {getCheckIcon(status === 'DONE') /*Not Ready*/}
                </button>
                <span className="xsm:text-sm md:text-base lg:text-lg overflow break-words">
                    {taskName}
                </span>
                <Button iconStyle="fa-solid fa-pen" buttonStyle="text-gray-400"></Button>
                <div className="ml-auto mt-auto text-center w-20 lg:self-center lg:hidden">
                    <Button onClick={onDelete} iconStyle="fa-regular fa-trash-can"></Button>
                </div>
            </div>
            <div className="flex xsm:flex-col lg:flex-row lg:items-center xsm:gap-3 xsm:mt-2 lg:mt-0 flex-[3]">
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1">
                    {formatDueDate(dueDate)}
                </span>
                <span className={`font-bold xsm:text-xs md:text-sm lg:text-base lg:flex-1 ${getPriorityColor(priority as PriorityTypes)}`}>
                    {priority}
                </span>
                <div className="lg:flex-1"> 
                    <span className={`xsm:text-xs md:text-sm lg:text-base xsm:w-fit px-2 py-1 rounded-xl font-bold ${getStatusColor(status as StatusTypes)}`}>
                        {getStatusBadge(status as StatusTypes)}
                    </span>
                </div>
            </div>
            <div className="ml-auto mt-auto text-center w-20 lg:block lg:self-center xsm:hidden">
                <Button onClick={onDelete} iconStyle="fa-regular fa-trash-can"></Button>
            </div>
        </li>
    );
}
// -------------------- No Task Message Component --------------------
function NoTaskMessage(){
    return(
        <li className="mx-auto w-full text-center py-12 border-b border-gray-300">
            <span className=" text-black/60 xsm:text-xl md:text-2xl lg:text-3xl">No tasks yet</span>
            <p className="pt-3 pb-5 text-gray-400 xsm:text-xs md:text-sm lg:text-base">Looks like you're all caught up!</p>
            <button className="bg-orange text-white text-xl px-3 py-2 rounded-xl font-semibold hover:cursor-pointer hover:bg-orange-buttons xsm:text-base sm:text-lg lg:text-xl">
                + Create Task
            </button>
        </li>
    );
}
// -------------------- Add Task Button Component --------------------
function AddTaskButton({onClick}: AddTaskProps){
    return(
        <button onClick={onClick} className="bg-orange ml-auto  text-white  rounded-xl font-semibold hover:cursor-pointer hover:bg-orange-buttons xsm:text-sm xsm:p-2 sm:text-lg sm:px-3 sm:py-2 lg:text-xl">
            + Add Task
        </button>
    );
}