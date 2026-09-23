import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children, size }) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';

        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal${size === 'lg' ? ' modal--lg' : ''}`} onClick={(e) => e.stopPropagation()}>
                {title && (
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    <button className="modal-close" onClick={onClose}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
                )}
                {children}
            </div>
        </div>
    );
}

export default Modal;
