import { NavLink, useNavigate } from "react-router-dom";
import { createNote } from "../../services/noteService.js";
import { useNoteStore } from "../../store/noteStore.js";
import { useAuthStore } from "../../store/authStore.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useUiStore } from "../../store/uiStore.js";
import Avatar from "../ui/Avatar.jsx";
import { toast } from "sonner";

const NAV_ITEMS = [
    { 
        to: '/dashboard', 
        icon: 'fa-gauge', 
        label: 'Dashboard' 
    },
    { 
        to: '/notes',     
        icon: 'fa-note-sticky', 
        label: 'All Notes' 
    },
    { 
        to: '/search',    
        icon: 'fa-magnifying-glass', 
        label: 'Search' 
    },
    { 
        to: '/archive',   
        icon: 'fa-box-archive', 
        label: 'Archive' 
    },
    { 
        to: '/trash',     
        icon: 'fa-trash', 
        label: 'Trash' 
    },
    { 
        to: '/tags',      
        icon: 'fa-tags', 
        label: 'Tags'
    },
];

function Sidebar() {
    const navigate = useNavigate();
    const addNote = useNoteStore((s) => s.addNote);
    const user = useAuthStore((s) => s.user);
    const { logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const { sidebarOpen, closeSidebar } = useUiStore();

    const handleNewNote = async () => {
        try {
            const res = await createNote({ title: '', content: '' });
            addNote(res.data);
            navigate(`/notes/${res.data._id}`);
            closeSidebar();
        }
        catch {
            toast.error('Failed to create note');
        }
    };

    return (
        <>
            {sidebarOpen && <div className="sidebar-backdrop show" onClick={closeSidebar} />}
            <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
                <div className="sidebar-inner">
                    <div className="sidebar-top">
                        <div className="sidebar-logo">
                            <div className="sidebar-logo__icon"><i className="fa-solid fa-note-sticky" /></div>
                            <span className="sidebar-logo__text">SmartNotes</span>
                        </div>
                        <button className="sidebar-close-btn" onClick={closeSidebar}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>

                    <button className="btn-new-note" onClick={handleNewNote}>
                        <i className="fa-solid fa-plus" /> New Note
                    </button>

                    <nav className="nav-list">
                        {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeSidebar}
                            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                        >
                            <i className={`fa-solid ${item.icon} nav-item__icon`} />
                            {item.label}
                        </NavLink>
                        ))}
                    </nav>

                    <p className="sidebar-section-label">Account</p>
                    <nav className="nav-list">
                        <NavLink to="/settings" onClick={closeSidebar} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                            <i className="fa-solid fa-gear nav-item__icon" />
                            Settings
                        </NavLink>
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <button className="theme-toggle-row" onClick={toggleTheme}>
                        <span className="left">
                            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} />
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                    <div className="user-card" onClick={() => { navigate('/settings'); closeSidebar(); }}>
                        <Avatar name={user?.fullName} size="md" />
                        <div className="user-details">
                            <p className="user-name">{user?.fullName}</p>
                            <p className="user-email">{user?.email}</p>
                        </div>
                        <button
                            className="btn-logout"
                            title="Logout"
                            onClick={(e) => { e.stopPropagation(); logout(); }}
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket" />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;

