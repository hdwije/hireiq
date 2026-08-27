# HireIQ

An AI-powered HR assistant using RAG (Retrieval-Augmented Generation). Upload HR documents and ask natural-language questions, with answers grounded in your documents.

## Tech Stack

- **Monorepo:** Turborepo + pnpm
- **Frontend:** Next.js
- **Backend:** NestJS (api + worker)
- **Database:** PostgreSQL + pgvector
- **Queue:** BullMQ + Redis
- **LLM:** Ollama (local dev) / Gemini (production)

## Getting Started

### Prerequisites

- Node.js 20
- pnpm 10
- Docker Desktop
- Ollama (with `llama3.2:3b` and `nomic-embed-text` models)

### Setup

```bash
# Install dependencies
pnpm install

# Start database and Redis
docker compose up -d

# Run all apps
pnpm dev
```