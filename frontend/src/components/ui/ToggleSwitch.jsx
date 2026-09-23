
function ToggleSwitch({ on, onChange }) {
    return (
        <button type="button"
            className={`toggle-switch${on ? ' on' : ''}`}
            onClick={() => onChange(!on)}
            role="switch"
            aria-checked={on}
        />
    );
}

export default ToggleSwitch;
