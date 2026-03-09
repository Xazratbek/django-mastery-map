'use client';

import { useProgressStore } from '@/store/progressStore';
import { Search, Filter, Layers } from 'lucide-react';
import { useState } from 'react';

export function MapControls() {
  const { searchQuery, setSearchQuery, activeFilter, setActiveFilter } = useProgressStore();
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'Barchasi' },
    { id: 'completed', label: 'Tugallangan' },
    { id: 'unlocked', label: 'Ochiq' },
    { id: 'locked', label: 'Qulflangan' },
  ];

  return (
    <div className="absolute top-20 left-6 z-40 flex flex-col gap-3">
      <div className="glass-panel w-72 rounded-xl p-3 flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Qidirsh: termin, bosqich..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-800/80text-sm text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-3 py-2.5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-brand-500/50"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-[11px]" />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between text-sm text-slate-300 font-medium px-2 py-1.5 hover:bg-white/5 rounded-md transition-colors"
        >
          <span className="flex items-center gap-2"><Filter className="w-4 h-4 text-brand-400" /> Filter: {filters.find(f => f.id === activeFilter)?.label}</span>
          <Layers className="w-4 h-4" />
        </button>

        {isOpen && (
          <div className="flex flex-col gap-1 mt-1 bg-navy-900 border border-white/5 p-2 rounded-lg shadow-xl">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setIsOpen(false); }}
                className={`text-left text-sm px-3 py-2 rounded-md font-medium transition-colors
                  ${activeFilter === f.id ? 'bg-brand-500/20 text-brand-300' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
