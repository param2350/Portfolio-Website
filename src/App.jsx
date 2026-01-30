import { useState, useEffect, useRef, useCallback } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Cpu,
  Zap,
  Shield,
  ExternalLink,
  Code,
  Activity,
  Server,
  Eye,
  Layers,
  CheckCircle,
  AlertTriangle,
  GitBranch,
  MonitorPlay,
  ArrowDown,
  Power,
  Mail,
  Palette,
  Terminal,
  FileText,
} from 'lucide-react';
import HangingMonkey from './components/HangingMonkey';
import HeroParticles from './components/HeroParticles';
import TechStackDisplay from './components/TechStackDisplay';
import ContactSequence from './components/ContactSequence';
import WelcomeScreen from './components/WelcomeScreen';

import FooterSection from './components/FooterSection';
import ExperienceCard from './components/ExperienceCard';
import LiveCodeSidebar from './components/LiveCodeSidebar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './data/projectsData';

// --- Visual Components ---

const VisualCard = ({ title, icon: Icon, children, gradient }) => (
  <div
    className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-10 transition-all hover:border-slate-600 group h-[420px] md:h-full flex flex-col min-w-[85vw] md:min-w-0 snap-start`}
  >
    <div
      className={`absolute -right-10 -top-10 h-40 w-40 md:h-56 md:w-56 rounded-full blur-[80px] opacity-20 ${gradient}`}
    ></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div
          className={`p-3 md:p-4 rounded-lg md:rounded-xl bg-slate-950 border border-slate-800 text-slate-200 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={24} className="md:w-7 md:h-7" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="flex-1 md:text-base">{children}</div>
    </div>
  </div>
);

const SecurityList = ({ items }) => (
  <div className="space-y-3 md:space-y-4">
    {items.map((item, idx) => (
      <div
        key={idx}
        className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-slate-950/50 border border-slate-900/50 hover:bg-slate-900 transition-colors"
      >
        <div className="mt-0.5 text-emerald-500 shrink-0">
          <CheckCircle size={16} className="md:w-5 md:h-5" />
        </div>
        <div className="text-sm md:text-base text-slate-400">
          <span className="text-slate-200 font-medium block mb-0.5">
            {item.title}
          </span>
          {item.desc}
        </div>
      </div>
    ))}
  </div>
);

const ArticleCard = ({ title, link, icon: Icon }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 md:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group h-[200px] md:h-full min-w-[85vw] md:min-w-0 snap-start"
  >
    <div className="flex items-start justify-between mb-4 md:mb-6">
      <div className="p-2 md:p-3 bg-slate-950 rounded-lg md:rounded-xl border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
        <Icon size={20} className="md:w-6 md:h-6" />
      </div>
      <ExternalLink
        size={16}
        className="text-slate-600 group-hover:text-cyan-400 md:w-5 md:h-5"
      />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-slate-200 group-hover:text-white leading-tight mb-2">
      {title}
    </h3>
    <p className="text-xs md:text-sm text-slate-500 font-mono mt-auto pt-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"></span>
      Read on Medium
    </p>
  </a>
);

// --- Main App ---

