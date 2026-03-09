'use client';

import { useProgressStore } from '@/store/progressStore';
import { islands, roadmapData } from '@/data/roadmapData';
import { Trophy, Compass, ShieldCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export function ProgressHeader() {
  const { completedStages, resetProgress } = useProgressStore();

  const totalStages = roadmapData.length;
  const completedCount = completedStages.length;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  const isDjangoCompleted = completedStages.includes('day-14'); // Or just base on counts. Let's make it simpler: Checkpoint 1 is day-11, day-14 is end of Django.
  // Actually DRF starts day-15
  const isDRFUnlocked = isDjangoCompleted || completedCount >= 14;

  return (
    <header className="glass-panel fixed top-0 w-full z-40 border-b border-white/5 py-3 px-6 text-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo & Vibe */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-lg p-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
              Django Mastery Map
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              From zero to strong junior
            </p>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div className="hidden md:flex flex-col items-center flex-1 max-w-xl mx-8">
          <div className="flex justify-between w-full text-xs font-semibold mb-1 text-slate-400">
            <span>Progress</span>
            <span className="text-brand-300">{progressPercent}% ({completedCount}/{totalStages})</span>
          </div>
          <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className={cn("w-4 h-4", isDRFUnlocked ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-slate-600")} />
            <span className={cn(isDRFUnlocked ? "text-cyan-100" : "text-slate-500", "font-medium hidden sm:inline-block")}>
              DRF {isDRFUnlocked ? 'Unlocked' : 'Locked'}
            </span>
          </div>

          <button
            onClick={resetProgress}
            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-md border border-red-500/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
