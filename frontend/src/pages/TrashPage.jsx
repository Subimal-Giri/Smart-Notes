import { useState, useEffect, useCallback } from "react";
import { getTrashed, restoreNote, deleteNote } from "../services/noteService.js";
import { formatDate } from "../utils/dateFormatter.js";
import { stripHtml, truncate } from "../utils/textHelper.js";
import Header from "../components/layout/Header.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import { toast } from "sonner";

function TrashPage() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);

    const load = useCallback(() => {
        setLoading(true);
        getTrashed().then((res) => setNotes(res.data)).finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleRestore = async (id) => {
        try {
            await restoreNote(id);
            setNotes((prev) => prev.filter((n) => n._id !== id));
            toast.success('Note restored');
        } 
        catch { toast.error('Something went wrong'); }
    };

    const handleDelete = async () => {
        try {
            await deleteNote(pendingDelete);
            setNotes((prev) => prev.filter((n) => n._id !== pendingDelete));
            toast.success('Permanently deleted');
        } 
        catch { toast.error('Something went wrong'); }
        setPendingDelete(null);
    };

    if (loading) return <Spinner size="lg" center />;

    return (
        <>
            <Header title={`Trash (${notes.length})`} subtitle="Deleted notes stay here until you remove them for good" />
            <div className="list-page-content page-content">
                {!notes.length ? (
                    <EmptyState icon="fa-trash" title="Trash is empty" text="Notes you delete will show up here first." />
                ) : (
                    <>
                        <div className="list-hint">
                            <i className="fa-solid fa-circle-info" />
                            Notes here can be restored or permanently deleted at any time.
                        </div>
                        {notes.map((note) => {
                            const preview = truncate(stripHtml(note.content), 80);
                            return (
                                <div key={note._id} className="note-list-item" style={{ marginBottom: 10 }}>
                                    <div className="note-list-item__info" style={{ cursor: 'default' }}>
                                        <div className="note-list-item__icon"><i className="fa-solid fa-trash" /></div>
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <p className="note-list-item__title">{note.title || 'Untitled Note'}</p>
                                            <p className="note-list-item__meta">
                                                {preview || 'No content yet…'} · Deleted {note.deletedAt ? formatDate(note.deletedAt) : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="note-list-item__actions">
                                        <button className="note-action-link note-action-link--restore" onClick={() => handleRestore(note._id)}>
                                            <i className="fa-solid fa-clock-rotate-left" /> Restore
                                        </button>
                                        <button className="note-action-link note-action-link--delete" onClick={() => setPendingDelete(note._id)}>
                                            <i className="fa-solid fa-trash" /> Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <ConfirmDialog
                isOpen={!!pendingDelete}
                onClose={() => setPendingDelete(null)}
                onConfirm={handleDelete}
                title="Delete note permanently?"
                message="This note will be permanently deleted and cannot be recovered."
                confirmLabel="Delete Forever"
            />
        </>
    );
}

export default TrashPage;

