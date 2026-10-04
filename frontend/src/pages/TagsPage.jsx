import { useTags } from "../hooks/useTags.js";
import Header from "../components/layout/Header.jsx";
import CreateTagPanel from "../components/tags/CreateTagPanel.jsx";
import TagRow from "../components/tags/TagRow.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

function TagsPage() {
    const { tags, createTag, editTag, deleteTag } = useTags();

    return (
        <>
            <Header title="Tags" subtitle="Create and manage tags to organize your notes" />
            <div className="page-content">
                <div className="tags-page-grid">
                    <CreateTagPanel onCreate={createTag} />

                    <div className="tags-list-panel">
                        <div className="tags-list-header">
                            <h3>All Tags ({tags.length})</h3>
                        </div>
                        {!tags ? (
                            <Spinner size="md" center />
                        ) : !tags.length ? (
                            <div style={{ padding: '1rem' }}>
                                <EmptyState icon="fa-tags" title="No tags yet" text="Create your first tag using the form on the left." />
                            </div>
                        ) : (
                            tags.map((tag) => (
                                <TagRow key={tag.id} tag={tag} onUpdate={editTag} onDelete={deleteTag} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>                    
    );
}

export default TagsPage;
