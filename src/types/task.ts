export type Priority = 'high' | 'medium' | 'low';

export type StatusFilter = 'all' | 'active' | 'completed';

export type PriorityFilter = 'all' | Priority;

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export interface TaskFilterOptions {
  searchQuery: string;
  status: StatusFilter;
  priority: PriorityFilter;
}
