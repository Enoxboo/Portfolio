# Portfolio — CLAUDE.md

## Project Overview

Single-page student portfolio, space-themed. French language.

- **Author:** Matteo Marquant (B2 Informatique, Toulouse)
- **Stack:** React 19 · Tailwind CSS 4 · Vite 7 · Formspree (contact form)
- **Sections (top → bottom):** Hero → About → Skills → Projects → Contact → Footer
- **Background:** Canvas animation — 400 stars + 8 nebula clouds + mouse trail (`NebulaBackground.jsx`)

---

## Architecture

```
src/
  components/
    Header.jsx          Fixed nav, mobile menu (hamburger), scroll handlers, focus trap
    Hero.jsx            Landing section, typing effect, CTA buttons, decorative orbs
    About.jsx           Personal intro, stats grid, scroll-in animation
    Skills.jsx          12 skill cards (emoji icon, proficiency dots), 2→3→4 col grid
    Projects.jsx        3 project cards with GitHub links, stagger animation
    Contact.jsx         Formspree form, real-time validation, social links
    Footer.jsx          Nav, back-to-top, copyright
    NebulaBackground.jsx  Canvas star/nebula animation, mouse repulsion physics
  App.jsx               Root: skip link, z-index stack (bg=0, header=50, content=10)
  index.css             Tailwind v4 @theme vars, custom animations, scrollbar, sr-only
  main.jsx              React root mount

index.html              SEO meta, Open Graph, Twitter cards, JSON-LD Person schema
```

**Routing:** none — single-page smooth-scroll via `document.getElementById(id).scrollIntoView()`.

**State:** local `useState` only per component. No context, no Redux.

**Animations:** IntersectionObserver triggers `isVisible` flag → CSS `opacity`/`translate-y` transitions. `prefers-reduced-motion` respected everywhere.

**Tailwind theme custom colors:** `ethereal-*` (purple palette), `dark-bg`, `dark-surface`, `dark-border`.

---

## Flaws Audit

### 1. Code Quality — Bugs

**[BUG] `NebulaBackground.jsx:252` — `visibilitychange` listener never removed (memory leak)**
```js
document.addEventListener('visibilitychange', handleVisibilityChange)
// the cleanup return () => {} doesn't remove this listener
```
Fix: add `document.removeEventListener('visibilitychange', handleVisibilityChange)` to the cleanup function.

**[BUG] `Hero.jsx:91` — `role="main"` on `<section>` is invalid semantics**
The section is already inside `<main id="main-content">` in `App.jsx`. A `<section>` cannot also carry `role="main"`. Remove the role attribute.

**[BUG] `Contact.jsx:91-94` — email `switch` case uses spurious block scope `{ }`**
```js
case 'email':
    { if (!value.trim()) return "L'email est requis"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return null }
```
The block exists only to allow `const` in a switch case. Restructure or lift `emailRegex` outside the switch.

---

### 2. Code Quality — DRY / Architecture

**[DRY] `scrollToSection` function copy-pasted in `Header`, `Hero`, `Footer`**
Extract to `src/hooks/useScrollToSection.js`.

**[DRY] IntersectionObserver scroll-animation pattern copy-pasted in `About`, `Skills`, `Projects`, `Contact` (~35 lines each)**
Extract to `src/hooks/useScrollAnimation.js` with signature `useScrollAnimation(threshold, rootMargin)`.

**[DRY] `INTERSECTION_THRESHOLD = 0.1` and `INTERSECTION_ROOT_MARGIN` defined inside 4 different component bodies**
Move to `src/constants.js` as module-level exports.

**[DRY] GitHub SVG `<path>` duplicated 6+ times across Header, Contact, Projects (×2), Footer (×2)**
Extract to a shared `<GitHubIcon />` component in `src/components/icons/`.

---

### 3. Code Quality — Performance

**[PERF] `Hero.jsx:22` — `phrases` array recreated every render**
Define as a module-level constant outside the component.

**[PERF] IntersectionObserver `useEffect` has `[isVisible]` as dependency in all 4 section components**
This recreates the observer once after `isVisible` flips to `true`. Use a `useRef` to track observer and `[]` dependency.

---

### 4. Code Quality — Minor Quality

**[QUALITY] `Footer.jsx:80,105,154,197` — `onKeyPress` is deprecated**
Deprecated in React 17+, removed in browsers. Replace with `onKeyDown`.

**[QUALITY] `package.json` — `tailwindcss` and `@tailwindcss/vite` in `dependencies` instead of `devDependencies`**
Build tools belong in `devDependencies`.

**[QUALITY] `Skills.jsx:221` — `<div role="button" tabIndex="0">` with no `onClick` or `onKeyDown` handler**
Keyboard users can focus the card but pressing Enter/Space does nothing. Add a handler (e.g., expand description) or remove the interactive role.

**[QUALITY] `Skills.jsx:27`, `Projects.jsx:27` — `eslint-disable-next-line react-hooks/set-state-in-effect`**
The correct fix is to call `setIsVisible(true)` before `return` in the reduced-motion early-return, which is valid React. Remove the eslint-disable.

**[QUALITY] `About.jsx` — wrapped in `memo()` but receives no props**
`memo` has no effect here since `About` never re-renders from parent. Remove or leave it as a no-op.

**[QUALITY] Section badges in `Contact`, `Skills`, `Projects`, `About` — static text with `role="status" aria-live="polite"`**
`role="status"` + `aria-live` is for dynamically-updating content. Screen readers will announce these static labels unexpectedly. Remove both attributes from the badge `<div>`.

