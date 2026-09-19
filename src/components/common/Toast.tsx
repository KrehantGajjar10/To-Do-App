import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastNotification } from '../../hooks/useTasks';

interface ToastProps {
  notification: ToastNotification | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onDismiss }) => {
  if (!notification) {
    return (
      <div className="sr-only" aria-live="polite" aria-atomic="true"></div>
    );
  }

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />,
    info: <Info className="h-4 w-4 text-blue-600 shrink-0" />,
  };

  const borderClass = {
    success: 'border-emerald-200/80 bg-white/95 text-slate-800',
    error: 'border-rose-200/80 bg-white/95 text-slate-800',
    info: 'border-blue-200/80 bg-white/95 text-slate-800',
  }[notification.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl border p-3 shadow-lg shadow-black/5 backdrop-blur-md transition-all sm:max-w-md"
    >
      <div className={`${borderClass} flex items-center gap-2.5 w-full`}>
        {icons[notification.type]}
        <span className="text-xs font-medium">{notification.message}</span>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="ml-2 rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
