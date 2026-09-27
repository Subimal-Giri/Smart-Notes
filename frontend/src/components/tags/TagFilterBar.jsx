import { useTagStore } from "../../store/tagStore.js";

function TagFilterBar() {
    const { tags, selectedTagId, setSelectedTag } = useTagStore();
    if (!tags.length) return null;

    return (
        <div className="tag-filter-row">
            <button
                className={`tag-filter-btn${!selectedTagId ? ' active' : ''}`}
                onClick={() => setSelectedTag(null)}
            >
                All
            </button>
            {tags.map((tag) => (
                <button key={tag.id} className="tag-colored-btn"
                    style={{
                        backgroundColor: tag.color,
                        opacity: selectedTagId && selectedTagId !== tag.id ? 0.4 : 1,
                    }}
                    onClick={() => setSelectedTag(selectedTagId === tag.id ? null : tag.id)}
                >
                    {tag.tagName}
                </button>
            ))}
        </div>
    );
}

export default TagFilterBar;
