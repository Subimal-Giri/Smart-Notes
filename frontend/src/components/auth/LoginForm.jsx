import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import Button from "../ui/Button.jsx";
import AuthSidePanel from "./AuthSidePanel.jsx";
import { toast } from "sonner";

function LoginForm() {
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await login(form);
            toast.success('Welcome back!');
            const from = location.state?.from;

            if (from) navigate(from);
        } 
        catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <AuthSidePanel
                title="Write. Organize. Remember Everything."
                subtitle="Sign in to pick up right where you left off."
            />
            <div className="auth-form-side">
                <div className="auth-card">
                    <div className="auth-card-mobile-brand">
                        <div className="sidebar-logo__icon"><i className="fa-solid fa-note-sticky" /></div>
                        SmartNotes
                    </div>
                    <div className="auth-head">
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">Sign in to your SmartNotes account</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email or Username</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-user" />
                                <input
                                    className="form-input"
                                    type="text"
                                    required
                                    placeholder="you@example.com"
                                    value={form.identifier}
                                    onChange={set('identifier')}
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-lock" />
                                <input
                                    className="form-input"
                                    type={showPw ? 'text' : 'password'}
                                    required
                                    placeholder="********"
                                    value={form.password}
                                    onChange={set('password')}
                                    autoComplete="current-password"
                                />
                                <button type="button" className="input-toggle" onClick={() => setShowPw((s) => !s)}>
                                    <i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>
                        <Button type="submit" loading={loading} className="btn--full" size="lg">
                            Sign In
                        </Button>
                    </form>
                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