export default function Portfolio() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  // Default to unlocked on mobile (< 768px), locked on desktop
  const [isFooterLocked, setIsFooterLocked] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );
  const [showContactSequence, setShowContactSequence] = useState(false);

  const [wasUnlockedViaButton, setWasUnlockedViaButton] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [monkeyMessage, setMonkeyMessage] = useState('');

  // Name animation states
  const [nameAnimationPhase, setNameAnimationPhase] = useState(0);
  const [nameAnimationComplete, setNameAnimationComplete] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [currentStyle, setCurrentStyle] = useState('');
  const nameAnimationStarted = useRef(false);


  // Ref for measuring first name width for perfect alignment
  const paramvirRef = useRef(null);
  const [nameOffset, setNameOffset] = useState(0);

  // Check window size on mount/resize to unlock footer on mobile
  useEffect(() => {
    const checkMobileUnlock = () => {
      if (window.innerWidth < 768) {
        setIsFooterLocked(false);
      }
    };

    checkMobileUnlock();
    window.addEventListener('resize', checkMobileUnlock);
    return () => window.removeEventListener('resize', checkMobileUnlock);
  }, []);

  // Measure name width on resize/mount
  useEffect(() => {
    const updateOffset = () => {
      if (paramvirRef.current) {
        // Measure width of "Paramvir" + space
        // Using getBoundingClientRect for sub-pixel precision if needed, but offsetWidth is usually fine
        // Adding a small gap for the space character (~0.25em of the current font size)
        const width = paramvirRef.current.offsetWidth;
        // Approximation of space width (about 20-30% of a character or computed style)
        // Let's just use the rendered width if we include the space in the span? 
        // Or cleaner: add a fixed gap proportional to font size?
        // Let's try adding 0.3em (typical space width)
        const computedStyle = window.getComputedStyle(paramvirRef.current);
        const fontSize = parseFloat(computedStyle.fontSize);
        const spaceWidth = fontSize * 0.25;

        setNameOffset(width + spaceWidth);
      }
    };

    // Initial measure - might need to wait for fonts or layout?
    // Using a timeout to ensure render
    setTimeout(updateOffset, 100);
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [showWelcome]); // Re-measure when welcome screen goes away (and DOM exists)

  // Engineering carousel state
  const [engineeringSlide, setEngineeringSlide] = useState(0);
  const engineeringCarouselRef = useRef(null);
  const engineeringCardCount = 5; // Total number of cards


  // Articles carousel state
  const [articlesSlide, setArticlesSlide] = useState(0);
  const articlesCarouselRef = useRef(null);
  const articlesCardCount = 4; // Total number of article cards

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock Body Scroll when Welcome Screen is active
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showWelcome]);

  // Name animation sequence - starts after welcome screen closes
  useEffect(() => {
    if (showWelcome || nameAnimationStarted.current) return;

    nameAnimationStarted.current = true;
    const fullName = 'paramvir ramola';
    let charIndex = 0;
    const timeouts = [];

    // Phase 1: Typing animation
    setNameAnimationPhase(1);
    setCurrentStyle('typing...');

    const typingInterval = setInterval(() => {
      if (charIndex <= fullName.length) {
        setTypedName(fullName.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);

        // Continue with other phases after typing completes
        // Continue with other phases after typing completes - OPTIMIZED SPEED & MERGED COLORS
        const phases = [
          // Phase 2: Scale up & Slide down + RED
          { delay: 200, phase: 2, style: 'font-size: 5rem; color: #ef4444' },
          // Phase 3: Display block
          { delay: 1000, phase: 3, style: 'display: block' },
          // Phase 4: UPPERCASE + GREEN
          { delay: 1800, phase: 4, style: 'text-transform: UPPERCASE; color: #22c55e' },
          // Phase 5: lowercase + BLUE
          { delay: 2600, phase: 5, style: 'text-transform: lowercase; color: #3b82f6' },
          // Phase 6: Capitalize + CYAN GRADIENT
          { delay: 3400, phase: 6, style: 'text-transform: capitalize; color: cyan-gradient' },
          // Phase 7: Complete
          { delay: 4400, phase: 7, style: '✓ complete' },
        ];

        phases.forEach(({ delay, phase, style }) => {
          const timeoutId = setTimeout(() => {
            setNameAnimationPhase(phase);
            setCurrentStyle(style);
            if (phase === 7) {
              setTimeout(() => setNameAnimationComplete(true), 1200);
            }
          }, delay);
          timeouts.push(timeoutId);
        });
      }
    }, 50); // Slightly faster typing (60ms -> 50ms)

    return () => {
      clearInterval(typingInterval);
      timeouts.forEach(id => clearTimeout(id));
    };
  }, [showWelcome]);

  // Intersection Observer for Sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Auto-scroll for engineering carousel (mobile only)
  const scrollToSlide = useCallback((index) => {
    if (engineeringCarouselRef.current) {
      const container = engineeringCarouselRef.current;
      const cards = container.children;
      if (cards[index]) {
        // Scroll to the card's left position relative to container
        const card = cards[index];
        container.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
    setEngineeringSlide(index);
  }, []);

  useEffect(() => {
    // Only auto-scroll on mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setEngineeringSlide((prev) => {
        const next = (prev + 1) % engineeringCardCount;
        scrollToSlide(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [scrollToSlide]);

  // Update active slide on manual scroll
  useEffect(() => {
    const container = engineeringCarouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.children;
      const scrollLeft = container.scrollLeft;

      // Find which card is most visible
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const distance = Math.abs(cards[i].offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== engineeringSlide) {
        setEngineeringSlide(closestIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [engineeringSlide]);

  // Auto-scroll for articles carousel (mobile only)
  const scrollToArticleSlide = useCallback((index) => {
    if (articlesCarouselRef.current) {
      const container = articlesCarouselRef.current;
      const cards = container.children;
      if (cards[index]) {
        const card = cards[index];
        container.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
    setArticlesSlide(index);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setArticlesSlide((prev) => {
        const next = (prev + 1) % articlesCardCount;
        scrollToArticleSlide(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [scrollToArticleSlide]);

  // Update active slide on manual scroll for articles
  useEffect(() => {
    const container = articlesCarouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.children;
      const scrollLeft = container.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const distance = Math.abs(cards[i].offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== articlesSlide) {
        setArticlesSlide(closestIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [articlesSlide]);

  const onSequenceComplete = () => {
    setShowContactSequence(false);
    setIsFooterLocked(false);
    setWasUnlockedViaButton(true); // Trigger footer unlock animation
    // Wait for state update then scroll
    setTimeout(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleUnlockSequence = () => {
    if (!isFooterLocked) {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Mobile check: Skip animation for screens smaller than 768px
    if (window.innerWidth < 768) {
      onSequenceComplete();
      return;
    }

    // Start the overlay sequence
    setMonkeyMessage(''); // Clear any denial messages
    setShowContactSequence(true);
  };

  const handleLockedInteraction = (message) => {
    // If we are already running the sequence, don't show error messages
    if (showContactSequence) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMonkeyMessage(message);
    setTimeout(() => setMonkeyMessage(''), 5000);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${devMode ? 'bg-[#0a0a0a] font-mono selection:bg-purple-500/30' : 'bg-slate-900 font-sans selection:bg-cyan-500/30'} text-slate-200`}
    >
      {/* Welcome Screen Overlay */}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      {/* Unlock Animation Overlay (Global) */}
      {showContactSequence && <ContactSequence onClose={onSequenceComplete} />}

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Interactive Particle Background (Absolute - First Viewport Only) */}
      <div className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none overflow-hidden">
        <HeroParticles />
      </div>

      {!devMode && (
        <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"></div>
      )}

      {/* Mascot - Now Interactive (Desktop Only) */}
      <div className="hidden md:block">
        <HangingMonkey
          onClick={handleUnlockSequence}
          isFooterLocked={isFooterLocked}
          forceMessage={monkeyMessage}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || devMode ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : 'md:bg-transparent bg-slate-950/90 backdrop-blur-md'}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          {/* Logo - Always visible on mobile, show on scroll for desktop */}
          <div
            className={`flex items-center gap-2 font-bold text-lg md:text-xl tracking-tighter text-white transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'md:opacity-0 opacity-100'}`}
          >
            {devMode ? (
              <Terminal className="text-green-500" size={18} />
            ) : (
              <Activity className="text-cyan-400" size={18} />
            )}
            <span className="hidden sm:inline">Paramvir Ramola</span>
            <span className="sm:hidden">PR</span>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Mobile Header Buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleUnlockSequence}
                className="px-4 py-2 font-bold rounded-full transition-all flex items-center gap-1.5 bg-white text-slate-950 text-sm"
              >
                Contact <Mail size={14} />
              </button>
              <a
                href="https://drive.google.com/file/d/1V1oKf0zFjxxOvCT5tSWDR_CHhHU2l1CI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full flex items-center gap-1.5 text-sm"
              >
                Resume <FileText size={14} />
              </a>
            </div>

            {/* Desktop Navigation */}
            {!devMode && (
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                <a
                  href="#projects"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#engineering"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Engineering
                </a>
                <a
                  href="#stack"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Stack
                </a>
                <a
                  href="#articles"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Articles
                </a>
              </div>
            )}

            <button
              onClick={() => setDevMode(!devMode)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${devMode ? 'bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400'}`}
            >
              {devMode ? <Code size={14} /> : <Eye size={14} />}
              {devMode ? 'EXIT TERMINAL' : 'VIEW SOURCE'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div
        className={`relative z-10 pt-24 ${devMode ? 'flex' : 'max-w-7xl mx-auto px-4 md:px-6 pb-20'}`}
      >
        {/* Left Side: Live Code Editor (Only in Dev Mode) */}
        {devMode && <LiveCodeSidebar activeSection={activeSection} />}

        {/* Right Side: Scrollable Content */}
        <main
          className={`${devMode ? 'w-full lg:w-2/3 px-4 lg:px-12' : 'w-full'}`}
        >
          {/* HERO SECTION: Bento Grid Layout */}
          <section
            id="hero"
            className="min-h-screen pt-4 pb-24 flex flex-col justify-center max-w-7xl mx-auto scroll-mt-24 relative"
          >
            {/* Background Particles moved to root */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full relative z-10 pointer-events-none">
              {/* 1. Main Intro Card (2x2) - Now Transparent/Glassy to show points */}
              {/* 1. Main Intro Card (2x2) - Adjusted Spacing */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 pointer-events-auto flex flex-col justify-center text-left py-4 md:py-8 pr-4 md:pr-8 lg:pr-12">

                {/* Style indicator - Single line above name */}
                <div className="h-4 md:h-6 mb-1">
                  {!showWelcome && !nameAnimationComplete && (
                    <div
                      className={`font-mono text-[10px] md:text-sm transition-all duration-300 ${nameAnimationPhase >= 11 ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                      <span className="text-slate-600">{'> '}</span>
                      <span className="text-purple-400">{currentStyle}</span>
                      <span className="text-slate-600">;</span>
                      <span className="animate-pulse text-cyan-400 ml-1">▊</span>
                    </div>
                  )}
                </div>

                {/* The Animated Name - Fixed height container to prevent layout shifts */}
                <div className="relative h-[105px] md:h-[200px]">

                  {/* Typing overlay - shows during phase 1, fades out when phase 2 starts */}
                  {/* Scale 0.4 makes text-8xl appear like ~text-3xl for typing effect */}
                  {/* whitespace-nowrap keeps it on single line during typing */}
                  <div
                    className="absolute top-0 left-0 font-bold tracking-tight text-5xl md:text-8xl text-white whitespace-nowrap"
                    style={{
                      transform: 'scale(0.4)',
                      transformOrigin: 'top left',
                      opacity: nameAnimationPhase === 1 && !showWelcome ? 1 : 0,
                      transition: 'opacity 0.2s ease-out',
                      pointerEvents: 'none',
                    }}
                  >
                    {typedName}
                    <span className="animate-pulse">|</span>
                  </div>

                  {/* Main name - always rendered, animates with transforms */}
                  {/* Visible from phase 2 (swaps with typing overlay), starts at scale 0.4 then scales up */}
                  <h1 className="absolute top-0 left-0 font-bold tracking-tight leading-[1.1] text-5xl md:text-8xl">
                    <div
                      className="flex flex-col whitespace-nowrap"
                      style={{
                        // HIDE during Phase 1 (Typing) to prevent double-text/ghosting
                        opacity: nameAnimationPhase >= 2 && !showWelcome ? 1 : 0,
                        transition: 'opacity 0.1s linear',
                      }}
                    >
                      {/* First name - Paramvir */}
                      <span
                        ref={paramvirRef}
                        className={`inline-block ${nameAnimationPhase >= 6 ? 'bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent' : ''
                          }`}
                        style={{
                          transform: nameAnimationPhase >= 2 ? 'scale(1)' : 'scale(0.4)',
                          transformOrigin: 'top left',
                          color: nameAnimationPhase === 2 ? '#ef4444' : // Red on Scale
                            nameAnimationPhase === 3 ? '#ef4444' :
                              nameAnimationPhase === 4 ? '#22c55e' : // Green on Upper
                                nameAnimationPhase === 5 ? '#3b82f6' : // Blue on Lower
                                  undefined, // Gradient handles rest
                          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease-out',
                        }}
                      >
                        {nameAnimationPhase >= 6 ? 'Paramvir' :
                          nameAnimationPhase >= 5 ? 'paramvir' :
                            nameAnimationPhase >= 4 ? 'PARAMVIR' :
                              'paramvir'}
                      </span>

                      {/* Last name - Ramola - animates from beside first name to below */}
                      {/* Uses dynamic nameOffset for perfect alignment */}
                      <span
                        className={`inline-block ${nameAnimationPhase >= 6 ? 'bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent' : ''
                          }`}
                        style={{
                          transform: nameAnimationPhase >= 3
                            ? 'translateX(0) translateY(0) scale(1)'
                            : nameAnimationPhase >= 2
                              ? `translateX(${nameOffset}px) translateY(-100%) scale(1)`
                              : `translateX(${nameOffset}px) translateY(-100%) scale(0.4)`,
                          transformOrigin: 'top left',
                          color: nameAnimationPhase === 2 ? '#ef4444' : // Red
                            nameAnimationPhase === 3 ? '#ef4444' :
                              nameAnimationPhase === 4 ? '#22c55e' : // Green
                                nameAnimationPhase === 5 ? '#3b82f6' : // Blue
                                  undefined,
                          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease-out',
                        }}
                      >
                        {nameAnimationPhase >= 6 ? 'Ramola' :
                          nameAnimationPhase >= 5 ? 'ramola' :
                            nameAnimationPhase >= 4 ? 'RAMOLA' :
                              ' ramola'}
                      </span>
                    </div>
                  </h1>
                </div>

                {/* Progress bar - Below name */}
                <div className="h-5 md:h-6 mb-2 md:mb-4">
                  {!showWelcome && !nameAnimationComplete && (
                    <div
                      className={`flex items-center gap-2 md:gap-3 transition-all duration-500 ${nameAnimationPhase >= 7 ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                      <div className="w-24 md:w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(nameAnimationPhase / 7) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] md:text-xs text-slate-500 tabular-nums">
                        {Math.min(100, Math.round((nameAnimationPhase / 7) * 100))}%
                      </span>
                    </div>
                  )}
                </div>

                <h2 className={`text-xl md:text-3xl text-cyan-400 font-medium mb-2 md:mb-4 flex items-center gap-2 transition-all duration-500 ease-out ${!showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Frontend Engineer <Code size={20} className="text-slate-600 md:w-7 md:h-7" />
                </h2>
                <div className={`text-slate-400 text-base md:text-xl leading-snug md:leading-relaxed max-w-2xl mb-0 md:mb-4 transition-all duration-500 delay-100 ease-out ${!showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <p>
                    Software Engineer with 5+ years of experience building scalable web applications in fintech and e-commerce, specializing in frontend architecture and performance optimization.
                  </p>
                </div>
                {/* Tablet buttons - hidden on mobile (in header) and desktop (in stats row) */}
                <div className="hidden md:flex lg:hidden flex-wrap gap-4 relative z-10">
                  <button
                    onClick={handleUnlockSequence}
                    className="px-8 py-3 text-base font-bold rounded-full transition-all flex items-center gap-2 bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 shadow-lg"
                  >
                    Contact Me <Mail size={18} />
                  </button>
                  <a
                    href="https://drive.google.com/file/d/1V1oKf0zFjxxOvCT5tSWDR_CHhHU2l1CI/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 text-base bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                  >
                    Resume <FileText size={18} />
                  </a>
                </div>

              </div>

              {/* 2. Interactive Gap (Right Side) - Empty for physics interaction */}
              <div className="hidden lg:block col-span-2 row-span-2 pointer-events-auto cursor-crosshair group relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="text-cyan-500/20 font-mono text-xs tracking-[0.5em] animate-pulse">
                    INTERACT WITH FIELD
                  </span>
                </div>
              </div>
            </div>

            {/* Stats and Buttons Row - Full width, outside grid */}
            <div className="mt-2 md:mt-6 pt-4 md:pt-6 border-t border-slate-800/50 flex items-center justify-between relative z-10 pointer-events-auto">
              {/* Left - Stats */}
              <div className="grid grid-cols-3 gap-6 md:gap-14">
                <div className="group">
                  <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2 text-emerald-400">
                    <TrendingUp size={20} className="md:w-6 md:h-6" />
                    <span className="text-xs md:text-base font-bold font-mono tracking-wider text-emerald-500/80">FINTECH</span>
                  </div>
                  <div className="text-base md:text-lg text-slate-300 font-medium">AngelOne</div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2 text-pink-400">
                    <ShoppingBag size={20} className="md:w-6 md:h-6" />
                    <span className="text-xs md:text-base font-bold font-mono tracking-wider text-pink-500/80">ECOMMERCE</span>
                  </div>
                  <div className="text-base md:text-lg text-slate-300 font-medium">Nykaa</div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2 text-cyan-400">
                    <Clock size={20} className="md:w-6 md:h-6" />
                    <span className="text-xs md:text-base font-bold font-mono tracking-wider text-cyan-500/80">EXP</span>
                  </div>
                  <div className="text-base md:text-lg text-slate-300 font-medium">5+ Years</div>
                </div>
              </div>

              {/* Right - Buttons */}
              <div className="hidden lg:flex gap-4 shrink-0">
                <button
                  onClick={handleUnlockSequence}
                  className="px-8 py-3 text-base font-bold rounded-full transition-all flex items-center gap-2 bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 whitespace-nowrap shadow-lg"
                >
                  Contact Me <Mail size={18} />
                </button>
                <a
                  href="https://drive.google.com/file/d/1V1oKf0zFjxxOvCT5tSWDR_CHhHU2l1CI/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 text-base bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-500 hover:to-blue-500 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
                >
                  Resume <FileText size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* FEATURE SECTION: Featured Projects */}
          <section id="projects" className="mb-32 relative scroll-mt-24">
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                  Featured Projects
                </h2>
                <p className="text-slate-400 text-base md:text-xl">
                  Innovations and tools built for scale.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 rounded-3xl blur-3xl -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          </section>

          {/* Project Modal */}
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}

          {/* Engineering Section */}
          <section id="engineering" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                  Engineering Deep Dives
                </h2>
                <p className="text-slate-400 text-base md:text-xl">
                  Beyond the UI: Infrastructure, Security, and Scale.
                </p>
              </div>
            </div>

            {/* Responsive Grid / Carousel */}
            <div
              ref={engineeringCarouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 no-scrollbar"
            >
              <VisualCard
                title="Performance"
                icon={Zap}
                gradient="bg-amber-500"
              >
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Optimized Core Web Vitals for high-traffic e-commerce pages.
                  </p>

                  <div className="space-y-4">
                    {/* CLS Improvements */}
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 font-mono">
                          CLS on PLP (Nykaa)
                        </span>
                        <span className="text-xs text-amber-400 font-bold">
                          -79%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[79%]"></div>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 font-mono">
                          CLS on PDP (Nykaa)
                        </span>
                        <span className="text-xs text-amber-400 font-bold">
                          -72%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[72%]"></div>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 font-mono">
                          Homepage Performance
                        </span>
                        <span className="text-xs text-green-400 font-bold">
                          +18%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[18%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </VisualCard>

              <VisualCard
                title="Infrastructure"
                icon={Server}
                gradient="bg-blue-500"
              >
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Advanced optimization and architectural migrations.
                  </p>
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400 font-mono">
                        ImageKit Cache Usage
                      </span>
                      <span className="text-xs text-blue-400 font-bold">
                        -63%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[63%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                      <span className="text-blue-400">Now: 600 MB</span>
                      <span>Was: 1.6 TB</span>
                    </div>
                  </div>
                </div>
              </VisualCard>

              <VisualCard
                title="System Internals"
                icon={Cpu}
                gradient="bg-purple-500"
              >
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Diagnosed and resolved critical memory leaks in high-scale
                    environments.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-400 font-bold">
                          AngelOne Frontend
                        </span>
                        <span className="text-white">40% Saved</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Fixed leaks in Ledger, PnL, TnC Services
                      </p>
                    </div>

                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-400 font-bold">
                          Nykaa Node Server
                        </span>
                        <span className="text-white">20% Saved</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Fixed hash key logic for cached API responses
                      </p>
                    </div>
                  </div>
                </div>
              </VisualCard>

              {/* Restored Security Card */}
              <VisualCard
                title="Security"
                icon={Shield}
                gradient="bg-emerald-500"
              >
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      10+
                    </div>
                    <div className="text-xs text-emerald-200 uppercase font-bold tracking-wider">
                      Critical Vulnerabilities
                    </div>
                    <div className="text-[10px] text-emerald-400/60 mt-1">
                      Patched across Angel One TWA
                    </div>
                  </div>

                  <SecurityList
                    items={[
                      {
                        title: 'PII Data Protection',
                        desc: 'Log sanitization & masking',
                      },
                      {
                        title: 'Production Hardening',
                        desc: 'Disabled source maps in prod',
                      },
                    ]}
                  />
                </div>
              </VisualCard>

              {/* Restored Observability Card */}
              <VisualCard
                title="Observability"
                icon={Eye}
                gradient="bg-pink-500"
              >
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Built proactive monitoring architecture to catch issues
                    before users do.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <Activity size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">
                          Grafana Dashboards
                        </span>
                        Real-time health monitoring
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <AlertTriangle size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">
                          Slack Alerts
                        </span>
                        5xx Errors & Web Vital Spikes
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <GitBranch size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">
                          n8n Pipelines
                        </span>
                        Automated Daily Performance Reports
                      </div>
                    </div>
                  </div>
                </div>
              </VisualCard>
            </div>

            {/* Carousel Dots (Mobile Only) */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {Array.from({ length: engineeringCardCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${engineeringSlide === idx
                    ? 'bg-cyan-400 w-6'
                    : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </section>

          {/* NEW SECTION: Tech Stack */}
          <section id="stack" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                  My Tech Stack
                </h2>
                <p className="text-slate-400 text-base md:text-xl">
                  The tools I use to build systems.
                </p>
              </div>
            </div>
            <div className="bg-slate-900/20 border border-slate-800/50 rounded-3xl overflow-hidden relative">
              {/* Background Grid */}
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

              <TechStackDisplay />
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="work"
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mb-24 md:mb-32 scroll-mt-24"
          >
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 sticky top-24">
                Career <br />
                Timeline
                <p className="text-sm md:text-lg font-normal text-slate-500 mt-4 md:mt-6 font-mono">
                  5+ Years of Experience building scalable frontend systems.
                </p>
              </h2>
            </div>

            <div className="lg:col-span-2 space-y-2">
              <ExperienceCard
                devMode={devMode}
                active={true}
                type="fintech"
                role="SDE 2"
                company="AngelOne"
                period="05/2024 – Present"
                highlights={[
                  'Contributed to frontend architecture for the StoreFront platform team supporting 20+ sub-modules within the Angel One super app.',
                  'Proposed and built TWA Lens, a Chrome DevTools–like debugging experience for WebViews, significantly reducing debugging time and QA by eliminating USB debugging.',
                  'Developed and maintained core Trading Frontend modules including Order History, Algo Trading, and Download Reports, integrating with RESTful APIs.',
                  'Identified and fixed memory leaks in TnC, PnL, and Ledger services, reducing memory usage by 30–40%.',
                  'Migrated multiple frontend applications from SvelteKit v2 to v4 and added partial offline support.',
                  'Set up Slack alerts for 5xx errors and built an automated pipeline for daily frontend performance reports via n8n.',
                ]}
                skills={[
                  'Svelte',
                  'SvelteKit',
                  'TypeScript',
                  'Tailwind',
                  'Vite',
                  'SolidJS',
                  'n8n',
                  'Grafana',
                  'AWS',
                ]}
              />

              <ExperienceCard
                devMode={devMode}
                active={false}
                type="ecommerce"
                role="Software Engineer 2"
                company="Nykaa"
                period="09/2020 – 04/2024"
                highlights={[
                  'Worked on and contributed to building nykaafashion.com, focusing on core features and platform quality.',
                  'Implemented image optimization strategies, reducing ImageKit cache usage from 1.6 TB to 600 MB.',
                  'Identified and fixed a memory leak in the Node server by correcting hash key logic for cached API responses (20% reduction).',
                  'Improved homepage performance by 18% using above-the-fold rendering and lazy loading on scroll.',
                  'Reduced CLS by 72% on the Product Details page and by 79% on the Product Listing page.',
                  'Built and maintained key user-facing features including Wishlist, Coupons, PDP, and Cart.',
                  'Migrated Remote Configuration from Firebase to AWS S3 to control feature flags and website config.',
                  'Implemented GDPR-compliant user consent controls for data usage across the website.',
                  'Led the analytics migration from Adobe Launch to Mixpanel by integrating Mixpanel with GTM.',
                ]}
                skills={[
                  'React',
                  'Node.js',
                  'JavaScript',
                  'HTML/CSS',
                  'Redux',
                  'Jest',
                  'RTL',
                  'Webpack',
                  'GTM',
                  'Adobe Analytics',
                  'Mixpanel',
                ]}
              />
            </div>
          </section>

          {/* New Technical Writing Section */}
          <section id="articles" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                  Technical Writing
                </h2>
                <p className="text-slate-400 text-base md:text-xl">Sharing knowledge on Medium.</p>
              </div>
            </div>

            <div
              ref={articlesCarouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 no-scrollbar"
            >
              <ArticleCard
                title="Transform Your Web Pages Instantly with Matcha.css"
                link="https://medium.com/p/fc2faa041574"
                icon={Palette}
              />
              <ArticleCard
                title="Exploring the Magic of Design Patterns: The Singleton Pattern"
                link="https://medium.com/p/f780f6b3cb3b"
                icon={Layers}
              />
              <ArticleCard
                title="CSP Unleashed: Your Web Bodyguard Against Cyber Invaders"
                link="https://medium.com/p/2b05910d8b96"
                icon={Shield}
              />
              <ArticleCard
                title="Stop Using Just 10% of DevTools — Here's What You're Missing"
                link="https://medium.com/p/5bba9725da47"
                icon={MonitorPlay}
              />
            </div>

            {/* Carousel Dots (Mobile Only) */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {Array.from({ length: articlesCardCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToArticleSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${articlesSlide === idx
                    ? 'bg-cyan-400 w-6'
                    : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  aria-label={`Go to article ${idx + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Footer with Scroll-Triggered Unlock Animation */}
          <FooterSection
            triggerUnlock={wasUnlockedViaButton}
            onLockedClick={() => handleLockedInteraction("Access Denied! Use the 'Contact Me' button.")}
            forceOpen={!isFooterLocked}
          />
        </main>
      </div>
    </div>
  );
}
