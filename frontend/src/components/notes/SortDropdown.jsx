import Dropdown from "../ui/Dropdown.jsx";
import { SORT_OPTIONS } from "../../utils/constants.js";
import { useUiStore } from "../../store/uiStore.js";

function SortDropdown() {
    const { sortBy, setSortBy } = useUiStore();
    const current = SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];

    return (
        <Dropdown
            trigger={() => (
                <div className="sort-dropdown-trigger">
                    <i className={`fa-solid ${current.icon}`} />
                    {current.label}
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '.65rem', marginLeft: 2 }} />
                </div>
            )}
            items={SORT_OPTIONS.map((opt) => ({
                label: (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                        {opt.label}
                        {sortBy === opt.value && <i className="fa-solid fa-check" style={{ marginLeft: 'auto', color: 'var(--primary)' }} />}
                    </span>
                ),
                icon: opt.icon,
                onClick: () => setSortBy(opt.value),
            }))}
        />
    );
}

export default SortDropdown;
