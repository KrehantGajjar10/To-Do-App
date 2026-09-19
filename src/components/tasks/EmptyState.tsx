import React from 'react';
import {
  Inbox,
  SearchX,
  CheckCircle2,
  Clock,
  FilterX,
  PlusCircle,
  RotateCcw,
} from 'lucide-react';
import type { StatusFilter, PriorityFilter } from '../../types/task';

interface EmptyStateProps {
  totalUnderlyingTasks: number;
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  onResetFilters: () => void;
  onClearSearch: () => void;
  onAddTaskClick: () => void;
  onSetStatusFilter: (status: StatusFilter) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  totalUnderlyingTasks,
  searchQuery,
  statusFilter,
  priorityFilter,
  onResetFilters,
  onClearSearch,
  onAddTaskClick,
  onSetStatusFilter,
}) => {
  // Scenario 1: Completely empty task list
  if (totalUnderlyingTasks === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-12 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-600/10 mb-3">
          <Inbox className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No tasks created yet</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          Your FocusList is completely clear. Capture your first thought, goal, or to-do to get started.
        </p>
        <button
          type="button"
          onClick={onAddTaskClick}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-xs shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create your first task</span>
        </button>
      </div>
    );
  }

  // Scenario 2: Search has no results
  if (searchQuery.trim().length > 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-10 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-3">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No matching search results</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          We couldn&apos;t find any tasks matching &ldquo;<span className="font-medium text-slate-700">{searchQuery}</span>&rdquo;.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <span>Clear search term</span>
          </button>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset all filters</span>
          </button>
        </div>
      </div>
    );
  }

  // Scenario 3: No active tasks (status filter = 'active')
  if (statusFilter === 'active') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200/80 bg-emerald-50/20 px-6 py-10 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20 mb-3">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">All caught up!</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          You have completed every active task on your plate. Enjoy the space or add new priorities.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onAddTaskClick}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-2xs hover:bg-blue-700"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add new task</span>
          </button>
          <button
            type="button"
            onClick={() => onSetStatusFilter('completed')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <span>View completed</span>
          </button>
        </div>
      </div>
    );
  }

  // Scenario 4: No completed tasks (status filter = 'completed')
  if (statusFilter === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-10 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-600/20 mb-3">
          <Clock className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No completed tasks yet</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          When you mark tasks as done, they will be archived here for easy reference.
        </p>
        <button
          type="button"
          onClick={() => onSetStatusFilter('all')}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          <span>Show all tasks</span>
        </button>
      </div>
    );
  }

  // Scenario 5: Priority filter has no matches
  if (priorityFilter !== 'all') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-10 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-3">
          <FilterX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          No {priorityFilter} priority tasks
        </h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          None of your current tasks match the &ldquo;{priorityFilter}&rdquo; priority tier.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset priority filter</span>
        </button>
      </div>
    );
  }

  // Fallback generic filter empty
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-6 py-10 text-center backdrop-blur-xs">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-3">
        <FilterX className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">No matching tasks</h3>
      <p className="mt-1 max-w-sm text-xs text-slate-500">
        Adjust your current filter criteria to see your tasks.
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset filters</span>
      </button>
    </div>
  );
};
