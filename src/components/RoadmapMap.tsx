'use client';

import { islands } from '@/data/roadmapData';
import { IslandCluster } from './IslandCluster';
import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';

export function RoadmapMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

  // Initial scroll to bottom-center (where the first island is)
  useEffect(() => {
    if (containerRef.current) {
      // 4000x6000 container size. Island 1 is around x:2000, y:5600.
      // We want to center it.
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      containerRef.current.scrollLeft = 2000 - containerWidth / 2;
      containerRef.current.scrollTop = 5600 - containerHeight / 2;
    }
  }, []);

  const onMouseDown = (e: ReactMouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartPos({
      x: e.pageX - containerRef.current.offsetLeft,
      y: e.pageY - containerRef.current.offsetTop,
    });
    setScrollPos({
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
    });
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = x - startPos.x;
    const walkY = y - startPos.y;
    containerRef.current.scrollLeft = scrollPos.left - walkX;
    containerRef.current.scrollTop = scrollPos.top - walkY;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-auto no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      onMouseLeave={onMouseUpOrLeave}
    >
      <div className="relative w-[4000px] h-[6000px]">
        {/* SVG connection lines between islands */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10" fill="none" strokeWidth="3" strokeDasharray="12 12">
          {islands.map((island, i) => {
            const nextIsland = islands[i + 1];
            if (!nextIsland) return null;
            // Draw a curved path
            const midX = (island.x + nextIsland.x) / 2;
            const midY = (island.y + nextIsland.y) / 2;
            return (
              <path
                key={i}
                d={`M ${island.x} ${island.y} Q ${midX + (island.x > nextIsland.x ? 200 : -200)} ${midY} ${nextIsland.x} ${nextIsland.y}`}
                className="animate-pulse opacity-50"
              />
            )
          })}
        </svg>

        {islands.map((island) => (
          <IslandCluster key={island.id} island={island} />
        ))}
      </div>
    </div>
  );
}
