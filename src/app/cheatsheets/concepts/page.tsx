'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { conceptCheatSheets } from '@/data/conceptCheatSheets';

export default function ConceptCheatSheetsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list = ['All'];
    conceptCheatSheets.forEach((item) => {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        list.push(item.category);
      }
    });
    return list;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return conceptCheatSheets.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      const haystack = [
        item.title,
        item.category,
        item.description.join(' '),
        item.whenToUse.join(' '),
        item.codeSample.code,
        item.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      if (!q) return true;
      return haystack.includes(q);
    });
  }, [query, activeCategory]);

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
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">ORM & View Concepts</h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Aggregat funksiyalar, ORM optimizatsiya metodlari va view turlari uchun qisqa, aniq eslatmalar.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/cheatsheets"
                className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
              >
                Day cheat sheets
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
                placeholder="Masalan: Count, select_related, CBV..."
                className="w-full rounded-xl bg-white/5 border border-white/10 px-10 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300">
              {filtered.length} ta natija
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={[
                  'text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border transition-colors',
                  activeCategory === category
                    ? 'bg-brand-500/20 border-brand-400 text-brand-200'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200',
                ].join(' ')}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-6 lg:grid-cols-2">
        {filtered.map((item) => (
          <section key={item.id} className="bg-navy-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-300">{item.category}</p>
              <h2 className="text-lg font-black text-white">{item.title}</h2>
            </div>

            <div className="space-y-2 text-sm text-slate-300">
              {item.description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Qachon ishlatiladi</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {item.whenToUse.map((line, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <div className="flex items-center justify-between px-3 py-2 bg-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                <span>{item.codeSample.title}</span>
                <span>{item.codeSample.language}</span>
              </div>
              <pre className="text-xs text-slate-200 font-mono p-3 overflow-x-auto whitespace-pre">
                {item.codeSample.code}
              </pre>
            </div>

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
