import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const WelcomeScreen = ({ onComplete }) => {
    const [pullY, setPullY] = useState(0);
    const [isUnveiling, setIsUnveiling] = useState(false);
    const isDraggingRef = useRef(false);
    const startY = useRef(0);
    const currentPullY = useRef(0);
    const hasMovedRef = useRef(false); // Track if it was a drag or a click
    const MAX_PULL = 200;
    const THRESHOLD = 150;

    // Spring animation loop
    useEffect(() => {
        let animationFrame;
        const animate = () => {
            // SNAP BACK: Only if NOT dragging and NOT unveiling and NOT at zero
            if (!isDraggingRef.current && !isUnveiling && pullY > 0) {
                setPullY((prev) => {
                    const next = prev * 0.85;
                    return Math.abs(next) < 0.5 ? 0 : next;
                });
            }
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [isUnveiling, pullY]);

    const handlePointerDown = (e) => {
        if (isUnveiling) return;
        e.preventDefault();
        e.stopPropagation();

        isDraggingRef.current = true;
        hasMovedRef.current = false; // Reset move tracker
        e.target.setPointerCapture(e.pointerId);

        startY.current = e.clientY;
        currentPullY.current = pullY;
    };

    const handlePointerMove = (e) => {
        if (isUnveiling || !e.target.hasPointerCapture(e.pointerId)) return;

        const delta = e.clientY - startY.current;

        // Mark as moved only if significant delta to allow sloppy clicks
        if (Math.abs(delta) > 5) {
            hasMovedRef.current = true;
        }

        // Simple drag logic: start + delta
        const newY = Math.max(0, Math.min(currentPullY.current + delta, MAX_PULL + 50));
        setPullY(newY);
    };

    const handlePointerUp = (e) => {
        isDraggingRef.current = false;
        e.target.releasePointerCapture(e.pointerId);
        currentPullY.current = 0;

        // Trigger if pulled far enough OR if it was just a click (no move)
        if (pullY > THRESHOLD || !hasMovedRef.current) {
            triggerUnveil();
        }
    };

    const triggerUnveil = () => {
        if (isUnveiling) return; // Prevent double trigger
        setIsUnveiling(true);
        setPullY(window.innerHeight);
        setTimeout(onComplete, 800);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center transition-transform duration-1000 ease-in-out ${isUnveiling ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.1),transparent_50%)]"></div>

            <div className={`relative z-10 w-full transition-opacity duration-500 ${isUnveiling ? 'opacity-0' : 'opacity-100'}`} style={{ height: '50vh' }}>
                {/* The Rope Line */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 bg-slate-700 origin-top"
                    style={{ height: `calc(100% + ${pullY}px)` }}
                ></div>

                <div
                    className="absolute left-1/2 w-16 h-16 cursor-grab active:cursor-grabbing group touch-none select-none"
                    style={{ top: '100%', transform: `translate(-50%, ${pullY}px)` }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {/* Label - Absolute Left of the box */}
                    {!isUnveiling && pullY < 50 && (
                        <div className="absolute right-full top-2 mr-4 w-32 bg-white/10 backdrop-blur border border-white/20 text-white text-xs p-2 rounded-lg text-right animate-pulse select-none pointer-events-none">
                            CLICK OR PULL ME
                            <ArrowDown className="inline ml-1 w-3 h-3" />
                        </div>
                    )}

                    {/* Connector Loop (Hook) - Absolute Top Center */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-8 bg-slate-700 rounded-t-full -z-10"></div>

                    {/* The Monkey Head - Absolute Fill */}
                    <div className="absolute inset-0 w-full h-full rounded-full border-4 border-slate-800 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center z-10 transition-shadow duration-300 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] pointer-events-none">
                        <div className="w-12 h-10 bg-slate-800 rounded-full opacity-50 absolute bottom-2"></div>
                        <div className="flex gap-2 relative z-20 mt-1">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_currentColor] animate-blink"></div>
                            <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_currentColor] animate-blink delay-75"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute bottom-20 font-mono text-xs tracking-[0.5em] text-cyan-900 transition-opacity duration-500`} style={{ opacity: Math.max(0, 1 - pullY / 100) }}>
                SYSTEM STANDBY
            </div>
        </div>
    );
};

export default WelcomeScreen;
