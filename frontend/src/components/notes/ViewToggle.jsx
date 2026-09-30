import { useUiStore } from "../../store/uiStore.js";

function ViewToggle() {
    const { viewMode, setViewMode } = useUiStore();

    return (
        <div className="dropdown hidden-mobile" style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <button
                title="Grid view"
                onClick={() => setViewMode('grid')}
                style={{
                    padding: '.5rem .7rem',
                    background: viewMode === 'grid' ? 'var(--primary-light)' : 'var(--bg-elevated)',
                    color: viewMode === 'grid' ? 'var(--primary-text)' : 'var(--text-2)',
                }}
            >
                <i className="fa-solid fa-grip" />
            </button>
            <button
                title="List view"
                onClick={() => setViewMode('list')}
                style={{
                    padding: '.5rem .7rem',
                    background: viewMode === 'list' ? 'var(--primary-light)' : 'var(--bg-elevated)',
                    color: viewMode === 'list' ? 'var(--primary-text)' : 'var(--text-2)',
                    borderLeft: '1.5px solid var(--border)',
                }}
            >
                <i className="fa-solid fa-list" />
            </button>
        </div>
    );
}

export default ViewToggle;
