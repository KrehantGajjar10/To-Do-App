import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import type { Priority } from '../../types/task';
import { validateTaskTitle } from '../../utils/taskHelpers';

interface TaskFormProps {
  onAddTask: (title: string, priority: Priority) => boolean;
}

export interface TaskFormRef {
  focusInput: () => void;
}

export const TaskForm = forwardRef<TaskFormRef, TaskFormProps>(({ onAddTask }, ref) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateTaskTitle(title);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please enter a valid task title.');
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    const success = onAddTask(validation.trimmed, priority);

    if (success) {
      setTitle('');
      setPriority('medium');
      setErrorMessage(null);
    }
    setIsSubmitting(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const priorities: { value: Priority; label: string; activeClass: string }[] = [
    {
      value: 'high',
      label: 'High',
      activeClass: 'bg-rose-500 text-white border-rose-600 shadow-2xs shadow-rose-500/20',
    },
    {
      value: 'medium',
      label: 'Medium',
      activeClass: 'bg-amber-500 text-white border-amber-600 shadow-2xs shadow-amber-500/20',
    },
    {
      value: 'low',
      label: 'Low',
      activeClass: 'bg-emerald-500 text-white border-emerald-600 shadow-2xs shadow-emerald-500/20',
    },
  ];

  return (
    <section aria-label="Create Task" className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 backdrop-blur-md shadow-xs transition-all">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800 tracking-tight flex items-center gap-2">
          <span>Add New Task</span>
        </h3>
        <span className="text-[11px] font-medium text-slate-500">
          Default priority: <strong className="text-slate-600 font-semibold">Medium</strong>
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="task-title-input" className="sr-only">
            Task title
          </label>
          <div className="relative">
            <input
              id="task-title-input"
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="What needs to be accomplished?"
              maxLength={250}
              aria-invalid={errorMessage !== null}
              aria-describedby={errorMessage ? 'task-title-error' : undefined}
              className={`w-full rounded-xl border bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                errorMessage
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200/90 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
          </div>

          {errorMessage && (
            <div
              id="task-title-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-xs text-rose-600"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
          <div className="flex items-center gap-2">
            <span id="priority-selector-label" className="text-xs font-medium text-slate-500">
              Priority:
            </span>
            <div
              role="radiogroup"
              aria-labelledby="priority-selector-label"
              className="inline-flex rounded-xl border border-slate-200/80 bg-slate-100/70 p-0.5"
            >
              {priorities.map((item) => {
                const isSelected = priority === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setPriority(item.value)}
                    className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? item.activeClass
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || title.trim().length === 0}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </section>
  );
});

TaskForm.displayName = 'TaskForm';
