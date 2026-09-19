import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

const task: Task = {
  id: 'task-test-1',
  title: 'Review release notes',
  priority: 'medium',
  completed: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe('TaskItem', () => {
  it('toggles completion through the native checkbox', () => {
    const onToggle = vi.fn();
    render(<TaskItem task={task} onToggle={onToggle} onUpdate={() => true} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole('checkbox', { name: /mark.*completed/i }));

    expect(onToggle).toHaveBeenCalledWith(task.id);
  });

  it('saves an edited title and priority', () => {
    const onUpdate = vi.fn(() => true);
    render(<TaskItem task={task} onToggle={vi.fn()} onUpdate={onUpdate} onDelete={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: `Edit task: ${task.title}` }));
    const input = screen.getByRole('textbox', { name: 'Edit task title' });
    fireEvent.change(input, { target: { value: '  Updated release notes  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onUpdate).toHaveBeenCalledWith(task.id, 'Updated release notes', 'medium');
  });
});
