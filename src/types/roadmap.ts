export type Category =
  | 'Foundation & Web Basics'
  | 'Django Backend Fundamentals'
  | 'Models, Migrations & ORM'
  | 'Auth, Validation & Business Logic'
  | 'Project Structure & Clean Architecture'
  | 'Performance, Security & Testing'
  | 'Django Checkpoint'
  | 'API & REST Foundations'
  | 'DRF Setup & Serializers'
  | 'DRF Views, ViewSets & Routers'
  | 'Auth, Permissions & API Security'
  | 'Filtering, Pagination & Docs'
  | 'DRF Checkpoint';

export type Status = 'locked' | 'unlocked' | 'completed';

export interface DeepWorkBlock {
  label: string;
  durationMinutes: number;
  description: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface StageData {
  id: string;
  dayNumber: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: Category;
  islandId: string;
  difficulty: 'Oson' | 'O\'rtacha' | 'Qiyin';
  estimatedHours: number;
  idealHours: number;
  minimumHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  terms: Term[];
  todayFocus: string;
  whyItMatters: string;
  doNotStudyToday: string[];
  deepWorkPlan: DeepWorkBlock[];
  tasks: string[];
  exercises: string[];
  deliverable: string;
  checklist: string[];
  readinessCriteria: string[];
  commonMistakes: string[];
  ifStuck: string;
  resourcesPlaceholder: string[];
  coordinates: { x: number; y: number };
}

export interface IslandData {
  id: string;
  title: string;
  category: Category;
  x: number;
  y: number;
  color: string;
  glowColor: string;
}
