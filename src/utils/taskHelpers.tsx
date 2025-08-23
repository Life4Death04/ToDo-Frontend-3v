export type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';
export type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

// -------------------- Priority Color --------------------
/**
 * Get the text color for a given priority level
 * @param priority - The priority level of the task
 * @returns The corresponding text color class
 */
export function getPriorityColor(priority: PriorityTypes){
    switch(priority){
        case 'LOW':
            return 'text-green-500';
        case 'MEDIUM':
            return 'text-yellow-500';
        case 'HIGH':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
}
// -------------------- Status Color --------------------
/**
 * Get the background and text color for a given status
 * @param status - The status of the task
 * @returns The corresponding background and text color classes
 */
export function getStatusColor(status: StatusTypes){
    switch(status){
        case 'TODO':
            return 'bg-amber-100 text-amber-500';
        case 'IN_PROGRESS':
            return 'bg-blue-100 text-blue-500';
        case 'DONE':
            return 'bg-green-100 text-green-500';
        default:
            return 'text-gray-500';
    }
}
// -------------------- Due Date Formatter --------------------
/**
 * Format the due date to a more readable string
 * @param dueDate - The due date string to format
 * @returns The formatted due date string
 */
export function formatDueDate(dueDate?: string){
    return dueDate ? new Date(dueDate).toLocaleDateString() : '';
}
// -------------------- Check Icon --------------------
/**
 * Get the check icon for a given task
 * @param isChecked - Whether the task is checked
 * @returns The corresponding check icon JSX element
 */
export function getCheckIcon(isChecked: boolean){
    return isChecked ? (
        <i className="fa-solid fa-square-check text-orange xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden="true"></i>
    ) : (
        <i className="fa-regular fa-square xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden="true"></i>
    );
}
// -------------------- Status Badge --------------------
/**
 * Get the status badge for a given task
 * @param status - The status of the task
 * @returns The corresponding status badge text
 */
export function getStatusBadge(status: StatusTypes){
    switch(status){
        case 'TODO':
            return 'To Do';
        case 'IN_PROGRESS':
            return 'In Progress';
        case 'DONE':
            return 'Completed';
    }
}