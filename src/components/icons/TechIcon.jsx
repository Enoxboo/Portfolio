import gitSvg from 'simple-icons/icons/git.svg?raw'
import pythonSvg from 'simple-icons/icons/python.svg?raw'
import tailwindSvg from 'simple-icons/icons/tailwindcss.svg?raw'
import html5Svg from 'simple-icons/icons/html5.svg?raw'
import javascriptSvg from 'simple-icons/icons/javascript.svg?raw'
import reactSvg from 'simple-icons/icons/react.svg?raw'
import cssSvg from 'simple-icons/icons/css.svg?raw'
import cplusplusSvg from 'simple-icons/icons/cplusplus.svg?raw'
import openjdkSvg from 'simple-icons/icons/openjdk.svg?raw'
import godotSvg from 'simple-icons/icons/godotengine.svg?raw'
import goSvg from 'simple-icons/icons/go.svg?raw'

// Generic database glyph (no single "SQL" brand mark exists) — drawn in the
// same stroke style as the rest of the icon set instead of an emoji.
const databaseSvg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Base de données</title><path d="M12 2C7.03 2 3 3.79 3 6s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm-9 6.5V11c0 2.21 4.03 4 9 4s9-1.79 9-4V8.5c-1.86 1.46-5.16 2.3-9 2.3S4.86 9.96 3 8.5zm0 6V17c0 2.21 4.03 4 9 4s9-1.79 9-4v-2.5c-1.86 1.46-5.16 2.3-9 2.3s-7.14-.84-9-2.3z"/></svg>`

const ICONS = {
    git: gitSvg,
    python: pythonSvg,
    tailwindcss: tailwindSvg,
    html5: html5Svg,
    javascript: javascriptSvg,
    react: reactSvg,
    css: cssSvg,
    cplusplus: cplusplusSvg,
    openjdk: openjdkSvg,
    godotengine: godotSvg,
    go: goSvg,
    database: databaseSvg,
}

/**
 * Renders a brand/tech SVG mark inline so it inherits `currentColor`
 * (via Tailwind's `fill-current`) instead of shipping a hardcoded brand
 * color or a decorative emoji.
 */
export function TechIcon({ slug, className = '' }) {
    const svg = ICONS[slug]
    if (!svg) return null

    return (
        <span
            className={`inline-flex [&>svg]:fill-current [&>svg]:w-full [&>svg]:h-full ${className}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}

export default TechIcon
