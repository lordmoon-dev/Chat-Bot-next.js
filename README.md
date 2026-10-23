# Novara - Your AI Companion

Novara is a lightweight AI chat application for asking questions and getting helpful responses from Google Gemini. It combines a responsive, dark interface with a glowing violet-and-blue visual identity, a focused chat experience, and a server-side Gemini integration.

## Contents

- [Project overview](#project-overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Available commands](#available-commands)
- [How it works](#how-it-works)
- [Deployment](#deployment)
- [Security and privacy](#security-and-privacy)
- [Current scope](#current-scope)
- [Contributing](#contributing)

## Project overview

Novara is designed to make starting a conversation feel simple:

1. Open the app and enter a question in the centered composer.
2. Submit it to display the conversation view.
3. See a thinking indicator while Novara generates a response.
4. Read the answer, rendered with Markdown formatting.

The interface adapts to smaller screens, keeps the composer available while chatting, and scrolls the conversation independently between the header and composer.

## Features

- Responsive landing and conversation layouts.
- Novara branding, a glowing orb, and a dark violet-and-blue color palette.
- Translucent glass-style header, composer, and conversation cards.
- A loading indicator while Gemini generates an answer.
- Markdown rendering for formatted responses.
- Server-side Gemini API calls so the API key is not sent to the browser.
- Accessible labels for the message input, send button, conversation, and loading status.
- Reduced-motion support for users who prefer less animation.
- A user-visible error message if response generation fails.

## Technology stack

| Area | Technology |
| --- | --- |
| Application framework | Next.js 16 App Router |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 utilities and application CSS |
| Generative AI | Google GenAI SDK (`@google/genai`) with the `gemini-3.6-flash` model |
| Markdown | `react-markdown` |
| Linting | ESLint 9 with Next.js configurations |
| Package manager | npm |

## Project structure

```text
.
├── app/
│   ├── actions/
│   │   └── aiActions.ts      # Server action that requests a Gemini response
│   ├── favicon.ico           # Application favicon
│   ├── globals.css           # Global theme, layout, glass effects, and animations
│   ├── layout.tsx            # Root layout, fonts, and page metadata
│   └── page.tsx              # Novara landing page and chat interface
├── public/
│   ├── file.svg              # Static asset
│   ├── globe.svg             # Static asset
│   ├── next.svg              # Static asset
│   ├── vercel.svg            # Static asset
│   └── window.svg            # Static asset
├── .env.example              # Example environment variable configuration
├── .gitignore                # Git ignore rules, including local environment files
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package-lock.json         # Locked npm dependency versions
├── package.json              # Dependencies and project scripts
├── postcss.config.mjs         # Tailwind CSS PostCSS plugin
├── tsconfig.json             # TypeScript configuration and path aliases
├── AGENTS.md                 # Repository guidance for AI coding agents
├── CLAUDE.md                 # Additional repository guidance
└── README.md                 # Project documentation
```

## Requirements

- Node.js 20.9.0 or newer
- npm
- A Google Gemini API key

## Getting started

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/lordmoon-dev/Chat-Bot-next.js.git
   cd Chat-Bot-next.js
   ```

2. Install the locked dependencies:

   ```bash
   npm ci
   ```

3. Create a local environment file from the example:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell, use:

   ```powershell
   Copy-Item .env.example .env.local
   ```

4. Add your Gemini API key to `.env.local`:

   ```dotenv
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `GOOGLE_GEMINI_API_KEY` | Yes, to generate responses | Server-side Google Gemini API key. |

The app can render without the key, but sending a prompt will fail until `GOOGLE_GEMINI_API_KEY` is configured. Keep the key private: do not add a `NEXT_PUBLIC_` prefix and do not commit `.env.local` or other secret-bearing environment files.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm start` | Start the production server after building. |

Before submitting a change, run the relevant checks:

```bash
npm run lint
npm run build
```

## How it works

1. The client-side chat in `app/page.tsx` accepts a prompt and adds it to the visible conversation.
2. The client calls the `generateTextAction` server action in `app/actions/aiActions.ts`.
3. The server action reads `GOOGLE_GEMINI_API_KEY`, creates a Google GenAI client, and sends the prompt to `gemini-3.6-flash`.
4. The completed response is returned to the page and rendered using `react-markdown`.
5. While the request is in progress, the interface shows a Novara-themed thinking indicator.

## Deployment

### Deploying to Vercel

1. Push the repository to GitHub and import it into [Vercel](https://vercel.com/new).
2. Keep the detected Next.js framework and default build settings.
3. In **Project Settings → Environment Variables**, add `GOOGLE_GEMINI_API_KEY` for each environment where the app will run (Production, Preview, and/or Development).
4. Deploy the project. If you add or change the key after deployment, redeploy for the updated setting to take effect.

The Gemini key is used only by the server action. A build can complete without the key, but prompt generation requires it at runtime.

## Security and privacy

- Store the Gemini API key in a server-side environment variable.
- Never commit real API keys, `.env.local`, or other secret-bearing files.
- Prompts are sent to Google Gemini to generate responses. Follow Google's API terms and privacy guidance when using the service.
- Conversation messages are held in the current page's client-side state. They are not saved to a database or restored after a page reload.

## Current scope

- Responses are returned after Gemini finishes generating them; the app does not stream partial tokens.
- Each prompt is sent as an individual Gemini interaction. Earlier messages are shown in the interface but are not included as conversation context in later Gemini requests.
- The application currently has no accounts, database, server-side chat history, or persistent storage.

## Contributing

Contributions are welcome. To propose a change:

1. Create a branch for your work.
2. Keep changes focused and follow the existing TypeScript, React, and CSS patterns.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request describing the change and how it was verified.

## License

No license is currently specified in this repository. Contact the project owner before redistributing or reusing the project.
