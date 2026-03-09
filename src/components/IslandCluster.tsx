'use client';

import { islands, roadmapData } from '@/data/roadmapData';
import { IslandData } from '@/types/roadmap';
import { StageNode } from './StageNode';
import { useProgressStore } from '@/store/progressStore';
import { motion } from 'framer-motion';

export function IslandCluster({ island }: { island: IslandData }) {
  const { searchQuery, activeFilter, isCompleted, isUnlocked } = useProgressStore();

  const stages = roadmapData.filter(stage => {
    if (stage.islandId !== island.id) return false;

    // Filtering logic
    if (searchQuery) {
      const matchSearch = stage.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stage.terms.some(t => t.term.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchSearch) return false;
    }

    if (activeFilter === 'completed' && !isCompleted(stage.id)) return false;
    if (activeFilter === 'unlocked' && (!isUnlocked(stage.id) || isCompleted(stage.id))) return false;
    if (activeFilter === 'locked' && isUnlocked(stage.id)) return false;

    return true;
  });

  if (stages.length === 0) return null;

  const orderedStages = [...stages].sort((a, b) => a.dayNumber - b.dayNumber);
  const lockedStages = orderedStages.filter(stage => !isUnlocked(stage.id));
  const openStages = orderedStages.filter(stage => isUnlocked(stage.id));
  const islandIndex = islands.findIndex(item => item.id === island.id);
  const nextIsland = islandIndex >= 0 ? islands[islandIndex + 1] : undefined;
  const ringStages = nextIsland ? openStages : orderedStages;
  const lineStages = nextIsland ? lockedStages : [];

  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        left: island.x,
        top: island.y,
        width: 300,
        height: 300,
      }}
    >
      {/* Island Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full mix-blend-screen"
        style={{
          background: `radial-gradient(circle, ${island.glowColor} 0%, transparent 70%)`
        }}
      />

      {/* Island Border */}
      <div
        className="absolute inset-4 rounded-full border border-dashed opacity-30 animate-spin-slow pointer-events-none"
        style={{ borderColor: island.color }}
      />

      {/* Island Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          className="bg-navy-900/95 border px-4 py-2 rounded-2xl text-sm font-black tracking-widest uppercase shadow-lg text-center max-w-[220px] backdrop-blur"
          style={{ borderColor: island.glowColor, color: island.color }}
        >
          {island.title}
        </div>
      </div>

      {ringStages.map((stage, index) => {
        const total = ringStages.length;
        const radius = total === 1 ? 140 : 170;
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const dynamicX = Math.cos(angle) * radius;
        const dynamicY = Math.sin(angle) * radius;

        return (
          <StageNode
             key={stage.id}
             stage={stage}
             islandHue={island.color}
             dynamicX={dynamicX}
             dynamicY={dynamicY}
          />
        );
      })}

      {nextIsland && lineStages.map((stage, index) => {
        const pathDx = nextIsland.x - island.x;
        const pathDy = nextIsland.y - island.y;
        const pathLength = Math.hypot(pathDx, pathDy) || 1;
        const baseRadius = ringStages.length === 1 ? 140 : 170;
        let minT = (baseRadius + 32) / pathLength;
        minT = Math.max(0.2, Math.min(0.45, minT));
        let maxT = 1 - minT;
        if (maxT <= minT) {
          minT = 0.45;
          maxT = 0.55;
        }
        const t = minT + ((index + 1) / (lineStages.length + 1)) * (maxT - minT);
        const normalX = -pathDy / pathLength;
        const normalY = pathDx / pathLength;
        const offset = ((index % 3) - 1) * 26;
        const dynamicX = pathDx * t + normalX * offset;
        const dynamicY = pathDy * t + normalY * offset;

        return (
          <StageNode
             key={stage.id}
             stage={stage}
             islandHue={island.color}
             dynamicX={dynamicX}
             dynamicY={dynamicY}
          />
        );
      })}
    </div>
  );
}
