# imsudip.in

Personal website and blog for Sudip Ghosh. Built with Next.js 15, React 19, Tailwind CSS 4, and Outstatic CMS. The site is available at **https://imsudip.in**.

## Features

- **Portfolio** — hero section, about, experience timeline, project case studies, gear, and personal journey
- **Blog** — powered by Outstatic CMS with Git-native publishing and AI-assisted writing
- **AI Assistant** — floating chat assistant built with the Vercel AI SDK and OpenAI
- **Contact Form** — forwards messages directly to Telegram
- **Analytics** — privacy-friendly analytics using Umami
- **Theme Support** — system-aware dark/light mode with view transitions
- **Custom MDX Components** — reusable blocks including Callout, YouTubeEmbed, CodeBlock, Figure, Spoiler, and LinkCard

## Tech Stack

| Layer           | Technology                                    |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 15 (App Router, Turbopack)            |
| UI              | React 19, Tailwind CSS 4, shadcn/ui, Radix UI |
| CMS             | Outstatic v2                                  |
| AI              | Vercel AI SDK + OpenAI                        |
| MDX             | next-mdx-remote + Shiki syntax highlighting   |
| Validation      | Zod 4                                         |
| Package Manager | Bun                                           |
| Deployment      | Vercel                                        |

## Getting Started

```bash

bun install
bun run dev
```

The development server will be available at:

```
http://localhost:3000
```

Before pushing changes, ensure the project builds successfully:

```bash
bun run build
```

Currently, the project does not include an automated test suite.

## Environment Variables

Copy `.env.example` and provide the required values. If there's any discrepancy, the list below is the authoritative reference.

```env
# AI chat + Outstatic AI
OPENAI_API_KEY="sk-..."

# Contact form
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."

# Outstatic GitHub OAuth
OST_GITHUB_ID="..."
OST_GITHUB_SECRET="..."
OST_TOKEN_SECRET="..."
OST_REPO_SLUG="imsudip.in"
OST_REPO_OWNER="imsudip"
OST_REPO_BRANCH="main"
OST_CONTENT_PATH="outstatic/content"

# Public configuration
NEXT_PUBLIC_URL="https://imsudip.in"
NEXT_PUBLIC_UMAMI_SRC="https://cloud.umami.is/script.js"
NEXT_PUBLIC_UMAMI_ID="..."
```

To verify your Telegram configuration:

```bash
bun run test-telegram
```

## Project Structure

### Route Groups

The application is split into two route groups:

- `src/app/(web)/` — public-facing website
- `src/app/(cms)/` — Outstatic dashboard
- `src/app/api/` — API routes

Each group has its own layout, so there is intentionally no top-level `src/app/layout.tsx`.

### Content

| Content              | Source                          |
| -------------------- | ------------------------------- |
| Blog posts           | `outstatic/content/posts/*.mdx` |
| Project case studies | `src/data/projects/*.mdx`       |
| Journey              | `src/data/journey/journey.mdx`  |

Blog posts are managed through Outstatic, with each publish creating a Git commit that automatically triggers a Vercel deployment. Project pages and the journey section are maintained manually as MDX files.

### Configuration

Most of the site's content is defined in `src/config/`, including:

- Hero
- About
- Experience
- Projects
- Gears
- Journey
- Chat prompt
- CTA
- Navigation
- Metadata

This keeps page components focused on rendering while content remains easy to update.

### MDX Components

The blog editor includes several reusable MDX components:

- Callout
- YouTubeEmbed
- CodeBlock
- Figure
- Spoiler
- LinkCard

These are registered through `outstatic/blocks.json` and implemented under `src/components/mdx/`.

### Media

Uploaded images are stored in `public/images/` and served from `/images/`. This location is configured through `outstatic/config.json`.

## Customization

### Add a New Page

1. Create `src/app/(web)/your-page/page.tsx`
2. Register it in `src/config/Navbar.tsx`
3. Add its metadata in `src/config/Meta.tsx`

### Add a Technology Icon

1. Find the icon on Devicon
2. Create a component in `src/components/technologies/`
3. Export and use it where needed

### Add a Custom MDX Block

1. Create the React component in `src/components/mdx/`
2. Register it in `src/components/blog/BlogComponents.tsx`
3. Add the block definition to `outstatic/blocks.json` (or through the Outstatic Block Library)

## Acknowledgements

This project was originally bootstrapped from the excellent [ramxcodes/sleek-portfolio](https://github.com/ramxcodes/sleek-portfolio). While it has since evolved substantially, thanks to the original project for providing a solid starting point.

## Contributing

Issues, suggestions, and pull requests are always welcome. If you find a bug or have an idea for improving the project, feel free to open an issue or submit a PR.

## License

Released under the MIT License. See the `LICENSE` file for details.
