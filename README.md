# Aither Generative Playground

A single source of truth for the Aither design system, its templates, and the
AI-assisted design pipeline built on top of it.

Live site: **https://wgiash.github.io/Playground**

## What's inside

- **Home** — [index.html](index.html) — launcher for every app below. Search
  box filters tiles live.
- **Design System & UX Templates** — [apps/wireframe-library.html](apps/wireframe-library.html) —
  an infinite pan/zoom canvas with three zones, left-to-right: **Design
  System → Templates → Flows**. The Design System zone is organised by
  atomic design (Foundations → Atoms → Molecules → Organisms → Patterns).
- **PRD Template** — [apps/prd-template.html](apps/prd-template.html) —
  a fill-in-the-blank, auto-wired deck that's the foundation for PRD clones.
- **Sunspell PRD** — [apps/sunspell-prd-template.html](apps/sunspell-prd-template.html) —
  a working PRD cloned from the template.
- **AI Design Process** — [apps/ai-design-process.html](apps/ai-design-process.html) —
  one-slide diagram of the Playground → Claude Code → Rivet → Handoff
  pipeline.

## Repository layout

```
/                      Home, login, README, CLAUDE.md
/apps/                 User-facing canvases and decks
/system/               Design-system source (tokens, canvas, chrome, app) —
                       gets inlined into wireframe-library.html
/templates/            UI pattern source (dense-list, editorial-detail,
                       multistep-form)
/shared/               Cross-page runtime — auth gate, Firebase config,
                       comments system
/assets/               Brand images and placeholders
/fonts/                Self-hosted TWK Lausanne + Apercu font files
```

## Running it

Everything is static. Open [index.html](index.html) directly, or serve the
repo root with any static server (Live Server port is pinned to 5501 in
[.vscode/settings.json](.vscode/settings.json)).

Authentication is enforced client-side on every app page via
[shared/auth-gate.js](shared/auth-gate.js). Only `@aither.co` Google accounts
can load the content.

## Editing

The canonical artifact that ships is [apps/wireframe-library.html](apps/wireframe-library.html).
It **inlines** [system/tokens.css](system/tokens.css),
[system/chrome.css](system/chrome.css), [system/canvas.css](system/canvas.css),
[system/app.jsx](system/app.jsx), and the pattern templates under
[templates/](templates/). Edit the source files and re-bake — don't hand-edit
the canonical file.

Project-wide editing rules live in [CLAUDE.md](CLAUDE.md). Read it before
touching anything.
