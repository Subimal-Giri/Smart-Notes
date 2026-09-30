import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import NoteToolbar from "./NoteToolbar.jsx";
import "../../styles/editor.css";


function NoteEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false, autolink: true }),
            Placeholder.configure({ placeholder: 'Start writing your note…' }),
        ],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    useEffect(() => {
        if (editor && content && editor.isEmpty) {
            editor.commands.setContent(content, false);
        }
    }, [editor]);

    return (
        <div className="note-editor-wrap">
            <NoteToolbar editor={editor} />
            <div className="editor-content-wrap">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default NoteEditor;
