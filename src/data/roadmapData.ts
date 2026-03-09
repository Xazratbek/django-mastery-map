import { IslandData, StageData, Category } from '../types/roadmap';
import { rawDjangoDays, processRawData } from './rawDjangoData';

export const islands: IslandData[] = [
  { id: 'django-foundation', title: 'Web & Django Basics', category: 'Foundation & Web Basics', x: 2000, y: 5600, color: '#0ea5e9', glowColor: 'rgba(14, 165, 233, 0.4)' },
  { id: 'django-backend-funds', title: 'Django Backend Core', category: 'Django Backend Fundamentals', x: 1550, y: 5240, color: '#10b981', glowColor: 'rgba(16, 185, 129, 0.4)' },
  { id: 'django-db', title: 'Models, Migrations & ORM', category: 'Models, Migrations & ORM', x: 2450, y: 4880, color: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.4)' },
  { id: 'django-auth', title: 'Auth & Logic', category: 'Auth, Validation & Business Logic', x: 1460, y: 4520, color: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.4)' },
  { id: 'django-arch', title: 'Architecture & Testing', category: 'Project Structure & Clean Architecture', x: 2540, y: 4160, color: '#8b5cf6', glowColor: 'rgba(139, 92, 246, 0.4)' },
  { id: 'django-perf', title: 'Performance & Security', category: 'Performance, Security & Testing', x: 1640, y: 3800, color: '#ef4444', glowColor: 'rgba(239, 68, 68, 0.4)' },
  { id: 'django-checkpoint', title: 'Junior Django Checkpoint', category: 'Django Checkpoint', x: 2000, y: 3440, color: '#eab308', glowColor: 'rgba(234, 179, 8, 0.6)' },
  { id: 'drf-setup', title: 'REST API Foundations', category: 'API & REST Foundations', x: 2360, y: 3080, color: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.4)' },
  { id: 'drf-serializers', title: 'Serializers & Validation', category: 'DRF Setup & Serializers', x: 1550, y: 2720, color: '#06b6d4', glowColor: 'rgba(6, 182, 212, 0.4)' },
  { id: 'drf-views', title: 'Views & ViewSets', category: 'DRF Views, ViewSets & Routers', x: 2450, y: 2360, color: '#6366f1', glowColor: 'rgba(99, 102, 241, 0.4)' },
  { id: 'drf-auth', title: 'Security, JWT & Permissions', category: 'Auth, Permissions & API Security', x: 1460, y: 2000, color: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.4)' },
  { id: 'drf-advanced', title: 'Advanced DRF (Filter, Docs)', category: 'Filtering, Pagination & Docs', x: 2270, y: 1640, color: '#14b8a6', glowColor: 'rgba(20, 184, 166, 0.4)' },
  { id: 'drf-checkpoint-final', title: 'DRF Complete Capstone', category: 'DRF Checkpoint', x: 2000, y: 1280, color: '#f43f5e', glowColor: 'rgba(244, 63, 94, 0.6)' },
  { id: 'ai-confusion-radar', title: 'Katta loyiha', category: 'AI Product Capstone', x: 3080, y: 1328, color: '#84cc16', glowColor: 'rgba(132, 204, 22, 0.4)' },
];

// Helper to fill missing days dynamically with placeholder specific to backend to complete exactly 60 days
const interpolateDays = (): Partial<StageData>[] => {
  const existingDaysMap = new Map();
  rawDjangoDays.forEach(d => existingDaysMap.set(d.dayNumber, d));

  const allDays: Partial<StageData>[] = [];
  for (let i = 1; i <= 61; i++) {
    if (existingDaysMap.has(i)) {
      allDays.push(existingDaysMap.get(i));
    } else {
      // Determine what island to place it roughly based on the day number
      let islandId = 'django-foundation';
      if (i > 5) islandId = 'django-backend-funds';
      if (i > 10) islandId = 'django-db';
      if (i > 15) islandId = 'django-auth';
      if (i > 20) islandId = 'django-arch';
      if (i > 25) islandId = 'django-perf';
      // DRF split
      if (i > 30) islandId = 'drf-serializers';
      if (i > 36) islandId = 'drf-views';
      if (i > 42) islandId = 'drf-auth';
      if (i > 48) islandId = 'drf-advanced';

      const categoryMatches = islands.find(isl => isl.id === islandId);

      allDays.push({
        dayNumber: i,
        title: i <= 30 ? `Django Core Routine: Day ${i}` : `DRF Mastery Day ${i}`,
        shortDescription: 'Doimiy konsolidatsiya va kod yozish kuni.',
        longDescription: `Bugungi darsda backend arxitekturasi va mantiqlarini yanada chuqurlashtiramiz. Bu kun faqatgina mantiqiy xatolarni to'rilash va avvalgi mavzularni amalda qo'llashdir. HTML vs CSS sizning yo'nalishingiz emas, diqqatingizni Object Relational Mapping (ORM) va API logic larga qarating.`,
        islandId,
        category: categoryMatches?.category || 'Foundation & Web Basics',
        difficulty: 'O\'rtacha',
        doNotStudyToday: ['Frontend Layouts', 'Templates rendering tags', 'CSS animations'],
        todayFocus: `Practice day for backend components - focusing strictly on core concepts.`,
        whyItMatters: 'Konsolidatsiya - barcha olingan nazariy bilimlar real hayotiy loyihaga kochayotganda uzulib qo\'lmasligini ta\'minlaydi.'
      });
    }
  }
  return allDays;
};

// Process interpolated days and export
export const roadmapData: StageData[] = processRawData(interpolateDays());
