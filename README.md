# Aaditya Padiya — Cinematic Portfolio

Premium Next.js portfolio with 3D (React Three Fiber), GSAP scroll storytelling, Lenis smooth scroll, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The first `GET /` in dev can take several seconds while Next.js compiles (Turbopack). Production (`npm run build` + `npm start`) is much faster.

## Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Deploy — no extra env vars required.

**Live site:** [aadityapadiya.vercel.app](https://aadityapadiya.vercel.app)

Or use the CLI:

```bash
npx vercel
```

## Customize content

Edit `src/lib/data/site-config.ts`, `projects.ts`, and `skill-groups.ts` for copy, projects, and skills.

## Performance

- Project gallery images load only when scrolled near (`LazyImage` + Intersection Observer).
- Hero photo uses `priority` on desktop only (correct LCP).
- Images use AVIF/WebP via Next.js Image Optimization.
