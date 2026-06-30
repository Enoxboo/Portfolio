# Portfolio — CLAUDE.md

## Project Overview

Single-page student portfolio, space-themed. French language.

- **Author:** Matteo Marquant (B2 Informatique, Toulouse)
- **Stack:** React 19 · Tailwind CSS 4 · Vite 7 · Formspree (contact form)
- **Sections (top → bottom):** Hero → About → Skills → Projects → Contact → Footer
- **Background:** Canvas animation — stars + nebula clouds + mouse trail (`NebulaBackground.jsx`)

---

## Architecture

```
src/
  components/
    Header.jsx            Fixed nav, mobile menu (hamburger), scroll handlers, focus trap
    Hero.jsx              Landing section, typing effect, CTA buttons, decorative orbs
    About.jsx             Personal intro, stats grid, scroll-in animation
    Skills.jsx            12 skill cards (emoji icon, proficiency dots), 2→3→4 col grid
    Projects.jsx          3 project cards with GitHub links, stagger animation
    Contact.jsx           Formspree form, real-time validation, honeypot, social links
    Footer.jsx            Nav, back-to-top, copyright
    ErrorBoundary.jsx     Wraps App, catches render errors
    NebulaBackground.jsx  Canvas star/nebula animation, mouse+touch repulsion physics
  hooks/
    useScrollAnimation.js  IntersectionObserver → isVisible flag (reused by 4 sections)
    useScrollToSection.js  Smooth-scroll to section ID (reused by Header, Hero, Footer)
  icons/
    GitHubIcon.jsx         Shared GitHub SVG component
    LinkedInIcon.jsx       Shared LinkedIn SVG component
  constants.js             INTERSECTION_THRESHOLD, INTERSECTION_ROOT_MARGIN
  App.jsx                  Root: skip link, z-index stack (bg=0, header=50, content=10)
  index.css                Tailwind v4 @theme vars, custom animations, scrollbar, sr-only
  main.jsx                 React root mount

index.html                 SEO meta, Open Graph, Twitter cards, JSON-LD Person schema
```

**Routing:** none — single-page smooth-scroll via `document.getElementById(id).scrollIntoView()`.

**State:** local `useState` only per component. No context, no Redux.

**Animations:** IntersectionObserver triggers `isVisible` flag → CSS `opacity`/`translate-y` transitions. `prefers-reduced-motion` respected everywhere.

**Tailwind theme custom colors:** `ethereal-*` (purple palette), `dark-bg`, `dark-surface`, `dark-border`.

---

## Audit — What to Improve

Ordered by impact. The nebula is covered first because it's the single highest-visibility improvement.

---

## 1. NEBULA WOW EFFECT (Priority 1)

The current nebula is technically solid (mouse repulsion, twinkle, touch support, resize-safe) but visually understated. A recruiter who lands on the page should feel like they're in deep space. Here's the full plan for a dramatic upgrade, split into independent tasks you can do one at a time.

### 1.1 Shooting stars (meteors) — highest visual impact

A `Meteor` class that fires a bright streak across the canvas every 3–8 seconds. Random start position along the top/left edge, ~45° angle, 200–400px tail with a linear gradient fading to transparent. Decays over ~1 second.

```js
class Meteor {
    constructor(canvas) {
        this.canvas = canvas
        this.active = false
    }

    spawn() {
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height * 0.4
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4
        const speed = 10 + Math.random() * 8
        this.dx = Math.cos(angle) * speed
        this.dy = Math.sin(angle) * speed
        this.life = 1.0
        this.decay = 0.018 + Math.random() * 0.015
        this.tailLength = 120 + Math.random() * 150
        this.width = 1.5 + Math.random() * 1.5
        this.active = true
    }

    update() {
        if (!this.active) return
        this.x += this.dx
        this.y += this.dy
        this.life -= this.decay
        if (this.life <= 0 || this.x > this.canvas.width + 200) this.active = false
    }

    draw(ctx) {
        if (!this.active) return
        const norm = Math.hypot(this.dx, this.dy)
        const tx = this.x - (this.dx / norm) * this.tailLength
        const ty = this.y - (this.dy / norm) * this.tailLength
        const g = ctx.createLinearGradient(tx, ty, this.x, this.y)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(0.7, `rgba(200,180,255,${this.life * 0.6})`)
        g.addColorStop(1, `rgba(255,255,255,${this.life})`)
        ctx.strokeStyle = g
        ctx.lineWidth = this.width * this.life
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
    }
}
```

