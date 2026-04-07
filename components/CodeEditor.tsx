"use client";

import React from "react";
import Editor from "@monaco-editor/react";
import { FileNode } from "@/lib/fileSystem";
import { X, Code2 } from "lucide-react";

interface CodeEditorProps {
  file: FileNode | null;
  onContentChange: (content: string) => void;
}

function getLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "html":
      return "html";
    case "css":
    case "scss":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "py":
      return "python";
    default:
      return "plaintext";
  }
}

export default function CodeEditor({ file, onContentChange }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-editor-bg">
        <div className="text-center">
          <Code2 size={48} className="mx-auto mb-4 text-editor-muted/50" />
          <p className="text-editor-muted text-lg">No file selected</p>
          <p className="text-editor-muted/60 text-sm mt-1">
            Select a file from the sidebar to start editing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-editor-bg">
      {/* Editor tab */}
      <div className="flex items-center border-b border-editor-border bg-editor-sidebar">
        <div className="flex items-center gap-2 px-4 py-2 bg-editor-bg border-r border-editor-border text-sm">
          <span className="text-editor-text">{file.name}</span>
          <button className="p-0.5 rounded hover:bg-white/10 transition-colors">
            <X size={12} className="text-editor-muted" />
          </button>
        </div>
      </div>

      {/* Monaco editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguage(file.name)}
          value={file.content || ""}
          theme="vs-dark"
          onChange={(value) => onContentChange(value || "")}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: true, scale: 1 },
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            lineNumbers: "on",
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            tabSize: 2,
            wordWrap: "on",
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
