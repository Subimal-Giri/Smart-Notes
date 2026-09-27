import { useState } from "react";
import { TAG_COLORS } from "../../utils/constants.js";
import Button from "../ui/Button.jsx";
import TagBadge from "./TagBadge.jsx";


function CreateTagPanel({ onCreate }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState(TAG_COLORS[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        setLoading(true);
        const created = await onCreate({ tagName: name.trim(), color });
        setLoading(false);

        if (created) setName('');
    };

    return (
        <div className="tag-create-panel">
            <h3><i className="fa-solid fa-plus" /> Create a new tag</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Tag name</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Work, Personal, Ideas"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Color</label>
                    <div className="color-swatch-row">
                        {TAG_COLORS.map((c) => (
                        <button
                            type="button"
                            key={c}
                            className={`color-swatch${color === c ? ' selected' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                        ))}
                    </div>
                </div>

                <div className="tag-preview-row">
                    <span className="label">Preview:</span>
                    <TagBadge tag={{ tagName: name.trim() || 'tag-name', color }} />
                </div>

                <Button type="submit" loading={loading} className="btn--full" icon="fa-plus">
                    Add Tag
                </Button>
            </form>
        </div>
    );
}

export default CreateTagPanel;
