import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes.js";
import { createNote } from "../services/noteService.js";
import { useNoteStore } from "../store/noteStore.js";
import NoteList from "../components/notes/NoteList.jsx";
import TagFilterBar from "../components/tags/TagFilterBar.jsx";
import SortDropdown from "../components/notes/SortDropdown.jsx";
import ViewToggle from "../components/notes/ViewToggle.jsx";
import Header from "../components/layout/Header.jsx";
import { toast } from "sonner";

function AllNotesPage() {
    const { notes, isLoading } = useNotes();
    const addNote = useNoteStore((s) => s.addNote);
    const navigate = useNavigate();

    const handleNew = async () => {
        try {
            const res = await createNote({ title: '', content: '' });
            addNote(res.data);
            navigate(`/notes/${res.data._id}`);
        } 
        catch { 
            toast.error('Failed to create note'); 
        }
    };

    return (
        <>
            <Header
                title={`All Notes${!isLoading ? ` (${notes.length})` : ''}`}
                actions={
                    <button className="btn btn--primary btn--sm" onClick={handleNew}>
                        <i className="fa-solid fa-plus" /> <span className="hidden-mobile">New Note</span>
                    </button>
                }
            />
            <div className="notes-toolbar">
                <TagFilterBar />
                <div className="flex gap-2" style={{ flexShrink: 0 }}>
                    <ViewToggle />
                    <SortDropdown />
                </div>
            </div>
            <NoteList
                notes={notes}
                isLoading={isLoading}
                listName="notes"
                emptyIcon="fa-note-sticky"
                emptyTitle="No notes yet"
                emptyText="Click “New Note” to capture your first idea."
            />
        </>
    );
}

export default AllNotesPage;

