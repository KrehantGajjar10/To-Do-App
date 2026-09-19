import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('submits a trimmed title and selected priority', () => {
    const onAddTask = vi.fn(() => true);
    render(<TaskForm onAddTask={onAddTask} />);

    fireEvent.change(screen.getByLabelText('Task title'), { target: { value: '  Plan launch  ' } });
    fireEvent.click(screen.getByRole('radio', { name: 'High' }));
    fireEvent.submit(screen.getByRole('button', { name: 'Add Task' }).closest('form')!);

    expect(onAddTask).toHaveBeenCalledWith('Plan launch', 'high');
    expect(screen.getByLabelText('Task title')).toHaveValue('');
  });

  it('shows an error and does not submit whitespace-only titles', () => {
    const onAddTask = vi.fn(() => true);
    render(<TaskForm onAddTask={onAddTask} />);

    fireEvent.change(screen.getByLabelText('Task title'), { target: { value: '   ' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Add Task' }).closest('form')!);

    expect(onAddTask).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('cannot be empty');
  });
});