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

export type List = {
  id: number;
  title: string;
  color: string;
  authorId: number;
  tasks: Task[];
}

export type Task = {
  id: number;
  taskName: string | null;
  description?: string | null;
  dueDate?: string | null;
  priority: PriorityTypes;
  status: StatusTypes;
  authorId: number;
  listId?: number;
}

export type FetchTaskResponse = {
  tasks: Task[];
}

export type CreateTaskResponse = {
  message: string;
  task: Task;
}

export type ListsSummary = Pick<List, 'id' | 'title' | 'color'>;

export type FetchListsResponse = {
  message: string;
  lists: ListsSummary[];
}

export type CreateListResponse = {
  message: string;
  list: List;
}

export type ListDataSummary = Omit<List, 'authorId'>;

export type FetchListDataResponse = {
  message: string;
  list: ListDataSummary;
}

export type UpdateListDataResponse = {
  message: string;
  list: ListsSummary;
}