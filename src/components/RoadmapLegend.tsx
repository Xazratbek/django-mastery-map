'use client';

import { Check, Lock, Play } from 'lucide-react';

export function RoadmapLegend() {
  return (
    <div className="absolute bottom-6 left-6 z-40 hidden lg:block">
      <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-3 shadow-2xl">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-2">Key / Legend</h4>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 bg-emerald-500/20 border-emerald-400 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-slate-300">Tugallangan (Completed)</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center flex-shrink-0">
            <Play className="w-4 h-4 ml-0.5" />
          </div>
          <span className="text-sm font-medium text-slate-300">Hozirgi Bosqich (Unlocked)</span>
        </div>

        <div className="flex items-center gap-3 opacity-60">
          <div className="w-8 h-8 rounded-full border-2 bg-slate-800 border-slate-700 text-slate-500 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-slate-300">Qulflangan (Locked)</span>
        </div>
      </div>
    </div>
  );
}
