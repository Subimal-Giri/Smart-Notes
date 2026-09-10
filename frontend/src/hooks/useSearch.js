import { useState, useEffect } from "react";
import { searchNotes } from "../services/noteService";
import { useDebounce } from "./useDebounce";
import { SEARCH_DEBOUNCE_MS } from "../utils/constants";

export function useSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

    useEffect(() => {
        const trimmed = debouncedQuery.trim();
        if (trimmed.length < 2) {
            setResults([]);
            return;
        }

        let cancelled = false;
        setSearching(true);

        searchNotes(trimmed)
            .then((res) => { if (!cancelled) setResults(res.data); })
            .catch(() => { if (!cancelled) setResults([]); })
            .finally(() => { if (!cancelled) setSearching(false); });

        return () => { cancelled = true; };
    }, [debouncedQuery]);

    return { query, setQuery, results, searching };
}

