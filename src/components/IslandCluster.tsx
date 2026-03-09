'use client';

import { roadmapData } from '@/data/roadmapData';
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
      <div className="absolute -top-10 bg-navy-900 border px-4 py-1.5 rounded-full text-sm font-black tracking-widest uppercase shadow-lg z-10" style={{ borderColor: island.glowColor, color: island.color }}>
        {island.title}
      </div>

      {stages.map((stage, index) => {
        const total = stages.length;
        // The more nodes, the larger the radius we might want, but let's stick to a solid 160-180.
        // For 1 node, radius is 0 (center). For more, distribute in circle.
        const radius = total === 1 ? 0 : 200;
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start from top (top is -PI/2)

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
    </div>
  );
}
