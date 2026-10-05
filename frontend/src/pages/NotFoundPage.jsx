import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

function NotFoundPage() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    return (
        <div className="not-found">
            <div className="not-found__icon">
                <i className="fa-solid fa-map-signs" />
            </div>
            <h1 className="not-found__code">404</h1>
            <p className="not-found__msg">This page doesn't exist.</p>
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="btn btn--primary">
                <i className="fa-solid fa-house" /> Go Home
            </Link>
        </div>
    );
}

export default NotFoundPage;

