import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AllNotesPage from "./pages/AllNotesPage.jsx";
import NotePage from "./pages/NotePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ArchivePage from "./pages/ArchivePage.jsx";
import TrashPage from  "./pages/TrashPage.jsx";
import TagsPage from "./pages/TagsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/notes" element={<AllNotesPage />} />
                    <Route path="/notes/:id" element={<NotePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                    <Route path="/trash" element={<TrashPage />} />
                    <Route path="/tags" element={<TagsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;

