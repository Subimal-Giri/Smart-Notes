import { useState } from "react";
import { useTags } from "../../hooks/useTags.js";
import { syncNoteTags } from "../../services/noteService.js";
import TagBadge from "./TagBadge.jsx";
import { TAG_COLORS } from "../../utils/constants.js";
import { toast } from "sonner";

function TagInput({ note, onUpdate }) {
    const { tags, createTag } = useTags();
    const [showCreate, setShowCreate] = useState(false);
    const [newName, setNewName] = useState('');
    const [newColor, setNewColor] = useState(TAG_COLORS[0]);
    const [busy, setBusy] = useState(false);

    const noteTags = note?.tags || [];
    const noteTagIds = noteTags.map((t) => t.id);
    const available = tags.filter((t) => !noteTagIds.includes(t.id));

    const sync = async (ids) => {
        setBusy(true);

        try {
            const res = await syncNoteTags(note._id, ids);
            onUpdate?.(res.data);
        } 
        catch {
            toast.error('Failed to update tags');
        } 
        finally {
            setBusy(false);
        }
    };

    const handleAdd = (tag) => sync([...noteTagIds, tag.id]);
    const handleRemove = (tagId) => sync(noteTagIds.filter((id) => id !== tagId));

    const handleCreate = async () => {
        if (!newName.trim()) return;

        const tag = await createTag({ tagName: newName.trim(), color: newColor });
        
        if (tag) {
            await handleAdd(tag);
            setNewName('');
            setShowCreate(false);
        }
    };

    return (
        <div className="tag-input-wrap">
            <div className="tag-current">
                {noteTags.map((t) => <TagBadge key={t._id} tag={t} onRemove={busy ? undefined : handleRemove} />)}
            </div>
            {available.length > 0 && (
                <div className="tag-available">
                    {available.map((t) => (
                        <button key={t.id} className="tag-add-btn" onClick={() => handleAdd(t)} disabled={busy}>
                            + {t.tagName}
                        </button>
                    ))}
                </div>
            )}
            {showCreate ? (
                <div className="tag-create-row">
                    <input
                        className="tag-create-input"
                        value={newName}
                        autoFocus
                        placeholder="Tag name"
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    />
                    <div className="color-swatch-row">
                        {TAG_COLORS.map((c) => (
                            <button
                                key={c}
                                className={`color-swatch${newColor === c ? ' selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setNewColor(c)}
                            />
                        ))}
                    </div>
                    <button className="tag-action-link" onClick={handleCreate}>Add</button>
                    <button className="tag-action-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                </div>
            ) : (
                <button className="btn-new-tag" onClick={() => setShowCreate(true)}>
                    <i className="fa-solid fa-plus" /> New tag
                </button>
            )}
        </div>
    );
}

export default TagInput;
