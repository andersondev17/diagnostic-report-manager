// components/ui/split-text.tsx
"use client"

import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useEffect, useRef } from "react"

gsap.registerPlugin(SplitText)

type SplitType = "chars" | "words" | "lines"
type TriggerType = "load" | "hover" | "scroll"

interface SplitTextProps {
    children: React.ReactNode
    type?: SplitType
    trigger?: TriggerType
    stagger?: number
    duration?: number
    ease?: string
    className?: string
    delay?: number
}

export function SplitTextAnimation({
    children,
    type = "chars",
    trigger = "load",
    stagger = 0.04,
    duration = 0.7,
    ease = "power4.out",
    className = "",
    delay = 0,
}: SplitTextProps) {
    const textRef = useRef<HTMLDivElement>(null)
    const splitRef = useRef<SplitText | null>(null)
    const ctxRef = useRef<gsap.Context | null>(null)

    useEffect(() => {
        if (!textRef.current) return

        const ctx = gsap.context(() => {
            splitRef.current = new SplitText(textRef.current!, {
                type: type === "chars" ? "chars" : type === "words" ? "words" : "lines",
            })

            const animateText = () => {
                const targets = splitRef.current?.[type] || []

                const animations: Record<SplitType, gsap.TweenVars> = {
                    chars: {
                        x: 150,
                        opacity: 0,
                        rotationY: 90,
                        transformOrigin: "0% 50% -50",
                    },
                    words: {
                        y: -100,
                        opacity: 0,
                        rotation: "random(-80, 80)",
                    },
                    lines: {
                        rotationX: -100,
                        transformOrigin: "50% 50% -160px",
                        opacity: 0,
                    },
                }

                gsap.from(targets, {
                    ...animations[type],
                    duration,
                    ease,
                    stagger,
                    delay,
                })
            }

            if (trigger === "load") {
                animateText()
            } else if (trigger === "hover" && textRef.current) {
                textRef.current.addEventListener("mouseenter", animateText)
            }
            // 'scroll' trigger requires ScrollTrigger plugin - implement if needed
        }, textRef)

        ctxRef.current = ctx

        return () => {
            splitRef.current?.revert()
            ctx.revert()
        }
    }, [type, trigger, stagger, duration, ease, delay])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            splitRef.current?.revert()
            ctxRef.current?.revert()

            // Re-initialize after resize
            if (textRef.current) {
                splitRef.current = new SplitText(textRef.current, {
                    type: type === "chars" ? "chars" : type === "words" ? "words" : "lines",
                })
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [type])

    return (
        <div
            ref={textRef}
            className={className}
            style={{ perspective: "500px" }} // Required for 3D transforms
        >
            {children}
        </div>
    )
}