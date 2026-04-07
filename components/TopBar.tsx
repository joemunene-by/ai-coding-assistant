"use client";

import React from "react";
import { Play, Settings, Code2, GitBranch, Layout } from "lucide-react";

export default function TopBar() {
  return (
    <div className="h-10 bg-editor-sidebar border-b border-editor-border flex items-center justify-between px-4 shrink-0">
      {/* Left: Logo and project name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-editor-accent" />
          <span className="text-sm font-bold text-editor-text tracking-tight">
            Joe&apos;s AI
          </span>
        </div>
        <div className="w-px h-4 bg-editor-border" />
        <div className="flex items-center gap-1.5 text-editor-muted">
          <GitBranch size={13} />
          <span className="text-xs">main</span>
        </div>
      </div>

      {/* Center: Tabs */}
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs bg-editor-accent/10 text-editor-accent transition-colors">
          <Layout size={12} />
          Editor
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-editor-green/15 text-editor-green hover:bg-editor-green/25 transition-colors"
          title="Run project"
        >
          <Play size={12} />
          Run
        </button>
        <button
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          title="Settings"
        >
          <Settings size={16} className="text-editor-muted" />
        </button>
      </div>
    </div>
  );
}
