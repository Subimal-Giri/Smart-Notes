import { useMemo } from "react";

export function useSortedNotes(notes, sortBy) {
    return useMemo(() => {
        const list = [...notes];
        switch (sortBy) {
            case 'title-asc':
                return list.sort((a, b) => (a.title || 'Untitled Note').localeCompare(b.title || 'Untitled Note'));
            case 'title-desc':
                return list.sort((a, b) => (b.title || 'Untitled Note').localeCompare(a.title || 'Untitled Note'));
            case 'created':
                return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'updated':
            default:
                return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
    }, [notes, sortBy]);
}

