import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getArchived, toggleArchive } from "../services/noteService.js";
import { formatDate } from "../utils/dateFormatter.js";
import { stripHtml, truncate } from "../utils/textHelper.js";
import Header from "../components/layout/Header.jsx";
import TagBadge from "../components/tags/TagBadge.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { toast } from "sonner";

function ArchivePage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const load = useCallback(() => {
        setLoading(true);
        getArchived().then((res) => setNotes(res.data)).finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleRestore = async (id) => {
        try {
            await toggleArchive(id);
            setNotes((prev) => prev.filter((n) => n._id !== id));
            toast.success('Note restored to All Notes');
        } 
        catch { toast.error('Something went wrong'); }
    };

    if (loading) {
        return <Spinner size="lg" center />;
    }

    return (
        <>
            <Header title={`Archive (${notes.length})`} subtitle="Notes you've archived, out of your main list" />
            <div className="list-page-content page-content">
                {!notes.length ? (
                    <EmptyState icon="fa-box-archive" title="Archive is empty" text="Notes you archive will show up here." />
                ) : (
                    notes.map((note) => {
                        const preview = truncate(stripHtml(note.content), 80);
                        return (
                            <div key={note._id} className="note-list-item" style={{ marginBottom: 10 }}>
                                <div className="note-list-item__info" onClick={() => navigate(`/notes/${note._id}`)}>
                                    <div className="note-list-item__icon"><i className="fa-solid fa-box-archive" /></div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <p className="note-list-item__title">{note.title || 'Untitled Note'}</p>
                                        <p className="note-list-item__meta">{preview || 'No content yet…'} · Archived {formatDate(note.updatedAt)}</p>
                                    </div>
                                    <div className="note-card__tags" style={{ flexShrink: 0 }}>
                                        {note.tags?.slice(0, 2).map((t) => <TagBadge key={t.id} tag={t} />)}
                                    </div>
                                </div>
                                <div className="note-list-item__actions">
                                    <button className="note-action-link note-action-link--restore" onClick={() => handleRestore(note._id)}>
                                        <i className="fa-solid fa-clock-rotate-left" /> Restore
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}

export default ArchivePage;
