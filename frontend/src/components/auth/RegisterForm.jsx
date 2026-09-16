import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import Button from "../ui/Button.jsx";
import AuthSidePanel from "./AuthSidePanel.jsx";
import { isValidEmail, isValidUsername, passwordStrength } from "../../utils/validators.js";
import { toast } from "sonner";

function RegisterForm() {
    const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { register } = useAuth();

    const set = (k) => (e) => {
        setForm((f) => ({ ...f, [k]: e.target.value }));
        setErrors((er) => ({ ...er, [k]: undefined }));
    };

    const strength = passwordStrength(form.password);

    const validate = () => {
        const er = {};
        if (!form.fullName.trim()) er.fullName = "Full name is required";

        if (!isValidUsername(form.username)) er.username = "3-20 characters: letters, numbers, _ or .";

        if (!isValidEmail(form.email)) er.email = "Enter a valid email address";

        if (form.password.length < 6) er.password = "Must be at least 6 characters";

        setErrors(er);

        return Object.keys(er).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            await register(form);
            toast.success('Account created - welcome to SmartNotes!');
        } 
        catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } 
        finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-page">
            <AuthSidePanel
                title="Your ideas, organized beautifully."
                subtitle="Create a free account and start capturing what matters in seconds."
            />
            <div className="auth-form-side">
                <div className="auth-card">
                    <div className="auth-card-mobile-brand">
                        <div className="sidebar-logo__icon"><i className="fa-solid fa-note-sticky" /></div>
                        SmartNotes
                    </div>
                    <div className="auth-head">
                        <h1 className="auth-title">Create your account</h1>
                        <p className="auth-subtitle">Start taking smarter notes today — it's free</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-id-card" />
                                <input className="form-input" type="text" placeholder="Jane Doe" value={form.fullName} onChange={set('fullName')} />
                            </div>
                            {errors.fullName && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {errors.fullName}</span>}
                        </div>

                        <div className="auth-form-row">
                            <div className="form-group">
                                <label className="form-label">Username</label>
                                <div className="input-icon-wrap">
                                    <i className="fa-solid fa-at" />
                                    <input className="form-input" type="text" placeholder="janedoe" value={form.username} onChange={set('username')} />
                                </div>
                                {errors.username && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {errors.username}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="input-icon-wrap">
                                    <i className="fa-solid fa-envelope" />
                                    <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                                </div>
                                {errors.email && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {errors.email}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-lock" />
                                <input
                                    className="form-input"
                                    type={showPw ? 'text' : 'password'}
                                    placeholder="Min. 6 characters"
                                    value={form.password}
                                    onChange={set('password')}
                                />
                                <button type="button" className="input-toggle" onClick={() => setShowPw((s) => !s)}>
                                    <i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                            {form.password && (
                                <span className="form-hint" style={{ color: strength.score >= 3 ? 'var(--success)' : 'var(--text-3)' }}>
                                    Strength: {strength.label}
                                </span>
                            )}
                            {errors.password && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {errors.password}</span>}
                        </div>

                        <Button type="submit" loading={loading} className="btn--full" size="lg">
                            Create Account
                        </Button>
                    </form>
                    <p className="auth-terms">By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
                    <p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;

