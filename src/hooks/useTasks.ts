import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, Priority, StatusFilter, PriorityFilter, TaskStats } from '../types/task';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storage';
import {
  calculateStats,
  filterTasks,
  generateTaskId,
  validateTaskTitle,
} from '../utils/taskHelpers';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [notification, setNotification] = useState<ToastNotification | null>(null);

  // Automatically sync tasks changes to localStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Show a toast announcement that dismisses after 3 seconds
  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setNotification({ id, message, type });

    const timer = window.setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Compute stats strictly from all underlying tasks
  const stats: TaskStats = useMemo(() => calculateStats(tasks), [tasks]);

  // Compute filtered tasks
  const filteredTasks: Task[] = useMemo(() => {
    return filterTasks(tasks, {
      searchQuery,
      status: statusFilter,
      priority: priorityFilter,
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim().length > 0 || statusFilter !== 'all' || priorityFilter !== 'all';
  }, [searchQuery, statusFilter, priorityFilter]);

  // Task Actions
  const addTask = useCallback(
    (title: string, priority: Priority = 'medium'): boolean => {
      const validation = validateTaskTitle(title);
      if (!validation.isValid) {
        showNotification(validation.error || 'Invalid task title', 'error');
        return false;
      }

      const newTask: Task = {
        id: generateTaskId(),
        title: validation.trimmed,
        priority,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setTasks((prev) => [newTask, ...prev]);
      showNotification(`Task "${validation.trimmed}" added`, 'success');
      return true;
    },
    [showNotification]
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            const nextCompleted = !task.completed;
            showNotification(
              nextCompleted ? 'Task completed' : 'Task reactivated',
              'info'
            );
            return {
              ...task,
              completed: nextCompleted,
              updatedAt: Date.now(),
            };
          }
          return task;
        })
      );
    },
    [showNotification]
  );

  const updateTask = useCallback(
    (id: string, newTitle: string, newPriority: Priority): boolean => {
      const validation = validateTaskTitle(newTitle);
      if (!validation.isValid) {
        showNotification(validation.error || 'Invalid task title', 'error');
        return false;
      }

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              title: validation.trimmed,
              priority: newPriority,
              updatedAt: Date.now(),
            };
          }
          return task;
        })
      );

      showNotification('Task updated successfully', 'success');
      return true;
    },
    [showNotification]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const target = prev.find((t) => t.id === id);
        const next = prev.filter((t) => t.id !== id);
        if (target) {
          showNotification(`Task removed`, 'info');
        }
        return next;
      });
    },
    [showNotification]
  );

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  }, []);

  return {
    tasks,
    stats,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    hasActiveFilters,
    resetFilters,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    notification,
    dismissNotification,
  };
}
