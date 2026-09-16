const POINTS = [
    { 
        icon: 'fa-bolt', 
        text: 'Autosaves every keystroke - never lose an idea' 
    },
    { 
        icon: 'fa-tags', 
        text: 'Tag & filter notes to stay organized' 
    },
    { 
        icon: 'fa-magnifying-glass', 
        text: 'Full-text search finds anything, instantly' 
    },
];

function AuthSidePanel({ title, subtitle }) {
    return (
        <div className="auth-side">
            <div className="auth-side-brand">
                <div className="auth-side-brand__icon"><i className="fa-solid fa-note-sticky" /></div>
                SmartNotes
            </div>

            <div className="auth-side-content">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <div className="auth-side-points">
                    {POINTS.map((p) => (
                        <div className="auth-side-point" key={p.text}>
                            <i className={`fa-solid ${p.icon}`} />
                            <span>{p.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="auth-side-foot">© {new Date().getFullYear()} SmartNotes. All rights reserved.</div>
        </div>
    );
}

export default AuthSidePanel;

