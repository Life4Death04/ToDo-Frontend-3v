// Utility helpers for task UI presentation

export type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';
export type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

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

export function formatDueDate(dueDate?: string){
    return dueDate ? new Date(dueDate).toLocaleDateString() : '';
}

export function getCheckIcon(isChecked: boolean){
    return isChecked ? (
        <i className="fa-solid fa-square-check text-orange xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden="true"></i>
    ) : (
        <i className="fa-regular fa-square xsm:text-base lg:text-lg hover:text-orange hover:cursor-pointer" aria-hidden="true"></i>
    );
}

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