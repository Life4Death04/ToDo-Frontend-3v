// Central shared types for frontend
export type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';
export type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type User = {
  id?: number;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}

export type Task = {
  id: number;
  taskName: string | null;
  description?: string | null;
  archived: boolean;
  dueDate?: string | null;
  priority: PriorityTypes;
  status: StatusTypes;
  authorId: number;
}

export type FetchTaskResponse = {
  tasks: Task[];
}

export type CreateTaskResponse = {
  message: string;
  task: Task;
}
