import type { Task, Priority } from '../types/task';
import { MAX_TASK_TITLE_LENGTH } from './taskHelpers';

export const STORAGE_KEY = 'focuslist:tasks:v1';

const isValidPriority = (val: unknown): val is Priority => {
  return val === 'high' || val === 'medium' || val === 'low';
};

export const isValidTask = (item: unknown): item is Task => {
  if (!item || typeof item !== 'object') return false;
  const t = item as Record<string, unknown>;

  return (
    typeof t.id === 'string' &&
    t.id.trim().length > 0 &&
    typeof t.title === 'string' &&
    t.title.trim().length > 0 &&
    t.title.trim().length <= MAX_TASK_TITLE_LENGTH &&
    isValidPriority(t.priority) &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'number' &&
    Number.isFinite(t.createdAt) &&
    t.createdAt >= 0 &&
    typeof t.updatedAt === 'number' &&
    Number.isFinite(t.updatedAt) &&
    t.updatedAt >= 0
  );
};

export const isLocalStorageAvailable = (): boolean => {
  if (typeof window === 'undefined' || !('localStorage' in window)) {
    return false;
  }

  try {
    const testKey = '__focuslist_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const loadTasksFromStorage = (): Task[] => {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (rawData === null) {
      return [];
    }

    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      console.warn('[FocusList] Storage content is not an array. Resetting to empty task list.');
      return [];
    }

    // Filter and sanitize items to ensure every single task conforms to Task interface
    const validTasks = parsed.filter(isValidTask).map((task) => ({
      ...task,
      title: task.title.trim(),
    }));
    return [...new Map(validTasks.map((task) => [task.id, task])).values()];
  } catch {
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): boolean => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
};
