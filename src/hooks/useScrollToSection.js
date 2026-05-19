import { useCallback } from 'react'
import { SCROLL_FOCUS_DELAY } from '../constants'

export function useScrollToSection() {
    return useCallback((id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => element.focus({ preventScroll: true }), SCROLL_FOCUS_DELAY)
        }
    }, [])
}
