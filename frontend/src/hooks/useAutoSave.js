import { useState, useEffect, useRef, useCallback } from "react";
import { updateNote } from "../services/noteService.js";
import { useNoteStore } from "../store/noteStore.js";
import { SAVE_DEBOUNCE_MS } from "../utils/constants.js";

export function useAutoSave(noteId, title, content) {
    const [status, setStatus] = useState('saved');
    const updateNoteInLists = useNoteStore((s) => s.updateNoteInLists);
    const mounted = useRef(false);
    const lastSaved = useRef({ title, content });
    const pendingRef = useRef(null);

    const save = useCallback(async (t, c) => {
        if (!noteId) return;

        setStatus('saving');

        try {
            const res = await updateNote(noteId, { title: t, content: c });
            lastSaved.current = { title: t, content: c };
            updateNoteInLists(noteId, {
                title: res.data.title,
                content: res.data.content,
                updatedAt: res.data.updatedAt,
            });
            setStatus('saved');
        }
        catch {
            setStatus('error');
        }
    }, [noteId, updateNoteInLists]);

    useEffect(() => {
        pendingRef.current = { title, content };
    }, [title, content]);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            lastSaved.current = { title, content };
            return;
        }

        if (title === lastSaved.current.title && content === lastSaved.current.content) return;

        setStatus('unsaved');
        const timer = setTimeout(() => {
            save(pendingRef.current.title, pendingRef.current.content);
        }, SAVE_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [title, content, save]);

    const retry = useCallback(() => {
        save(pendingRef.current.title, pendingRef.current.content);
    }, [save]);

    return { status, retry };
}

