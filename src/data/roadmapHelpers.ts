import { DeepWorkBlock } from '../types/roadmap';

export const standardDeepWork = (theoryDesc: string, coreDesc: string, practiceDesc: string): DeepWorkBlock[] => [
  { label: 'Warm-up / Tushuncha & Theory', durationMinutes: 45, description: theoryDesc },
  { label: 'Short Break', durationMinutes: 15, description: 'Stoldan uzoqlashish, ko\'zlarni dam oldirish' },
  { label: 'Core Study Block (Deep Focus)', durationMinutes: 90, description: coreDesc },
  { label: 'Long Break', durationMinutes: 30, description: 'Ovqatlanish yoki sayr' },
  { label: 'Practice & Hands-on Coding', durationMinutes: 120, description: practiceDesc },
  { label: 'Consolidation & Review', durationMinutes: 30, description: 'Bugungi qilingan ishlarni konspektga yozish, self-check o\'tkazish' },
];

export const minimumViableDeepWork = (coreTask: string): DeepWorkBlock[] => [
  { label: 'Focused Reading/Video', durationMinutes: 30, description: 'Asosiy maqolani o\'qish yoki qisqa darsni ko\'rish' },
  { label: 'Core Coding Practice', durationMinutes: 90, description: coreTask },
  { label: 'Quick Summary', durationMinutes: 15, description: 'Konspekt va commit' },
];
