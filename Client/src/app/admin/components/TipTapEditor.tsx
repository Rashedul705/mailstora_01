'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import CharacterCount from '@tiptap/extension-character-count';

interface TipTapEditorProps {
    content: string;
    onChange: (content: string) => void;
    onWordCountChange?: (words: number) => void;
    onCharCountChange?: (chars: number) => void;
}

export default function TipTapEditor({ content, onChange, onWordCountChange, onCharCountChange }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: false, // We're using the standalone blockquote extension for custom styles if needed
                codeBlock: false,
                horizontalRule: false,
            }),
            Image,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Write your post content here...',
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CodeBlock,
            Blockquote,
            HorizontalRule,
            CharacterCount,
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
            if (onWordCountChange) onWordCountChange(editor.storage.characterCount.words());
            if (onCharCountChange) onCharCountChange(editor.storage.characterCount.characters());
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="tiptap-editor-wrapper">
            <div className="tiptap-toolbar">
                <select 
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'p') editor.chain().focus().setParagraph().run();
                        if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
                        if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    value={editor.isActive('heading', { level: 2 }) ? 'h2' : editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'}
                    className="toolbar-select"
                >
                    <option value="p">Paragraph</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                </select>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <s>S</s>
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    1. List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    ""
                </button>
                <div className="toolbar-divider"></div>
                <button type="button" onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                    Link
                </button>
                <button type="button" onClick={addImage}>
                    Image
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code
                </button>
                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    ---
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    Redo
                </button>
            </div>
            <EditorContent editor={editor} className="tiptap-content-area" />
        </div>
    );
}
