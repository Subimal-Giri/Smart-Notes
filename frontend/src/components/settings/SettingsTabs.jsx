const TABS = [
    { 
        id: 'profile', 
        label: 'Profile', 
        icon: 'fa-user' 
    },
    { 
        id: 'preferences', 
        label: 'Preferences', 
        icon: 'fa-sliders' 
    },
    { 
        id: 'security', 
        label: 'Security', 
        icon: 'fa-shield-halved' 
    },
];

function SettingsTabs({ active, onChange }) {
    return (
        <div className="settings-tabs">
            {TABS.map((t) => (
                <button
                    key={t.id}
                    className={`settings-tab${active === t.id ? ' active' : ''}`}
                    onClick={() => onChange(t.id)}
                >
                    <i className={`fa-solid ${t.icon}`} /> {t.label}
                </button>
            ))}
        </div>
    );
}

export default SettingsTabs;
