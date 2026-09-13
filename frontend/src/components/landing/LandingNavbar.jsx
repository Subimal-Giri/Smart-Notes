import { useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
    { 
        href: '#home', 
        label: 'Home' 
    },
    { 
        href: '#features', 
        label: 'Features' 
    },
    { 
        href: '#how-it-works', 
        label: 'How it works' 
    },
    { 
        href: '#faq', 
        label: 'FAQ' 
    },
];

function LandingNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="landing-nav container">
                <div className="landing-brand">
                    <div className="landing-brand__icon"><i className="fa-solid fa-note-sticky" /></div>
                    Smart Notes
                </div>

                <div className="landing-nav-links">
                    {LINKS.map((l, i) => (
                        <a key={l.href} href={l.href} className={`landing-nav-link${i === 0 ? ' active' : ''}`}>{l.label}</a>
                    ))}
                </div>

                <div className="landing-nav-actions">
                    <Link to="/login" className="btn btn--secondary btn--sm">Log in</Link>
                    <Link to="/register" className="btn btn--primary btn--sm">Register</Link>
                    <button className="landing-nav-toggle" onClick={() => setOpen((o) => !o)}>
                        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
                    </button>
                </div>
            </nav>

            <div className={`landing-mobile-menu${open ? ' open' : ''}`}>
                {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                ))}
                <div className="landing-mobile-actions">
                    <Link to="/login" className="btn btn--secondary btn--sm" style={{ flex: 1 }}>Log in</Link>
                    <Link to="/register" className="btn btn--primary btn--sm" style={{ flex: 1 }}>Register</Link>
                </div>
            </div>        
        </>
    );
}

export default LandingNavbar

