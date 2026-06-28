# imsudip.in

Personal portfolio and blog for Sudip Ghosh — engineer, builder, and occasional blogger. Built with Next.js 15, React 19, Tailwind 4, and Outstatic CMS. Live at [imsudip.in](https://imsudip.in).

The initial scaffold was inspired by [ramxcodes/sleek-portfolio](https://github.com/ramxcodes/sleek-portfolio). The codebase has since been substantially rewritten — different CMS, different AI stack, different content architecture — so this is not a fork. Credit where it's due for the starting point.

## What's here

- **Portfolio** — hero, about, work experience timeline, project case studies, gears, journey
- **Blog** — managed via [Outstatic](https://outstatic.com) CMS at `/outstatic`, Git-native (every post is a commit), with AI writing completions
- **AI chat assistant** — floating chat bubble powered by Vercel AI SDK + OpenAI `gpt-4o-mini`
- **Contact form** — sends messages to Telegram via a bot
- **Analytics** — Umami, privacy-friendly
- **Dark/light mode** — system-aware, with view transitions
- **MDX blocks** — Callout, YouTubeEmbed, CodeBlock, Figure, Spoiler, LinkCard — available in the Outstatic editor via slash command

## Tech stack

| Layer           | Choice                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router, Turbopack)                                     |
| UI              | React 19, Tailwind 4, shadcn/ui (new-york), Radix UI (unified package) |
| CMS             | Outstatic v2 (Git-native, GitHub OAuth, built-in AI)                   |
| AI              | Vercel AI SDK + OpenAI                                                 |
| MDX             | `next-mdx-remote/rsc` + `@shikijs/rehype` for syntax highlighting      |
| Validation      | Zod 4                                                                  |
| Package manager | Bun                                                                    |
| Deploy          | Vercel                                                                 |

## Getting started

```bash
# bun isn't in the default PATH on some machines
export PATH="$HOME/.bun/bin:$PATH"

bun install
bun run dev    # http://localhost:3000
```

Build is the only verification gate — there's no test suite:

```bash
bun run build  # run before pushing
```

## Environment variables

Copy `.env.example` and fill in the values. The example file may be stale — refer to the list below as the source of truth.

```env
# AI chat + Outstatic AI completions
OPENAI_API_KEY="sk-..."

# Contact form (create a bot via @BotFather)
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."

# Outstatic CMS — create a GitHub OAuth app at https://github.com/settings/applications/new
# Callback URL: http://localhost:3000/api/outstatic/callback (dev) / https://imsudip.in/api/outstatic/callback (prod)
OST_GITHUB_ID="..."
OST_GITHUB_SECRET="..."
OST_TOKEN_SECRET="..."   # generate with: openssl rand -hex 32
OST_REPO_SLUG="imsudip.in"
OST_REPO_OWNER="imsudip"
OST_REPO_BRANCH="main"
OST_CONTENT_PATH="outstatic/content"

# Public site config
NEXT_PUBLIC_URL="https://imsudip.in"
NEXT_PUBLIC_UMAMI_SRC="https://cloud.umami.is/script.js"
NEXT_PUBLIC_UMAMI_ID="..."
```

Validate Telegram config:

```bash
bun run test-telegram
```

## Architecture

### Route groups

The app router is split into two route groups to isolate layouts:

- `src/app/(web)/` — public site (blog, projects, journey, contact, etc.) with full chrome (Navbar, Footer, ChatBubble, OnekoCat)
- `src/app/(cms)/` — Outstatic dashboard at `/outstatic` with a minimal `<html><body id="outstatic">` wrapper
- `src/app/api/` — API routes (chat, contact, outstatic)

No top-level `src/app/layout.tsx` — it would conflict with both group layouts.

### Content systems

| Content              | Source                          | Editor                              |
| -------------------- | ------------------------------- | ----------------------------------- |
| Blog posts           | `outstatic/content/posts/*.mdx` | Outstatic dashboard at `/outstatic` |
| Project case studies | `src/data/projects/*.mdx`       | Manual MDX editing                  |
| Journey              | `src/data/journey/journey.mdx`  | Manual MDX editing                  |

Blog is Git-native via Outstatic — every save is a GitHub commit that triggers a Vercel rebuild. Projects and journey are still manual MDX.

### Config-driven content

All site identity and content lives in `src/config/` (Hero, About, Experience, Projects, Gears, Journey, ChatPrompt, CTA, etc.). To change what appears on the site, edit these files — not the page components.

### MDX blocks

Custom blocks for the blog editor, defined in `outstatic/blocks.json` with matching React components in `src/components/mdx/`:

- **Callout** — info/warning/tip/danger note boxes
- **YouTubeEmbed** — embed by URL or video ID
- **CodeBlock** — code with filename/language label
- **Figure** — image with caption
- **Spoiler** — collapsible content
- **LinkCard** — bookmark card for external links

Type `/` in the Outstatic editor to insert any block.

### Media

Uploaded images are committed to `public/images/` and served at `/images/`. Configured in `outstatic/config.json`, not env vars.

## Customization

### Adding a new page

1. Create `src/app/(web)/your-page/page.tsx`
2. Add it to the navbar in `src/config/Navbar.tsx`
3. Add metadata in `src/config/Meta.tsx`

### Adding a new technology icon

1. Find the icon on [Devicon](https://devicon.dev/)
2. Create a component in `src/components/technologies/`
3. Follow the existing component structure

### Adding a new MDX block

1. Write a React component in `src/components/mdx/`
2. Register it in `src/components/blog/BlogComponents.tsx`
3. Add the block definition to `outstatic/blocks.json` (or via the dashboard's Block Library UI)

## License

MIT — see [LICENSE](LICENSE).
