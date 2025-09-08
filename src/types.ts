// Central shared types for frontend
/**
 * PriorityTypes
 * Enumerates allowed priority levels for a task.
 */
export type PriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * StatusTypes
 * Enumerates allowed task status values.
 */
export type StatusTypes = 'TODO' | 'IN_PROGRESS' | 'DONE';

/**
 * ThemeTypes, DateFormatTypes, LanguageTypes
 */
export type ThemeTypes = 'LIGHT' | 'DARK';
export type DateFormatTypes = 'MM_DD_YYYY' | 'DD_MM_YYYY' | 'YYYY_MM_DD';
export type LanguageTypes = 'en' | 'es';

/**
 * User
 * Lightweight user model used across the UI (some fields optional).
 */
export type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string | null;
}

export type UpdateUserResponse = {
  message: string;
  userUpdated: User;
}

/**
 * List
 * Represents a task list owned by a user containing an array of tasks.
 */
export type List = {
  id: number;
  title: string;
  color: string;
  authorId: number;
  tasks: Task[];
}

/**
 * Task
 * Core task model used in the UI and API responses.
 */
export type Task = {
  id: number;
  taskName: string | null;
  description?: string | null;
  dueDate?: string | null;
  priority: PriorityTypes;
  status: StatusTypes;
  authorId: number;
  listId?: number;
  archived?: boolean;
}

/**
 * Settings
 * User settings/preferences model.
 */
export type Settings = {
  id: number;
  theme: ThemeTypes;
  dateFormat: DateFormatTypes;
  language: LanguageTypes;
  defaultPriority: PriorityTypes;
  defaultStatus: StatusTypes;
  userId: number;
}

export type UpdateSettingsResponse = {
  message: string;
  settingsUpdated: Settings;
}

/**
 * FetchTaskResponse
 * Shape returned by the API when fetching multiple tasks.
 */
export type FetchTaskResponse = {
  tasks: Task[];
}

/**
 * CreateTaskResponse
 * Response returned after creating a new task.
 */
export type CreateTaskResponse = {
  message: string;
  task: Task;
}

/**
 * ListsSummary
 * Lightweight list info used in list-overview APIs and sidebars.
 */
export type ListsSummary = Pick<List, 'id' | 'title' | 'color'>;

/**
 * FetchListsResponse
 * Response when fetching all lists for a user.
 */
export type FetchListsResponse = {
  message: string;
  lists: ListsSummary[];
}

/**
 * CreateListResponse
 * Response returned after creating a list.
 */
export type CreateListResponse = {
  message: string;
  list: List;
}

/**
 * ListDataSummary
 * Server-provided summary of a list (omits some server-only fields).
 */
export type ListDataSummary = Omit<List, 'authorId'>;

/**
 * FetchListDataResponse
 * Response shape when fetching a single list and its tasks.
 */
export type FetchListDataResponse = {
  message: string;
  list: ListDataSummary;
}

/**
 * UpdateListDataResponse
 * Response returned after updating a list.
 */
export type UpdateListDataResponse = {
  message: string;
  list: ListsSummary;
}

/**
 * DeleteListDataResponse
 * Response returned after deleting a list.
 */
export type DeleteListDataResponse = {
  message: string;
}