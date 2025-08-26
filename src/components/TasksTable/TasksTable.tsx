import { Button } from "../Common/CommonComponents";
import { getPriorityColor, getStatusColor, formatDueDate, getCheckIcon, getStatusBadge } from '../../utils/taskHelpers';
import type { PriorityTypes, StatusTypes, Task } from '../../types';

/**
TasksTable
Page-level UI for rendering a user's task list and simple task actions.
Responsibilities:
    Render a header and an add-task button.
    Render tasks (via TaskItem) or a "no tasks" message.
    Expose loading / error states for the caller.

Data flow:
    Receives userTasks, isLoading, isError, error and handlers from parent.
    Delegates presentation logic to helpers from utils/taskHelpers.

Important:
    Child components expect safely-typed props (e.g., userTasks defaulted to [] in the parent).
    Keep this file focused on layout; presentation helpers live in utils/taskHelpers. 
*/

// ...existing code uses centralized Task type from `src/types.ts`

type TasksTableProps = {
    userTasks?: Task[];
    deleteUserTask: (taskId: number) => void;
    handleAddUserTask: () => void,
    handleArchive: (taskId: number) => void,
    handleEdit: (taskId: number) => void,
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

type TaskItemProps = {
    taskName: string,
    dueDate?: string,
    priority: PriorityTypes,
    status: StatusTypes,
    onDelete: () => void,
    onArchive: () => void,
    onEdit: () => void,
}

type NoTaskMessageProps = {
    handleAddUserTask: () => void;
    isLoading: boolean;
    isError: boolean;
}

type AddTaskProps = {
    onClick: () => void;
}
// -------------------- Main Table Component --------------------
/**
 * TasksTable: page-level container for tasks list
 * @param userTasks - array of user's tasks
 * @param deleteUserTask - function to delete a user task
 * @param isLoading - boolean indicating loading state
 * @param isError - boolean indicating error state
 * @param error - error object
 * @param handleAddUserTask - function to handle adding a user task
 * @returns JSX.Element
 */
export function TasksTable({ userTasks, deleteUserTask, isLoading, isError, handleAddUserTask, handleArchive, handleEdit }: TasksTableProps){
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
                {!userTasks?.length && (
                    <NoTaskMessage isError={isError} isLoading={isLoading} handleAddUserTask={handleAddUserTask} />
                )}
                {userTasks?.map(task => (
                    <TaskItem 
                        key={task.id}
                        taskName={task.taskName || ""}
                        dueDate={task.dueDate || ""}
                        priority={task.priority}
                        status={task.status}
                        onDelete={() => deleteUserTask(task.id)}
                        onArchive={() => handleArchive(task.id)}
                        onEdit={() => handleEdit(task.id)}
                    />
                ))}
            </ul>
        </section>
    );
}
// -------------------- Task Item Component --------------------
/**
 * TaskItem: displays a single task item
 * @param taskName - name of the task
 * @param dueDate - due date of the task
 * @param priority - priority level of the task
 * @param status - current status of the task
 * @param onDelete - function to call when deleting the task
 * @returns JSX.Element
 */
function TaskItem({taskName, dueDate, priority, status, onDelete, onArchive, onEdit}: TaskItemProps){
    // - `getCheckIcon` renders the done/undone icon.
    // - Date formatting delegated to `formatDueDate` (consistent locale rules).
    // - Priority & status classes come from helpers to keep styles consistent.
    return(
        <li className="lg:flex lg:gap-3 bg-white lg:border-b-1 lg:border-gray-400 xsm:p-3 py-3 px-4 xsm:shadow-xl lg:shadow-none xsm:rounded-lg lg:rounded-none">
            <div className="flex gap-2 items-center flex-[2]">
                <button>
                    {getCheckIcon(status === 'DONE') /*Not Ready*/}
                </button>
                <span className="xsm:text-sm md:text-base lg:text-lg overflow break-words">
                    {taskName}
                </span>
                <Button onClick={onEdit} iconStyle="fa-solid fa-pen" buttonStyle="text-gray-400"></Button>
                <div className="flex justify-center ml-auto mt-auto text-center w-20 lg:self-center lg:hidden">
                    <Button onClick={onArchive} iconStyle="fa-solid fa-archive"></Button>
                    <Button onClick={onDelete} iconStyle="fa-regular fa-trash-can"></Button>
                </div>
            </div>
            <div className="flex xsm:flex-col lg:flex-row lg:items-center xsm:gap-3 xsm:mt-2 lg:mt-0 flex-[3]">
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1">
                    {formatDueDate(dueDate)}
                </span>
                <span className={`font-bold xsm:text-xs md:text-sm lg:text-base lg:flex-1 ${getPriorityColor(priority)}`}>
                    {priority}
                </span>
                <div className="lg:flex-1"> 
                    <span className={`xsm:text-xs md:text-sm lg:text-base xsm:w-fit px-2 py-1 rounded-xl font-bold ${getStatusColor(status)}`}>
                        {getStatusBadge(status)}
                    </span>
                </div>
            </div>
            <div className="gap-1 xsm:hidden lg:flex">
                <Button onClick={onArchive} iconStyle="fa-solid fa-archive"></Button>
                <Button onClick={onDelete} iconStyle="fa-regular fa-trash-can"></Button>
            </div>
        </li>
    );
}
// -------------------- No Task Message Component --------------------
function NoTaskMessage({handleAddUserTask, isError, isLoading}: NoTaskMessageProps){
    return(
        <li className="mx-auto w-full text-center py-12 border-b border-gray-300">
            <span className=" text-black/60 xsm:text-xl md:text-2xl lg:text-3xl">
            {isLoading && "Loading..."}
            {isError && `Error: Oops! We couldn't fetch your tasks :c`}
            {!isLoading && !isError && "No tasks yet"}
            </span>
            <p className="pt-3 pb-5 text-gray-400 xsm:text-xs md:text-sm lg:text-base">Looks like you're all caught up!</p>
            {!isError && !isLoading && <AddTaskButton onClick={handleAddUserTask} />}
        </li>
    );
}
// -------------------- Add Task Button Component --------------------
/**
 * AddTaskButton: button to add a new task
 * @param onClick - function to call when the button is clicked
 * @returns JSX.Element
 */
function AddTaskButton({onClick}: AddTaskProps){
    return(
        <button onClick={onClick} className="bg-orange ml-auto  text-white  rounded-xl font-semibold hover:cursor-pointer hover:bg-orange-buttons xsm:text-sm xsm:p-2 sm:text-lg sm:px-3 sm:py-2 lg:text-xl">
            + Add Task
        </button>
    );
}