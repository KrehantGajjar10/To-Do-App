import React, { useState, useRef, useEffect } from 'react';
import {
  Pencil,
  Trash2,
  X,
  Save,
  Clock,
} from 'lucide-react';
import type { Task, Priority } from '../../types/task';
import { PriorityBadge } from './PriorityBadge';
import { validateTaskTitle, formatRelativeTime } from '../../utils/taskHelpers';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string, newPriority: Priority) => boolean;
  onDelete: (id: string) => void;
}

export const TaskItem = React.memo(function TaskItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const [editError, setEditError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const editInputRef = useRef<HTMLInputElement>(null);
  const deleteResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (deleteResetTimerRef.current !== null) {
        window.clearTimeout(deleteResetTimerRef.current);
      }
    };
  }, []);

  // Focus input on edit mode enter
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditError(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditError(null);
    setIsEditing(false);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const validation = validateTaskTitle(editTitle);
    if (!validation.isValid) {
      setEditError(validation.error || 'Title cannot be empty');
      editInputRef.current?.focus();
      return;
    }

    const success = onUpdate(task.id, validation.trimmed, editPriority);
    if (success) {
      setIsEditing(false);
      setEditError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleDeleteClick = () => {
    if (isDeleting) {
      onDelete(task.id);
    } else {
      setIsDeleting(true);
      // Auto-reset delete confirmation after 3 seconds if not confirmed
      deleteResetTimerRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        deleteResetTimerRef.current = null;
      }, 3500);
    }
  };

  return (
    <li
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
        task.completed
          ? 'border-slate-200/50 bg-slate-50/60 shadow-none'
          : 'border-slate-200/70 bg-white/90 shadow-2xs hover:border-slate-300/90 hover:shadow-xs'
      }`}
    >
      {isEditing ? (
        /* Edit Form Mode */
        <form
          onSubmit={handleSaveEdit}
          onKeyDown={handleKeyDown}
          className="p-4 space-y-3 bg-white"
        >
          <div className="space-y-1">
            <label htmlFor={`edit-input-${task.id}`} className="sr-only">
              Edit task title
            </label>
            <input
              id={`edit-input-${task.id}`}
              ref={editInputRef}
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (editError) setEditError(null);
              }}
              maxLength={250}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 ${
                editError
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {editError && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{editError}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Priority:</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setEditPriority(p)}
                    className={`cursor-pointer rounded-md px-2 py-0.5 text-xs font-medium capitalize transition-all ${
                      editPriority === p
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 shadow-2xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Normal Display Mode */
        <div className="flex items-start gap-3.5 p-4">
          {/* Native checkbox keeps keyboard and assistive technology behavior consistent. */}
          <div className="pt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={
                task.completed
                  ? `Mark "${task.title}" as pending`
                  : `Mark "${task.title}" as completed`
              }
              className={`h-5 w-5 cursor-pointer rounded-md border transition-all duration-150 accent-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                task.completed
                  ? 'border-emerald-500 shadow-2xs shadow-emerald-500/20'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            />
          </div>

          {/* Title and Metadata */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <p
              className={`wrap-break-word text-sm font-medium leading-snug transition-colors ${
                task.completed
                  ? 'text-slate-500 line-through'
                  : 'text-slate-900'
              }`}
            >
              {task.title}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <PriorityBadge priority={task.priority} size="sm" />
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{formatRelativeTime(task.createdAt)}</span>
              </span>
              {task.completed && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-medium text-emerald-600">
                    Done
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <button
              type="button"
              onClick={handleStartEdit}
              aria-label={`Edit task: ${task.title}`}
              className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
              title="Edit task"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>

            {isDeleting ? (
              <div className="flex items-center gap-1 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  aria-label={`Confirm delete task: ${task.title}`}
                  className="cursor-pointer rounded-lg bg-rose-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-rose-600 transition-colors"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  aria-label="Cancel delete"
                  className="cursor-pointer rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  title="Cancel"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDeleteClick}
                aria-label={`Delete task: ${task.title}`}
                className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-rose-600 transition-colors"
                title="Delete task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
});
