"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  FileType,
} from "lucide-react";
import { FileNode } from "@/lib/fileSystem";

interface FileTreeProps {
  files: FileNode[];
  selectedFile: FileNode | null;
  onSelectFile: (file: FileNode) => void;
  depth?: number;
}

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return <FileCode size={16} className="text-editor-yellow" />;
    case "json":
      return <FileJson size={16} className="text-editor-green" />;
    case "css":
    case "scss":
      return <FileType size={16} className="text-editor-blue" />;
    case "html":
      return <FileCode size={16} className="text-editor-red" />;
    case "md":
      return <FileText size={16} className="text-editor-muted" />;
    default:
      return <FileText size={16} className="text-editor-muted" />;
  }
}

export default function FileTree({
  files,
  selectedFile,
  onSelectFile,
  depth = 0,
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src"])
  );

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <div className="select-none">
      {files.map((node) => {
        const isExpanded = expandedFolders.has(node.name);
        const isSelected = selectedFile === node;

        if (node.type === "folder") {
          return (
            <div key={node.name}>
              <div
                className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-white/5 rounded-md transition-colors"
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                onClick={() => toggleFolder(node.name)}
              >
                {isExpanded ? (
                  <ChevronDown size={14} className="text-editor-muted shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-editor-muted shrink-0" />
                )}
                {isExpanded ? (
                  <FolderOpen size={16} className="text-editor-accent shrink-0" />
                ) : (
                  <Folder size={16} className="text-editor-accent shrink-0" />
                )}
                <span className="text-sm truncate">{node.name}</span>
              </div>
              {isExpanded && node.children && (
                <FileTree
                  files={node.children}
                  selectedFile={selectedFile}
                  onSelectFile={onSelectFile}
                  depth={depth + 1}
                />
              )}
            </div>
          );
        }

        return (
          <div
            key={node.name}
            className={`flex items-center gap-1.5 px-2 py-1 cursor-pointer rounded-md transition-colors ${
              isSelected
                ? "bg-editor-accent/15 text-editor-accent"
                : "hover:bg-white/5"
            }`}
            style={{ paddingLeft: `${depth * 12 + 24}px` }}
            onClick={() => onSelectFile(node)}
          >
            {getFileIcon(node.name)}
            <span className="text-sm truncate">{node.name}</span>
          </div>
        );
      })}
    </div>
  );
}
