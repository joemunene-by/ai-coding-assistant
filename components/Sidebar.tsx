"use client";

import React from "react";
import { Files, Plus, Search } from "lucide-react";
import { FileNode } from "@/lib/fileSystem";
import FileTree from "./FileTree";

interface SidebarProps {
  files: FileNode[];
  selectedFile: FileNode | null;
  onSelectFile: (file: FileNode) => void;
}

export default function Sidebar({
  files,
  selectedFile,
  onSelectFile,
}: SidebarProps) {
  return (
    <div className="w-60 bg-editor-sidebar border-r border-editor-border flex flex-col h-full shrink-0">
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-editor-border">
        <div className="flex items-center gap-2">
          <Files size={16} className="text-editor-muted" />
          <span className="text-xs font-semibold uppercase tracking-wider text-editor-muted">
            Explorer
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="New file"
          >
            <Plus size={14} className="text-editor-muted" />
          </button>
          <button
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Search"
          >
            <Search size={14} className="text-editor-muted" />
          </button>
        </div>
      </div>

      {/* Project name */}
      <div className="px-3 py-2 border-b border-editor-border">
        <span className="text-xs font-medium text-editor-text">MY-APP</span>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto py-1">
        <FileTree
          files={files}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />
      </div>

      {/* Sidebar footer */}
      <div className="px-3 py-2 border-t border-editor-border">
        <div className="text-xs text-editor-muted">
          {files.length} items
        </div>
      </div>
    </div>
  );
}
