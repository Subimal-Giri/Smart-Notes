import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useUiStore } from "../../store/uiStore";
import { useTagStore } from "../../store/tagStore";

function MainLayout() {
    const location = useLocation();
    const closeSidebar = useUiStore((s) => s.closeSidebar);
    const setSelectedTag = useTagStore((s) => s.setSelectedTag);

    useEffect(() => {
        closeSidebar();
        setSelectedTag(null);
    }, [location.pathname]);

    return (
        <div className="app-shell">
            <Sidebar />
            <main className="main-area">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
