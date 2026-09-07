import { create } from "zustand";

export const useUiStore = create((set) => ({
    sidebarOpen: false,

    openSidebar: () => set({ sidebarOpen: true }),

    closeSidebar: () => set({ sidebarOpen: false }),

    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

        // Notes view - grid (cards) or list (rows)
    viewMode: 'grid',
    setViewMode: (viewMode) => set({ viewMode }),

        // Sort for note lists
    sortBy: 'updated', // 'updated', 'created', 'title-asc', 'title-desc'
    setSortBy: (sortBy) => set({ sortBy }),
}));

