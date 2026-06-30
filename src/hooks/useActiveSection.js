import { useState, useEffect } from 'react'

const SECTION_IDS = ['about', 'skills', 'projects', 'contact']

export function useActiveSection() {
    const [active, setActive] = useState('')

    useEffect(() => {
        const observers = SECTION_IDS.map(id => {
            const el = document.getElementById(id)
            if (!el) return null
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id) },
                { threshold: 0.4 }
            )
            obs.observe(el)
            return obs
        })

        // Clear active when scrolled back above all sections (hero visible)
        const heroObs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setActive('') },
            { threshold: 0.3 }
        )
        const hero = document.querySelector('#main-content > section')
        if (hero) heroObs.observe(hero)

        return () => {
            observers.forEach(o => o?.disconnect())
            heroObs.disconnect()
        }
    }, [])

    return active
}
