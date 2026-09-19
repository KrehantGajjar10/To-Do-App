import type { Priority } from '../../types/task';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'sm',
  className = '',
}) => {
  const config = {
    high: {
      label: 'High',
      dotColor: 'bg-rose-500',
      badgeClass: 'bg-rose-50/80 text-rose-700 border-rose-200/70',
    },
    medium: {
      label: 'Medium',
      dotColor: 'bg-amber-500',
      badgeClass: 'bg-amber-50/80 text-amber-700 border-amber-200/70',
    },
    low: {
      label: 'Low',
      dotColor: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/70',
    },
  }[priority];

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs font-medium'
      : 'px-2.5 py-1 text-xs sm:text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${config.badgeClass} ${sizeClasses} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dotColor} shrink-0`}
        aria-hidden="true"
      />
      <span>{config.label}</span>
      <span className="sr-only">Priority: {config.label}</span>
    </span>
  );
};
