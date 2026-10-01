import { useNavigate } from "react-router-dom";
import { truncate, stripHtml, highlightMatch } from "../../utils/textHelper.js";
import { formatDate } from "../../utils/dateFormatter.js";
import TagBadge from "../tags/TagBadge.jsx";
import Spinner from "../ui/Spinner.jsx";

function SearchResults({ results, searching, query }) {
    const navigate = useNavigate();

    if (searching) return <Spinner size="md" center />;

    if (query.trim().length < 2) {
        return (
            <p className="search-hint">
                <i className="fa-solid fa-magnifying-glass" />
                Type at least 2 characters to search your notes
            </p>
        );
    }

    if (!results.length) {
        return (
            <p className="search-hint">
                <i className="fa-regular fa-face-frown" />
                No results for &ldquo;{query}&rdquo;
            </p>
        );
    }

    return (
        <>
            <p className="search-count">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
            <div className="search-result-list">
                {results.map((note) => {
                    const preview = truncate(stripHtml(note.content), 160);
                    return (
                        <div key={note._id} className="search-result-item" onClick={() => navigate(`/notes/${note._id}`)}>
                            <h4 className="search-result-title">
                                {note.isPinned && <i className="fa-solid fa-thumbtack" style={{ color: 'var(--warning)', fontSize: '.75rem' }} />}
                                <span dangerouslySetInnerHTML={{ __html: highlightMatch(note.title || 'Untitled Note', query) }} />
                            </h4>
                            <p
                                className="search-result-preview"
                                dangerouslySetInnerHTML={{ __html: highlightMatch(preview, query) || 'No content yet…' }}
                            />
                            <div className="search-result-footer">
                                <div className="tag-badges">
                                    {note.tags?.slice(0, 3).map((t) => <TagBadge key={t.id} tag={t} />)}
                                </div>
                                <span className="search-result-date">{formatDate(note.updatedAt)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SearchResults;
