'use client';

import { StageData } from '@/types/roadmap';
import { useProgressStore } from '@/store/progressStore';
import { Check, Lock, Play } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export function StageNode({ stage, dynamicX, dynamicY }: { stage: StageData, dynamicX?: number, dynamicY?: number }) {
  const { isCompleted, isUnlocked, selectedStageId, setSelectedStageId } = useProgressStore();
  const completed = isCompleted(stage.id);
  const unlocked = isUnlocked(stage.id);
  const active = selectedStageId === stage.id;

  const statusColors = {
    completed: 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    unlocked: 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    locked: 'bg-slate-800 border-slate-700 text-slate-500',
  };

  const status = completed ? 'completed' : unlocked ? 'unlocked' : 'locked';

  // Custom difficulty border colors
  const diffColors = {
    'Oson': 'border-l-green-500',
    'O\'rtacha': 'border-l-yellow-500',
    'Qiyin': 'border-l-red-500',
  };

  const posX = dynamicX !== undefined ? dynamicX : stage.coordinates.x;
  const posY = dynamicY !== undefined ? dynamicY : stage.coordinates.y;

  return (
    <div
      className="absolute z-30"
      style={{
        left: `calc(50% + ${posX}px)`,
        top: `calc(50% + ${posY}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.button
        whileHover={{ scale: unlocked ? 1.05 : 1 }}
        whileTap={{ scale: unlocked ? 0.95 : 1 }}
        onClick={() => setSelectedStageId(stage.id)}
        className={cn(
          "flex flex-col items-center gap-2 group cursor-pointer w-full h-full",
        )}
      >
        <div
          className={cn(
            "w-12 h-12 rounded-full border-2 flex items-center justify-center relative transition-all duration-300",
            statusColors[status],
            active && "ring-4 ring-offset-2 ring-offset-navy-900 ring-brand-500",
            "hover:border-white z-20"
          )}
        >
          {/* Connection points simulation visually */}
          {completed ? (
            <Check className="w-6 h-6" />
          ) : unlocked ? (
            <Play className="w-5 h-5 ml-0.5" />
          ) : (
            <Lock className="w-5 h-5" />
          )}

          {/* Glow behind */}
          {active && (
            <div className="absolute inset-0 bg-brand-500 blur-xl rounded-full opacity-50 -z-10" />
          )}
        </div>

        <div className={cn(
          "bg-navy-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 shadow-lg min-w-[120px]",
          diffColors[stage.difficulty]
        )}>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Day {stage.dayNumber}</p>
          <p className="text-xs font-semibold text-white truncate max-w-[140px]">{stage.title}</p>
        </div>
      </motion.button>
    </div>
  );
}
