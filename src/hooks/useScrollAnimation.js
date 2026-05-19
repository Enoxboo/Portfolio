import { useEffect, useRef, useState } from 'react'
import { INTERSECTION_THRESHOLD, INTERSECTION_ROOT_MARGIN } from '../constants'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollAnimation(
    threshold = INTERSECTION_THRESHOLD,
    rootMargin = INTERSECTION_ROOT_MARGIN
) {
    const [isVisible, setIsVisible] = useState(prefersReducedMotion)
    const sectionRef = useRef(null)

    useEffect(() => {
        if (prefersReducedMotion) return

        const currentRef = sectionRef.current
        if (!currentRef) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(currentRef)
        return () => observer.disconnect()
    }, [threshold, rootMargin])

    return { isVisible, sectionRef }
}
