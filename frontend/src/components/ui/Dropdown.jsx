import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside.js";

function Dropdown({ trigger, items, align = 'right' }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useClickOutside(ref, () => setOpen(false), open);

    return (
        <div className="dropdown" ref={ref}>
            <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
            {open && (
                <div className={`dropdown-menu ${align === 'left' ? 'left' : ''}`}>
                    {items.map((item, i) =>
                        item.divider ? (
                        <div key={i} className="dropdown-divider" />
                        ) : (
                            <button
                                key={i}
                                className={`dropdown-item${item.danger ? ' dropdown-item--danger' : ''}`}
                                onClick={() => { item.onClick(); setOpen(false); }}
                            >
                                {item.icon && <i className={`fa-solid ${item.icon}`} />}
                                {item.label}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
