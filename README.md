# Mehedi Web Redirector

A lightweight Next.js application that redirects the home route (`/`) to:

`https://www.mehedi-hasan.me`

## Overview

This project is intentionally minimal and focused on one behavior:

- Incoming requests to `/` are redirected server-side.
- No homepage UI is rendered before redirecting.
- Built with the Next.js App Router and TypeScript.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- ESLint
- Tailwind CSS 4 (installed in the project)

## Project Structure

```text
app/
  page.tsx        # Redirect logic for "/"
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open `http://localhost:3000` and it will redirect to `https://www.mehedi-hasan.me`.

## Available Scripts

- `npm run dev` - Run local development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Redirect Configuration

The redirect is defined in `app/page.tsx` using `redirect()` from `next/navigation`:

```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("https://www.mehedi-hasan.me");
}
```

To change the destination, update the URL in this file.

## Deployment

Deploy as a standard Next.js app (for example on Vercel, VPS, or Docker).  
Once deployed, requests to `/` will continue to redirect to the configured external URL...
