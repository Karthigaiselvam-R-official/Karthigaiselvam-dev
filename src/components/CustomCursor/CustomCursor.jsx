import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const NUM_DOTS = 15; // The length of the snake tail

const CustomCursor = () => {
    const dotsRef = useRef([]);
    const ringRef = useRef(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Track mouse position directly
    const mouse = useRef({ x: -100, y: -100 });
    // Track each trailing dot's position
    const dotsPos = useRef(Array(NUM_DOTS).fill(0).map(() => ({ x: -100, y: -100 })));

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);

        if (isMobile) return;

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleMouseOver = (e) => {
            const tag = e.target.tagName?.toLowerCase();
            const isClickable = ['a', 'button', 'input', 'textarea', 'select'].includes(tag) ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                window.getComputedStyle(e.target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        let animationFrameId;

        const render = () => {
            // First dot directly follows the mouse instantly
            dotsPos.current[0].x = mouse.current.x;
            dotsPos.current[0].y = mouse.current.y;

            // The rest of the dots follow the one in front of them with LERP physics
            for (let i = 1; i < NUM_DOTS; i++) {
                dotsPos.current[i].x += (dotsPos.current[i - 1].x - dotsPos.current[i].x) * 0.45;
                dotsPos.current[i].y += (dotsPos.current[i - 1].y - dotsPos.current[i].y) * 0.45;
            }

            // Apply transforms to all dots
            dotsPos.current.forEach((pos, index) => {
                if (dotsRef.current[index]) {
                    // Shrink the dots as they go back in the tail
                    const scale = 1 - (index / NUM_DOTS) * 0.8;
                    dotsRef.current[index].style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`;
                }
            });

            // The ASCII ring perfectly tracks the lead dot
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    // Create a uniform circular ASCII pattern so it looks like a perfect circle
    const asciiText = "+ + + + + + + + ";
    const chars = asciiText.split("");

    return (
        <>
            {/* The Rotating ASCII Text Ring */}
            <div
                ref={ringRef}
                className={`${styles.asciiRing} ${isHovering ? styles.hoveringRing : ''}`}
            >
                <div className={styles.asciiInner}>
                    {chars.map((char, i) => (
                        <span
                            key={i}
                            style={{
                                transform: `rotate(${i * (360 / chars.length)}deg)`
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {/* The Snake Dots */}
            {Array(NUM_DOTS).fill(0).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (dotsRef.current[i] = el)}
                    className={styles.dotContainer}
                    style={{ zIndex: 99999 - i }}
                >
                    <div className={`${styles.snakeDot} ${i === 0 ? styles.leadDot : ''} ${isHovering ? styles.hoveringDot : ''}`}></div>
                </div>
            ))}
        </>
    );
};

export default CustomCursor;
