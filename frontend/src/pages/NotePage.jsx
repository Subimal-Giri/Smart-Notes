import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getNoteById, 
    togglePin, 
    toggleArchive, 
    trashNote, 
    restoreNote, 
    deleteNote
} from "../services/noteService.js";
import { useNoteStore } from "../store/noteStore.js";
import { useAutoSave } from "../hooks/useAutoSave.js";
import { formatDate } from "../utils/dateFormatter.js";
import NoteEditor from "../components/notes/NoteEditor.jsx";
import AutoSaveIndicator from "../components/notes/AutoSaveIndicator.jsx";
import TagInput from "../components/tags/TagInput.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import { toast } from "sonner";

function NotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setCurrentNote, updateNoteInLists } = useNoteStore();

    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { status: saveStatus, retry } = useAutoSave(note?._id, title, content);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getNoteById(id);
            setNote(res.data);
            setTitle(res.data.title || '');
            setContent(res.data.content || '');
            setCurrentNote(res.data);
        } 
        catch {
            toast.error('Note not found');
            navigate('/notes');
        } 
        finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { load(); }, [load]);

    const handlePin = async () => {
        try {
            const res = await togglePin(note._id);
            setNote((n) => ({ ...n, isPinned: res.data.isPinned }));
            updateNoteInLists(note._id, { isPinned: res.data.isPinned });
            toast.success(res.data.isPinned ? 'Pinned!' : 'Unpinned');
        } 
        catch { toast.error('Something went wrong'); }
    };

    const handleArchiveToggle = async () => {
        try {
            const res = await toggleArchive(note._id);
            setNote((n) => ({ ...n, isArchived: res.data.isArchived, isPinned: res.data.isPinned }));
            toast.success(res.data.isArchived ? 'Note archived' : 'Note restored to All Notes');
        }
        catch { toast.error('Something went wrong'); }
    };

    const handleTrash = async () => {
        try {
            await trashNote(note._id);
            toast.success('Moved to trash');
            navigate('/notes');
        } 
        catch { toast.error('Something went wrong'); }
    };

    const handleRestore = async () => {
        try {
            await restoreNote(note._id);
            setNote((n) => ({ ...n, isDeleted: false, deletedAt: null }));
            toast.success('Note restored');
        } 
        catch { toast.error('Something went wrong'); }
    };

    const handleDeletePermanently = async () => {
        try {
            await deleteNote(note._id);
            toast.success('Note permanently deleted');
            navigate('/trash');
        } 
        catch { toast.error('Something went wrong'); }
    };

    if (loading) return <Spinner size="lg" center />;
    if (!note) return null;

    return (
        <div className="note-page">
            <div className="note-page-bar">
                <button className="note-back" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left" /> Back
                </button>
                <div className="note-bar-right">
                    {!note.isDeleted && <AutoSaveIndicator status={saveStatus} onRetry={retry} />}
                    <span className="note-date hidden-mobile">{formatDate(note.updatedAt)}</span>

                    {note.isDeleted ? (
                        <>
                            <button className="btn btn--secondary btn--sm" onClick={handleRestore}>
                                <i className="fa-solid fa-clock-rotate-left" /> Restore
                            </button>
                            <button className="btn btn--danger btn--sm" onClick={() => setConfirmDelete(true)}>
                                <i className="fa-solid fa-trash" /> Delete Forever
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`note-action-btn${note.isPinned ? ' note-action-btn--active' : ''}`}
                                onClick={handlePin}
                                title={note.isPinned ? 'Unpin' : 'Pin'}
                            >
                                <i className="fa-solid fa-thumbtack" />
                            </button>
                            <button
                                className={`note-action-btn${note.isArchived ? ' note-action-btn--active' : ''}`}
                                onClick={handleArchiveToggle}
                                title={note.isArchived ? 'Unarchive' : 'Archive'}
                            >
                                <i className="fa-solid fa-box-archive" />
                            </button>
                            <button className="note-action-btn note-action-btn--trash" onClick={handleTrash} title="Move to trash">
                                <i className="fa-solid fa-trash" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {note.isDeleted && (
                <div className="list-hint" style={{ margin: '1rem 1.75rem 0', background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                    <i className="fa-solid fa-trash" />
                    This note is in Trash. Restore it to keep editing, or delete it permanently.
                </div>
            )}
            {!note.isDeleted && note.isArchived && (
                <div className="list-hint" style={{ margin: '1rem 1.75rem 0' }}>
                    <i className="fa-solid fa-box-archive" />
                    This note is archived. Unarchive it to see it in All Notes again.
                </div>
            )}

            <div className="note-head">
                <input
                    className="note-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title…"
                    disabled={note.isDeleted}
                />
                <TagInput
                    note={{ ...note, title, content }}
                    onUpdate={(updated) => { setNote(updated); updateNoteInLists(id, updated); }}
                />
            </div>

            <NoteEditor content={content} onChange={setContent} />

            <ConfirmDialog
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={handleDeletePermanently}
                title="Delete note permanently?"
                message="This note will be permanently deleted and cannot be recovered."
                confirmLabel="Delete Forever"
            />
        </div>
    );
}

export default NotePage;

