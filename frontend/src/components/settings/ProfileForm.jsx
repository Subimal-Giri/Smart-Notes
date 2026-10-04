import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore.js";
import { updateAccount } from "../../services/authService.js";
import { isValidEmail } from "../../utils/validators.js";
import { formatDateLong } from "../../utils/dateFormatter.js";
import Button from "../ui/Button.jsx";
import Avatar from "../ui/Avatar.jsx";
import { toast } from "sonner";

function ProfileForm() {
    const { user, setUser } = useAuthStore();
    const [form, setForm] = useState({ fullName: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setForm({ fullName: user.fullName || '', email: user.email || '' });
        }
    }, [user]);

    const dirty = user && (form.fullName !== user.fullName || form.email !== user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.fullName.trim()) {
            return setError('Full name cannot be empty');
        }

        if (!isValidEmail(form.email)) {
            return setError('Enter a valid email address');
        }

        setLoading(true);

        try {
            const res = await updateAccount(form);
            setUser(res.data);
            toast.success('Profile updated');
        } 
        catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="profile-avatar-row">
                <Avatar name={user?.fullName} size="lg" />
                <div className="profile-avatar-info">
                    <h4>{user?.fullName}</h4>
                    <p>@{user?.username} · Joined {user?.createdAt ? formatDateLong(user.createdAt) : '—'}</p>
                </div>
            </div>

            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="settings-form-row">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            className="form-input"
                            value={form.fullName}
                            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Username <span className="optional">(not editable)</span></label>
                        <input className="form-input" value={user?.username || ''} disabled style={{ opacity: .6 }} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                </div>
                {error && <span className="form-error"><i className="fa-solid fa-circle-exclamation" /> {error}</span>}
                <div className="settings-form-actions">
                    <Button type="submit" loading={loading} disabled={!dirty}>Save Changes</Button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;

