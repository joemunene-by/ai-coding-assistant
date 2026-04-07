"use client";

import React, { useState, useCallback } from "react";
import { FileNode, getDefaultFiles, flattenFiles } from "@/lib/fileSystem";
import Sidebar from "@/components/Sidebar";
import CodeEditor from "@/components/CodeEditor";
import ChatPanel from "@/components/ChatPanel";
import TopBar from "@/components/TopBar";

export default function Home() {
  const [files, setFiles] = useState<FileNode[]>(() => getDefaultFiles());
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(() => {
    const defaultFiles = getDefaultFiles();
    // Select the first file in src folder by default
    const srcFolder = defaultFiles.find(
      (f) => f.name === "src" && f.type === "folder"
    );
    if (srcFolder?.children) {
      const indexHtml = srcFolder.children.find(
        (f) => f.name === "index.html"
      );
      return indexHtml || null;
    }
    return null;
  });

  const handleSelectFile = useCallback(
    (file: FileNode) => {
      if (file.type === "file") {
        // Find the actual file in the current files state
        const findInTree = (nodes: FileNode[]): FileNode | null => {
          for (const node of nodes) {
            if (node === file) return node;
            if (node.type === "folder" && node.children) {
              const found = findInTree(node.children);
              if (found) return found;
            }
          }
          return null;
        };
        // Try to find the exact reference; if not found use the passed file
        const found = findInTree(files);
        setSelectedFile(found || file);
      }
    },
    [files]
  );

  const handleContentChange = useCallback(
    (content: string) => {
      if (!selectedFile) return;

      const updateContent = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node === selectedFile) {
            return { ...node, content };
          }
          if (node.type === "folder" && node.children) {
            return { ...node, children: updateContent(node.children) };
          }
          return node;
        });
      };

      setFiles((prev) => {
        const updated = updateContent(prev);
        // Update selectedFile reference to the new object
        const findUpdated = (nodes: FileNode[]): FileNode | null => {
          for (const node of nodes) {
            if (node.name === selectedFile.name && node.content === content) {
              return node;
            }
            if (node.type === "folder" && node.children) {
              const found = findUpdated(node.children);
              if (found) return found;
            }
          }
          return null;
        };
        const newSelected = findUpdated(updated);
        if (newSelected) {
          setSelectedFile(newSelected);
        }
        return updated;
      });
    },
    [selectedFile]
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          files={files}
          selectedFile={selectedFile}
          onSelectFile={handleSelectFile}
        />
        <CodeEditor
          file={selectedFile}
          onContentChange={handleContentChange}
        />
        <ChatPanel />
      </div>
    </div>
  );
}