---

### 5. UI/UX

**[UX] No active nav indicator — no visual highlight for the section currently in view**
Standard SPA portfolio behavior. Use IntersectionObserver on all sections to drive an active state in the Header nav.

**[UX] About section has no image or avatar**
Every other portfolio section has visual variety; About is pure text + numbers. Add a photo, avatar, or illustration.

**[UX] No CV/Resume download button**
"Télécharger mon CV" is the primary action recruiters look for. The Hero CTAs currently skip it entirely.

**[UX] Project cards have no screenshots or previews**
All 3 cards are icon + text + tags. A thumbnail image would massively improve visual appeal and clarity.

**[UX] Typing effect doesn't erase — abrupt jump between phrases**
Standard typewriter pattern: type → pause → erase character-by-character → type next. The current implementation hard-cuts.

**[UX] Typing effect: `typedText = ''` on first render causes cursor to appear before any text**
`min-h-14` reduces the layout shift but the empty cursor blink is still visible.

**[UX] Contact section right column (2 social links) is visually imbalanced on desktop**
The left column has a full form; the right has 2 links + a location. Add an email address, availability badge, or response-time indicator.

**[UX] Skill descriptions hidden on mobile (`hidden sm:block`)**
Mobile users see zero description for any skill. Reveal on tap, use a tooltip, or show a truncated version.

**[UX] Inconsistent self-description**
- Hero badge: *"Développeur en formation, orienté systèmes & création"*
- Footer: *"Développeur Full Stack"*
Pick one and use it consistently.

**[UX] "Technologies maîtrisées" heading but Go and SQL are listed as "Débutant"**
Overclaims competence. Consider "Technologies explorées" or split into two groups.

---

### 6. Responsivity

**[BUG] `NebulaBackground.jsx` — stars don't redistribute on canvas resize (phone rotation)**
`baseX`/`baseY` are set once at creation using the initial viewport size. After resize, stars are outside the new canvas bounds. Fix: call `stars.forEach(s => s.reset())` inside `resizeCanvas()`.

**[BUG] `NebulaBackground.jsx` — no `touchmove` listener; interactive trail is desktop-only**
Add a `touchmove` event listener that maps `touches[0].clientX/Y` to the same trail array.

**[PERF] `NebulaBackground.jsx` — 400 stars + per-frame O(n×trail) distance math is too heavy for mobile**
Detect mobile (`navigator.maxTouchPoints > 0` or `window.innerWidth < 768`) and reduce star count to ~100-150.

**[VISUAL] `Hero.jsx:116` — h1 at `text-5xl` (48px) on mobile; may overflow on 320px screens**
Test on Galaxy Fold (280px) and iPhone SE (375px). Consider `text-4xl` at the smallest breakpoint or `text-balance`.

**[VISUAL] `NebulaBackground.jsx:18` — canvas height set to `window.innerHeight`**
Mobile browser URL bar appearing/disappearing causes the canvas to flicker and resize repeatedly on scroll. Use `window.screen.height` or the CSS `100dvh` equivalent for the initial height.

---

### 7. Security

**[SEC] `index.html:19,27,35` — `og-image.jpg`, `twitter-image.jpg`, `apple-touch-icon.png` do not exist in `public/`**
All three will 404 when the page is shared on social media or saved to a mobile home screen. Create the images or remove the tags.

**[SEC] `index.html:34` — default Vite favicon (`/vite.svg`) still in use**
Replace with a branded favicon for a professional portfolio.

**[SEC] `Contact.jsx:16` — Formspree endpoint `mqezovvr` is visible in the client bundle with no honeypot**
Add a hidden honeypot field (`<input name="_gotcha" style="display:none" tabIndex="-1" />`) that Formspree uses to reject bot submissions.

**[SEC] No Content Security Policy**
For a static SPA, add a minimal `<meta http-equiv="Content-Security-Policy">` or configure it at the deployment level.

**[SEC] `Contact.jsx:208`, `Footer.jsx:121,131` — LinkedIn URL missing `www`**
`https://linkedin.com/...` triggers a redirect. Use `https://www.linkedin.com/in/matteo-marquant-67469a266/`.

---

### 8. Improvements

**[IMPROVE] No React Error Boundary**
If any component throws, the full page goes blank with no user-facing message. Wrap `<App>` in an `<ErrorBoundary>`.

**[IMPROVE] GitHub SVG path is copy-pasted 6+ times**
Extract to `src/components/icons/GitHubIcon.jsx` (and similarly `LinkedInIcon.jsx`).

**[IMPROVE] Typing effect: add erase phase**
Type → pause (2s) → erase character-by-character → type next phrase. Currently just hard-cuts.

**[IMPROVE] Project filtering / categories**
Already noted in a comment in `Projects.jsx`. With more projects, tag-based filtering becomes necessary.

**[IMPROVE] English version**
French-only limits international reach. A language toggle or separate `/en` route would help for job applications abroad.

---

## Quick Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Production build
npm run lint      # ESLint (flat config, v9)
npm run preview   # Preview production build
```

## Verification Checklist (after any fix)

1. `npm run lint` → zero errors/warnings
2. `npm run build` → clean build, no warnings
3. DevTools Memory tab → no listener leaks after tab blur/focus
4. Resize browser window → stars redistribute in canvas
5. Chrome mobile emulator: iPhone SE (375px), Galaxy Fold (280px)
6. Keyboard-only navigation through the full page
7. Lighthouse audit → target 90+ on Performance, Accessibility, SEO