In `animate()`, maintain a pool of 3 `Meteor` instances. Use a separate `meteorTimer` counter to spawn one every `180 + Math.random() * 300` frames (~3–8 seconds at 60fps). With time-based animation (see §3.2) tie this to elapsed ms instead.

### 1.2 Layered parallax depth — creates real 3D feel

Currently all stars are at the same perceived depth. Split into 3 layers:

| Layer | Count (desktop) | Size range | Brightness | Mouse repulsion factor |
|-------|-----------------|------------|------------|------------------------|
| Far (0) | 200 | 0.2–0.7 | 0.2–0.5 | 0.4× |
| Mid (1) | 150 | 0.5–1.3 | 0.4–0.9 | 1.0× (current) |
| Near (2) | 50 | 1.2–2.8 | 0.7–1.0 | 1.8× |

Add a `layer` property to `Star`. Far stars twinkle slower, near stars twinkle faster and are more reactive. This single change makes the canvas feel like genuine space.

### 1.3 Colored stars by temperature

Real stars range from hot blue-white to cool orange-red. Replace the uniform `rgba(255,255,255,alpha)` with a color table:

```js
// In Star.reset():
const rng = Math.random()
if (rng < 0.04)       this.color = [180, 200, 255]  // blue-white (hot)
else if (rng < 0.82)  this.color = [255, 255, 255]  // white (normal)
else if (rng < 0.94)  this.color = [255, 240, 200]  // yellow-white
else                  this.color = [255, 195, 140]  // orange-red (cool)
```

Then in `draw()`: `ctx.fillStyle = \`rgba(${r},${g},${b},${alpha})\``

The lens flare on bright stars should use the star's own color tint.

### 1.4 Visible cursor glow trail

The current trail is invisible — users can't tell their mouse is doing anything until a star happens to be nearby. Add a soft particle render for each trail point before drawing stars:

```js
// In animate(), after clearing and drawing nebula, before drawing stars:
ctx.globalCompositeOperation = 'screen'
trailRef.current.forEach(point => {
    const alpha = point.life * 0.12
    const radius = 6 + (1 - point.life) * 20
    const g = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius)
    g.addColorStop(0, `rgba(180, 120, 255, ${alpha})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
    ctx.fill()
})
ctx.globalCompositeOperation = 'source-over'
```

Keep it very subtle (alpha 0.12 max) so it doesn't feel like a paint app.

### 1.5 Supernova flare — gives the background a sense of life

Every 15–30 seconds, one random "bright" star (`isBright === true`) triggers a supernova. The star blooms to 10× size with a glowing ring, then fades over 2 seconds. Rare enough to feel like a discovery.

```js
// In Star class — add to update():
if (this.supernovaLife > 0) {
    this.supernovaLife--
}

triggerSupernova() {
    this.supernovaLife = 120 // 2 seconds at 60fps
}

