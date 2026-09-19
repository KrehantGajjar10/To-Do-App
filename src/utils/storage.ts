import type { Task, Priority } from '../types/task';

export const STORAGE_KEY = 'focuslist:tasks:v1';

export const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-initial-1',
    title: 'Review weekly product roadmap and design goals',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 3600000 * 4,
    updatedAt: Date.now() - 3600000 * 4,
  },
  {
    id: 'task-initial-2',
    title: 'Draft wireframes for FocusList dashboard in Figma',
    priority: 'medium',
    completed: false,
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'task-initial-3',
    title: 'Organize workspace and clear desktop distractions',
    priority: 'low',
    completed: true,
    createdAt: Date.now() - 3600000 * 8,
    updatedAt: Date.now() - 3600000 * 1,
  },
];

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
    isValidPriority(t.priority) &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'number' &&
    !isNaN(t.createdAt) &&
    typeof t.updatedAt === 'number' &&
    !isNaN(t.updatedAt)
  );
};

export const isLocalStorageAvailable = (): boolean => {
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
    console.warn('[FocusList] LocalStorage is unavailable. Using default in-memory state.');
    return DEFAULT_TASKS;
  }

  try {
    const rawData = window.localStorage.getItem(STORAGE_KEY);
    if (rawData === null) {
      // First visit: initialize with default sample tasks
      saveTasksToStorage(DEFAULT_TASKS);
      return DEFAULT_TASKS;
    }

    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      console.warn('[FocusList] Storage content is not an array. Resetting to empty task list.');
      return [];
    }

    // Filter and sanitize items to ensure every single task conforms to Task interface
    const validTasks = parsed.filter(isValidTask);
    return validTasks;
  } catch (error) {
    console.error('[FocusList] Failed to read or parse tasks from localStorage:', error);
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
  } catch (error) {
    console.error('[FocusList] Failed to persist tasks to localStorage:', error);
    return false;
  }
};
