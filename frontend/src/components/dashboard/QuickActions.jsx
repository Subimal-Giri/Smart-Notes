import { useNavigate } from "react-router-dom";
import { createNote } from "../../services/noteService.js";
import { useNoteStore } from "../../store/noteStore.js";
import { toast } from "sonner";

function QuickActions() {
    const navigate = useNavigate();
    const addNote = useNoteStore((s) => s.addNote);

    const handleNewNote = async () => {
        try {
            const res = await createNote({ title: '', content: '' });
            addNote(res.data);
            navigate(`/notes/${res.data._id}`);
        }
        catch { 
            toast.error('Failed to create note'); 
        }
    };

    const actions = [
        { 
            icon: 'fa-plus', 
            label: 'Create a new note', 
            onClick: handleNewNote 
        },
        { 
            icon: 'fa-magnifying-glass', 
            label: 'Search your notes', 
            onClick: () => navigate('/search') 
        },
        { 
            icon: 'fa-tags', 
            label: 'Manage tags', 
            onClick: () => navigate('/tags') 
        },
        { 
            icon: 'fa-box-archive', 
            label: 'View archive', 
            onClick: () => navigate('/archive') 
        },
    ]; 

    return (
        <div className="quick-actions">
            {actions.map((a) => (
                <button className="quick-action-btn" key={a.label} onClick={a.onClick}>
                    <i className={`fa-solid ${a.icon}`} />
                    {a.label}
                </button>
            ))}
        </div>
    );
}

export default QuickActions;