// In draw(), after normal draw:
if (this.supernovaLife > 0) {
    const t = this.supernovaLife / 120
    const scale = Math.sin(t * Math.PI) * 10  // peaks then shrinks
    const alpha = t * 0.7
    ctx.strokeStyle = `rgba(220, 180, 255, ${alpha})`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.baseSize * scale * 4, 0, Math.PI * 2)
    ctx.stroke()
    // Bright inner bloom
    const bg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.baseSize * scale * 2)
    bg.addColorStop(0, `rgba(255,255,255,${alpha * 0.8})`)
    bg.addColorStop(1, 'rgba(180,120,255,0)')
    ctx.fillStyle = bg
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.baseSize * scale * 2, 0, Math.PI * 2)
    ctx.fill()
}
```

In `animate()`, add a `supernovaTimer` that fires every `900 + Math.random() * 900` frames and picks a random `isBright` star to `.triggerSupernova()`.

### 1.6 Richer nebula (more dramatic breathing + color variety)

Two problems with the current nebula:
1. Breathing is barely perceptible (`±0.03` opacity)
2. All 8 clouds are variations of purple — monochromatic

Fixes:
- Increase breathing amplitude to `±0.07`
- Add 2 cool teal-blue clouds: `{ r: 50, g: 100, b: 180 }` and `{ r: 40, g: 140, b: 160 }`
- Add 1 warm rose cloud: `{ r: 180, g: 60, b: 120 }`
- Slow the breathing period down (divide `cloud.speed` by 3 for the opacity oscillation)

```js
// Current:
const opacity = cloud.opacity + Math.sin(time * cloud.speed * 5) * 0.03
// Better:
const opacity = cloud.opacity + Math.sin(time * 0.00025 + cloud.offset) * 0.07
```

### 1.7 Milky Way density band (optional, high reward)

Instead of uniform random star placement, bias 40% of stars toward a diagonal band (top-right to bottom-left). This creates the sense of looking through the galactic plane.

```js
// In Star.reset(), for ~40% of stars:
if (Math.random() < 0.4) {
    const t = Math.random()
    // Band runs from (0, canvas.height * 0.2) to (canvas.width, canvas.height * 0.8)
    const bx = t * this.canvas.width
    const by = this.canvas.height * 0.2 + t * this.canvas.height * 0.6
    this.baseX = bx + (Math.random() - 0.5) * this.canvas.width * 0.25
    this.baseY = by + (Math.random() - 0.5) * this.canvas.height * 0.15
} else {
    // Normal uniform placement
}
```

---

## 2. SECURITY

### [SEC-1] Missing social media images — 404 on share
`/og-image.jpg`, `/twitter-image.jpg`, and `/apple-touch-icon.png` are referenced in `index.html` but don't exist in `public/`. Every social share of the portfolio will show a broken preview.

- Add `public/og-image.jpg` (1200×630px) — a screenshot or branded graphic
- Add `public/twitter-image.jpg`
- Add `public/apple-touch-icon.png` (180×180px)
- Remove the `<!-- TODO -->` comments once done

### [SEC-2] No Content Security Policy
The page has no CSP. For a static SPA that loads nothing external (no CDN scripts, no third-party JS), a tight CSP is easy and removes a class of XSS attack vectors.

Add to `index.html` `<head>`:
```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src https://formspree.io; img-src 'self' data:; font-src 'self';" />
```

Or configure it at the server/CDN level (preferred — a `<meta>` CSP can't block frame ancestors).

### [SEC-3] Formspree endpoint exposed in bundle
`FORMSPREE_ENDPOINT` is visible to anyone who opens DevTools. The honeypot field already mitigates most bot submissions, but consider also enabling Formspree's reCAPTCHA option from the Formspree dashboard — no code change needed.

### [SEC-4] `console.error` in Contact.jsx:146
Leaks network error details to the browser console. Replace with a generic log or remove — the `submitStatus === 'error'` UI already informs the user.

---

## 3. PERFORMANCE & OPTIMIZATION

### [PERF-1] Avoid `Math.sqrt` in the inner loop — critical

`NebulaBackground.jsx` runs `Math.sqrt(dx² + dy²)` for every star × every trail point, every frame. At 400 stars × 40 trail points = 16,000 sqrt calls per frame, 60fps = ~960,000 sqrts/second. Use squared distance to skip the sqrt when outside radius:

```js
// In Star.update():
const dist2 = dx * dx + dy * dy
const r2 = STAR_REPULSION_RADIUS * STAR_REPULSION_RADIUS
if (dist2 < r2 && dist2 > 0) {
    const dist = Math.sqrt(dist2)  // only computed when actually inside radius
    const force = (1 - dist / STAR_REPULSION_RADIUS) * point.life * 8
    ...
}
```

Apply the same pattern to `drawNebula` for cloud repulsion.

### [PERF-2] Time-based animation instead of frame-count

`time++` means animation speed depends on frame rate. At 120fps the nebula drifts twice as fast as at 60fps. Fix by using `requestAnimationFrame`'s timestamp:

```js
const animate = (timestamp) => {
    if (!isActive) return
    if (!lastTimestamp) lastTimestamp = timestamp
    const delta = Math.min(timestamp - lastTimestamp, 50) // cap at 50ms to avoid big jumps
    lastTimestamp = timestamp
    time += delta  // time is now in milliseconds
    ...
}
let lastTimestamp = 0
requestAnimationFrame(animate)
```

Then all `time * speed` multipliers need to be rescaled (previously `time` was frames, now it's ms — divide existing speeds by ~16.67 to keep same visual speed).

### [PERF-3] Radial gradient object creation per star per frame

Every frame, stars with `size > 0.8` (~85% of 400 stars) create a new `RadialGradient` object. That's ~340 allocations per frame. For desktop this causes GC pressure over time.

Cache the gradient when size and brightness haven't changed significantly, or switch to a simple `ctx.shadowBlur` trick for the glow (much cheaper):

```js
// Replace the gradient glow in Star.draw() with:
if (this.size > 0.8) {
    ctx.shadowBlur = this.size * 8
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`
    // re-draw the star center to trigger shadow
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
}
```

Note: `shadowBlur` has its own cost — benchmark both approaches.

### [PERF-4] `memo` on components that receive no props

`About`, `Skills`, `Projects`, and `Footer` all use `memo()` but accept zero props. `memo` is a no-op when there are no props to compare; remove it to reduce confusion.

### [PERF-5] Unused CSS animations

`index.css` defines `fadeInUp`, `fadeIn`, `slideInRight`, `scaleIn`, `pulse-slow`, `glow` animations and corresponding `.animate-*` classes. None of these appear to be used in JSX (the components use Tailwind utility animations or inline `transition-all`). Verify and remove unused definitions to reduce CSS bundle size.

---

## 4. ACCESSIBILITY

### [A11Y-1] `*:focus { outline: none }` is dangerous

`index.css:99` globally removes all outlines. The adjacent `*:focus-visible` rule restores them, but `focus-visible` is not supported in all assistive technology contexts. The safer pattern:

```css
/* Remove only for mouse users: */
*:focus:not(:focus-visible) {
    outline: none;
}
/* Keep for keyboard/AT: */
*:focus-visible {
    outline: 2px solid var(--color-ethereal-400);
    outline-offset: 2px;
}
```

### [A11Y-2] Redundant ARIA landmark roles

`Header.jsx:127` — `<header role="banner">`: `<header>` already implies the `banner` landmark.
`Header.jsx:133` — `<nav role="navigation">`: `<nav>` already implies `navigation`.
Remove both redundant `role` attributes.

### [A11Y-3] No active nav indicator

Keyboard and sighted users have no visual cue for which section is currently in view. Implement with `IntersectionObserver` in a `useActiveSection` hook that returns the current section ID, then highlight the corresponding nav item in `Header.jsx`.

```js
// src/hooks/useActiveSection.js
export function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0])

    useEffect(() => {
        const observers = ids.map(id => {
            const el = document.getElementById(id)
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id) },
                { threshold: 0.5 }
            )
            obs.observe(el)
            return obs
        })
        return () => observers.forEach(o => o?.disconnect())
    }, [ids])

    return active
}
```

In `Header.jsx`, apply `text-ethereal-400` (active) vs `text-gray-300` (inactive) per nav item.

### [A11Y-4] Footer `handleKeyPress` on `<button>` elements is redundant

`Footer.jsx:55–59` defines `handleKeyPress` to fire on Enter/Space. Native `<button>` elements already handle both keys natively. The `onKeyDown` handlers add noise with no functional gain. Remove `onKeyDown` from all `<button>` elements in Footer (keep it only if you were using non-button elements, which you aren't).

### [A11Y-5] Skills section description hidden on desktop until hover

`Skills.jsx:238` — `sm:opacity-0 sm:group-hover:opacity-100`. On desktop, description text is invisible until hover. Sighted keyboard users who tab into a card and never hover will miss the description entirely. Either always show descriptions at reduced opacity (e.g., `opacity-60 group-hover:opacity-100`), or use `focus-within:opacity-100` alongside `group-hover:opacity-100`.

---

## 5. STYLE & UX

### [UX-1] Skills split into two groups — AGREED

Split the 12 skills into two visual groups:
- **"Maîtrisées"** — Avancé and above (GDScript, Python, Tailwind, Git, HTML5, JavaScript, React, CSS3, C++, Java)
- **"En exploration"** — Débutant (Go, SQL)

Separate them with a section divider inside the Skills section. The "En exploration" group can use a slightly different card style (lower opacity, dashed border) to signal "learning in progress" honestly.

### [UX-2] About section needs a profile photo — ASSETS READY

The About section is the only one with no visual anchor. Since a photo is available, add it as a circular avatar alongside the text content. On desktop: 2-column layout (photo left, text right). On mobile: photo centered above text. The photo creates trust and makes the portfolio personal.

### [UX-3] CV download button in Hero — ASSETS READY

Add a third CTA in `Hero.jsx` below the existing two buttons (or replace "Me contacter" with it and move Contact to the second position). Since a PDF is available:

```jsx
<a
    href="/cv-matteo-marquant.pdf"
    download
    className="group w-full sm:w-auto px-8 py-4 border-2 border-dark-border ..."
    aria-label="Télécharger mon CV (PDF)"
>
    ↓ Télécharger mon CV
</a>
```

Add `cv-matteo-marquant.pdf` to `public/`.

### [UX-4] Project screenshots — ASSETS READY

The three project cards are icon + text. Screenshots would transform them visually. Since screenshots are available:

1. Add `public/projects/project-r.png`, `sandysart.png`, `sprout-island.png`
2. Add an `image` property to each project object in `Projects.jsx`
3. Replace the emoji icon with a `<img>` thumbnail at the top of the card (16:9 ratio, `object-cover`)

### [UX-5] Inconsistent self-description

- Hero badge: *"Développeur en formation, orienté systèmes & création"*
- Footer: *"Développeur en formation"* (consistent)
- Hero h1 subtitle: *"Étudiant en B2 Informatique passionné par le développement"*
- JSON-LD: *"Développeur Full Stack"* (different again)

Pick one identity and use it everywhere. "Développeur en formation" is honest. Update `index.html` JSON-LD `jobTitle` to match.

### [UX-6] Hero stats duplicated in About

Hero shows: 8+ Technologies, 3 Projets, Toulouse.
About shows the same three stats.

Remove them from one location. Keep in Hero (immediate introduction), remove from About (replace with something unique, like a "currently learning" callout or a featured timeline).

### [UX-7] Contact right column is sparse

The right column has 2 social links and a location — thin content next to a full form. Since the user has an email available, adding it as a third link (mailto:) would balance the layout. Also add an availability badge: "Disponible pour une alternance — Septembre 2025" or similar.

### [UX-8] No page transition or loading state

The first render shows the page immediately (no flash since there's no SSR), but there's no fade-in on initial load. A simple `opacity-0 → opacity-100` over 300ms on `<main>` would smooth the entry, especially when the nebula starts drawing after the React mount.

---

## 6. CONTENT

### [CONTENT-1] Missing assets — all confirmed available

| Asset | Destination | Usage |
|-------|-------------|-------|
| Profile photo | `public/avatar.jpg` (or `.webp`) | About section, 2-col layout |
| CV PDF | `public/cv-matteo-marquant.pdf` | Hero CTA download button |
| Project screenshots | `public/projects/*.png` (3 files) | Project card thumbnails |
| OG image | `public/og-image.jpg` (1200×630) | Social share preview |
| Apple touch icon | `public/apple-touch-icon.png` (180×180) | iOS home screen |

### [CONTENT-2] Excessive JSDoc comments in component files

`Header.jsx` (lines 4–14, 76, 91, 107), `Footer.jsx` (lines 4–12, 22, 39, 54), and `Contact.jsx` (lines 36, 63, 83, 101) all have multi-line JSDoc blocks that describe *what* the function does rather than *why*. A function named `scrollToSection` doesn't need a comment saying "Smooth scroll to a section by ID". Remove them.

---

## 7. REMAINING CODE QUALITY

### [QUALITY-1] `memo` on zero-prop components

`About.jsx:1`, `Skills.jsx:1` (still has `import { memo }`), `Projects.jsx:1`, `Footer.jsx:1` — `memo` has zero effect since these components receive no props. Remove the import and wrapper.

### [QUALITY-2] `Header.jsx` constants inside component body

`SCROLL_THRESHOLD = 20` and `MOBILE_MENU_ANIMATION_DELAY = 50` are defined inside `Header()`. Move them to module scope.

### [QUALITY-3] Footer duplicates `scrollToSection` logic

`Footer.jsx:40–48` reimplements `scrollToSection` manually instead of using `useScrollToSection`. Use the hook.

### [QUALITY-4] `time++` makes nebula frame-rate dependent

Covered in PERF-2 above. The animation appears to drift at different speeds on 120Hz vs 60Hz displays.

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
3. Chrome DevTools Performance tab → no GC spikes during nebula animation
4. Resize browser window → stars redistribute correctly in canvas
5. Move mouse across the canvas → cursor glow trail visible
6. Wait ~5–10 seconds on page → shooting star appears
7. Wait ~20 seconds → supernova flare visible on a bright star
8. Chrome mobile emulator: iPhone SE (375px), Galaxy Fold (280px)
9. Keyboard-only navigation: Tab through entire page, check active nav highlight
10. Lighthouse audit → target 90+ on Performance, Accessibility, SEO
