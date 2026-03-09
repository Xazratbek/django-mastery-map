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
  | 'DRF Checkpoint'
  | 'AI Product Capstone';

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

export interface LessonCodeSample {
  title: string;
  language: string;
  code: string;
}

export interface LessonMiniLab {
  title: string;
  tasks: string[];
  expectedOutput: string[];
}

export interface LessonQuizQuestion {
  question: string;
  answer: string;
  options?: string[];
}

export interface LessonSection {
  title: string;
  body?: string[];
  steps?: string[];
  codeSamples?: LessonCodeSample[];
  anchorId?: string;
  tocLabel?: string;
}

export interface LessonContent {
  summary: string;
  goals: string[];
  sections: LessonSection[];
  tips?: string[];
  miniLab?: LessonMiniLab;
  quiz?: LessonQuizQuestion[];
  projectMapping?: string[];
  challengeTasks?: string[];
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
  lesson?: LessonContent;
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
