import { beforeEach, describe, expect, it } from 'vitest';
import { isValidTask, loadTasksFromStorage, STORAGE_KEY } from './storage';

describe('task storage boundary', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns an empty list for missing storage', () => {
    expect(loadTasksFromStorage()).toEqual([]);
  });

  it('filters malformed tasks and removes duplicate ids', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { id: 'same', title: ' First ', priority: 'high', completed: false, createdAt: 1, updatedAt: 1 },
      { id: 'same', title: 'Second', priority: 'medium', completed: true, createdAt: 2, updatedAt: 2 },
      { id: 'bad', title: '', priority: 'low', completed: false, createdAt: 3, updatedAt: 3 },
    ]));

    expect(loadTasksFromStorage()).toEqual([
      { id: 'same', title: 'Second', priority: 'medium', completed: true, createdAt: 2, updatedAt: 2 },
    ]);
  });

  it('rejects invalid timestamps and oversized titles', () => {
    expect(isValidTask({ id: 'x', title: 'ok', priority: 'low', completed: false, createdAt: Infinity, updatedAt: 1 })).toBe(false);
    expect(isValidTask({ id: 'x', title: 'x'.repeat(251), priority: 'low', completed: false, createdAt: 1, updatedAt: 1 })).toBe(false);
  });
});