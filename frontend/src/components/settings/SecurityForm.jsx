import { useState } from "react";
import { changePassword } from "../../services/authService.js";
import { passwordStrength } from "../../utils/validators.js";
import Button from "../ui/Button.jsx";
import { toast } from "sonner";

function SecurityForm() {
    const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [show, setShow] = useState({ old: false, next: false, confirm: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const strength = passwordStrength(form.newPassword);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!form.oldPassword) return setError('Enter your current password');

        if (form.newPassword.length < 6) return setError('New password must be at least 6 characters');

        if (form.newPassword !== form.confirmPassword) return setError('New passwords do not match');

        setLoading(true);
        
        try {
            await changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword });
            toast.success('Password changed successfully');
            setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        }
        catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
        } 
        finally {
            setLoading(false);
        }
    };

    const pwField = (key, label, showKey) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <div className="input-icon-wrap">
                <i className="fa-solid fa-lock" />
                <input
                    className="form-input"
                    type={show[showKey] ? 'text' : 'password'}
                    value={form[key]}
                    onChange={set(key)}
                />
                <button type="button" className="input-toggle" onClick={() => setShow((s) => ({ ...s, [showKey]: !s[showKey] }))}>
                    <i className={`fa-solid ${show[showKey] ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
            </div>
        </div>
    );

    return (
        <form className="settings-form" onSubmit={handleSubmit}>
            {pwField('oldPassword', 'Current Password', 'old')}
            {pwField('newPassword', 'New Password', 'next')}
            {form.newPassword && (
                <span className="form-hint" style={{ color: strength.score >= 3 ? 'var(--success)' : 'var(--text-3)', marginTop: -8 }}>
                    Strength: {strength.label}
                </span>
            )}
            {pwField('confirmPassword', 'Confirm New Password', 'confirm')}
            {error && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {error}</span>}
            <div className="settings-form-actions">
                <Button type="submit" loading={loading}>Update Password</Button>
            </div>
        </form>
    );
}

export default SecurityForm;

