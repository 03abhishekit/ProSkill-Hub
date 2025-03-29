

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ input, setInput }) => {
  // Initialize Tiptap editor with StarterKit and content
  const editor = useEditor({
    extensions: [StarterKit],
    content: input.description || "", // Initial content
    onUpdate: ({ editor }) => {
        setInput((prev) => ({ ...prev, description: editor.getHTML() })); // Update parent state with editor's HTML content
    },
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-300 dark:border-gray-700">
      {/* Label for the Editor */}
      <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Description
      </label>

      {/* Editor Content */}
      <div
        className="prose dark:prose-dark max-w-none focus:outline-none border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[200px] transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
      >
        <EditorContent editor={editor} />
      </div>

      {/* Feedback for editor initialization */}
      {!editor && (
        <div className="text-gray-500 text-sm mt-2">
          Editor is initializing. Please wait...
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;



