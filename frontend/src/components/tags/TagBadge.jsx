function TagBadge({ tag, onRemove, showDot = false }) {
    if (!tag) return null;

    return (
        <span className="tag-badge" style={{ backgroundColor: tag.color }}>
            {showDot && <span className="tag-badge__dot" />}
            {tag.tagName}
            {onRemove && (
                <button type="button" className="tag-badge__remove"
                    onClick={(e) => { e.stopPropagation(); onRemove(tag.id); }}
                >
                    <i className="fa-solid fa-xmark" />
                </button>
            )}
        </span>
    );
}

export default TagBadge;
