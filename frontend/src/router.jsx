import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";


import LandingPage from "./pages/LandingPage.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

        </Routes>
    );
}

export default AppRouter;

