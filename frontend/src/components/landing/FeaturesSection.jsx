const FEATURES = [
    {
        icon: 'fa-bold', bg: 'var(--accent-purple-bg)', color: 'var(--accent-purple)',
        title: 'Rich Text Editor', text: 'Bold, italic, headings, bullet lists, code blocks, links, and more — format your thoughts exactly how you want.'
    },
    {
        icon: 'fa-bolt', bg: 'var(--accent-yellow-bg)', color: 'var(--accent-yellow)',
        title: 'Real-time Autosave', text: 'Every keystroke is saved automatically with a live "Saved / Saving…" indicator — never lose a single word.'
    },
    {
        icon: 'fa-tags', bg: 'var(--accent-blue-bg)', color: 'var(--accent-blue)',
        title: 'Smart Tagging', text: 'Create colorful tags, assign multiple per note, and filter your whole library in one click.'
    },
    {
        icon: 'fa-magnifying-glass', bg: 'var(--accent-green-bg)', color: 'var(--accent-green)',
        title: 'Full-Text Search', text: 'Search titles and content together, with results appearing as you type.'
    },
    {
        icon: 'fa-mobile-screen', bg: 'var(--accent-pink-bg)', color: 'var(--accent-pink)',
        title: 'Fully Responsive', text: 'A polished experience on desktop, tablet, and mobile — with a collapsible sidebar on the go.'
    },
    {
        icon: 'fa-thumbtack', bg: 'var(--accent-red-bg)', color: 'var(--accent-red)',
        title: 'Pin, Archive & Trash', text: 'Pin what matters most, archive what you\'re done with, and safely trash without losing it forever.'
    },
];

function FeaturesSection() {
    return (
        <section className="section container" id="features">
            <div className="section-head">
                <span className="section-eyebrow">Features</span>
                <h2 className="section-title">Everything you need to stay organized</h2>
                <p className="section-subtitle">SmartNotes packs powerful writing and organization tools into a clean, distraction-free interface.</p>
            </div>

            <div className="features-grid">
                {FEATURES.map((f) => (
                <div className="feature-card" key={f.title}>
                    <div className="feature-card-icon" style={{ background: f.bg }}>
                        <i className={`fa-solid ${f.icon}`} style={{ color: f.color }} />
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;

