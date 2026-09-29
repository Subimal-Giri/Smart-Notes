import NoteCard from "./NoteCard.jsx";
import NoteRow from "./NoteRow.jsx";
import EmptyNotes from "./EmptyNotes.jsx";
import Spinner from "../ui/Spinner.jsx";
import { useTagStore } from "../../store/tagStore.js";
import { useUiStore } from "../../store/uiStore.js";
import { useSortedNotes } from "../../hooks/useSortedNotes.js";

function NoteList({ notes, isLoading, emptyIcon, emptyTitle, emptyText, listName = 'notes', showPinnedGroup = true }) {
    const selectedTagId = useTagStore((s) => s.selectedTagId);
    const { viewMode, sortBy } = useUiStore();

    const filtered = selectedTagId
        ? notes.filter((n) => n.tags?.some((t) => t.id === selectedTagId))
        : notes;

    const pinned = showPinnedGroup ? filtered.filter((n) => n.isPinned) : [];
    const others = showPinnedGroup ? filtered.filter((n) => !n.isPinned) : filtered;

    const sortedPinned = useSortedNotes(pinned, sortBy);
    const sortedOthers = useSortedNotes(others, sortBy);

    if (isLoading) {
        return <Spinner size="lg" center />;
    }
    if (!filtered.length) {
        return <EmptyNotes icon={emptyIcon} title={emptyTitle} text={emptyText} />;
    }

    const Item = viewMode === 'list' ? NoteRow : NoteCard;
    const Wrapper = ({ children }) =>
        viewMode === 'list'
        ? <div className="notes-list-view">{children}</div>
        : <div className="notes-grid">{children}</div>;

    return (
        <div className="notes-container">
            {sortedPinned.length > 0 && (
                <div className="notes-section">
                    <p className="notes-section-label"><i className="fa-solid fa-thumbtack" /> Pinned</p>
                    <Wrapper>
                        {sortedPinned.map((n) => <Item key={n._id} note={n} listName={listName} />)}
                    </Wrapper>
                </div>
            )}
            {sortedOthers.length > 0 && (
                <div className="notes-section">
                    {sortedPinned.length > 0 && <p className="notes-section-label">Other Notes</p>}
                    <Wrapper>
                        {sortedOthers.map((n) => <Item key={n._id} note={n} listName={listName} />)}
                    </Wrapper>
                </div>
            )}
        </div>
    );
}

export default NoteList;
