# Chat Bot

A Next.js chat app that generates responses with the Google Gemini API.

## Requirements

- Node.js 20.9.0 or newer
- npm
- A Google Gemini API key

`package.json` and the committed `package-lock.json` are the dependency manifest and lockfile used for local installs and Vercel builds. This JavaScript project does not use a Python `requirements.txt`.

## Local development

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and set `GOOGLE_GEMINI_API_KEY` to your Gemini API key. Keep the key private; do not use a `NEXT_PUBLIC_` prefix or commit `.env.local`.
3. Start the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

Run `npm run lint` and `npm run build` to check the project.

## Deploy to Vercel

1. Push this repository to GitHub and import it into [Vercel](https://vercel.com/new).
2. Keep the detected Next.js framework and default project settings. Vercel uses `npm ci` from the lockfile and `npm run build`; no custom `vercel.json` is needed.
3. In the Vercel project's **Settings → Environment Variables**, add `GOOGLE_GEMINI_API_KEY` with the value of your Gemini API key. Select every environment where the app will run (Production, Preview, and/or Development).
4. Deploy the project. If you add or change the environment variable after deploying, redeploy for the change to take effect.

The Gemini key is read only in the server action and must remain a server-side environment variable. The deployment will build without the key, but generating responses requires it to be configured in the target environment.
