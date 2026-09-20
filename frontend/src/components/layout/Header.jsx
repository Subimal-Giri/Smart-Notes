import { useUiStore } from "../../store/uiStore.js";

function Header({ title, subtitle, actions }) {
    const toggleSidebar = useUiStore((s) => s.toggleSidebar);

    return (
        <header className="page-header">
            <div className="page-header__left">
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars" />
                </button>
                <div>
                    <h1 className="page-header__title">{title}</h1>
                    {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
                </div>
            </div>
            {actions && <div className="page-header__actions">{actions}</div>}
        </header>
    );
}

export default Header;
