import { describe, expect, it } from 'vitest';
import type { Task } from '../types/task';
import {
  calculateStats,
  filterTasks,
  validateTaskTitle,
} from './taskHelpers';

const tasks: Task[] = [
  { id: 'one', title: 'Write report', priority: 'high', completed: false, createdAt: 1, updatedAt: 1 },
  { id: 'two', title: 'Review report', priority: 'medium', completed: true, createdAt: 2, updatedAt: 2 },
];

describe('task helpers', () => {
  it('validates and normalizes titles', () => {
    expect(validateTaskTitle('  Plan the day  ')).toMatchObject({ isValid: true, trimmed: 'Plan the day' });
    expect(validateTaskTitle('   ').isValid).toBe(false);
    expect(validateTaskTitle('x'.repeat(251)).isValid).toBe(false);
  });

  it('calculates stats from all tasks', () => {
    expect(calculateStats(tasks)).toEqual({ total: 2, completed: 1, pending: 1 });
  });

  it('combines search, status, and priority filters', () => {
    expect(filterTasks(tasks, { searchQuery: 'REPORT', status: 'active', priority: 'high' })).toEqual([tasks[0]]);
    expect(filterTasks(tasks, { searchQuery: '', status: 'completed', priority: 'low' })).toEqual([]);
  });
});