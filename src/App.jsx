import { useState, useEffect } from 'react';
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
    className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 transition-all hover:border-slate-600 group h-full flex flex-col min-w-[85vw] md:min-w-0 snap-center`}
  >
    <div
      className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[80px] opacity-20 ${gradient}`}
    ></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  </div>
);

const ProgressBar = ({ label, before, after, colorClass, unit, max }) => {
  const reduction = before - after;
  const percentage = Math.round((reduction / before) * 100);

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-end text-xs font-mono text-slate-500 mb-2">
        <span>{label}</span>
        <span
          className={`${colorClass} font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800`}
        >
          -{percentage}% Reduction
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-slate-700"
          style={{ width: `${(before / max) * 100}%` }}
        ></div>
        <div
          className={`absolute top-0 left-0 h-full ${colorClass.replace('text-', 'bg-')} transition-all duration-1000 ease-out z-10`}
          style={{ width: `${(after / max) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
        <span>0</span>
        <div className="flex gap-8">
          <span className={colorClass}>
            Now: {after}
            {unit}
          </span>
          <span className="text-slate-600">
            Was: {before}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

const SecurityList = ({ items }) => (
  <div className="space-y-3">
    {items.map((item, idx) => (
      <div
        key={idx}
        className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-900/50 hover:bg-slate-900 transition-colors"
      >
        <div className="mt-0.5 text-emerald-500 shrink-0">
          <CheckCircle size={16} />
        </div>
        <div className="text-sm text-slate-400">
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
    className="block p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group h-full min-w-[85vw] md:min-w-0 snap-center"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
        <Icon size={20} />
      </div>
      <ExternalLink
        size={16}
        className="text-slate-600 group-hover:text-cyan-400"
      />
    </div>
    <h3 className="text-lg font-bold text-slate-200 group-hover:text-white leading-tight mb-2">
      {title}
    </h3>
    <p className="text-xs text-slate-500 font-mono mt-auto pt-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
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
  const [isFooterLocked, setIsFooterLocked] = useState(true);
  const [showContactSequence, setShowContactSequence] = useState(false);

  const [wasUnlockedViaButton, setWasUnlockedViaButton] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [monkeyMessage, setMonkeyMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleUnlockSequence = () => {
    if (!isFooterLocked) {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Start the overlay sequence
    setMonkeyMessage(''); // Clear any denial messages
    setShowContactSequence(true);
  };

  const onSequenceComplete = () => {
    setShowContactSequence(false);
    setIsFooterLocked(false);
    setWasUnlockedViaButton(true); // Trigger footer unlock animation
    // Wait for state update then scroll
    setTimeout(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      className={`min-h-screen transition-colors duration-500 ${devMode ? 'bg-[#0a0a0a] font-mono selection:bg-purple-500/30' : 'bg-slate-950 font-sans selection:bg-cyan-500/30'} text-slate-200`}
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

      {/* Mascot - Now Interactive */}
      <HangingMonkey
        onClick={handleUnlockSequence}
        isFooterLocked={isFooterLocked}
        forceMessage={monkeyMessage}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || devMode ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div
            className={`flex items-center gap-2 font-bold text-xl tracking-tighter text-white transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          >
            {devMode ? (
              <Terminal className="text-green-500" size={20} />
            ) : (
              <Activity className="text-cyan-400" size={20} />
            )}
            Paramvir Ramola
          </div>

          <div className="flex items-center gap-6">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${devMode ? 'bg-green-500/10 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400'}`}
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
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 pointer-events-auto flex flex-col justify-center text-left py-8 pr-8 lg:pr-12">

                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                  Paramvir <br /> Ramola
                </h1>
                <h2 className="text-2xl text-cyan-400 font-medium mb-8 flex items-center gap-2">
                  Frontend Engineer <Code size={24} className="text-slate-600" />
                </h2>
                <div className="text-slate-400 text-lg leading-relaxed max-w-md mb-8 space-y-2">
                  <p>
                    Building scalable frontend systems for high-traffic fintech and
                    e-commerce platforms.
                  </p>

                </div>
                <div className="flex flex-wrap gap-4 relative z-10 lg:hidden">
                  <button
                    onClick={handleUnlockSequence}
                    className="px-8 py-3 font-bold rounded-full transition-all flex items-center gap-2 bg-white text-slate-950 hover:bg-cyan-50"
                  >
                    Contact Me <Mail size={16} />
                  </button>
                  <a
                    href="#projects"
                    className="px-8 py-3 bg-slate-900/50 backdrop-blur border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    View Work <ArrowDown size={16} />
                  </a>
                </div>

                {/* Compact Stats Row */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 grid grid-cols-3 gap-6">
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                      <TrendingUp size={18} />
                      <span className="text-xs font-bold font-mono tracking-wider text-emerald-500/80">FINTECH</span>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">AngelOne</div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2 text-pink-400">
                      <ShoppingBag size={18} />
                      <span className="text-xs font-bold font-mono tracking-wider text-pink-500/80">ECOMMERCE</span>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">Nykaa</div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-2 mb-2 text-cyan-400">
                      <Clock size={18} />
                      <span className="text-xs font-bold font-mono tracking-wider text-cyan-500/80">EXP</span>
                    </div>
                    <div className="text-sm text-slate-300 font-medium">5+ Years</div>
                  </div>
                </div>
              </div>

              {/* 2. Interactive Gap (Right Side) - Empty for physics interaction */}
              <div className="hidden lg:block col-span-2 row-span-2 pointer-events-auto cursor-crosshair group relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="text-cyan-500/20 font-mono text-xs tracking-[0.5em] animate-pulse">
                    INTERACT WITH FIELD
                  </span>
                </div>

                {/* Desktop Buttons (Bottom Right) - Aligned to grid */}
                <div className="absolute bottom-0 right-0 hidden lg:flex gap-4 z-20">
                  <button
                    onClick={handleUnlockSequence}
                    className="px-8 py-3 font-bold rounded-full transition-all flex items-center gap-2 bg-white text-slate-950 hover:bg-cyan-50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
                  >
                    Contact Me <Mail size={16} />
                  </button>
                  <a
                    href="#projects"
                    className="px-8 py-3 bg-slate-900/80 backdrop-blur border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105"
                  >
                    View Work <ArrowDown size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE SECTION: Featured Projects */}
          <section id="projects" className="mb-32 relative scroll-mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Featured Projects
                </h2>
                <p className="text-slate-400">
                  Innovations and tools built for scale.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 rounded-3xl blur-3xl -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Engineering Deep Dives
                </h2>
                <p className="text-slate-400">
                  Beyond the UI: Infrastructure, Security, and Scale.
                </p>
              </div>
            </div>

            {/* Responsive Grid / Carousel */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 no-scrollbar">
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
                  <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <ProgressBar
                      label="Nykaa CDN Cache Size"
                      before={1.6}
                      after={1.0}
                      max={1.6}
                      unit="TB"
                      colorClass="text-blue-400"
                    />
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
          </section>

          {/* NEW SECTION: Tech Stack */}
          <section id="stack" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  My Tech Stack
                </h2>
                <p className="text-slate-400">
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 scroll-mt-24"
          >
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-6 sticky top-24">
                Career <br />
                Timeline
                <p className="text-sm font-normal text-slate-500 mt-4 font-mono">
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
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Technical Writing
                </h2>
                <p className="text-slate-400">Sharing knowledge on Medium.</p>
              </div>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 no-scrollbar">
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
                title="Stop Using Just 10% of DevTools — Here’s What You’re Missing"
                link="https://medium.com/p/5bba9725da47"
                icon={MonitorPlay}
              />
            </div>
          </section>

          {/* Footer with Scroll-Triggered Unlock Animation */}
          <FooterSection
            triggerUnlock={wasUnlockedViaButton}
            onLockedClick={() => handleLockedInteraction("Access Denied! Use the 'Contact Me' button.")}
          />
        </main>
      </div>
    </div>
  );
}
