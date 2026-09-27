import { useState } from "react";
import { TAG_COLORS } from "../../utils/constants.js";

function TagRow({ tag, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(tag.tagName);
    const [color, setColor] = useState(tag.color);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const save = async () => {
        if (!name.trim()) return;

        await onUpdate(tag.id, { tagName: name.trim(), color });
        setEditing(false);
    };

    if (editing) {
        return (
            <div className="tag-row">
                <div className="tag-row-edit-form">
                    <div className="color-swatch-row">
                        {TAG_COLORS.map((c) => (
                            <button
                                key={c}
                                className={`color-swatch${color === c ? ' selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                    <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && save()}
                    />
                </div>
                <div className="tag-row-actions">
                    <button className="tag-row-icon-btn" onClick={save}><i className="fa-solid fa-check" /></button>
                    <button className="tag-row-icon-btn" onClick={() => { setEditing(false); setName(tag.tagName); setColor(tag.color); }}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="tag-row">
            <div className="tag-row-left">
                <span className="tag-row-dot" style={{ backgroundColor: tag.color }} />
                <span className="tag-row-name">{tag.tagName}</span>
                <span className="tag-row-count">{tag.noteCount || 0} note{tag.noteCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="tag-row-actions">
                {confirmDelete ? (
                    <>
                        <button className="tag-row-icon-btn danger" onClick={() => onDelete(tag.id)} title="Confirm delete">
                            <i className="fa-solid fa-check" />
                        </button>
                        <button className="tag-row-icon-btn" onClick={() => setConfirmDelete(false)} title="Cancel">
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="tag-row-icon-btn" onClick={() => setEditing(true)} title="Edit">
                            <i className="fa-solid fa-pen" />
                        </button>
                        <button className="tag-row-icon-btn danger" onClick={() => setConfirmDelete(true)} title="Delete">
                            <i className="fa-solid fa-trash" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TagRow;
