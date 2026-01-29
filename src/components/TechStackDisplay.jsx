import { useState, useRef, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { SKILLS, calculatePosition } from './TechStackUtils';

// --- Tech Stack "Globe to Grid" Component ---
const TechStackDisplay = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const requestRef = useRef();

    // Auto-rotation loop
    const animate = () => {
        if (!isExpanded) {
            setRotation(prev => prev + 0.003); // Speed of rotation
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isExpanded]);



    return (
        <div
            className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-pointer group perspective-1000 bg-slate-950/50"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            ref={containerRef}
        >
            <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl transition-opacity duration-700 ${isExpanded ? 'opacity-20' : 'opacity-10'}`}></div>

            {/* Top Instruction Label */}
            <div className={`absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center transition-all duration-500 ${isExpanded ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-700 px-4 py-1.5 rounded-full shadow-lg">
                    <Layers size={14} className="text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200 tracking-wider">TAP TO EXPAND STACK</span>
                </div>
            </div>

            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
                {SKILLS.map((skill, i) => {
                    const { xGlobe, yGlobe, xGrid, yGrid, scaleGlobe, zIndexGlobe } = calculatePosition(i, skill.group, SKILLS, rotation);
                    const x = isExpanded ? xGrid : xGlobe;
                    const y = isExpanded ? yGrid : yGlobe;
                    const scale = isExpanded ? 1 : scaleGlobe;
                    const z = isExpanded ? 10 : zIndexGlobe;

                    return (
                        <div
                            key={skill.name}
                            className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center`}
                            style={{
                                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                                zIndex: z
                            }}
                        >
                            <div className={`
                                flex items-center gap-3 transition-all duration-500
                                ${isExpanded
                                    ? 'justify-start w-[160px] pl-2 border border-transparent bg-transparent' // Expanded: Clear text
                                    : 'justify-center p-2 rounded-full border backdrop-blur-md shadow-lg bg-slate-900/80 border-slate-800' // Gathered: Compact Bubble
                                }
                            `}>
                                <div className={`flex items-center justify-center rounded-full transition-all ${isExpanded ? 'w-6 h-6' : 'w-8 h-8'}`}>
                                    {skill.slug ? (
                                        <img
                                            src={`https://cdn.simpleicons.org/${skill.slug}`}
                                            alt={skill.name}
                                            className={`w-full h-full object-contain filter transition-all ${isExpanded ? '' : 'hover:brightness-125'}`}
                                        />
                                    ) : (
                                        <span className={`font-bold font-mono ${isExpanded ? 'text-[10px]' : 'text-sm'} ${skill.color}`}>
                                            {skill.icon}
                                        </span>
                                    )}
                                </div>
                                <span className={`font-bold transition-all duration-300 ${skill.color} ${isExpanded ? 'opacity-100 text-sm translate-x-0' : 'opacity-0 text-[0px] -translate-x-4 overflow-hidden w-0 absolute'}`}>
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TechStackDisplay;
