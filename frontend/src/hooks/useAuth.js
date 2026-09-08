import { useAuthStore } from "../store/authStore.js";
import * as authService from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useAuth() {
    const { setAuth, logout: clearAuth, user } = useAuthStore();
    const navigate = useNavigate();
    
    const login = async ({ identifier, password }) => {
        const payload = identifier.includes('@')
        ? { email: identifier, password }
        : { username: identifier, password };

        const res = await authService.login(payload);
        const { user, accessToken } = res.data;

        setAuth(user, accessToken);
        navigate('/dashboard');

        return user;
    };

    const register = async ({ fullName, username, email, password }) => {
        await authService.register({ fullName, username, email, password });

        return login({ identifier: email, password });
    };

    const logout = async () => {
        try {
            await authService.logout();
        }
        catch (error) {
            console.error("Logout API failed:", error);
        }

        clearAuth();
        navigate('/login');

        toast.success('Logged out successfully');
    };

    return { login, register, logout, user };
}

