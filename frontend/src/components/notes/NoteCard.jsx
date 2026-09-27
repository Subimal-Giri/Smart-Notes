import { useNavigate } from "react-router-dom";
import { togglePin, trashNote, toggleArchive } from "../../services/noteService.js";
import { useNoteStore } from "../../store/noteStore.js";
import { formatDate } from "../../utils/dateFormatter.js";
import { truncate, stripHtml } from "../../utils/textHelper.js";
import TagBadge from "../tags/TagBadge.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import { toast } from "sonner";

function NoteCard({ note, listName = 'notes' }) {
    const navigate = useNavigate();
    const { updateNoteInLists, removeFromList } = useNoteStore();

    const preview = truncate(stripHtml(note.content), 110);

    const handlePin = async (e) => {
        e.stopPropagation();
        try {
            const res = await togglePin(note._id);
            updateNoteInLists(note._id, { isPinned: res.data.isPinned });
            toast.success(res.data.isPinned ? 'Pinned!' : 'Unpinned');
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
        catch { 
            toast.error('Failed to archive'); 
        }
    };

    const handleTrash = async () => {
        try {
            await trashNote(note._id);
            removeFromList(note._id, listName);
            toast.success('Moved to trash');
        } 
        catch { 
            toast.error('Something went wrong'); 
        }
    };

    return (
        <div className="note-card" onClick={() => navigate(`/notes/${note._id}`)}>
            <div className="note-card__top">
                <h3 className="note-card__title">
                    {note.isPinned && <i className="fa-solid fa-thumbtack note-card__pin" />}
                    {note.title || 'Untitled Note'}
                </h3>
                <div onClick={(e) => e.stopPropagation()}>
                    <Dropdown
                        trigger={(open) => (
                        <button className={`note-card__menu-btn${open ? ' menu-open' : ''}`}>
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

            <p className={`note-card__preview${!preview ? ' empty' : ''}`}> {preview || 'No content yet…'}</p>

            <div className="note-card__footer">
                <div className="note-card__tags">
                    {note.tags?.slice(0, 2).map((t) => <TagBadge key={t._id} tag={t} />)}
                    {note.tags?.length > 2 && <span className="text-xs text-muted">+{note.tags.length - 2}</span>}
                </div>
                <span className="note-card__date">{formatDate(note.updatedAt)}</span>
            </div>
        </div>
    );
}

export default NoteCard;
