# Static Personal Website — Specification

## Overview

A minimal, fast, and accessible static personal website built with **Astro**. The site serves two primary purposes: a **blog** for publishing markdown-based articles and an **about** section for personal/professional information.

---

## Goals

- Fast page loads with zero or minimal client-side JavaScript
- Easy content authoring via Markdown files
- Clean, responsive, and accessible design
- Simple to maintain and deploy

---

## Tech Stack

| Layer            | Choice                              |
| ---------------- | ----------------------------------- |
| Framework        | Astro (Static Site Generator)       |
| Content Format   | Markdown (`.md`) with frontmatter   |
| Styling          | Scoped CSS / CSS Modules (or Tailwind CSS, optional) |
| Deployment       | Any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages) |
| Package Manager  | npm or pnpm                         |

---

## Site Structure

### Pages

| Route            | Description                                      |
| ---------------- | ------------------------------------------------ |
| `/`              | Home — brief intro, latest blog posts, nav links |
| `/about`         | About — bio, skills, contact info, photo          |
| `/blog`          | Blog index — paginated list of all posts         |
| `/blog/[slug]`   | Blog post — individual article rendered from Markdown |

### Navigation

- Persistent top navigation bar on all pages: **Home**, **Blog**, **About**
- Mobile-friendly hamburger or collapsible menu
- Active page indicator in the nav

---

## Directory Layout

```
naiveI/
├── public/                  # Static assets (favicon, images, fonts)
│   └── images/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Nav.astro
│   │   ├── BlogPostCard.astro
│   │   └── SEOHead.astro
│   ├── content/             # Astro Content Collections
│   │   └── blog/            # Markdown blog posts
│   │       ├── first-post.md
│   │       └── second-post.md
│   ├── layouts/             # Page layouts
│   │   ├── BaseLayout.astro # Shared HTML shell (head, header, footer)
│   │   └── BlogPostLayout.astro # Layout for individual blog posts
│   ├── pages/               # File-based routing
│   │   ├── index.astro      # Home page
│   │   ├── about.astro      # About page
│   │   └── blog/
│   │       ├── index.astro  # Blog listing page
│   │       └── [...slug].astro # Dynamic blog post pages
│   └── styles/              # Global and shared styles
│       └── global.css
├── astro.config.mjs         # Astro configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Content Management

### Blog Posts (Content Collections)

Each blog post is a Markdown file in `src/content/blog/` with YAML frontmatter:

```markdown
---
title: "My First Post"
description: "A short summary of the post."
pubDate: 2026-03-07
updatedDate: 2026-03-07       # optional
tags: ["astro", "web"]         # optional
draft: false                   # optional, exclude from production builds
heroImage: "/images/post1.jpg" # optional
---

Post body in Markdown...
```

### Content Collection Schema

Define a schema in `src/content/config.ts` using Zod for type-safe frontmatter validation:

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

---

## Layouts

### BaseLayout

- Shared `<html>`, `<head>`, and `<body>` wrapper
- Includes `<SEOHead>` component for meta tags, Open Graph, and canonical URL
- Renders `<Header>` (with `<Nav>`), a `<main>` slot, and `<Footer>`

### BlogPostLayout

- Extends `BaseLayout`
- Renders post title, date, tags, optional hero image, and the Markdown body
- Includes previous/next post navigation (optional)

---

## Component Specifications

### Header / Nav

- Site title or logo linking to `/`
- Navigation links: Home, Blog, About
- Highlights the active page
- Responsive: collapses to a menu on small screens

### Footer

- Copyright notice
- Optional social links (GitHub, LinkedIn, Twitter/X, email)

### BlogPostCard

- Used on the home page and blog index
- Displays: title, publication date, description, optional tags
- Links to the full post

### SEOHead

- Accepts props: `title`, `description`, `image`, `url`
- Renders `<title>`, meta description, Open Graph tags, Twitter card tags
- Sets canonical URL

---

## Styling Guidelines

- **Typography**: Use a clean sans-serif system font stack for body, optional serif or monospace for headings or code
- **Color scheme**: Support light and dark modes via `prefers-color-scheme` media query or a toggle
- **Spacing**: Consistent spacing scale (e.g., 4px / 8px / 16px / 32px)
- **Responsiveness**: Mobile-first design; breakpoints at ~640px, ~768px, ~1024px
- **Accessibility**:
  - Minimum 4.5:1 contrast ratio for text
  - Focus-visible outlines on interactive elements
  - Semantic HTML (`<nav>`, `<main>`, `<article>`, `<header>`, `<footer>`)
  - Alt text on all images
  - Skip-to-content link

---

## SEO & Performance

- **Meta tags**: Unique title and description per page
- **Open Graph / Twitter Cards**: For social sharing previews
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **RSS Feed**: Auto-generated via `@astrojs/rss` at `/rss.xml`
- **Canonical URLs**: Set on every page
- **Image optimization**: Use Astro's `<Image>` component or `@astrojs/image`
- **Lighthouse target**: 90+ on all four categories

---

## Integrations & Plugins

| Integration          | Purpose                          |
| -------------------- | -------------------------------- |
| `@astrojs/sitemap`   | Auto-generate `sitemap.xml`      |
| `@astrojs/rss`       | Generate RSS feed                |
| `@astrojs/mdx`       | Optional — use MDX for richer posts |

---

## Deployment

- Output mode: `static` (default in Astro)
- Build command: `astro build`
- Output directory: `dist/`
- Recommended hosts: GitHub Pages, Netlify, Vercel, or Cloudflare Pages
- Set the `site` property in `astro.config.mjs` for canonical URLs and sitemap generation

---

## Future Considerations

- **Tags/categories pages**: Filter posts by tag at `/blog/tags/[tag]`
- **Search**: Client-side search with Pagefind or Fuse.js
- **Analytics**: Privacy-friendly analytics (Plausible, Umami)
- **Comments**: Integration with Giscus or Utterances (GitHub-based)
- **i18n**: Multi-language support if needed
- **CMS**: Optional headless CMS (Decap CMS, Tina) for non-technical editing
