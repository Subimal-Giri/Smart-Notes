import { useEffect, useCallback } from "react";
import { getAllNotes } from "../services/noteService.js";
import { useNoteStore } from  "../store/noteStore.js";
import { toast } from "sonner";

export function useNotes() {
    const { notes, isLoading, setNotes, setLoading } = useNoteStore();

    const fetchNotes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllNotes();
            setNotes(res.data);
        }
        catch {
            toast.error('Could not load your notes');
        }
        finally {
            setLoading(false);
        }
    }, [setNotes, setLoading]);

    useEffect(() => { fetchNotes(); }, [fetchNotes]);

    return { notes, isLoading, refetch: fetchNotes };
}
