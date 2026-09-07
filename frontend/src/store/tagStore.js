import { create } from "zustand";

export const useTagStore = create((set) => ({
    tags: [],
    selectedTagId: null,

    setTags: (tags) => set({ tags }),

    addTag: (tag) => set((s) => ({ tags: [...s.tags, tag] })),

    updateTagInList: (id, updates) => set((s) => ({
        tags: s.tags.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

    removeTag: (id) => set((s) => ({
        tags: s.tags.filter((t) => t.id !== id),
        selectedTagId: s.selectedTagId === id ? null : s.selectedTagId,
    })),

    setSelectedTag: (id) => set({ selectedTagId: id }),
}));

