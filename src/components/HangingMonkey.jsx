import { useState, useEffect, useRef, useCallback } from 'react';

// Phrases moved outside to be stable
const PHRASES = [
  'Too slow!',
  'Nope!',
  'Security Breach!',
  'Deploying Evasion...',
  '404: Monkey Moved',
];

// --- Hanging Monkey Mascot (Enhanced: Evasive + Intro + Guide) ---
const HangingMonkey = ({ onClick, isFooterLocked }) => {
  const [isVisible, setIsVisible] = useState(false); // Start hidden for slide-in
  const [side, setSide] = useState('right');
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [speech, setSpeech] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFleeing, setIsFleeing] = useState(false);
  const [dangerLevel, setDangerLevel] = useState(0);
  const [evasionMode, setEvasionMode] = useState('retract');
  const [lifecycle] = useState('docked'); // Always docked now

  const headRef = useRef(null);
  const fleeTimeoutRef = useRef(null);

  // Evasion Logic
  const triggerEvasion = useCallback(() => {
    if (fleeTimeoutRef.current) return;

    // 1. Choose Strategy
    const strategy = Math.random() > 0.5 ? 'retract' : 'drop';
    setEvasionMode(strategy);
    setSpeech(strategy === 'drop' ? 'ABANDON SHIP!' : 'PULL UP!');
    setIsFleeing(true); // Lock state immediately

    // 2. Execute with Delay
    // Wait 600ms so user can read the text
    setTimeout(() => {
      setIsVisible(false); // Start exit animation

      fleeTimeoutRef.current = setTimeout(() => {
        // Switch Side
        setSide((prev) => (prev === 'right' ? 'left' : 'right'));
        setSpeech(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
        setDangerLevel(0); // Reset anger

        // 3. Reset / Re-emerge
        setEvasionMode('retract'); // Reset to default state for re-entry

        setTimeout(() => {
          setIsVisible(true);
          setIsFleeing(false);
          fleeTimeoutRef.current = null;
        }, 200);
      }, 1000); // Wait for retraction animation
    }, 600);
  }, []);

  // Lifecycle & Scroll Trigger (Simple Intro + Guide)
  useEffect(() => {
    // 1. Sliding Intro Sequence
    const introTimer = setTimeout(() => {
      setIsVisible(true); // Trigger slide down from top
      setSpeech('Hello World!');

      setTimeout(() => {
        setSpeech('');
      }, 2000);
    }, 500);

    // 2. Scroll Listener
    const handleScroll = () => {
      // Guide Logic: At bottom (-100px buffer) + Locked
      // Use documentElement.scrollHeight for reliable total height
      const totalHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.innerHeight + window.scrollY;
      const atBottom = scrollBottom >= totalHeight - 100;

      if (atBottom) {
        if (isFooterLocked) setSpeech('Go UP to Contact Me!');
      } else if (lifecycle === 'docked' && !isHovered && !isFleeing) {
        if (speech === 'Go UP to Contact Me!') setSpeech('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(introTimer);
    };
  }, [lifecycle, isFleeing, isFooterLocked, isHovered, speech]);

  // AI Core: Tracking & Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headRef.current || !isVisible || isFleeing) return;

      const rect = headRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      // 1. Eye Tracking
      const angle = Math.atan2(dy, dx);
      const eyeDist = Math.min(3, dist / 20);
      setEyePos({ x: Math.cos(angle) * eyeDist, y: Math.sin(angle) * eyeDist });

      // 2. Danger Sensing (Proximity)
      // Range: Starts getting mad at 400px, Full mad at 150px
      const safeZone = 400;
      const criticalZone = 150;
      let level = 0;

      if (dist < safeZone) {
        level =
          1 - Math.max(0, (dist - criticalZone) / (safeZone - criticalZone));
      }
      setDangerLevel(level);

      // 3. Evasion Trigger
      if (dist < criticalZone && !isHovered) {
        triggerEvasion();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, isFleeing, side, isHovered, triggerEvasion]);

  // Handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
    setSpeech('System Override!');
  };
  const handleClick = () => {
    setSpeech('Accessing Mainframe...');
    setTimeout(onClick, 500);
  };

  // Dynamic Styles
  const getContainerStyle = () => {
    const base = {
      right: side === 'right' ? '2rem' : 'auto',
      left: side === 'left' ? '2rem' : 'auto',
    };

    // 1. Hidden State (Initial or Retracted)
    if (!isVisible && !isFleeing) {
      return { ...base, top: 0, transform: 'translateY(-150%)' };
    }

    // 2. Fleeing State
    if (!isVisible && isFleeing) {
      if (evasionMode === 'drop')
        return {
          ...base,
          top: 0,
          transform: 'translateY(110vh) rotate(20deg)',
        };
      return { ...base, top: 0, transform: 'translateY(-150%)' };
    }

    // 3. Normal Visible State
    return { ...base, top: 0, transform: 'translateY(0)' };
  };

  // Color Interpolation (Slate-900 to Red-900)
  // We'll use RGBA for border/glow
  const borderColor = `rgba(${30 + 225 * dangerLevel}, ${48 - 48 * dangerLevel}, ${63 - 63 * dangerLevel}, 1)`; // Slate-700 -> Red-500

  return (
    <div
      className={`fixed transition-all duration-1000 cubic-bezier(0.175, 0.885, 0.32, 1.275)`}
      style={getContainerStyle()}
    >
      <div
        className="relative group cursor-pointer origin-top animate-swing-slow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Speech Bubble */}
        <div
          className={`absolute top-10 w-40 bg-white text-slate-900 text-xs font-bold p-3 rounded-xl 
            ${side === 'right' ? '-left-44 rounded-tr-none' : '-right-44 rounded-tl-none'}
            shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 transform 
            ${isHovered || isFleeing ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}
        >
          {speech}
        </div>

        {/* Cable - Only visible if coming from top */}
        <div
          className={`absolute -top-[100px] left-1/2 -translate-x-1/2 w-1 h-[100px] bg-slate-700 transition-opacity duration-300 ${evasionMode === 'drop' && isFleeing ? 'opacity-0' : 'opacity-100'}`}
        ></div>

        {/* Head Container */}
        <div
          ref={headRef}
          className="relative w-16 h-16 rounded-full border-2 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-200"
          style={{
            backgroundColor: '#0f172a', // Always dark background
            borderColor: borderColor,
            boxShadow: `0 0 ${dangerLevel * 30}px ${borderColor}`,
          }}
        >
          {/* Face Mask - Gets redder */}
          <div
            className="absolute inset-2 rounded-full opacity-50 transition-colors duration-200"
            style={{
              backgroundColor: dangerLevel > 0.5 ? '#7f1d1d' : '#1e293b',
            }}
          ></div>

          {/* Cyber Visor */}
          <div
            className={`absolute top-[22px] left-2 right-2 h-4 bg-cyan-500/80 rounded-sm z-20 blur-[1px] transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          ></div>

          {/* Eyes Container */}
          <div className="flex gap-2 relative z-10 mt-1">
            {/* Eyes */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-black rounded-full relative overflow-hidden ring-1 ring-slate-600"
              >
                <div
                  className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] transition-colors duration-200"
                  style={{
                    backgroundColor: dangerLevel > 0.8 ? '#ef4444' : '#22d3ee', // Cyan -> Red
                    color: dangerLevel > 0.8 ? '#ef4444' : '#22d3ee',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${eyePos.x}px), calc(-50% + ${eyePos.y}px))`,
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Mouth - Changes expression */}
          <div
            className={`absolute bottom-3 w-6 h-1 bg-slate-600 rounded-full transition-all duration-300`}
            style={{
              transform:
                dangerLevel > 0.7 ? 'rotate(10deg) scale(0.8)' : 'rotate(0deg)',
              backgroundColor: dangerLevel > 0.7 ? '#ef4444' : '#475569',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HangingMonkey;
