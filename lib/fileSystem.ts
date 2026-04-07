export interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
  language?: string;
}

const defaultFiles: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "index.html",
        type: "file",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <header class="header">
      <h1>Welcome to My App</h1>
      <p>Built with the AI Coding Assistant</p>
    </header>
    <main class="main">
      <div class="card">
        <h2>Getting Started</h2>
        <p>Edit this file to start building your application.</p>
        <button id="actionBtn" class="btn">Click Me</button>
        <p id="output" class="output"></p>
      </div>
    </main>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
      },
      {
        name: "style.css",
        type: "file",
        language: "css",
        content: `/* Main Styles */
:root {
  --primary: #89b4fa;
  --bg-dark: #1e1e2e;
  --bg-card: #2a2a3c;
  --text: #cdd6f4;
  --text-muted: #6c7086;
  --border: #363649;
  --radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), #cba6f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
}

.card h2 {
  margin-bottom: 1rem;
}

.card p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.btn {
  background: var(--primary);
  color: var(--bg-dark);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.output {
  margin-top: 1rem;
  font-weight: 500;
  color: var(--primary) !important;
  min-height: 1.5rem;
}`,
      },
      {
        name: "app.js",
        type: "file",
        language: "javascript",
        content: `// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('actionBtn');
  const output = document.getElementById('output');
  let clickCount = 0;

  btn.addEventListener('click', () => {
    clickCount++;
    const messages = [
      'Hello, World!',
      'You clicked again!',
      'Keep going...',
      'You are on fire!',
      'Impressive clicking skills!',
    ];
    const msg = messages[Math.min(clickCount - 1, messages.length - 1)];
    output.textContent = \`\${msg} (Click #\${clickCount})\`;

    // Add a fun animation
    output.style.transform = 'scale(1.1)';
    setTimeout(() => {
      output.style.transform = 'scale(1)';
    }, 150);
  });

  console.log('App initialized successfully!');
});`,
      },
    ],
  },
  {
    name: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A simple web application",
  "main": "src/app.js",
  "scripts": {
    "start": "serve src",
    "dev": "serve src --reload"
  }
}`,
  },
  {
    name: "README.md",
    type: "file",
    language: "markdown",
    content: `# My App

A simple web application built with the AI Coding Assistant.

## Getting Started

Open \`src/index.html\` in your browser to view the app.

## Structure

- \`src/index.html\` - Main HTML file
- \`src/style.css\` - Styles
- \`src/app.js\` - Application logic
`,
  },
];

export function getDefaultFiles(): FileNode[] {
  return JSON.parse(JSON.stringify(defaultFiles));
}

export function findFile(
  files: FileNode[],
  path: string[]
): FileNode | undefined {
  if (path.length === 0) return undefined;

  const [current, ...rest] = path;
  const node = files.find((f) => f.name === current);

  if (!node) return undefined;
  if (rest.length === 0) return node;
  if (node.type === "folder" && node.children) {
    return findFile(node.children, rest);
  }

  return undefined;
}

export function getFilePath(file: FileNode, files: FileNode[]): string[] {
  for (const node of files) {
    if (node === file) return [node.name];
    if (node.type === "folder" && node.children) {
      const childPath = getFilePath(file, node.children);
      if (childPath.length > 0) return [node.name, ...childPath];
    }
  }
  return [];
}

export function flattenFiles(files: FileNode[]): FileNode[] {
  const result: FileNode[] = [];
  for (const node of files) {
    if (node.type === "file") {
      result.push(node);
    }
    if (node.type === "folder" && node.children) {
      result.push(...flattenFiles(node.children));
    }
  }
  return result;
}
