'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { roadmapData } from '@/data/roadmapData';

const MAX_DAY = 31;

type CheatSheetItem = {
  dayNumber: number;
  title: string;
  summary: string;
  bullets: string[];
  codeSample?: { title: string; language: string; code: string };
  tags: string[];
};

const buildCheatSheets = (): CheatSheetItem[] => {
  return roadmapData
    .filter((stage) => stage.dayNumber <= MAX_DAY)
    .map((stage) => {
      const lesson = stage.lesson;
      const summary = lesson?.summary || stage.shortDescription || stage.longDescription;
      const bullets: string[] = [];

      if (stage.todayFocus) bullets.push(`Focus: ${stage.todayFocus}`);
      if (lesson?.goals?.[0]) bullets.push(`Asosiy: ${lesson.goals[0]}`);
      if (stage.whyItMatters) bullets.push(`Nega kerak: ${stage.whyItMatters}`);
      if (stage.tasks?.[0]) bullets.push(`Amaliyot: ${stage.tasks[0]}`);

      const firstSectionWithCode = lesson?.sections?.find((section) => section.codeSamples && section.codeSamples.length > 0);
      const codeSample = firstSectionWithCode?.codeSamples?.[0];

      return {
        dayNumber: stage.dayNumber,
        title: stage.title,
        summary,
        bullets,
        codeSample,
        tags: [stage.category, stage.islandId],
      };
    });
};

export default function CheatSheetsPage() {
  const [query, setQuery] = useState('');
  const cheatSheets = useMemo(() => buildCheatSheets(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cheatSheets;

    return cheatSheets.filter((item) => {
      const haystack = [
        item.title,
        item.summary,
        item.bullets.join(' '),
        item.tags.join(' '),
        item.codeSample?.code || '',
        item.codeSample?.title || '',
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, cheatSheets]);

  return (
    <main className="min-h-screen bg-navy-950 text-slate-100">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Cheat Sheets</p>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Django Roadmap Cheat Sheets</h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Har bir kun uchun qisqa eslatmalar, asosiy fokus va tezkor kod namunalari. Qidiruv orqali kerakli mavzuni toping.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/cheatsheets/concepts"
                className="text-xs font-bold uppercase tracking-widest text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                ORM & View Cheats
              </Link>
              <Link
                href="/"
                className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
              >
                Roadmapga qaytish
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Mavzu, kun, kod yoki keyword qidiring..."
                className="w-full rounded-xl bg-white/5 border border-white/10 px-10 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300">
              {filtered.length} ta natija
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-6 lg:grid-cols-2">
        {filtered.map((item) => (
          <section key={item.dayNumber} className="bg-navy-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-300">Day {item.dayNumber}</p>
                <h2 className="text-lg font-black text-white">{item.title}</h2>
              </div>
              <a
                href={`/lesson/${item.dayNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-cyan-300 hover:text-cyan-200"
              >
                Darsga o&apos;tish
              </a>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{item.summary}</p>

            {item.bullets.length > 0 && (
              <ul className="space-y-2 text-sm text-slate-200">
                {item.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.codeSample && (
              <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                <div className="flex items-center justify-between px-3 py-2 bg-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  <span>{item.codeSample.title}</span>
                  <span>{item.codeSample.language}</span>
                </div>
                <pre className="text-xs text-slate-200 font-mono p-3 overflow-x-auto whitespace-pre">
                  {item.codeSample.code}
                </pre>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded-full text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
