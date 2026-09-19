import { useRef } from 'react';
import { useTasks } from './hooks/useTasks';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { StatisticsCards } from './components/dashboard/StatisticsCards';
import { TaskForm } from './components/tasks/TaskForm';
import type { TaskFormRef } from './components/tasks/TaskForm';
import { TaskFilters } from './components/tasks/TaskFilters';
import { TaskList } from './components/tasks/TaskList';
import { Toast } from './components/common/Toast';

export function App() {
  const {
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
  } = useTasks();

  const taskFormRef = useRef<TaskFormRef>(null);

  const handleFocusAddTask = () => {
    taskFormRef.current?.focusInput();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex min-h-screen flex-col selection:bg-blue-500/20 selection:text-blue-900">
      {/* Header */}
      <AppHeader />

      {/* Main Content Dashboard */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8 space-y-6">
        {/* Welcome & New Task Hero */}
        <DashboardHeader onAddTaskClick={handleFocusAddTask} />

        {/* Live Statistics */}
        <StatisticsCards stats={stats} />

        {/* Task Creation Form */}
        <TaskForm ref={taskFormRef} onAddTask={addTask} />

        {/* Search & Filter Toolbar */}
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          resultCount={filteredTasks.length}
          totalCount={stats.total}
        />

        {/* Task List and Contextual Empty State */}
        <section aria-label="Task List Section" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {hasActiveFilters ? 'Filtered Results' : 'All Tasks'}
            </h3>
            <span className="text-xs text-slate-500">
              {filteredTasks.length === 1
                ? '1 task'
                : `${filteredTasks.length} tasks`}
            </span>
          </div>

          <TaskList
            tasks={filteredTasks}
            totalUnderlyingTasks={tasks.length}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onToggleTask={toggleTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onResetFilters={resetFilters}
            onClearSearch={handleClearSearch}
            onAddTaskClick={handleFocusAddTask}
            onSetStatusFilter={setStatusFilter}
          />
        </section>
      </main>

      {/* Live Toast Notification for feedback and screen readers */}
      <Toast notification={notification} onDismiss={dismissNotification} />

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

export default App;
