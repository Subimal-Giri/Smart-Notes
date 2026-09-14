import { Link } from "react-router-dom";

const MOCK_NOTES = [
    { icon: 'fa-lightbulb', label: 'Project Ideas', bg: 'var(--accent-yellow-bg)', color: 'var(--accent-yellow)' },
    { icon: 'fa-users', label: 'Meeting Notes', bg: 'var(--accent-red-bg)', color: 'var(--accent-red)' },
    { icon: 'fa-calendar-days', label: 'Daily Plan', bg: 'var(--accent-green-bg)', color: 'var(--accent-green)' },
    { icon: 'fa-plane', label: 'Travel Plan', bg: 'var(--accent-blue-bg)', color: 'var(--accent-blue)' },
    { icon: 'fa-book', label: 'Book Summary', bg: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' },
    { icon: 'fa-star', label: 'Inspiration', bg: 'var(--accent-pink-bg)', color: 'var(--accent-pink)' },
];

function Hero() {
    return (
        <section className="hero container" id="home">
            <div className="hero-grid">
                <div>
                    <span className="hero-badge"><i className="fa-solid fa-sparkles" /> Your ideas, organized beautifully</span>
                    <h1 className="hero-title">
                        Write. Organize.
                        <span className="accent">Remember Everything.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Smart Notes is the simple way to capture ideas, organize your thoughts and never miss what matters.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn btn--primary btn--lg">
                            Start Writing <i className="fa-solid fa-arrow-right" />
                        </Link>
                        <a href="#features" className="btn btn--secondary btn--lg">Learn More</a>
                    </div>
                    <div className="hero-social-proof">
                        <div className="hero-avatars">
                            <div className="avatar avatar--sm" style={{ background: '#F59E0B' }}>JD</div>
                            <div className="avatar avatar--sm" style={{ background: '#10B981' }}>AK</div>
                            <div className="avatar avatar--sm" style={{ background: '#EC4899' }}>MS</div>
                            <div className="avatar avatar--sm">2K+</div>
                        </div>
                        <span className="hero-social-text">Join 2,000+ happy users</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-blob" />
                    <div className="hero-dots">
                        {Array.from({ length: 16 }).map((_, i) => <span key={i} />)}
                    </div>
                    <div className="mock-window">
                        <div className="mock-window-bar">
                            <span /><span /><span />
                        </div>
                        <div className="mock-window-body">
                            <div className="mock-window-title">My Notes</div>
                            <div className="mock-notes-grid">
                                {MOCK_NOTES.map((n) => (
                                <div className="mock-note-card" style={{ background: n.bg }} key={n.label}>
                                    <i className={`fa-solid ${n.icon}`} style={{ color: n.color }} />
                                    <span className="label">{n.label}</span>
                                    <div className="line" />
                                    <div className="line" />
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-strip">
                <div className="feature-strip-item">
                    <div className="feature-strip-icon" style={{ background: 'var(--accent-purple-bg)' }}>
                        <i className="fa-solid fa-folder-open" style={{ color: 'var(--accent-purple)' }} />
                    </div>
                    <div>
                        <h4>Organize</h4>
                        <p>Organize notes with tags and categories</p>
                    </div>
                </div>
                <div className="feature-strip-item">
                    <div className="feature-strip-icon" style={{ background: 'var(--accent-yellow-bg)' }}>
                        <i className="fa-solid fa-thumbtack" style={{ color: 'var(--accent-yellow)' }} />
                    </div>
                    <div>
                        <h4>Pin Important</h4>
                        <p>Pin important notes and access them quickly</p>
                    </div>
                </div>
                <div className="feature-strip-item">
                    <div className="feature-strip-icon" style={{ background: 'var(--accent-green-bg)' }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--accent-green)' }} />
                    </div>
                    <div>
                        <h4>Search Fast</h4>
                        <p>Find any note in seconds with powerful search</p>
                    </div>
                </div>
                <div className="feature-strip-item">
                    <div className="feature-strip-icon" style={{ background: 'var(--primary-light)' }}>
                        <i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                        <h4>Secure & Private</h4>
                        <p>Your notes are safe and private</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

