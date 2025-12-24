import { useEffect, useRef } from 'react'

function NebulaBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false })
        let animationFrameId
        let time = 0

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Étoiles améliorées
        class Star {
            constructor() {
                this.reset()
                this.baseSize = this.size
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.5 + 0.3
                this.brightness = Math.random() * 0.5 + 0.5
                this.twinkleSpeed = 0.005 + Math.random() * 0.015
                this.phase = Math.random() * Math.PI * 2
                this.isBright = Math.random() > 0.93 // Étoiles brillantes
            }

            update(time) {
                this.brightness = 0.3 + Math.sin(time * this.twinkleSpeed + this.phase) * 0.7
                if (this.isBright) {
                    this.size = this.baseSize * (0.8 + Math.sin(time * this.twinkleSpeed * 2) * 0.4)
                }
            }

            draw() {
                const alpha = this.brightness

                // Étoile principale
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()

                // Effet de croix pour les étoiles brillantes
                if (this.isBright && this.brightness > 0.6) {
                    ctx.strokeStyle = `rgba(200, 180, 255, ${alpha * 0.4})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(this.x - this.size * 4, this.y)
                    ctx.lineTo(this.x + this.size * 4, this.y)
                    ctx.moveTo(this.x, this.y - this.size * 4)
                    ctx.lineTo(this.x, this.y + this.size * 4)
                    ctx.stroke()
                }

                // Halo subtil
                if (this.size > 0.8) {
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5)
                    gradient.addColorStop(0, `rgba(180, 140, 220, ${alpha * 0.1})`)
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
                    ctx.fillStyle = gradient
                    ctx.beginPath()
                    ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        }

        const stars = Array.from({ length: 400 }, () => new Star())

        // Nuages de nébuleuse - approche simple avec dégradés
        const nebulaClouds = [
            {
                x: 0.25,
                y: 0.3,
                radius: 600,
                color: { r: 75, g: 40, b: 130 },  // Indigo foncé
                opacity: 0.25,
                speed: 0.00015,
                offset: 0
            },
            {
                x: 0.7,
                y: 0.4,
                radius: 500,
                color: { r: 100, g: 50, b: 160 }, // Violet foncé
                opacity: 0.2,
                speed: -0.0001,
                offset: Math.PI
            },
            {
                x: 0.45,
                y: 0.6,
                radius: 550,
                color: { r: 120, g: 60, b: 180 }, // Violet
                opacity: 0.18,
                speed: 0.00012,
                offset: Math.PI / 2
            },
            {
                x: 0.15,
                y: 0.7,
                radius: 450,
                color: { r: 90, g: 45, b: 140 },  // Violet très foncé
                opacity: 0.22,
                speed: -0.00008,
                offset: Math.PI * 1.5
            },
            {
                x: 0.8,
                y: 0.65,
                radius: 400,
                color: { r: 130, g: 70, b: 190 }, // Violet moyen
                opacity: 0.15,
                speed: 0.0001,
                offset: Math.PI / 3
            },
            {
                x: 0.5,
                y: 0.35,
                radius: 350,
                color: { r: 140, g: 80, b: 200 }, // Violet plus clair
                opacity: 0.12,
                speed: -0.00015,
                offset: Math.PI * 0.7
            },
            // Touches de magenta/rose pour le contraste
            {
                x: 0.6,
                y: 0.5,
                radius: 300,
                color: { r: 160, g: 70, b: 180 }, // Magenta sombre
                opacity: 0.1,
                speed: 0.00009,
                offset: Math.PI * 1.2
            },
            {
                x: 0.35,
                y: 0.45,
                radius: 280,
                color: { r: 110, g: 60, b: 150 },
                opacity: 0.14,
                speed: -0.00011,
                offset: Math.PI * 0.4
            }
        ]

        const drawNebula = (time) => {
            nebulaClouds.forEach(cloud => {
                const x = canvas.width * cloud.x + Math.sin(time * cloud.speed + cloud.offset) * 80
                const y = canvas.height * cloud.y + Math.cos(time * cloud.speed * 0.8 + cloud.offset) * 60

                // Créer un dégradé radial fluide
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloud.radius)

                const { r, g, b } = cloud.color
                const opacity = cloud.opacity + Math.sin(time * cloud.speed * 5) * 0.03

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`)
                gradient.addColorStop(0.3, `rgba(${r - 10}, ${g - 10}, ${b - 10}, ${opacity * 0.7})`)
                gradient.addColorStop(0.6, `rgba(${r - 20}, ${g - 15}, ${b - 20}, ${opacity * 0.4})`)
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            })
        }

        // Animation principale
        const animate = () => {
            time++

            // Fond spatial profond - vraiment noir
            ctx.fillStyle = '#0a0a14'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Nébuleuse avec dégradés
            ctx.globalCompositeOperation = 'screen'
            drawNebula(time)
            ctx.globalCompositeOperation = 'source-over'

            // Étoiles
            stars.forEach(star => {
                star.update(time)
                star.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}

export default NebulaBackground