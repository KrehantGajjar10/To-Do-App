import React from 'react';
import { ShieldCheck, HardDrive } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/60 bg-white/50 backdrop-blur-xs py-6 text-center text-xs text-slate-500">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <HardDrive className="h-3.5 w-3.5 text-blue-600" />
            <span>Local Storage Active</span>
          </div>
          <span className="text-slate-300">•</span>
          <span>Zero cloud telemetry</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Private &amp; Secure</span>
          </span>
          <span className="text-slate-300">•</span>
          <span>FocusList &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
