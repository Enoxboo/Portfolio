import { useEffect, useRef } from 'react'

// Layer configs: [far, mid, near]
const DESKTOP_LAYERS = [
    { count: 200, sizeMin: 0.15, sizeMax: 0.7,  bMin: 0.15, bMax: 0.55, repuls: 0.35, twinkleMult: 0.8 },
    { count: 120, sizeMin: 0.5,  sizeMax: 1.4,  bMin: 0.35, bMax: 0.85, repuls: 1.0,  twinkleMult: 1.0 },
    { count: 30,  sizeMin: 1.2,  sizeMax: 2.6,  bMin: 0.6,  bMax: 1.0,  repuls: 1.7,  twinkleMult: 1.3 },
]
const MOBILE_LAYERS = [
    { count: 75, sizeMin: 0.15, sizeMax: 0.6,  bMin: 0.15, bMax: 0.5,  repuls: 0.35, twinkleMult: 0.8 },
    { count: 40, sizeMin: 0.5,  sizeMax: 1.3,  bMin: 0.35, bMax: 0.8,  repuls: 1.0,  twinkleMult: 1.0 },
    { count: 10, sizeMin: 1.2,  sizeMax: 2.2,  bMin: 0.6,  bMax: 1.0,  repuls: 1.7,  twinkleMult: 1.3 },
]

const TRAIL_LIMIT = 50
const TRAIL_DECAY = 0.0015       // life lost per millisecond → ~667ms lifetime
const STAR_REPULSION_RADIUS = 180
const STAR_REPULSION_RADIUS_SQ = STAR_REPULSION_RADIUS * STAR_REPULSION_RADIUS
const CLOUD_REPULSION_RADIUS = 200
const CLOUD_REPULSION_RADIUS_SQ = CLOUD_REPULSION_RADIUS * CLOUD_REPULSION_RADIUS
const SUPERNOVA_DURATION = 2200  // ms

class Star {
    constructor(canvas, ctx, trailRef, layerConfig, layerIndex) {
        this.canvas = canvas
        this.ctx = ctx
        this.trailRef = trailRef
        this.cfg = layerConfig
        this.layerIndex = layerIndex
        this.supernovaStartTime = -Infinity
        this.reset()
    }

    reset() {
        const { sizeMin, sizeMax, bMin, bMax, twinkleMult } = this.cfg
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.size = sizeMin + Math.random() * (sizeMax - sizeMin)
        this.baseSize = this.size
        this.baseBrightness = bMin + Math.random() * (bMax - bMin)
        this.brightness = this.baseBrightness
        this.twinkleSpeed = (0.0003 + Math.random() * 0.0009) * twinkleMult
        this.phase = Math.random() * Math.PI * 2
        this.isBright = this.layerIndex === 2 || Math.random() > 0.93

        // Star color by surface temperature
        const rng = Math.random()
        if (rng < 0.04)       this.color = [175, 200, 255]   // blue-white (hot)
        else if (rng < 0.82)  this.color = [255, 255, 255]   // white (normal)
        else if (rng < 0.94)  this.color = [255, 240, 195]   // yellow-white
        else                  this.color = [255, 195, 140]   // orange-red (cool)
    }

    triggerSupernova(time) {
        this.supernovaStartTime = time
    }

    update(time) {
        const twinkle = Math.sin(time * this.twinkleSpeed + this.phase)
        this.brightness = Math.max(0.05, Math.min(1.0,
            this.baseBrightness + twinkle * this.baseBrightness * 0.55
        ))
        if (this.isBright) {
            this.size = this.baseSize * (0.85 + Math.sin(time * this.twinkleSpeed * 2) * 0.25)
        }

        this.x = this.baseX
        this.y = this.baseY

        const repuls = this.cfg.repuls
        for (const point of this.trailRef.current) {
            const dx = this.x - point.x
            const dy = this.y - point.y
            const d2 = dx * dx + dy * dy
            if (d2 < STAR_REPULSION_RADIUS_SQ && d2 > 0) {
                const d = Math.sqrt(d2)
                const force = (1 - d / STAR_REPULSION_RADIUS) * point.life * 8 * repuls
                this.x += (dx / d) * force
                this.y += (dy / d) * force
            }
        }
    }

