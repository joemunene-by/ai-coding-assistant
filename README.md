# Joe's AI

Joe's AI - A powerful, AI-powered coding assistant web application built with Next.js, TypeScript, and Google Gemini API. This application provides two main features:

1. **AI Chat Assistant** - ChatGPT/Claude-like interface powered by Google Gemini API (free tier available)
2. **Code Editor Assistant** - Complete development environment with code editor, project management, and AI-powered coding assistance

Similar to Cursor or Claude, this application provides a complete development environment with chat interface, code editor, project management, and more. Powered entirely by Google Gemini API.

## Features

### 🎯 AI Chat Assistant (Powered by Google Gemini)

- **Natural Conversations** - Chat naturally on any topic with context-aware responses
- **Code Generation** - Get help with coding, debugging, and code explanations
- **Streaming Responses** - Real-time word-by-word response streaming
- **Multiple Conversations** - Create, manage, and organize multiple chat threads
- **Code Highlighting** - Syntax-highlighted code blocks with copy functionality
- **Markdown Support** - Rich text formatting with markdown
- **Smart Title Generation** - Auto-generate conversation titles
- **Pin Conversations** - Pin important chats for easy access
- **Search** - Search through your conversation history
- **Free Tier** - Uses Google Gemini API with 60 requests/minute free tier

### 🛠️ Code Editor Assistant

### Core Features

- **Chat Interface**
  - Clean, modern chat UI with message bubbles
  - User messages on right, AI responses on left
  - Syntax-highlighted code blocks in responses
  - Copy button for each code block
  - Loading indicator while AI responds
  - Auto-scroll to latest message

- **Code Editor Panel**
  - Split screen: Chat on left (60%), Code editor on right (40%)
  - Monaco Editor (VS Code's editor) with syntax highlighting
  - Support for multiple programming languages
  - Line numbers, code formatting
  - Full-screen toggle for editor
  - Download code button
  - Copy all code button

- **AI Capabilities (OpenAI & Claude API)**
  - Generate complete code from descriptions
  - Debug and fix code
  - Explain code functionality
  - Suggest improvements
  - Answer coding questions
  - Support multiple programming languages
  - Context-aware responses
  - **Supports both OpenAI and Claude AI**
  - Switch between providers in settings
  - OpenAI offers free tier with $5 credit

- **Project Management**
  - Save multiple projects with persistent storage (localStorage)
  - List of saved projects in sidebar
  - Load previous projects
  - Delete projects
  - Auto-save as user works
  - Export project as ZIP

- **Advanced Features**
  - Multi-file project support (create/switch between files)
  - Live preview for HTML/CSS/JS (in iframe)
  - Template library (React app, landing page, todo app)
  - Dark/light mode toggle
  - Responsive design (mobile-friendly)
  - Keyboard shortcuts (Ctrl+Enter to send)

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Code Editor**: Monaco Editor (VS Code's editor)
- **AI**: Google Gemini API
- **Storage**: localStorage
- **Markdown**: React Markdown with syntax highlighting
- **File Export**: JSZip

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- **Google Gemini API key (FREE)** from [Google AI Studio](https://makersuite.google.com/app/apikey)
  - Free tier: 60 requests per minute
  - No credit card required

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-coding-assistant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Quick Start

1. **AI Chat Assistant** (`/chat`):
   - Click "AI Chat Assistant" on the landing page
   - Enter your Gemini API key in settings (free from Google AI Studio)
   - Start chatting!

2. **Code Editor** (`/app`):
   - Click "Code Editor" on the landing page
   - Configure Gemini API key in settings (same key as chat)
   - Start coding with AI assistance

### Configuration

#### Option 1: Backend API Key (Recommended - No Setup Required)

Set your API key as an environment variable to use the app without entering it in settings:

1. Create a `.env.local` file in the root directory:
   ```bash
   echo "GEMINI_API_KEY=your-api-key-here" > .env.local
   ```

2. Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Add your key to `.env.local`:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

4. Restart the development server:
   ```bash
   npm run dev
   ```

5. **That's it!** You can now use the app immediately without entering the API key in settings.

#### Option 2: Frontend API Key (Settings)

If you prefer to set the API key through the app:

1. Click on the Settings icon (top right)
2. Enter your Gemini API key:
   - Get your free key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Free tier: 60 requests per minute
   - No credit card required
3. Select a model (Gemini 1.5 Flash recommended - fast and free)
4. Configure temperature settings
5. Save settings

**Note**: 
- If you set `GEMINI_API_KEY` environment variable, you don't need to enter it in settings
- Your API key is stored locally in your browser (if using Option 2) and never sent to external servers
- The backend environment variable takes priority over settings API key

## Usage

### Creating a Project

1. Click the "+" button in the sidebar
2. Choose from available templates or start with an empty project
3. Start coding or ask the AI for help

### Chatting with AI

1. Type your question or request in the chat input
2. Press Enter or Ctrl+Enter to send
3. The AI will respond with code, explanations, or suggestions
4. Copy code blocks directly from the chat

### Editing Code

1. Use the code editor on the right side
2. Switch between files using tabs
3. Create new files with the "+" button
4. Toggle live preview (for HTML/CSS/JS projects) with the eye icon
5. Download files or export entire project as ZIP

### Keyboard Shortcuts

- `Ctrl+Enter` or `Cmd+Enter`: Send message in chat
- `Esc`: Cancel editing project name

## Project Structure

```
├── app/
│   ├── app/
│   │   └── page.tsx          # Main application page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── chat-panel.tsx        # Chat interface
│   ├── code-editor-panel.tsx # Code editor with Monaco
│   ├── live-preview.tsx      # Live preview for HTML/CSS/JS
│   ├── main-app.tsx          # Main app layout
│   ├── settings-dialog.tsx   # Settings modal
│   └── sidebar.tsx           # Project sidebar
├── lib/
│   ├── api.ts                # Claude API integration
│   ├── storage.ts            # localStorage utilities
│   ├── templates.ts          # Project templates
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utility functions
└── package.json
```

## Features in Detail

### Templates

Pre-built templates to get you started:
- **React App**: Basic React application with component structure
- **Landing Page**: Modern, responsive landing page
- **Todo App**: Simple todo list application

### Live Preview

For HTML/CSS/JS projects, you can toggle live preview to see your code in action in real-time.

### Multi-File Support

Create and manage multiple files in a single project. Switch between files using tabs, and organize your codebase efficiently.

### Export Options

- Download individual files
- Export entire project as ZIP
- Copy code to clipboard

## Customization

### Themes

Toggle between light and dark mode in settings. The app defaults to dark mode.

### Models

**Gemini Models**:
- Gemini 1.5 Flash (Recommended - Fast & Free)
  - 60 requests per minute (free tier)
  - Fast responses
  - Good for most tasks
- Gemini 1.5 Pro (More Capable)
  - Better for complex tasks
  - Higher rate limits (paid)

### Temperature

Adjust the temperature slider to control the creativity of AI responses (0 = focused, 1 = creative).

## Limitations

- Projects are stored locally in your browser (localStorage)
- API key is required for AI features
- Rate limits: 60 requests per minute (Gemini free tier)
- **Security Note**: API keys are used through backend API routes for security

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

