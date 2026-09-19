import React from 'react';
import type { Task, Priority, StatusFilter, PriorityFilter } from '../../types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  totalUnderlyingTasks: number;
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, newTitle: string, newPriority: Priority) => boolean;
  onDeleteTask: (id: string) => void;
  onResetFilters: () => void;
  onClearSearch: () => void;
  onAddTaskClick: () => void;
  onSetStatusFilter: (status: StatusFilter) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalUnderlyingTasks,
  searchQuery,
  statusFilter,
  priorityFilter,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
  onResetFilters,
  onClearSearch,
  onAddTaskClick,
  onSetStatusFilter,
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        totalUnderlyingTasks={totalUnderlyingTasks}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onResetFilters={onResetFilters}
        onClearSearch={onClearSearch}
        onAddTaskClick={onAddTaskClick}
        onSetStatusFilter={onSetStatusFilter}
      />
    );
  }

  return (
    <ul aria-label="Task items list" className="space-y-2.5 list-none p-0 m-0">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
};
