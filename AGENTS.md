# AGENTS.md

Personal portfolio + blog for Sudip Ghosh, deployed at [imsudip.in](https://imsudip.in).
Forked from `ramxcodes/sleek-portfolio`, heavily customized. Next.js 15 App Router, React 19, Tailwind 4, Outstatic CMS.

## Commands

```bash
export PATH="$HOME/.bun/bin:$PATH"   # bun not in default PATH on this machine

bun install          # install deps
bun run dev          # dev server (turbopack) at :3000
bun run build        # production build — run before pushing; CI gates on this
bun run lint         # eslint
bun run knip         # dead code/dependency analysis
bun run test-telegram # validate Telegram bot config (needs TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)
```

**Build is the test.** There's no test suite. `bun run build` is the only verification gate (local + CI). Always run it before committing.

## Architecture

### Route groups (critical)

The app router is split into two route groups to isolate layouts:

- `src/app/(web)/` — all public site routes (blog, projects, journey, contact, etc.) with full chrome (Navbar, Footer, ChatBubble, OnekoCat)
- `src/app/(cms)/` — Outstatic dashboard at `/outstatic` with a minimal `<html><body id="outstatic">` wrapper (the `id` is required for Outstatic's CSS scoping)
- `src/app/api/` — API routes (chat, contact, outstatic) — NOT inside a route group

Do **not** add a top-level `src/app/layout.tsx` — it would conflict with both group layouts.

### Content: two systems, different sources

| Content              | Source                          | Reader                                         | Editor                              |
| -------------------- | ------------------------------- | ---------------------------------------------- | ----------------------------------- |
| Blog posts           | `outstatic/content/posts/*.mdx` | `src/lib/blog.ts` → `outstatic/server` helpers | Outstatic dashboard at `/outstatic` |
| Project case studies | `src/data/projects/*.mdx`       | `src/lib/project.ts` → `fs` + `gray-matter`    | Manual MDX editing                  |
| Journey              | `src/data/journey/journey.mdx`  | `src/lib/journey.ts` → `fs` + `gray-matter`    | Manual MDX editing                  |

Blog is managed via Outstatic CMS (Git-native, commits to repo). Projects and journey are still manual MDX. Don't mix the two systems.

### Outstatic CMS

- Dashboard: `/outstatic` (requires GitHub OAuth login)
- Content path: `outstatic/content/` (env `OST_CONTENT_PATH`)
- Media: uploaded to `public/images/`, served at `/images/` — configured in `outstatic/config.json`, **not** env vars
- Blocks: defined in `outstatic/blocks.json`, React components in `src/components/mdx/`, registered in `src/components/blog/BlogComponents.tsx`
- Every content save = a GitHub commit → triggers Vercel rebuild
- `outstatic/server` functions (`getDocuments`, `getDocumentBySlug`, `getDocumentSlugs`) only return fields you explicitly request — always include `'status'` in the field list or published/draft filtering breaks

### Outstatic field quirks (learned the hard way)

- **Tags** are stored as `[{ label: "x", value: "x" }]` objects, not `string[]`. `src/lib/blog.ts` has `normaliseTags()` to handle this.
- **`getDocumentBySlug` returns `null` for drafts** — it filters on `status === 'published'` internally. Use `getDocumentSlugs` (includes drafts) for `generateStaticParams`.
- Blog frontmatter mapping: Outstatic `coverImage` → `image`, `publishedAt` → `date`, `status: 'published'` → `isPublished: true`.

### Config-driven content

All site identity/content is in `src/config/` (Hero, About, Experience, Projects, Gears, Journey, ChatPrompt, CTA, etc.). To change what appears on the site, edit these files — not the page components.

### AI chat

`src/app/api/chat/route.ts` uses Vercel AI SDK (`streamText` + `@ai-sdk/openai`) with `gpt-4o-mini`. Client is `src/components/common/ChatBubble.tsx` using `useChat` from `@ai-sdk/react`. System prompt in `src/config/ChatPrompt.ts`.

## Conventions

### Zod 4

Import as `import * as z from 'zod'` (not `import { z }`). `ZodError.errors` → `ZodError.issues` (v4 breaking change, already applied in both API routes).

### Radix UI

Uses the unified `radix-ui` package (v1.6.0), not individual `@radix-ui/react-*` packages. All shadcn UI components in `src/components/ui/` import from `radix-ui`.

### MDX rendering

Blog uses `next-mdx-remote/rsc` (not `@mdx-js/react`). Custom components registered in `src/components/blog/BlogComponents.tsx`. MDX blocks (Callout, YouTubeEmbed, CodeBlock, Figure, Spoiler, LinkCard) live in `src/components/mdx/` and are registered there.

### Styling

Tailwind 4 (no `tailwind.config.js` — config is in `src/app/(web)/globals.css` via `@theme`). shadcn/ui "new-york" style, "neutral" base color. Two prettier configs: `.prettierrc` (import sorting) and `.prettierrc.json` (tailwind class sorting) — both run on commit via lint-staged.

### Commits

Conventional commits (`feat:`, `fix:`, etc.). Husky pre-commit runs lint-staged (prettier + eslint). The husky pre-commit script has deprecated shebang lines — will break in husky v10, leave for now.

## Environment

`.env` is gitignored. Required vars (see `.env` for current values):

- `OPENAI_API_KEY` — powers AI chat + Outstatic AI completions
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — contact form
- `OST_GITHUB_ID`, `OST_GITHUB_SECRET`, `OST_TOKEN_SECRET` — Outstatic GitHub OAuth
- `OST_REPO_SLUG`, `OST_REPO_OWNER`, `OST_REPO_BRANCH`, `OST_CONTENT_PATH` — Outstatic repo config
- `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_ID` — public site config

`.env.example` is stale (references `GEMINI_API_KEY` which no longer exists). Trust `.env` as source of truth.

## Gitignored personal files

`INPUTS.md`, `experience.md`, `extras.md` are gitignored — they contain personal input notes used during initial customization. Don't commit them.

## CI

`.github/workflow/lint.yml` runs on PRs to `main`: `bun install` → `bun run lint` → `bun run build` → prettier check. All must pass.

## Things to avoid

- Don't upgrade to Next.js 16 (intentional, staying on 15)
- Don't add a top-level `src/app/layout.tsx`
- Don't use `@radix-ui/react-*` individual packages — use unified `radix-ui`
- Don't read blog content from `src/data/blog/` — that directory is empty; blog content lives in `outstatic/content/posts/`
- Don't remove `bun.lockb` (legacy) alongside `bun.lock` — both exist, `bun.lock` is current
- Don't commit `.env`, `INPUTS.md`, `experience.md`, or `extras.md`
