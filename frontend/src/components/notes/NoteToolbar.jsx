function NoteToolbar({ editor }) {
    if (!editor) return null;

    const setLink = () => {
        const prevUrl = editor.getAttributes('link').href;
        const url = window.prompt('Link URL', prevUrl || 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const buttons = [
        { icon: 'fa-bold', title: 'Bold (Ctrl+B)', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
        { icon: 'fa-italic', title: 'Italic (Ctrl+I)', action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
        { icon: 'fa-underline', title: 'Underline (Ctrl+U)', action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline') },
        { icon: 'fa-strikethrough', title: 'Strikethrough', action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike') },
        { divider: true },
        { label: 'H1', title: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
        { label: 'H2', title: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
        { label: 'H3', title: 'Heading 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
        { divider: true },
        { icon: 'fa-list-ul', title: 'Bullet list', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
        { icon: 'fa-list-ol', title: 'Numbered list', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
        { icon: 'fa-quote-left', title: 'Blockquote', action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
        { divider: true },
        { icon: 'fa-code', title: 'Inline code', action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code') },
        { icon: 'fa-file-code', title: 'Code block', action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
        { icon: 'fa-link', title: 'Link', action: setLink, active: editor.isActive('link') },
        { divider: true },
        { icon: 'fa-minus', title: 'Divider', action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
        { divider: true },
        { icon: 'fa-rotate-left', title: 'Undo (Ctrl+Z)', action: () => editor.chain().focus().undo().run(), active: false },
        { icon: 'fa-rotate-right', title: 'Redo (Ctrl+Y)', action: () => editor.chain().focus().redo().run(), active: false },
    ];

    return (
        <div className="editor-toolbar">
            {buttons.map((btn, i) =>
                btn.divider ? (
                <span key={i} className="toolbar-divider" />
                ) : (
                <button
                    key={i}
                    type="button"
                    title={btn.title}
                    className={`toolbar-btn${btn.active ? ' active' : ''}`}
                    onClick={btn.action}
                    disabled={btn.loading}
                >
                    {btn.loading
                    ? <i className="fa-solid fa-circle-notch fa-spin" />
                    : btn.icon ? <i className={`fa-solid ${btn.icon}`} /> : btn.label}
                </button>
                )
            )}
        </div>
    );
}

export default NoteToolbar;
