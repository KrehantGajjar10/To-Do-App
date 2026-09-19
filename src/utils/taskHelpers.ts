import type { Task, TaskStats, TaskFilterOptions } from '../types/task';

export const calculateStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length;
  let completed = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completed++;
    }
  }

  const pending = total - completed;

  return {
    total,
    completed,
    pending,
  };
};

export const filterTasks = (tasks: Task[], options: TaskFilterOptions): Task[] => {
  const normalizedQuery = options.searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    // 1. Search Query Filter
    if (normalizedQuery.length > 0) {
      if (!task.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
    }

    // 2. Status Filter
    if (options.status === 'active' && task.completed) {
      return false;
    }
    if (options.status === 'completed' && !task.completed) {
      return false;
    }

    // 3. Priority Filter
    if (options.priority !== 'all' && task.priority !== options.priority) {
      return false;
    }

    return true;
  });
};

export const generateTaskId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `task_${crypto.randomUUID()}`;
  }
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const validateTaskTitle = (
  rawTitle: string
): { isValid: boolean; error?: string; trimmed: string } => {
  const trimmed = rawTitle.trim();

  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Task title cannot be empty or only spaces.',
      trimmed: '',
    };
  }

  if (trimmed.length > 250) {
    return {
      isValid: false,
      error: 'Task title cannot exceed 250 characters.',
      trimmed,
    };
  }

  return {
    isValid: true,
    trimmed,
  };
};

export const formatRelativeTime = (timestamp: number): string => {
  try {
    const now = Date.now();
    const diff = now - timestamp;
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return '';
  }
};
