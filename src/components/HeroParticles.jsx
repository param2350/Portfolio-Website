import React, { useState, useEffect, useRef } from 'react';

// --- HERO BACKGROUND: Interactive Particle Field (Simple physics) ---
const HeroParticles = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Physics parameters
    const GRID_SPACING = 30; // Reverted to 30
    const POINT_RADIUS = 1.5;
    const INFLUENCE_RADIUS = 180; // Reverted to 180
    const FORCE_FACTOR = 0.6;   // Reverted to 0.6
    const STIFFNESS = 0.08;     // Reverted to 0.08
    const DAMPING = 0.9;        // Reverted to 0.9

    useEffect(() => {
        if (!containerRef.current) return;
        const updateDimensions = () => {
            const { clientWidth, clientHeight } = containerRef.current;
            setDimensions({ width: clientWidth, height: clientHeight });
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const cols = Math.floor(dimensions.width / GRID_SPACING) + 2;
        const rows = Math.floor(dimensions.height / GRID_SPACING) + 2;
        const points = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * GRID_SPACING;
                const y = j * GRID_SPACING;
                points.push({
                    x, y, originX: x, originY: y, vx: 0, vy: 0,
                    color: '#22d3ee', // Cyan
                    baseAlpha: 0.1 // Very subtle by default
                });
            }
        }

        const render = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            points.forEach(point => {
                const dx = mouseRef.current.x - point.x;
                const dy = mouseRef.current.y - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion
                if (dist < INFLUENCE_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS;
                    const fx = Math.cos(angle) * force * -5;
                    const fy = Math.sin(angle) * force * -5;
                    point.vx += fx;
                    point.vy += fy;
                }

                // Return to origin
                const ox = point.originX - point.x;
                const oy = point.originY - point.y;
                point.vx += ox * STIFFNESS;
                point.vy += oy * STIFFNESS;
                point.vx *= DAMPING;
                point.vy *= DAMPING;
                point.x += point.vx;
                point.y += point.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = point.color;

                // Alpha calculation: brighter when moving or near mouse
                const speed = Math.hypot(point.vx, point.vy);
                const nearMouse = dist < INFLUENCE_RADIUS;
                const alpha = Math.min(point.baseAlpha + (speed * 0.05) + (nearMouse ? 0.3 : 0), 0.8);

                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1.0;

                // Connect lines if moving fast (Energy effect)
                if (speed > 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x - point.vx * 4, point.y - point.vy * 4); // Trail
                    ctx.strokeStyle = point.color;
                    ctx.lineWidth = 1;
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    const handleMouseMove = (e) => {
        // Fixed position means client coordinates are correct
        mouseRef.current = {
            x: e.clientX,
            y: e.clientY
        };
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-0"
        >
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="block"
            />
        </div>
    );
};

export default HeroParticles;
