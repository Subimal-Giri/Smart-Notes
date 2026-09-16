
function Button({
    children,
    type = "button",
    loading,
    className = "",
    variant = "primary",
    size = "", 
    onClick, 
    disabled, 
    icon,
}) {
    const cls = ['btn', `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ');

    return (
        <button type={type} className={cls} onClick={onClick} disabled={loading || disabled}>
            {loading ? <i className="fa-solid fa-circle-notch btn-spin" /> : icon ? <i className={`fa-solid ${icon}`} /> : null}
            {children}
        </button>
    );
}

export default Button;
