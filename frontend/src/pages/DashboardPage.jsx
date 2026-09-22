import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes.js";
import { useTags } from "../hooks/useTags.js";
import { getArchived, getTrashed } from "../services/noteService.js";
import { useAuthStore } from "../store/authStore.js";

import Header from "../components/layout/Header.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentNotesList from "../components/dashboard/RecentNotesList.jsx";
import QuickActions from "../components/dashboard/QuickActions.jsx";
import TagBadge from "../components/tags/TagBadge.jsx";
import Spinner from "../components/ui/Spinner.jsx";

function DashboardPage() {
    const { notes, isLoading } = useNotes();
    const { tags } = useTags();
    const user = useAuthStore((s) => s.user);
    const navigate = useNavigate();

    const [counts, setCounts] = useState({ archived: null, trashed: null });

    useEffect(() => {
        Promise.all([getArchived(), getTrashed()])
        .then(([a, t]) => setCounts({ archived: a.data.length, trashed: t.data.length }))
        .catch(() => setCounts({ archived: 0, trashed: 0 }));
    }, []);

    const pinnedCount = notes.filter((n) => n.isPinned).length;
    
    const firstName = user?.fullName?.split(' ')[0] || 'there';

    const hour = new Date().getHours();

    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <>
            <Header title="Dashboard" subtitle="Your notes at a glance" />
            <div className="page-content">
                <div className="dash-welcome">
                    <h1>{greeting}, {firstName} 👋</h1>
                    <p>Here's what's happening with your notes today.</p>
                </div>

                <div className="stat-grid">
                    <StatCard icon="fa-note-sticky" label="Total Notes" value={isLoading ? '—' : notes.length} to="/notes" bg="var(--primary-light)" color="var(--primary)" />
                    <StatCard icon="fa-thumbtack" label="Pinned" value={isLoading ? '—' : pinnedCount} to="/notes" bg="var(--accent-yellow-bg)" color="var(--accent-yellow)" />
                    <StatCard icon="fa-tags" label="Tags" value={tags.length} to="/tags" bg="var(--accent-blue-bg)" color="var(--accent-blue)" />
                    <StatCard icon="fa-box-archive" label="Archived" value={counts.archived ?? '—'} to="/archive" bg="var(--accent-green-bg)" color="var(--accent-green)" />
                </div>

                <div className="dash-grid">
                    <div className="dash-panel">
                        <div className="dash-panel-head">
                            <h3>Recent Notes</h3>
                            <a onClick={() => navigate('/notes')}>View all</a>
                        </div>
                        {isLoading ? <Spinner size="md" center /> : <RecentNotesList notes={notes} />}
                    </div>

                    <div className="flex-col gap-4">
                        <div className="dash-panel">
                            <div className="dash-panel-head">
                                <h3>Quick Actions</h3>
                            </div>
                            <QuickActions />
                        </div>

                        {tags.length > 0 && (
                        <div className="dash-panel">
                            <div className="dash-panel-head">
                                <h3>Your Tags</h3>
                                <a onClick={() => navigate('/tags')}>Manage</a>
                            </div>
                            <div className="tag-cloud-mini">
                                {tags.slice(0, 8).map((t) => <TagBadge key={t.id} tag={t} />)}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;