    draw(time) {
        const { ctx } = this
        const [r, g, b] = this.color
        const alpha = this.brightness

        // Core star dot
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Lens flare cross for bright stars
        if (this.isBright && alpha > 0.55) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.3})`
            ctx.lineWidth = 0.5
            const fl = this.size * 5
            ctx.beginPath()
            ctx.moveTo(this.x - fl, this.y)
            ctx.lineTo(this.x + fl, this.y)
            ctx.moveTo(this.x, this.y - fl)
            ctx.lineTo(this.x, this.y + fl)
            ctx.stroke()
        }

        // Radial glow for near-layer stars (size > 1.2)
        if (this.size > 1.0) {
            const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 7)
            glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.3})`)
            glow.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size * 7, 0, Math.PI * 2)
            ctx.fill()
        }

        // Supernova effect
        const snAge = time - this.supernovaStartTime
        if (snAge >= 0 && snAge < SUPERNOVA_DURATION) {
            const t = 1 - snAge / SUPERNOVA_DURATION
            const scale = Math.sin(t * Math.PI) * 14
            const snAlpha = t * 0.9

            ctx.save()

            // Bright bloom in screen mode
            ctx.globalCompositeOperation = 'screen'
            ctx.shadowBlur = Math.max(0, this.baseSize * scale * 5)
            ctx.shadowColor = `rgba(200,150,255,${snAlpha * 0.7})`
            ctx.fillStyle = `rgba(255,255,255,${snAlpha * 0.95})`
            ctx.beginPath()
            ctx.arc(this.x, this.y, Math.max(0.1, this.baseSize * (1 + scale * 0.35)), 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0

            // Expanding ring in source-over
            ctx.globalCompositeOperation = 'source-over'
            ctx.strokeStyle = `rgba(220,180,255,${snAlpha * 0.85})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.arc(this.x, this.y, Math.max(0.1, this.baseSize * scale * 4), 0, Math.PI * 2)
            ctx.stroke()

            ctx.restore()
        }
    }
}

class Meteor {
    constructor(canvas) {
        this.canvas = canvas
        this.active = false
        this.startTime = -Infinity
        this.duration = 0
        this.x = 0; this.y = 0
        this.startX = 0; this.startY = 0
        this.vx = 0; this.vy = 0
        this.speed = 0
        this.tailLength = 0
        this.lineWidth = 0
        this.life = 0
    }

    spawn(time) {
        if (Math.random() < 0.6) {
            this.startX = Math.random() * this.canvas.width
            this.startY = -5
        } else {
            this.startX = -5
            this.startY = Math.random() * this.canvas.height * 0.5
        }
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.45
        this.speed = 550 + Math.random() * 450
        this.vx = Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed
        this.duration = 650 + Math.random() * 600
        this.startTime = time
        this.tailLength = 130 + Math.random() * 160
        this.lineWidth = 1.2 + Math.random() * 1.6
        this.x = this.startX
        this.y = this.startY
        this.life = 1.0
        this.active = true
    }

    update(time) {
        if (!this.active) return
        const age = time - this.startTime
        if (age >= this.duration || this.x > this.canvas.width + 200 || this.y > this.canvas.height + 200) {
            this.active = false
            return
        }
        this.x = this.startX + this.vx * (age / 1000)
        this.y = this.startY + this.vy * (age / 1000)
        this.life = 1 - age / this.duration
    }

    draw(ctx) {
        if (!this.active || this.life <= 0) return
        const tx = this.x - (this.vx / this.speed) * this.tailLength * this.life
        const ty = this.y - (this.vy / this.speed) * this.tailLength * this.life
        const g = ctx.createLinearGradient(tx, ty, this.x, this.y)
        g.addColorStop(0, 'rgba(255,255,255,0)')
        g.addColorStop(0.55, `rgba(210,185,255,${this.life * 0.55})`)
        g.addColorStop(1, `rgba(255,255,255,${this.life * 0.95})`)
        ctx.save()
        ctx.lineCap = 'round'
        ctx.strokeStyle = g
        ctx.lineWidth = this.lineWidth * this.life
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
        ctx.restore()
    }
}

function NebulaBackground() {
    const canvasRef = useRef(null)
    const trailRef = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false })
        let animationFrameId
        let time = 0
        let lastTimestamp = 0
        let isActive = true
        let meteorTimer = 0
        let meteorInterval = 4000 + Math.random() * 5000
        let supernovaTimer = 0
        let supernovaInterval = 22000 + Math.random() * 13000

        const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0
        const layers = isMobile ? MOBILE_LAYERS : DESKTOP_LAYERS

        let stars = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.screen.height
            stars.forEach(s => s.reset())
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const pushTrail = (x, y) => {
            trailRef.current.push({ x, y, life: 1.0 })
            if (trailRef.current.length > TRAIL_LIMIT) trailRef.current.shift()
        }

        const handleMouseMove = (e) => pushTrail(e.clientX, e.clientY)
        const handleTouchMove = (e) => {
            const touch = e.touches[0]
            if (touch) pushTrail(touch.clientX, touch.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('touchmove', handleTouchMove, { passive: true })

        layers.forEach((cfg, li) => {
            for (let i = 0; i < cfg.count; i++) {
                stars.push(new Star(canvas, ctx, trailRef, cfg, li))
            }
        })

        const brightStars = stars.filter(s => s.isBright)
        const meteors = [new Meteor(canvas), new Meteor(canvas), new Meteor(canvas)]

        // speed values are angular frequency in rad/ms (scaled from original rad/frame ÷ ~16.67)
        const nebulaClouds = [
            // Purple/violet base
            { x: 0.25, y: 0.30, radius: 600, color: {r:75,  g:40,  b:130}, opacity: 0.28, dFreq:  0.000009,  offset: 0 },
            { x: 0.70, y: 0.40, radius: 500, color: {r:100, g:50,  b:160}, opacity: 0.22, dFreq: -0.000006,  offset: Math.PI },
            { x: 0.45, y: 0.60, radius: 550, color: {r:120, g:60,  b:180}, opacity: 0.20, dFreq:  0.0000072, offset: Math.PI / 2 },
            { x: 0.15, y: 0.70, radius: 450, color: {r:90,  g:45,  b:140}, opacity: 0.24, dFreq: -0.0000048, offset: Math.PI * 1.5 },
            { x: 0.80, y: 0.65, radius: 400, color: {r:130, g:70,  b:190}, opacity: 0.18, dFreq:  0.000006,  offset: Math.PI / 3 },
            { x: 0.50, y: 0.35, radius: 360, color: {r:145, g:80,  b:205}, opacity: 0.15, dFreq: -0.000009,  offset: Math.PI * 0.7 },
            // Cool teal-blue
            { x: 0.62, y: 0.50, radius: 320, color: {r:40,  g:120, b:185}, opacity: 0.12, dFreq:  0.0000054, offset: Math.PI * 1.2 },
            { x: 0.35, y: 0.45, radius: 290, color: {r:35,  g:140, b:160}, opacity: 0.10, dFreq: -0.0000066, offset: Math.PI * 0.4 },
            // Warm rose
            { x: 0.88, y: 0.22, radius: 300, color: {r:185, g:55,  b:115}, opacity: 0.09, dFreq:  0.0000042, offset: Math.PI * 0.9 },
        ]

        const drawNebula = (t) => {
            for (const cloud of nebulaClouds) {
                let cx = canvas.width  * cloud.x + Math.sin(t * cloud.dFreq + cloud.offset) * 80
                let cy = canvas.height * cloud.y + Math.cos(t * cloud.dFreq * 0.8 + cloud.offset) * 60

                for (const point of trailRef.current) {
                    const dx = cx - point.x
                    const dy = cy - point.y
                    const d2 = dx * dx + dy * dy
                    if (d2 < CLOUD_REPULSION_RADIUS_SQ && d2 > 0) {
                        const d = Math.sqrt(d2)
                        const force = (1 - d / CLOUD_REPULSION_RADIUS) * point.life * 15
                        cx += (dx / d) * force
                        cy += (dy / d) * force
                    }
                }

                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloud.radius)
                const { r, g, b } = cloud.color
                const breathe = Math.sin(t * 0.00028 + cloud.offset) * 0.07
                const opacity = Math.max(0, cloud.opacity + breathe)

                gradient.addColorStop(0,   `rgba(${r},${g},${b},${opacity})`)
                gradient.addColorStop(0.3, `rgba(${Math.max(0,r-15)},${Math.max(0,g-10)},${Math.max(0,b-15)},${opacity*0.65})`)
                gradient.addColorStop(0.6, `rgba(${Math.max(0,r-25)},${Math.max(0,g-15)},${Math.max(0,b-25)},${opacity*0.35})`)
                gradient.addColorStop(1,   'rgba(0,0,0,0)')

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
        }

        const animate = (timestamp) => {
            if (!isActive) return

            if (lastTimestamp === 0) lastTimestamp = timestamp
            const delta = Math.min(timestamp - lastTimestamp, 50)
            lastTimestamp = timestamp
            time += delta

            ctx.fillStyle = '#0a0a0f'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Nebula + cursor glow (additive blending)
            ctx.globalCompositeOperation = 'screen'
            drawNebula(time)

            for (const point of trailRef.current) {
                const a = point.life * 0.11
                const radius = 5 + (1 - point.life) * 20
                const g = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius)
                g.addColorStop(0, `rgba(180,120,255,${a})`)
                g.addColorStop(1, 'rgba(0,0,0,0)')
                ctx.fillStyle = g
                ctx.beginPath()
                ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
                ctx.fill()
            }

            ctx.globalCompositeOperation = 'source-over'

            // Stars (source-over — solid points of light on top of nebula)
            for (const star of stars) {
                star.update(time)
                star.draw(time)
            }

            // Meteors (screen — bright streaks on top of everything)
            ctx.globalCompositeOperation = 'screen'
            meteorTimer += delta
            if (meteorTimer >= meteorInterval) {
                meteorTimer = 0
                meteorInterval = 3000 + Math.random() * 5000
                const inactive = meteors.find(m => !m.active)
                if (inactive) inactive.spawn(time)
            }
            for (const meteor of meteors) {
                meteor.update(time)
                meteor.draw(ctx)
            }
            ctx.globalCompositeOperation = 'source-over'

            // Supernova trigger
            supernovaTimer += delta
            if (supernovaTimer >= supernovaInterval && brightStars.length > 0) {
                supernovaTimer = 0
                supernovaInterval = 20000 + Math.random() * 15000
                brightStars[Math.floor(Math.random() * brightStars.length)].triggerSupernova(time)
            }

            // Decay trail points
            trailRef.current = trailRef.current.filter(p => {
                p.life -= delta * TRAIL_DECAY
                return p.life > 0
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        const handleVisibilityChange = () => {
            isActive = !document.hidden
            if (isActive) {
                lastTimestamp = 0
                animationFrameId = requestAnimationFrame(animate)
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0"
            style={{ zIndex: 0, pointerEvents: 'none' }}
        />
    )
}

export default NebulaBackground
