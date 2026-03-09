'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Lock, Play, ArrowUpRight, RotateCcw, Layers } from 'lucide-react';
import { islands, roadmapData } from '@/data/roadmapData';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/utils/cn';
import { DetailDrawer } from './DetailDrawer';

const filters = [
  { id: 'all', label: 'Barchasi' },
  { id: 'completed', label: 'Tugallangan' },
  { id: 'unlocked', label: 'Ochiq' },
  { id: 'locked', label: 'Qulflangan' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function RoadmapLibrary() {
  const {
    completedStages,
    unlockedStages,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    resetProgress,
    setSelectedStageId,
  } = useProgressStore();

  const completedSet = useMemo(() => new Set(completedStages), [completedStages]);
  const unlockedSet = useMemo(() => new Set(unlockedStages), [unlockedStages]);

  const totalStages = roadmapData.length;
  const completedCount = completedStages.length;
  const unlockedCount = unlockedStages.length;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  const groups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return islands
      .map((island) => {
        const allStages = roadmapData
          .filter((stage) => stage.islandId === island.id)
          .sort((a, b) => a.dayNumber - b.dayNumber);

        const visibleStages = allStages.filter((stage) => {
          if (query) {
            const haystack = [
              stage.title,
              stage.shortDescription,
              stage.longDescription,
              stage.category,
              stage.terms.map((term) => term.term).join(' '),
            ]
              .join(' ')
              .toLowerCase();
            if (!haystack.includes(query)) return false;
          }

          if (activeFilter === 'completed') return completedSet.has(stage.id);
          if (activeFilter === 'unlocked') return unlockedSet.has(stage.id) && !completedSet.has(stage.id);
          if (activeFilter === 'locked') return !unlockedSet.has(stage.id);
          return true;
        });

        const islandCompleted = allStages.filter((stage) => completedSet.has(stage.id)).length;

        return {
          island,
          allCount: allStages.length,
          completedCount: islandCompleted,
          stages: visibleStages,
        };
      })
      .filter((group) => group.stages.length > 0);
  }, [searchQuery, activeFilter, completedSet, unlockedSet]);

  return (
    <main className="min-h-screen text-[var(--fg)]">
      <div className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 8% 18%, rgba(15, 118, 110, 0.18), transparent 45%), radial-gradient(circle at 92% 22%, rgba(251, 146, 60, 0.18), transparent 45%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                <Layers className="w-4 h-4 text-[var(--accent)]" />
                Django Roadmap
              </span>
              <h1 className="font-display text-4xl sm:text-5xl text-balance leading-tight">
                Soddalashtirilgan, tartibli va ketma-ket darslar kutubxonasi
              </h1>
              <p className="text-base text-[var(--muted)] max-w-2xl">
                Har bir mavzu bo'yicha darslar alohida bo'limda turadi, kunlar esa ketma-ket tartibda joylashgan. Qidiruv,
                filter va tezkor preview bilan kerakli bosqichni tez topasiz.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/cheatsheets"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 hover:-translate-y-0.5 transition"
                >
                  Cheat sheets
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={resetProgress}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-[var(--muted)] hover:text-[var(--fg)] transition"
                >
                  Reset progress
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_30px_60px_rgba(28,26,22,0.12)]">
              <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                <span>Umumiy progress</span>
                <span className="text-[var(--fg)] font-semibold">{progressPercent}%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-black/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl border border-[var(--border)] bg-white/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Tugadi</p>
                  <p className="text-lg font-semibold">{completedCount}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Ochiq</p>
                  <p className="text-lg font-semibold">{unlockedCount}</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-white/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Jami</p>
                  <p className="text-lg font-semibold">{totalStages}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <label className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[var(--muted)]" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Mavzu, kun yoki keyword qidiring..."
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-12 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition',
                    activeFilter === filter.id
                      ? 'bg-[var(--accent)] text-white shadow-[0_10px_20px_rgba(15,118,110,0.2)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-10 space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Bo'limlar</p>
            <nav className="space-y-2">
              {groups.map(({ island, allCount, completedCount: islandCompleted }) => (
                <a
                  key={island.id}
                  href={`#${island.id}`}
                  className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface)] transition"
                >
                  <span>{island.title}</span>
                  <span className="text-xs text-[var(--muted)]">{islandCompleted}/{allCount}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
          {groups.map(({ island, allCount, completedCount: islandCompleted, stages }) => (
            <motion.section
              key={island.id}
              id={island.id}
              variants={itemVariants}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_40px_rgba(28,26,22,0.08)]"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{island.category}</p>
                  <h2 className="font-display text-2xl">{island.title}</h2>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <span>{islandCompleted}/{allCount} tugallangan</span>
                  <div className="h-2 w-32 rounded-full bg-black/5 overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${Math.round((islandCompleted / allCount) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {stages.map((stage) => {
                  const status = completedSet.has(stage.id)
                    ? 'completed'
                    : unlockedSet.has(stage.id)
                      ? 'unlocked'
                      : 'locked';

                  return (
                    <div
                      key={stage.id}
                      className="group rounded-2xl border border-[var(--border)] bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(28,26,22,0.12)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Day {stage.dayNumber}</span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.2em]',
                            status === 'completed' && 'border-emerald-200 bg-emerald-50 text-emerald-700',
                            status === 'unlocked' && 'border-teal-200 bg-teal-50 text-teal-700',
                            status === 'locked' && 'border-stone-200 bg-stone-100 text-stone-500'
                          )}
                        >
                          {status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                          {status === 'unlocked' && <Play className="w-3 h-3" />}
                          {status === 'locked' && <Lock className="w-3 h-3" />}
                          {status === 'completed' ? 'Tugadi' : status === 'unlocked' ? 'Ochiq' : 'Qulflangan'}
                        </span>
                      </div>
                      <h3 className="mt-3 font-semibold text-base">{stage.title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{stage.shortDescription}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setSelectedStageId(stage.id)}
                          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--fg)] transition"
                        >
                          Preview
                        </button>
                        <Link
                          href={`/lesson/${stage.dayNumber}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white"
                        >
                          Darsga kirish
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>

      <DetailDrawer />
    </main>
  );
}
