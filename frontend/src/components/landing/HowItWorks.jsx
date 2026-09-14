const STEPS = [
    { num: 1, title: 'Create your account', text: 'Sign up in seconds — no credit card, no clutter, just your notes.' },
    { num: 2, title: 'Write & organize', text: 'Capture ideas with rich formatting, tag them, and pin what matters most.' },
    { num: 3, title: 'Find anything, fast', text: 'Search across every note instantly, from any device, whenever you need it.' },
];


function HowItWorks() {
    return (
        <section className="section container" id="how-it-works" style={{ background: 'var(--bg-muted)', borderRadius: 'var(--radius-2xl)' }}>
            <div className="section-head">
                <span className="section-eyebrow">How it works</span>
                <h2 className="section-title">Get started in three simple steps</h2>
            </div>
            
            <div className="steps-row">
                {STEPS.map((s) => (
                <div className="step-item" key={s.num}>
                    <div className="step-number">{s.num}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                </div>
                ))}
            </div>
        </section>
    );
}

export default HowItWorks;


