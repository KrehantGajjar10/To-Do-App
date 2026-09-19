import React from 'react';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onAddTaskClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddTaskClick }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-b from-white/90 to-white/60 p-6 sm:p-8 backdrop-blur-md shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            Daily Focus
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Make space for what matters.
          </h2>
          <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
            Prioritize high-impact items, eliminate clutter, and track real-time progress through an intentional workflow.
          </p>
        </div>

        <div className="shrink-0 pt-2 sm:pt-0">
          <button
            type="button"
            onClick={onAddTaskClick}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </section>
  );
};
