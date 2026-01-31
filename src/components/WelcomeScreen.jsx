import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';

const WelcomeScreen = ({ onComplete }) => {
    const [isUnveiling, setIsUnveiling] = useState(false);
    const [pullProgress, setPullProgress] = useState(0); // 0 to 1
    const canvasRef = useRef(null);
    const monkeyRef = useRef(null);
    const interactRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });
    const readyToUnveilRef = useRef(false); // Track if we are deep enough to unveil

    // Physics State Refs
    const physicsRef = useRef({
        rope: [],
        config: {
            gravity: 20, // Stronger gravity for weight feel
            elasticK: 0.2, // Higher spring constant = stiffer rope (less rubber band)
            slowK: 0.98, // Damping (keep some swing but kill oscillation)
            timeInterval: 1 / 1000,
            unitLength: 0,
            segments: 20,
        },
    });

    // Initialize Rope
    useEffect(() => {
        const initRope = () => {
            const height = window.innerHeight * 0.4; // Rope takes up top 40% initially
            const segments = physicsRef.current.config.segments;
            const unitLength = height / segments;

            physicsRef.current.config.unitLength = unitLength;
            physicsRef.current.rope = Array(segments)
                .fill()
                .map((_, i) => ({
                    x: 0, // Centered relative to canvas/origin
                    y: unitLength * i,
                    vx: 0,
                    vy: 0,
                }));
        };

        initRope();

        // Handle Resize
        const handleResize = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Re-center physics origin visual context only, physics coords remain relative 0,0 at anchor
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Trigger unveil function
    const triggerUnveil = useCallback(() => {
        if (isUnveiling) return;
        setIsUnveiling(true);
        setTimeout(onComplete, 800);
    }, [isUnveiling, onComplete]);

    // Physics Loop
    useEffect(() => {
        let animationFrame;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const updatePhysics = () => {
            const { rope, config } = physicsRef.current;
            const { gravity, elasticK, slowK, timeInterval, unitLength } = config;

            // Run multiple substeps for stability and stiffness
            for (let step = 0; step < 40; step++) {
                // 1. Forces & Verlet Integration
                for (let i = 1; i < rope.length; i++) {
                    let p = rope[i];

                    // Gravity
                    p.vy += gravity * timeInterval;

                    // Extra gravity for the head (last node) to simulate weight
                    if (i === rope.length - 1) {
                        p.vy += gravity * 2 * timeInterval;
                    }

                    // Spring Forces (Constraint to previous node)
                    const prev = rope[i - 1]; // Current Live Ref
                    const dx = p.x - prev.x;
                    const dy = p.y - prev.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > unitLength) {
                        const force = (dist - unitLength) * elasticK;
                        const fx = (dx / dist) * force;
                        const fy = (dy / dist) * force;

                        // Apply Equal and Opposite Forces?
                        // Simplified: Pull current node towards previous
                        // In user code: both nodes move. Here node 0 is anchor (fixed).

                        p.vx -= fx;
                        p.vy -= fy;

                        // Pull previous node down (except anchor)
                        if (i - 1 > 0) {
                            rope[i - 1].vx += fx;
                            rope[i - 1].vy += fy;
                        }
                    }

                    // Damping & Update
                    p.vx *= slowK;
                    p.vy *= slowK;
                    p.x += p.vx;
                    p.y += p.vy;
                }

                // 2. Mouse Interaction / Constraint
                if (interactRef.current.isDragging) {
                    const lastNode = rope[rope.length - 1];
                    // Lerp towards mouse for smoother drag, or hard set?
                    // Hard set with some velocity reset is usually best for "grabbing"
                    lastNode.x = interactRef.current.lastX;
                    lastNode.y = interactRef.current.lastY;
                    lastNode.vx = 0;
                    lastNode.vy = 0;
                } else {
                    // Reset to anchor if exploded? No, simple physics should hold.
                    // Anchor is always fixed
                    rope[0].x = 0;
                    rope[0].y = 0;
                    rope[0].vx = 0;
                    rope[0].vy = 0;
                }
                // 3. Idle Wind / Swing (when not interacting)
                if (!interactRef.current.isDragging && !isUnveiling) {
                    const time = Date.now() / 1000;
                    // Gentle sine wave force on the bottom segment
                    const windForce = Math.sin(time * 1.0) * 0.005; // Very subtle micro-movement
                    rope[rope.length - 1].vx += windForce;
                }
            }
        };

        const draw = () => {
            if (!ctx || !canvasRef.current) return;
            const width = canvasRef.current.width;
            const height = canvasRef.current.height;
            const dpr = window.devicePixelRatio || 1;

            // Clear
            ctx.clearRect(0, 0, width, height);

            // Draw Rope
            ctx.save();
            ctx.translate(width / 2, 0); // Origin at top center
            ctx.scale(dpr, dpr); // Scale for retina

            ctx.beginPath();
            ctx.moveTo(physicsRef.current.rope[0].x, physicsRef.current.rope[0].y);

            // Draw curve
            // Using simple lines for now as per user snippet, could use quadratic curves for smoothness
            physicsRef.current.rope.forEach((p) => {
                ctx.lineTo(p.x, p.y);
            });

            ctx.strokeStyle = '#334155'; // Slate-700
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.restore();

            // Sync Monkey Head Position
            if (monkeyRef.current) {
                const lastNode =
                    physicsRef.current.rope[physicsRef.current.rope.length - 1];
                // Convert relative physics coords to screen coords
                const screenX = window.innerWidth / 2 + lastNode.x;
                const screenY = lastNode.y; // Top relative

                monkeyRef.current.style.transform = `translate(${screenX}px, ${screenY}px)`;

                // Calculate pull progress (0 to 1)
                const threshold = window.innerHeight * 0.75;
                const startY = window.innerHeight * 0.4;
                const progress = Math.min(
                    1,
                    Math.max(0, (screenY - startY) / (threshold - startY))
                );

                // Only update state if significantly changed to avoid thrashing (optional, but React handles strict equal well)
                setPullProgress(progress);

                // Update Ref for sync access in pointerUp
                readyToUnveilRef.current = screenY > threshold;

                // Trigger Unveil check (Auto-trigger if somehow hands-free or glitch, but mainly we rely on pointerUp now for intentionality)
                // Actually, if they drag way down, we can auto-trigger?
                // User said "release to enter", so let's stick to release-trigger or consistent logic.
                // Keeping auto-trigger for safety if they drag insanely far?
                // No, let's rely on the ref check in handlePointerUp for precise control.
                // Wait, the previous logic had auto-check in draw. I will REMOVE it to rely on PointerUp for "Release to Enter",
                // BUT if I remove it, I must ensure handlePointerUp fires correctly.
                // Actually, keeping strictly "Release to Enter" feel:

                // NO auto-trigger in draw loop while dragging.
                // Only auto-trigger if !isDragging (e.g. they let go) -> existing logic covers this.

                if (
                    !interactRef.current.isDragging &&
                    !isUnveiling &&
                    readyToUnveilRef.current // Use the synced ref
                ) {
                    triggerUnveil();
                }
            }
        };

        const loop = () => {
            updatePhysics();
            draw();
            animationFrame = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrame);
    }, [isUnveiling, triggerUnveil]);

    const handlePointerDown = (e) => {
        if (isUnveiling) return;
        interactRef.current.isDragging = true;

        // Calculate relative pos
        const centerX = window.innerWidth / 2;
        interactRef.current.lastX = e.clientX - centerX;
        interactRef.current.lastY = e.clientY;

        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!interactRef.current.isDragging) return;

        const centerX = window.innerWidth / 2;
        interactRef.current.lastX = e.clientX - centerX;

        // Add some resistance/limit to y?
        // Max pull length?
        // Users code didn't strictly limit, but let's keep it free
        interactRef.current.lastY = e.clientY;
    };

    const handlePointerUp = (e) => {
        interactRef.current.isDragging = false;
        e.target.releasePointerCapture(e.pointerId);

        // Immediate check on release!
        if (readyToUnveilRef.current && !isUnveiling) {
            triggerUnveil();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] h-[100dvh] bg-slate-950 flex flex-col items-center transition-transform duration-1000 ease-in-out ${isUnveiling ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.1),transparent_50%)]"></div>

            {/* Rope Canvas */}
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isUnveiling ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Monkey Head - Positioned absolutely by JS */}
            <div
                ref={monkeyRef}
                className={`absolute top-0 left-0 -ml-8 -mt-8 w-16 h-16 cursor-grab active:cursor-grabbing group touch-none select-none z-20 transition-opacity duration-500 ${isUnveiling ? 'opacity-0' : 'opacity-100'}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                {/* The Monkey Head */}
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-slate-800 bg-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center z-10 transition-shadow duration-300 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] pointer-events-none">
                    <div className="w-12 h-10 bg-slate-800 rounded-full opacity-50 absolute bottom-2"></div>
                    <div className="flex gap-2 relative z-20 mt-1">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_currentColor] animate-blink"></div>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_currentColor] animate-blink delay-75"></div>
                    </div>
                </div>

                {/* Label - Visibility threshold relaxed for mobile physics sag */}
                {!isUnveiling && pullProgress < 0.45 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 flex flex-col items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-[0.3em] animate-pulse select-none pointer-events-none drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        <span className="whitespace-nowrap">DRAG ME DOWN</span>
                        <ArrowDown className="w-4 h-4" />
                    </div>
                )}
            </div>

            {/* Pull Progress Indicator */}
            <div
                className={`absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-300 ${isUnveiling ? 'opacity-0' : 'opacity-100'}`}
            >
                {/* Progress Bar */}
                <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-100"
                        style={{ width: `${pullProgress * 100}%` }}
                    />
                </div>

                {/* Progress Text */}
                <div className="font-mono text-[10px] tracking-widest text-slate-500">
                    {pullProgress < 0.1 && 'PULL DOWN TO ENTER'}
                    {pullProgress >= 0.1 && pullProgress < 0.5 && 'KEEP PULLING...'}
                    {pullProgress >= 0.5 && pullProgress < 1 && 'ALMOST THERE...'}
                    {pullProgress >= 1 && '✓ RELEASE TO ENTER'}
                </div>
            </div>

            <div
                className={`absolute bottom-20 font-mono text-xs tracking-[0.5em] text-cyan-900 transition-opacity duration-500`}
                style={{ opacity: isUnveiling ? 0 : 1 }}
            >
                SYSTEM STANDBY
            </div>
        </div>
    );
};

export default WelcomeScreen;
