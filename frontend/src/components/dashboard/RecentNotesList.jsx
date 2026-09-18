import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter.js";
import { stripHtml, truncate } from "../../utils/textHelper.js";

function RecentNotesList({ notes }) {
    const navigate = useNavigate();

    return (
        <div>
            {notes.slice(0, 6).map((note) => (
                <div key={note._id} className="recent-note-row" onClick={() => navigate(`/notes/${note._id}`)}>
                    <div className="recent-note-icon">
                        <i className={`fa-solid ${note.isPinned ? 'fa-thumbtack' : 'fa-file-lines'}`} />
                    </div>
                    <div className="recent-note-info">
                        <p className="recent-note-title">{note.title || 'Untitled Note'}</p>
                        <p className="recent-note-date">{truncate(stripHtml(note.content), 40) || 'No content yet'}</p>
                    </div>
                    <span className="recent-note-date">{formatDate(note.updatedAt)}</span>
                </div>
            ))}
        </div>
    );
}

export default RecentNotesList;

