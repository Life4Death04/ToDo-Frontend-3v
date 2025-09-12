import { ButtonIcon } from "../Common/CommonComponents";
import { getPriorityColor, getStatusColor, formatDueDate, getCheckIcon, getStatusBadge, getPriorityBadge } from '../../utils/taskHelpers';
import { useSettings } from "../../contexts/SettingsContext";
import type { PriorityTypes, StatusTypes, Task } from '../../types';
import { useTranslation } from "react-i18next";

// -------------------- Types --------------------
type TasksTableProps = {
    tableTitle: string;
    isEditTable?: boolean;
    onEditTable?: () => void;
    userTasks?: Task[];
    deleteUserTask: (taskId: number) => void;
    handleAddUserTask: () => void;
    handleEdit: (taskId: number) => void;
    isLoading?: boolean;
    isError?: boolean;
    error: Error | null;
    handleArchive: (taskId: number) => void;
    handleToggleStatus: (taskId: number) => void;
}

type TaskItemProps = {
    taskName: string,
    dueDate?: string,
    priority: PriorityTypes,
    status: StatusTypes,
    onDelete: () => void,
    onEdit: () => void,
    onArchive: () => void,
    onToggleTaskStatus: () => void,
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
 *
 * @param {string} tableTitle - visible title for the table
 * @param {boolean} [isEditTable] - whether edit controls should be shown
 * @param {() => void} [onEditTable] - callback for edit-table action
 * @param {Task[]|undefined} [userTasks] - array of tasks to render
 * @param {(taskId:number) => void} deleteUserTask - function to remove a task
 * @param {() => void} handleAddUserTask - callback to show create task UI
 * @param {(taskId:number) => void} handleEdit - callback to edit a task
 * @param {boolean} [isLoading] - loading flag
 * @param {boolean} [isError] - error flag
 * @param {Error|null} error - error object
 * @returns JSX.Element
 */
export function TasksTable({ tableTitle, isEditTable, onEditTable, userTasks, deleteUserTask, isLoading, isError, handleAddUserTask, handleEdit, handleArchive, handleToggleStatus }: TasksTableProps){
    const { t } = useTranslation("translation");
    return(
        <section className="px-6 py-4 bg-white rounded-2xl dark:bg-background-dark">
            {/* Header: title + actions */}
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold xsm:text-xl md:text-2xl lg:text-3xl dark:text-text-dark-white">{tableTitle}</h1>
                    {isEditTable && 
                        <ButtonIcon onClick={onEditTable} iconStyle="fa-solid fa-pen" buttonStyle="text-gray-400"></ButtonIcon>
                    }
                </div>
                <AddTaskButton onClick={handleAddUserTask} />
            </header>
            {/* Table header (labels) */}
            <header className="items-center px-4 py-2 text-gray-400 border-gray-200 border-b font-bold xsm:hidden lg:flex dark:border-none">
                <span className="flex-2">{t('tasks.table.taskName')}</span> {/* //flex-[2] */}
                <span className="flex-1">{t('tasks.table.dueDate')}</span>
                <span className="flex-1">{t('tasks.table.priority')}</span>
                <span className="flex-1">{t('tasks.table.status')}</span>
                <span className="w-20 text-right">{t('tasks.table.actions')}</span>
            </header>

            {/* Task list */}
            <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-gray-200">
                {!userTasks?.length && (
                    <NoTaskMessage isError={isError ?? false} isLoading={isLoading ?? false} handleAddUserTask={handleAddUserTask} />
                )}
                {userTasks?.map(task => (
                    <TaskItem
                        onToggleTaskStatus={() => handleToggleStatus(task.id)}
                        key={task.id}
                        taskName={task.taskName || ""}
                        dueDate={task.dueDate || ""}
                        priority={task.priority}
                        status={task.status}
                        onDelete={() => deleteUserTask(task.id)}
                        onEdit={() => handleEdit(task.id)}
                        onArchive={() => handleArchive(task.id)} // Be aware: not implemented yet
                    />
                ))}
            </ul>
        </section>
    );
}
// -------------------- Task Item Component --------------------
/**
 * TaskItem: displays a single task item
 *
 * @param {string} taskName - name of the task
 * @param {string|undefined} dueDate - ISO date string for due date
 * @param {PriorityTypes} priority - priority level
 * @param {StatusTypes} status - current status
 * @param {() => void} onDelete - delete callback
 * @param {() => void} onEdit - edit callback
 * @returns JSX.Element
 */
function TaskItem({taskName, dueDate, priority, status, onDelete, onEdit, onArchive, onToggleTaskStatus}: TaskItemProps){
    const { settings } = useSettings();
    const dateFormat = settings?.dateFormat ?? 'MM_DD_YYYY';
    // - `getCheckIcon` renders the done/undone icon.
    // - Date formatting delegated to `formatDueDate` (consistent locale rules).
    // - Priority & status classes come from helpers to keep styles consistent.
    return(
        <li className="lg:flex lg:gap-3 bg-white lg:border-b lg:border-gray-200 xsm:p-3 py-3 px-4 xsm:shadow-xl lg:shadow-none xsm:rounded-lg lg:rounded-none dark:bg-background-body-dark dark:border-gray-500">
            {/* Left: completion toggle, title, edit (mobile delete shown below) */}
            <div className="flex gap-3 items-center flex-[2]">
                {/* Completion toggle */}
                <button onClick={onToggleTaskStatus}>
                    {getCheckIcon(status === 'DONE') /*Not Ready*/}
                </button>

                {/* Task title */}
                <span className="font-bold xsm:text-sm md:text-base lg:text-lg overflow break-words dark:text-text-dark-white">
                    {taskName}
                </span>

                {/* Edit button */}
                <ButtonIcon onClick={onEdit} iconStyle="fa-solid fa-pen" buttonStyle="text-gray-400"></ButtonIcon>

                {/* Mobile: inline delete */}
                <div className="flex ml-auto mt-auto text-center w-20 xsm:flex-col sm:flex-row lg:self-center lg:hidden">
                    <ButtonIcon onClick={onArchive} iconStyle="fa-solid fa-box-archive"></ButtonIcon>
                    <ButtonIcon onClick={onDelete} iconStyle="fa-regular fa-trash-can"></ButtonIcon>
                </div>
            </div>

            {/* Middle: due date, priority, status */}
            <div className="flex xsm:flex-col lg:flex-row lg:items-center xsm:gap-3 xsm:mt-2 lg:mt-0 flex-[3]">
                {/* Due Date */}
                <span className="xsm:text-xs md:text-sm lg:text-base lg:flex-1 text-gray-600 font-semibold dark:text-text-dark">
                    {formatDueDate(dateFormat, dueDate)}
                </span>

                {/* Priority */}
                <span className={`font-bold lg:flex-1`}>
                    <span className={`px-2 py-1 rounded-2xl xsm:text-xs md:text-sm lg:text-base ${getPriorityColor(priority)}`}>
                        {getPriorityBadge(priority)}
                    </span>
                </span>

                {/* Status badge */}
                <div className="lg:flex-1"> 
                    <span className={`xsm:text-xs md:text-sm lg:text-base xsm:w-fit px-2 py-1 rounded-xl font-bold ${getStatusColor(status)}`}>
                        {getStatusBadge(status)}
                    </span>
                </div>
            </div>

            {/* Right: desktop actions (delete) */}
            <div className="gap-1 xsm:hidden lg:flex">
                <ButtonIcon onClick={onArchive} iconStyle="fa-solid fa-box-archive"></ButtonIcon>
                <ButtonIcon onClick={onDelete} iconStyle="fa-regular fa-trash-can"></ButtonIcon>
            </div>
        </li>
    );
}
// -------------------- No Task Message Component --------------------
/**
 * NoTaskMessage component to display when there are no tasks
 * @param {function} handleAddUserTask - Function to call when adding a new user task
 * @param {boolean} isError - Flag indicating if there was an error
 * @param {boolean} isLoading - Flag indicating if data is loading
 * @returns JSX.Element
 */
function NoTaskMessage({handleAddUserTask, isError, isLoading}: NoTaskMessageProps){
    const { t } = useTranslation("translation");
    return(
        <li className="mx-auto w-full text-center py-12 border-b border-gray-300">
            {/* Empty / loading / error state */}
            <span className=" text-black/60 xsm:text-xl md:text-2xl lg:text-3xl dark:text-text-dark-white">
            {isLoading && t('common.loading')}
            {isError && t('common.genericFetchError')}
            {!isLoading && !isError && 
            <>
                <span className="xsm:text-xl md:text-2xl lg:text-3xl dark:text-text-dark-white">{t('tasks.table.noTasks')}</span>
                <p className="pt-3 pb-5 text-gray-400 xsm:text-xs md:text-sm lg:text-base">{t('tasks.table.noTasksHelp')}</p>
            </>
            }
            </span>

            {/* Supporting text */}

            {/* Call to action */}
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
    const { t } = useTranslation("translation");
    return(
        <button onClick={onClick} className="bg-orange ml-auto text-white  rounded-xl font-semibold hover:cursor-pointer hover:bg-orange-buttons xsm:text-sm xsm:p-2 sm:text-lg sm:px-3 sm:py-2 lg:text-xl dark:bg-sidebar-links dark:hover:bg-orange-buttons">
            {t('common.addTask')}
        </button>
    );
}