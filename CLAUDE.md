# Aither Wireframe Library

## The app
An infinite pan/zoom canvas with three zones, left-to-right: **Design System → Templates → Flows**.

- The **Design System** zone on the far left is already built and organized by atomic design (Foundations → Atoms → Molecules → Organisms → Patterns), growing downward for new items.
- Rightward is reserved for **Templates**.
- **Flows** live on the right and stack vertically.

Canonical artifact: [wireframe-library.html](apps/wireframe-library.html) — it inlines tokens, chrome, and app. Source files ([tokens.css](system/tokens.css), [chrome.css](system/chrome.css), [canvas.css](system/canvas.css), [app.jsx](system/app.jsx), etc.) are the editable sources that get baked into the canonical file.

## Standing rules (always apply)

- **Tokens only.** Use only existing tokens in [tokens.css](system/tokens.css). Do not introduce new color, font, or styling tokens. If something uses a hardcoded value, pull it back to the closest existing token — do not add a new one.
- **Don't touch infrastructure.** Do not modify [canvas.css](system/canvas.css), [chrome.css](system/chrome.css), the comment system ([comments.js](shared/comments.js)), or the pan/zoom logic in [app.jsx](system/app.jsx) beyond registering new sections.
- **Respect the atomic taxonomy.** When adding something, decide which layer it belongs to (Foundations / Atoms / Molecules / Organisms / Patterns) and place it under the correct labeled header. If a new item doesn't fit an existing layer, flag it rather than forcing it.
- **Preserve zoomed-out readability** of labeled header rows.
- **Keep the IntroCard accurate.** If a change alters the taxonomy, canonical file, or growth rules, update the card (`IntroCard` and `DsIntro` in [wireframe-library.html](apps/wireframe-library.html); mirrored in [app.jsx](system/app.jsx) and [app.combined.jsx](system/app.combined.jsx)).
- **Flows always include auth and error states.** Any flow added to the Flows zone must show its auth path(s) and error/failure states, not just the happy path. If these are missing from a source template, surface the gap rather than shipping the flow without them.

## Deck template — [prd-template.html](apps/prd-template.html)

Separate artifact from the canvas. Single-file, auto-wired deck — this file is the foundation for PRD clones. Do not edit its infrastructure (DOM contract, index sidebar, scroll-spy, back-home button, base `.slide`/`.deck` CSS); clone it and add content inside the clone. When generating or adding slides:

- **Only add `<section class="slide">` blocks** inside `<main class="deck">`. Use the canonical template in the `HOW TO ADD A SLIDE` comment inside the file.
- **Do not hand-edit `<nav id="index-nav">`.** It is rebuilt on load from the slide sections — hardcoded entries are discarded.
- **Do not write slide numbers into `.tag` or `.page` by hand.** The script stamps `NN · label` into `.tag` and `NN / TOTAL` into `.page` on load.
- **Preserve the DOM contract** the script depends on: `<main class="deck" id="deck">`, `<nav id="index-nav">`, each slide = `<section class="slide">` with `.tag`, `<h1>`, `.page`, optional `data-title="..."` (overrides the h1 text in the index).
- **Keep per-slide content to tag + h1 + (optional) p by default.** Richer content goes inside the `<section>` under a new scoped class — never modify the base `.slide` / `.deck` CSS.
- **Back-home button, sidebar chrome, and scroll-spy JS are infrastructure** — don't restyle or rewire them for a single slide.
- If a requested change would violate any of the above, surface the conflict rather than silently breaking the UI.
