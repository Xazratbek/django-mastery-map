'use client';

import { useProgressStore } from '@/store/progressStore';
import { roadmapData } from '@/data/roadmapData';
import { X, CheckCircle2, Lock, GraduationCap, Unlock, AlertTriangle, ShieldAlert, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export function DetailDrawer() {
  const { selectedStageId, setSelectedStageId, isCompleted, isUnlocked, markCompleted, markUnlocked } = useProgressStore();
  const [focusPlan, setFocusPlan] = useState<'ideal' | 'minimum'>('ideal');

  if (!selectedStageId) return null;

  const stage = roadmapData.find(s => s.id === selectedStageId);
  if (!stage) return null;

  const completed = isCompleted(stage.id);
  const unlocked = isUnlocked(stage.id);

  const handleComplete = () => {
    markCompleted(stage.id);
    const currentIndex = roadmapData.findIndex(s => s.id === stage.id);
    const nextStage = roadmapData[currentIndex + 1];
    if (nextStage) {
      markUnlocked(nextStage.id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md sm:hidden"
        onClick={() => setSelectedStageId(null)}
      />

      <motion.div
        key="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[500px] z-[60] bg-[#0B1121] border-l border-white/10 overflow-hidden flex flex-col pt-16 shadow-2xl"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setSelectedStageId(null)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-300 backdrop-blur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 custom-scrollbar">

          {/* Header Info */}
          <div className="space-y-4 relative">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black tracking-widest uppercase bg-brand-500 text-white px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                DAY {stage.dayNumber}
              </span>
              <span className={cn(
                "text-xs font-bold px-3 py-1 rounded-md border backdrop-blur-md",
                completed ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                unlocked ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" :
                "bg-slate-800 text-slate-400 border-slate-700"
              )}>
                {completed ? 'YAKUNLANGAN' : unlocked ? 'HOZIRGI SHOVQIN' : 'QULFLANGAN'}
              </span>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-md px-3 py-1 font-semibold">{stage.difficulty}</span>
            </div>

            <h2 className="text-3xl font-black text-white leading-[1.1] tracking-tight text-balance">
              {stage.title}
            </h2>
            <p className="text-brand-200 text-base font-medium">
              {stage.shortDescription}
            </p>
          </div>

          <div className="bg-white/5 border-l-4 border-brand-500 p-4 rounded-r-xl">
            <p className="text-slate-300 text-sm leading-relaxed tracking-wide">
              {stage.longDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-navy-800 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-1">Today&apos;s Target</span>
              <span className="text-sm font-medium text-brand-300 leading-snug">{stage.todayFocus}</span>
            </div>
            <div className="bg-navy-800 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-1">Why it matters</span>
              <span className="text-sm font-medium text-indigo-300 leading-snug">{stage.whyItMatters}</span>
            </div>
          </div>

          <div className="bg-navy-800/80 p-4 rounded-2xl border border-white/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-1">To&apos;liq dars</span>
                <p className="text-sm text-slate-300">
                  {stage.lesson
                    ? "Mavzu bo'yicha batafsil yo'l-yo'riq va kod namunalarini oching."
                    : "Bu mavzu uchun batafsil dars kontenti hali yozilmoqda."}
                </p>
              </div>
              <a
                href={`/lesson/${stage.dayNumber}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg border transition-all",
                  stage.lesson
                    ? "bg-white/5 text-slate-200 border-white/10 hover:border-brand-500/30"
                    : "bg-slate-800 text-slate-500 border-slate-700 pointer-events-none"
                )}
              >
                Darsga o&apos;tish
              </a>
            </div>
          </div>

          {/* Productivity Filter: Ideal vs Minimum */}
          <div className="mt-4 border border-white/10 rounded-2xl bg-black/20 overflow-hidden">
             <div className="flex bg-navy-800/50 p-1.5 border-b border-white/5">
               <button onClick={() => setFocusPlan('ideal')} className={cn("flex-1 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all", focusPlan === 'ideal' ? "bg-brand-500 text-white shadow-md": "text-slate-400 hover:text-slate-200")}> Ideal KUN ({stage.idealHours}h) </button>
               <button onClick={() => setFocusPlan('minimum')} className={cn("flex-1 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all", focusPlan === 'minimum' ? "bg-amber-500 text-white shadow-md": "text-slate-400 hover:text-slate-200")}> Minimum KUN ({stage.minimumHours}h) </button>
             </div>
             <div className="p-4 space-y-3">
               {focusPlan === 'ideal' && stage.deepWorkPlan.length > 0 ? (
                 stage.deepWorkPlan.map((block, i) => (
                   <div key={i} className="flex gap-3 items-center bg-white/5 rounded-lg p-2.5">
                     <div className="w-12 text-center shrink-0">
                       <span className="block text-brand-400 text-xs font-black">{block.durationMinutes}</span>
                       <span className="block text-[8px] text-slate-500 uppercase font-bold">MIN</span>
                     </div>
                     <div className="w-px h-8 bg-white/10" />
                     <div>
                       <span className="block text-xs font-bold text-slate-200 uppercase tracking-widest mb-0.5">{block.label}</span>
                       <span className="block text-sm text-slate-400">{block.description}</span>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">Bugungi vaqtingiz kammi? Unda chuqur nazariyaga kirmang. Shunchaki bugungi &quot;Deliverable&quot; loyihasini yoki kod qismini tezroq tugatishga fokus qiling, konspekt kerakmas.</p>
                 </div>
               )}
             </div>
          </div>

          {/* Distractions Guard */}
          {stage.doNotStudyToday.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl mt-2 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10 blur-sm pointer-events-none">
                <ShieldAlert className="w-24 h-24 text-red-500" />
              </div>
              <h3 className="text-xs font-black uppercase text-red-400 tracking-widest mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Bugun nimalarga chalg&apos;imaslik kerak:
              </h3>
              <ul className="space-y-2 mt-3 relative z-10">
                {stage.doNotStudyToday && stage.doNotStudyToday.length > 0 ? stage.doNotStudyToday.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-red-200 font-bold items-start bg-red-950/40 p-2 rounded-lg border border-red-500/10">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )) : null}
              </ul>
              <p className="text-xs text-slate-500 mt-3 italic text-balance font-medium">Bu mavzular juda jozibador ko&apos;rinishi mumkin, ammo siz maqsadli backend foundation o&apos;rganyapsiz. Bilganingiz asqotmaydi, o&apos;z vaqtini kuting!</p>
            </div>
          )}

          {/* Terms */}
          {stage.terms.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-brand-400" /> Lug&apos;at & Terminlar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stage.terms.map((t, idx) => (
                  <div key={idx} className="bg-navy-800 p-3 rounded-lg border border-white/5 group hover:border-brand-500/30 transition-colors">
                    <span className="font-bold text-brand-300 block mb-1 text-sm">{t.term}</span>
                    <span className="text-xs text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{t.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverable Output */}
          <div className="bg-brand-900/40 p-5 rounded-2xl border border-brand-500/30 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Crosshair className="w-4 h-4 text-brand-400" /> Bugungi Natija / Deliverable
            </h3>
            <p className="text-sm text-brand-200 font-medium mb-4">{stage.deliverable}</p>

            <div className="space-y-2 relative z-10">
              {stage.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                  <span className="text-sm text-slate-200">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Readiness Criteria & Check */}
          <div>
             <h3 className="text-xs font-black uppercase text-amber-500 tracking-widest flex items-center gap-2 mb-3">
               <AlertTriangle className="w-4 h-4" /> Ertangi kunga o&apos;tish sharti:
             </h3>
             <ul className="pl-4 space-y-2 border-l-2 border-amber-500/30">
               {stage.readinessCriteria.map((rc, i) => (
                 <li key={i} className="text-sm text-slate-300 font-medium pl-2">{rc}</li>
               ))}
             </ul>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
             <span className="block text-brand-400 uppercase tracking-widest mb-1 font-black">If Stuck / Qotib Qolsangiz:</span>
             {stage.ifStuck}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="shrink-0 w-full p-6 bg-[#0B1121]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-15px_40px_rgba(0,0,0,0.8)] z-20">
           {!unlocked ? (
             <div className="w-full flex justify-center items-center gap-2 py-4 bg-navy-800 rounded-xl text-slate-500 text-sm font-bold border border-slate-700 tracking-wider uppercase">
                <Lock className="w-4 h-4" /> Buni ochish uchun avvalgisini tugating
             </div>
           ) : completed ? (
             <div className="w-full flex justify-center items-center gap-2 py-4 bg-emerald-500/10 rounded-xl text-emerald-400 text-sm font-bold border border-emerald-500/20 tracking-wider uppercase">
                <CheckCircle2 className="w-5 h-5" /> Muvaffaqiyatli yakunlandi
             </div>
           ) : (
             <button
               onClick={handleComplete}
               className="w-full relative group overflow-hidden bg-white text-navy-900 rounded-xl py-4 font-black tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
             >
               <span className="relative z-10 flex justify-center items-center gap-2">
                 Vazifa Tugatildi <Unlock className="w-4 h-4" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
             </button>
           )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
