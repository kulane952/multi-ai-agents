# Price Scout AI

Stack: Next.js, Inngest, MongoDB, OpenRouter, SerpAPI.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `SERPAPI_API_KEY`, and `MONGODB_URI`.
3. Keep `INNGEST_DEV=1` for local development.
4. Install packages with `npm install`.
5. Run Next: `npm run dev`.
6. Run Inngest Dev Server in another terminal: `npx inngest-cli@latest dev`.
7. Open `http://localhost:8288` and confirm `price-scout-workflow` is registered.
8. Open `http://localhost:3000` and search.

The workflow is sequential: Supervisor -> Product Scout -> Product Matcher -> Price Analyzer -> Deal Checker -> Comparison -> MongoDB.
