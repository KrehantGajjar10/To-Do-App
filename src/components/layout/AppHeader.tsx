import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/60 bg-white/75 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-500/20 ring-1 ring-black/5">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                FocusList
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Clarity, focus, and purposeful momentum
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden sm:inline">Offline Ready</span>
            <span className="sm:hidden">Local</span>
          </div>
        </div>
      </div>
    </header>
  );
};
