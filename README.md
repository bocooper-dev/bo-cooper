# Bo Cooper — Nuxt Portfolio

A content-driven portfolio built with Nuxt 4 and Nuxt UI Pro. It showcases projects, services, and engineering articles with a lightweight content model and a few interactive demos.

## Features
- Nuxt 4 + Nuxt UI Pro components
- Nuxt Content for data and blog (Markdown + YAML)
- Projects, Services, About, Blog pages
- Blog taxonomy: tags and related links on articles
- SEO/OG integration via @nuxtjs/seo and nuxt-og-image
- Motion-ready (motion-v) and VueUse utilities
- Demos page: Generative gradient shape and SVG Game Boy

## Routes
- / — Landing (hero, experience, testimonials, FAQ)
- /projects — Selected work
- /services — Offerings and packages
- /blog — Articles; individual posts at /blog/[slug]
- /about — Bio
- /demos — Interactive component previews

## Content model (content.config.ts)
- index (page): home sections (hero, about, experience, testimonials, blog, faq)
- projects (data): title, description, image, url, tags, date (Date | string)
- blog (page): front matter: title, description, date (Date | string), image, minRead, author, tags?, related?
- services (page): links, offerings, packages?, process, cta?
- about (page): content, images

Blog front matter example:

```yaml
---
title: My Post
description: Short summary
date: 2025-08-11
image: /images/cover.jpg
minRead: 8
author:
  name: Bo Cooper
  avatar:
    src: /images/bo-cooper-branding-1.png
    alt: Bo Cooper
tags: [nuxt, vue, css]
related:
  - { label: "Related article", to: "/blog/another-post" }
---
```

## Project structure (high level)
- app/pages — route pages (including /demos)
- app/components — UI and demo components
- content — YAML data and Markdown posts
- public/images — static assets (e.g., anime.webp)

## Local development
Prereqs: Node 18+ and pnpm.

```powershell
pnpm install
pnpm dev
```

Typecheck and lint:

```powershell
pnpm typecheck
pnpm lint
```

Build and preview:

```powershell
pnpm build
pnpm preview
```

## Notes
- Dates accept ISO strings or human-readable strings (e.g., "2023 – Present").
- Tags/related in blog posts are optional and render on the post page when provided.
- /demos includes:
  - GenerativeGradientShape (clip-path gradient morph)
  - Gameboy (interactive SVG; uses /images/anime.webp)

## License
MIT
