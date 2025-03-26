import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'



const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write your course description...',
      }),
    ],
    content: input.description,
    onUpdate: ({ editor }) => {
      setInput({ ...input, description: editor.getHTML() })
    },
  })

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('bold') ? 'bg-blue-100' : ''}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('italic') ? 'bg-blue-100' : ''}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${editor?.isActive('underline') ? 'bg-blue-100' : ''}`}
        >
          U
        </button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px]" />
    </div>
  )
}

export default RichTextEditor
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const RichTextEditor = ({input, setInput}) => {

//     const handleChange = (content) => {
//         setInput({...input, description:content});
//     }
   
//   return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
// }
// export default RichTextEditor