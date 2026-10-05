import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import Header from "../components/layout/Header.jsx";
import SettingsTabs from "../components/settings/SettingsTabs.jsx";
import ProfileForm from "../components/settings/ProfileForm.jsx";
import SecurityForm from "../components/settings/SecurityForm.jsx";
import PreferencesForm from "../components/settings/PreferencesForm.jsx";
import Button from "../components/ui/Button.jsx";

const PANEL_META = {
    profile: { 
        title: 'Profile', 
        desc: 'Update your personal information' 
    },
    preferences: { 
        title: 'Preferences', 
        desc: 'Customize how SmartNotes looks and behaves' 
    },
    security: { 
        title: 'Security', 
        desc: 'Manage your password and account security' 
    },
};

function SettingsPage() {
    const [tab, setTab] = useState('profile');
    const { logout } = useAuth();
    const meta = PANEL_META[tab];

    return (
        <>
            <Header title="Settings" subtitle="Manage your account and app preferences" />
            <div className="page-content">
                <div className="settings-grid">
                    <SettingsTabs active={tab} onChange={setTab} />

                    <div className="settings-panel">
                        <div className="settings-panel-head">
                            <h2>{meta.title}</h2>
                            <p>{meta.desc}</p>
                        </div>

                        {tab === 'profile' && <ProfileForm />}
                        {tab === 'preferences' && <PreferencesForm />}
                        {tab === 'security' && (
                            <>
                                <SecurityForm />
                                <div className="danger-zone">
                                    <h3>Sign out</h3>
                                    <p>Sign out of SmartNotes on this device.</p>
                                    <Button variant="danger" size="sm" icon="fa-arrow-right-from-bracket" onClick={logout}>
                                        Log Out
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsPage;

