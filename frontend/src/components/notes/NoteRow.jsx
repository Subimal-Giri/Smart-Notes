import { useNavigate } from "react-router-dom";
import { togglePin, trashNote, toggleArchive } from "../../services/noteService.js";
import { useNoteStore } from "../../store/noteStore.js";
import { formatDate } from "../../utils/dateFormatter.js";
import { truncate, stripHtml } from "../../utils/textHelper.js";
import TagBadge from "../tags/TagBadge.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import { toast } from "sonner";

function NoteRow({ note, listName = 'notes' }) {
    const navigate = useNavigate();
    const { updateNoteInLists, removeFromList } = useNoteStore();
    const preview = truncate(stripHtml(note.content), 90);

    const handlePin = async (e) => {
        e.stopPropagation();

        try {
            const res = await togglePin(note._id);
            updateNoteInLists(note._id, { isPinned: res.data.isPinned });
        } 
        catch { 
            toast.error('Something went wrong'); 
        }
    };

    const handleArchive = async () => {
        try { 
            await toggleArchive(note._id); 
            removeFromList(note._id, listName); 
            toast.success('Note archived'); 
        }
        catch { toast.error('Failed to archive'); }
    };

    const handleTrash = async () => {
        try { 
            await trashNote(note._id); 
            removeFromList(note._id, listName); 
            toast.success('Moved to trash'); 
        }
        catch { toast.error('Something went wrong'); }
    };

    return (
        <div className="note-list-item">
            <div className="note-list-item__info" onClick={() => navigate(`/notes/${note._id}`)}>
                <div className="note-list-item__icon">
                    <i className={`fa-solid ${note.isPinned ? 'fa-thumbtack' : 'fa-file-lines'}`} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <p className="note-list-item__title">{note.title || 'Untitled Note'}</p>
                    <p className="note-list-item__meta">
                        <span>{preview || 'No content yet…'}</span>
                    </p>
                </div>
                <div className="note-card__tags" style={{ flexShrink: 0 }}>
                    {note.tags?.slice(0, 2).map((t) => <TagBadge key={t.id} tag={t} />)}
                </div>
                <span className="note-card__date" style={{ flexShrink: 0, width: 110, textAlign: 'right' }}>
                    {formatDate(note.updatedAt)}
                </span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <Dropdown
                    trigger={() => (
                        <button className="note-card__menu-btn" style={{ opacity: 1 }}>
                            <i className="fa-solid fa-ellipsis-vertical" />
                        </button>
                    )}
                    items={[
                        { label: note.isPinned ? 'Unpin' : 'Pin', icon: 'fa-thumbtack', onClick: handlePin },
                        { label: 'Archive', icon: 'fa-box-archive', onClick: handleArchive },
                        { divider: true },
                        { label: 'Move to trash', icon: 'fa-trash', onClick: handleTrash, danger: true },
                    ]}
                />
            </div>
        </div>
    );
}

export default NoteRow;
