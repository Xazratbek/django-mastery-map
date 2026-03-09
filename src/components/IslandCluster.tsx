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

  const CONTAINER_SIZE = 300;
  const NODE_SPACING = 150;
  const BASE_RADIUS = 200;
  const RING_GAP = 100;
  const RESERVED_ANGLE = Math.PI / 3;
  const availableAngle = (Math.PI * 2) - RESERVED_ANGLE;

  const buildRings = (total: number) => {
    const rings: { count: number; radius: number }[] = [];
    let remaining = total;
    let ringIndex = 0;

    while (remaining > 0) {
      const radius = BASE_RADIUS + (ringIndex * RING_GAP);
      const capacity = Math.max(4, Math.floor((availableAngle * radius) / NODE_SPACING));
      const count = Math.min(remaining, capacity);

      rings.push({ count, radius });
      remaining -= count;
      ringIndex += 1;
    }

    return rings;
  };

  const orderedStages = [...stages].sort((a, b) => a.dayNumber - b.dayNumber);
  const ringStages = orderedStages;
  const ringLayout = ringStages.length > 0 ? buildRings(ringStages.length) : [];
  const ringMaxRadius = ringLayout.length > 0 ? ringLayout[ringLayout.length - 1].radius : BASE_RADIUS;
  const titleTop = (CONTAINER_SIZE / 2) - ringMaxRadius - 70;

  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        left: island.x,
        top: island.y,
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
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
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50"
        style={{ top: titleTop }}
      >
        <div
          className="bg-navy-900/95 border px-4 py-2 rounded-2xl text-sm font-black tracking-widest uppercase shadow-lg text-center max-w-[240px] backdrop-blur"
          style={{ borderColor: island.glowColor, color: island.color }}
        >
          {island.title}
        </div>
      </div>

      {ringStages.map((stage, index) => {
        let ringIndex = 0;
        let indexInRing = index;

        while (ringIndex < ringLayout.length && indexInRing >= ringLayout[ringIndex].count) {
          indexInRing -= ringLayout[ringIndex].count;
          ringIndex += 1;
        }

        const ring = ringLayout[ringIndex] ?? { count: ringStages.length, radius: BASE_RADIUS };
        const count = ring.count;
        const radius = ringStages.length === 1 ? BASE_RADIUS : ring.radius;
        const startAngle = (-Math.PI / 2) + (RESERVED_ANGLE / 2);
        const angleStep = count > 1 ? availableAngle / count : 0;
        const ringOffset = (ringIndex % 2 === 0 ? 0 : angleStep / 2);
        const angle = count === 1 ? Math.PI / 2 : startAngle + ringOffset + (angleStep * indexInRing);
        const dynamicX = Math.cos(angle) * radius;
        const dynamicY = Math.sin(angle) * radius;

        return (
          <StageNode
             key={stage.id}
             stage={stage}
             dynamicX={dynamicX}
             dynamicY={dynamicY}
          />
        );
      })}
    </div>
  );
}
