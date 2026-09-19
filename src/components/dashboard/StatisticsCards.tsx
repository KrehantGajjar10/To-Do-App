import React from 'react';
import { Layers, CheckCircle, Clock } from 'lucide-react';
import type { TaskStats } from '../../types/task';

interface StatisticsCardsProps {
  stats: TaskStats;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const cards = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: stats.total,
      description: `${completionRate}% completed`,
      icon: Layers,
      iconBg: 'bg-blue-50 text-blue-600 ring-1 ring-blue-600/10',
      countColor: 'text-slate-900',
    },
    {
      id: 'pending',
      label: 'Pending Tasks',
      value: stats.pending,
      description: stats.pending === 1 ? '1 item remaining' : `${stats.pending} items remaining`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 ring-1 ring-amber-600/10',
      countColor: 'text-amber-950',
    },
    {
      id: 'completed',
      label: 'Completed Tasks',
      value: stats.completed,
      description: stats.completed === 1 ? '1 item finished' : `${stats.completed} items finished`,
      icon: CheckCircle,
      iconBg: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10',
      countColor: 'text-emerald-950',
    },
  ];

  return (
    <section aria-label="Task Statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-4 sm:p-5 backdrop-blur-md shadow-2xs transition-all hover:border-slate-300/80 hover:bg-white/90 hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{card.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${card.countColor}`}>
                {card.value}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                {card.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
