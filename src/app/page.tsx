'use client';

import dynamic from 'next/dynamic';
import { RoadmapLegend } from '@/components/RoadmapLegend';

const ProgressHeader = dynamic(() => import('@/components/ProgressHeader').then(mod => mod.ProgressHeader), { ssr: false });
const DetailDrawer = dynamic(() => import('@/components/DetailDrawer').then(mod => mod.DetailDrawer), { ssr: false });
const RoadmapMap = dynamic(() => import('@/components/RoadmapMap').then(mod => mod.RoadmapMap), { ssr: false });
const MapControls = dynamic(() => import('@/components/MapControls').then(mod => mod.MapControls), { ssr: false });
const TodayMissionCard = dynamic(() => import('@/components/TodayMissionCard').then(mod => mod.TodayMissionCard), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden text-slate-200 bg-navy-950">
      <ProgressHeader />

      {/* Container for Map */}
      <div className="absolute inset-0 pt-16">
        <MapControls />
        <TodayMissionCard />
        <RoadmapMap />
        <RoadmapLegend />
        <DetailDrawer />
      </div>
    </main>
  );
}
