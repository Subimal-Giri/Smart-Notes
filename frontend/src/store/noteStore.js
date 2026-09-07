import { create } from "zustand";

export const useNoteStore = create((set) => ({
    notes: [],
    archivedNotes: [],
    trashedNotes: [],
    currentNote: null,
    isLoading: false,

    setNotes: (notes) => set({ notes }),
    setArchivedNotes: (archivedNotes) => set({ archivedNotes }),
    setTrashedNotes: (trashedNotes) => set({ trashedNotes }),
    setCurrentNote: (note) => set({ currentNote: note }),
    setLoading: (isLoading) => set({ isLoading }),

    addNote: (note) => set((s) => ({ notes: [note, ...s.notes] })),

    updateNoteInLists: (id, updates) => set((s) => {
        const apply = (list) => list.map((n) => (n._id === id ? { ...n, ...updates } : n));
        return {
            notes: apply(s.notes),
            archivedNotes: apply(s.archivedNotes),
            trashedNotes: apply(s.trashedNotes),
            currentNote: s.currentNote?._id === id ? { ...s.currentNote, ...updates } : s.currentNote,
        };
    }),

    removeFromList: (id, listName) => set((s) => ({
        [listName]: s[listName].filter((n) => n._id !== id),
    })),

    removeFromAllLists: (id) => set((s) => ({
        notes: s.notes.filter((n) => n._id !== id),
        archivedNotes: s.archivedNotes.filter((n) => n._id !== id),
        trashedNotes: s.trashedNotes.filter((n) => n._id !== id),
    })),
}));

