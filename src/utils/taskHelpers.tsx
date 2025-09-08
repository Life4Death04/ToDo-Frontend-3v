import type { DateFormatTypes, PriorityTypes, StatusTypes } from '../types';

// -------------------- Priority Color --------------------
/**
 * Get the text color for a given priority level
 * @param priority - The priority level of the task
 * @returns The corresponding text color class
 */
export function getPriorityColor(priority: PriorityTypes){
    switch(priority){
        case 'LOW':
            return 'bg-green-100 text-green-500';
        case 'MEDIUM':
            return 'bg-yellow-100 text-yellow-500';
        case 'HIGH':
            return 'bg-red-100 text-red-500';
        default:
            return 'bg-gray-100 text-gray-500';
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
// -------------------- Due Date Placeholder --------------------
/**
 * Get the placeholder text for the due date input based on date format
 * @param dateFormat - The user's preferred date format
 * @returns The corresponding placeholder text
 */
export function getDueDatePlaceholder(dateFormat: DateFormatTypes): string {
    switch (dateFormat) {
        case 'MM_DD_YYYY':
            return 'MM/DD/YYYY';
        case 'DD_MM_YYYY':
            return 'DD/MM/YYYY';
        case 'YYYY_MM_DD':
            return 'YYYY/MM/DD';
        default:
            return 'MM/DD/YYYY';
    }
}

// -------------------- Due Date Formatter --------------------
/**
 * Format the due date to a more readable string
 * @param dueDate - The due date string to format
 * @returns The formatted due date string
 */

export function formatDueDate(dateFormat: DateFormatTypes, dueDate?: string){
    /* return dueDate ? new Date(dueDate).toLocaleDateString() : ''; */

    if (!dueDate) return '';
    const d = new Date(dueDate);
    if (Number.isNaN(d.getTime())) return '';

    const pad = (n: number) => String(n).padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1); // months are 0-based
    const day = pad(d.getDate());

    switch (dateFormat) {
        case 'DD_MM_YYYY':
        return `${day}/${month}/${year}`;
        case 'YYYY_MM_DD':
        return `${year}/${month}/${day}`;
        case 'MM_DD_YYYY':
        default:
        return `${month}/${day}/${year}`;
    }
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