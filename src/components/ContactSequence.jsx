import React, { useState, useEffect } from 'react';
import { X, Globe, MapPin } from 'lucide-react';

// --- Contact Sequence Overlay (Terminal Style) ---
const ContactSequence = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [log, setLog] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('Initializing...');

    useEffect(() => {
        // Initial logs
        const initLogs = [
            "Initializing secure handshake...",
            "Resolving host: paramvir.dev...",
            "Bypassing proxies...",
            "Establishing tunnel..."
        ];

        // Location hop sequence
        const locations = [
            "Mumbai, IN",
            "Gurgaon, IN",
            "Dadra & Nagar Haveli",
            "Bangalore, IN",
            "Uttarakhand, IN"
        ];

        let delay = 0;

        // Step 1: Initial Logs
        initLogs.forEach((line) => {
            delay += 400;
            setTimeout(() => setLog(prev => [...prev, line]), delay);
        });

        // Step 2: Location Hopping
        locations.forEach((loc, i) => {
            delay += 800; // Time between hops
            setTimeout(() => {
                setCurrentLocation(loc);
                setLog(prev => [...prev, `Tracking signal... ${loc}`]);
                if (i === locations.length - 1) {
                    // Final location found
                    setStep(1);
                    setLog(prev => [...prev, "TARGET LOCKED: UTTARAKHAND"]);
                    setLog(prev => [...prev, "Decrypting contact protocols..."]);
                }
            }, delay);
        });

        // Step 3: Success & Close
        setTimeout(() => {
            setStep(2); // Success visual
            setTimeout(() => {
                onClose(); // Trigger unlock in parent
            }, 1500);
        }, delay + 1500);

    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center font-mono p-4">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={24} /></button>

            <div className="w-full max-w-lg space-y-8 relative">

                {/* Terminal Window */}
                <div className="w-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-2xl h-80 flex flex-col">
                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-500">
                        </div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs text-slate-400">root@portfolio:~</span>
                    </div>
                    <div className="p-4 overflow-y-auto font-mono text-sm space-y-2 flex-1 scrollbar-hide">
                        {log.map((line, i) => (
                            <div key={i} className={`${line.includes('TARGET') ? 'text-red-400 font-bold' : line.includes('Tracking') ? 'text-yellow-400' : 'text-green-400'}`}>
                                <span className="opacity-50 mr-2">$</span>{line}
                            </div>
                        ))}
                        <div className="w-2 h-4 bg-green-500 animate-pulse inline-block"></div>
                    </div>
                </div>

                {/* Map Visual (Active Tracking) */}
                <div className={`absolute -right-4 -bottom-16 transition-all duration-500 opacity-100 translate-y-0`}>
                    <div className={`bg-slate-800/90 p-4 rounded-xl border ${step === 1 ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-slate-700'} shadow-2xl flex items-center gap-4`}>
                        <div className="relative">
                            <div className={`w-14 h-14 rounded-full border-2 ${step === 1 ? 'border-red-500 bg-red-900/20' : 'border-slate-600 bg-slate-900'} flex items-center justify-center overflow-hidden transition-colors duration-500`}>
                                <Globe size={32} className={`${step === 1 ? 'text-red-400' : 'text-slate-500'} opacity-80`} />
                            </div>
                            <MapPin size={24} className={`${step === 1 ? 'text-red-500' : 'text-yellow-500'} absolute -top-1 -right-1 animate-bounce`} fill="currentColor" />
                        </div>
                        <div className="min-w-[140px]">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Signal</div>
                            <div className={`font-bold text-lg transition-colors duration-300 ${step === 1 ? 'text-red-400' : 'text-white'}`}>
                                {currentLocation}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactSequence;
