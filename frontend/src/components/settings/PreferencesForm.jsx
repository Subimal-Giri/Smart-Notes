import { useUiStore } from "../../store/uiStore.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import ToggleSwitch from "../ui/ToggleSwitch.jsx";

function PreferencesForm() {
    const { theme, setTheme } = useTheme();
    const { viewMode, setViewMode, sortBy, setSortBy } = useUiStore();

    return (
        <div>
            <div className="pref-row">
                <div className="pref-row-info">
                    <h4>Appearance</h4>
                    <p>Choose how SmartNotes looks on this device</p>
                </div>
                <div className="pref-theme-options">
                    <button className={`pref-theme-btn${theme === 'light' ? ' active' : ''}`} onClick={() => setTheme('light')}>
                        <i className="fa-solid fa-sun" /> Light
                    </button>
                    <button className={`pref-theme-btn${theme === 'dark' ? ' active' : ''}`} onClick={() => setTheme('dark')}>
                        <i className="fa-solid fa-moon" /> Dark
                    </button>
                </div>
            </div>

            <div className="pref-row">
                <div className="pref-row-info">
                    <h4>Default Notes View</h4>
                    <p>Show your notes as cards or as a compact list</p>
                </div>
                <div className="pref-theme-options">
                    <button className={`pref-theme-btn${viewMode === 'grid' ? ' active' : ''}`} onClick={() => setViewMode('grid')}>
                        <i className="fa-solid fa-grip" /> Grid
                    </button>
                    <button className={`pref-theme-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')}>
                        <i className="fa-solid fa-list" /> List
                    </button>
                </div>
            </div>

            <div className="pref-row">
                <div className="pref-row-info">
                    <h4>Default Sort Order</h4>
                    <p>How notes are ordered across Dashboard and All Notes</p>
                </div>
                <select className="form-select" style={{ width: 180 }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="updated">Last updated</option>
                    <option value="created">Date created</option>
                    <option value="title-asc">Title (A → Z)</option>
                    <option value="title-desc">Title (Z → A)</option>
                </select>
            </div>

            <div className="pref-row">
                <div className="pref-row-info">
                    <h4>Desktop Notifications</h4>
                    <p>Get notified when autosave fails (coming soon)</p>
                </div>
                <ToggleSwitch on={false} onChange={() => {}} />
            </div>
        </div>
    );
}

export default PreferencesForm;

