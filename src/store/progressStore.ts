import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedStages: string[];
  unlockedStages: string[];
  markCompleted: (stageId: string) => void;
  markUnlocked: (stageId: string) => void;
  isCompleted: (stageId: string) => boolean;
  isUnlocked: (stageId: string) => boolean;
  resetProgress: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedStageId: string | null;
  setSelectedStageId: (id: string | null) => void;
}

const INITIAL_UNLOCKED = ['day-1']; // First day is always unlocked

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedStages: [],
      unlockedStages: INITIAL_UNLOCKED,
      searchQuery: '',
      activeFilter: 'all',
      selectedStageId: null,

      markCompleted: (stageId) => set((state) => {
        if (!state.completedStages.includes(stageId)) {
          return { completedStages: [...state.completedStages, stageId] };
        }
        return state;
      }),

      markUnlocked: (stageId) => set((state) => {
        if (!state.unlockedStages.includes(stageId)) {
          return { unlockedStages: [...state.unlockedStages, stageId] };
        }
        return state;
      }),

      isCompleted: (stageId) => get().completedStages.includes(stageId),

      isUnlocked: (stageId) => get().unlockedStages.includes(stageId),

      resetProgress: () => set({
        completedStages: [],
        unlockedStages: INITIAL_UNLOCKED,
        selectedStageId: null,
      }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setActiveFilter: (filter) => set({ activeFilter: filter }),

      setSelectedStageId: (id) => set({ selectedStageId: id }),
    }),
    {
      name: 'django-roadmap-progress',
      partialize: (state) => ({
        completedStages: state.completedStages,
        unlockedStages: state.unlockedStages
      }),
    }
  )
);
