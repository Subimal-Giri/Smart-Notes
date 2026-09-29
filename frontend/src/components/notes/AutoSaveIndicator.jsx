
function AutoSaveIndicator({ status, onRetry }) {
    const copy = {
        saved:   'Saved',
        saving:  'Saving…',
        unsaved: 'Unsaved changes',
        error:   'Save failed',
    }[status] || 'Saved';

    const icon = {
        saved:   'fa-circle-check',
        saving:  'fa-circle-notch fa-spin',
        unsaved: 'fa-circle',
        error:   'fa-triangle-exclamation',
    }[status] || 'fa-circle-check';

    return (
        <div className={`save-indicator save-indicator--${status}`}>
            <i className={`fa-solid ${icon}`} style={{ fontSize: '.7rem' }} />
            <span className="save-text">{copy}</span>
            {status === 'error' && (
                <button type="button" className="save-retry" onClick={onRetry}>Retry</button>
            )}
        </div>
    );
}

export default AutoSaveIndicator;
