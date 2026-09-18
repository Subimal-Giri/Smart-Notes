
function EmptyState({ icon = 'fa-inbox', title, text }) {
    return (
        <div className="empty-state">
            <div className="empty-state__icon"><i className={`fa-solid ${icon}`} /></div>
            {title && <p className="empty-state__title">{title}</p>}
            {text && <p className="empty-state__text">{text}</p>}
        </div>
    );
}

export default EmptyState;
