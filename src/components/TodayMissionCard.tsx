'use client';

import { useProgressStore } from '@/store/progressStore';
import { roadmapData } from '@/data/roadmapData';
import { Target, Clock, ArrowRight, Crosshair } from 'lucide-react';

export function TodayMissionCard() {
  const { unlockedStages, completedStages, setSelectedStageId } = useProgressStore();

  // Find the first unlocked stage that is NOT completed
  const currentStageId = unlockedStages.find(id => !completedStages.includes(id)) || unlockedStages[unlockedStages.length - 1];

  const stage = roadmapData.find(s => s.id === currentStageId);

  if (!stage) return null;

  return (
    <div className="absolute top-20 right-6 z-40 w-80 lg:w-96 hidden md:block group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/50 to-indigo-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <div className="relative glass-panel p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-500/20 rounded-xl border border-brand-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <Target className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Bugungi Missiya</h3>
              <p className="text-xs text-brand-300 font-black tracking-widest uppercase">DAY {stage.dayNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-lg shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>IDL {stage.idealHours}h / MIN {stage.minimumHours}h</span>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-black text-white leading-tight mb-2 tracking-tight block">
            {stage.title}
          </h4>
          <p className="text-sm font-medium text-slate-400 line-clamp-2 leading-relaxed tracking-wide">
            {stage.todayFocus}
          </p>
        </div>

        {/* Deliverable Highlights */}
        <div className="bg-navy-800/80 p-3 rounded-xl border border-white/5 shadow-inner">
           <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
             <Crosshair className="w-3.5 h-3.5" /> BUGUNGI NATIJA
           </span>
           <p className="text-xs text-brand-200 font-medium leading-relaxed">{stage.deliverable}</p>
        </div>

        <button
          onClick={() => setSelectedStageId(stage.id)}
          className="w-full flex items-center justify-between bg-white hover:bg-slate-100 text-sm font-black text-navy-900 px-4 py-3 rounded-xl transition-all shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] uppercase tracking-wider"
        >
          <span>PLANNI OCHISH</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
