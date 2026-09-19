import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import type { StatusFilter, PriorityFilter } from '../../types/task';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  resultCount: number;
  totalCount: number;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  hasActiveFilters,
  onResetFilters,
  resultCount,
  totalCount,
}) => {
  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions: { value: PriorityFilter; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white/75 p-4 backdrop-blur-md shadow-2xs">
      {/* Search Bar & Reset */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <label htmlFor="task-search-input" className="sr-only">
            Search tasks by title
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="task-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-200/80 bg-slate-50/60 pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 transition-all focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all"
          >
            <RotateCcw className="h-3 w-3 text-slate-500" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Segmented Control */}
          <div
            role="group"
            aria-label="Filter tasks by completion status"
            className="inline-flex rounded-xl border border-slate-200/80 bg-slate-100/60 p-0.5"
          >
            {statusOptions.map((opt) => {
              const isSelected = statusFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onStatusChange(opt.value)}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Priority Filter Dropdown */}
          <div className="relative inline-flex items-center">
            <label htmlFor="priority-filter-select" className="sr-only">
              Filter tasks by priority
            </label>
            <div className="pointer-events-none absolute left-2.5 text-slate-500">
              <Filter className="h-3 w-3" />
            </div>
            <select
              id="priority-filter-select"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}
              className="cursor-pointer appearance-none rounded-xl border border-slate-200/80 bg-white py-1 pl-7 pr-8 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 text-slate-500 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        {/* Live Filtered Results Count */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>
            Showing <strong className="font-semibold text-slate-800">{resultCount}</strong> of{' '}
            <strong className="font-semibold text-slate-800">{totalCount}</strong> tasks
          </span>
        </div>
      </div>
    </div>
  );
};
