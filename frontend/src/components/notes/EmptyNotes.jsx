import EmptyState from "../ui/EmptyState";

function EmptyNotes({
    icon = 'fa-note-sticky',
    title = 'No notes here yet',
    text = "Notes you create will show up here.",
}) {
    return (
        <EmptyState icon={icon} title={title} text={text} />
    );
}

export default EmptyNotes;
