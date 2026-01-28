import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Cpu,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Layout,
  Database,
  Smartphone,
  Activity,
  Award,
  Server,
  Lock,
  Search,
  Wifi,
  Eye,
  FileCode,
  Layers,
  CheckCircle,
  AlertTriangle,
  Bell,
  GitBranch,
  BarChart3,
  MousePointer2,
  FileText,
  BookOpen,
  MonitorPlay,
  Palette,
  MapPin,
  Building2,
  Home,
  Baby,
  GraduationCap,
  TrendingUp,
  ShoppingBag,
  Tag,
  CreditCard,
  Hammer,
  Wrench,
  RefreshCw,
  Play
} from 'lucide-react';

// --- Visual Components (Standard Mode) ---

const VisualCard = ({ title, icon: Icon, children, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 transition-all hover:border-slate-600 group h-full flex flex-col min-w-[85vw] md:min-w-0 snap-center`}>
    <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[80px] opacity-20 ${gradient}`}></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="flex-1">
        {children}
      </div>
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
        <span className={`${colorClass} font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800`}>
          -{percentage}% Reduction
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
        {/* Total Possible (Background is 100% implicitly) */}

        {/* Before Value (The starting point) */}
        <div className="absolute top-0 left-0 h-full bg-slate-700/50" style={{ width: `${(before / max) * 100}%` }}></div>

        {/* After Value (The result) - Animated */}
        <div className={`absolute top-0 left-0 h-full ${colorClass.replace('text-', 'bg-')} transition-all duration-1000 ease-out z-10`} style={{ width: `${(after / max) * 100}%` }}></div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
        <span>0</span>
        <div className="flex gap-8">
          <span className={colorClass}>Now: {after}{unit}</span>
          <span className="text-slate-600">Was: {before}{unit}</span>
        </div>
      </div>
    </div>
  );
};

const SecurityList = ({ items }) => (
  <div className="space-y-3">
    {items.map((item, idx) => (
      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-900/50 hover:bg-slate-900 transition-colors">
        <div className="mt-0.5 text-emerald-500 shrink-0"><CheckCircle size={16} /></div>
        <div className="text-sm text-slate-400">
          <span className="text-slate-200 font-medium block mb-0.5">{item.title}</span>
          {item.desc}
        </div>
      </div>
    ))}
  </div>
);

const ArticleCard = ({ title, link, icon: Icon }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group h-full min-w-[85vw] md:min-w-0 snap-center">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
        <Icon size={20} />
      </div>
      <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400" />
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

// --- Animated Hero Components ---

// Floating orbs background
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
  </div>
);

// Animated typing text
const TypewriterText = ({ text, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Animated stats counter
const AnimatedCounter = ({ end, duration = 2000, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const timeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, delay]);

  return <span>{count}{suffix}</span>;
};

// Tech stack floating pills
const FloatingTechStack = () => {
  const techs = [
    { name: 'React', color: 'from-cyan-400 to-cyan-600', delay: 0 },
    { name: 'TypeScript', color: 'from-blue-400 to-blue-600', delay: 100 },
    { name: 'Node.js', color: 'from-green-400 to-green-600', delay: 200 },
    { name: 'Performance', color: 'from-amber-400 to-amber-600', delay: 300 },
    { name: 'Security', color: 'from-red-400 to-red-600', delay: 400 },
    { name: 'Architecture', color: 'from-purple-400 to-purple-600', delay: 500 },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      {techs.map((tech, i) => (
        <div
          key={tech.name}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${1500 + tech.delay}ms`, animationFillMode: 'forwards' }}
        >
          <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white text-sm font-medium shadow-lg shadow-${tech.color.split('-')[1]}-500/20 hover:scale-105 transition-transform cursor-default`}>
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Hero visual - Abstract code visualization
const HeroVisual = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[500px]">
      {/* Central glowing orb */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-2 w-44 h-44 lg:w-60 lg:h-60 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

          {/* Core */}
          <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
            <div className="text-center relative z-10">
              <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                5+
              </div>
              <div className="text-xs lg:text-sm text-slate-400 uppercase tracking-widest mt-1">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Orbit 1 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full inline-block mr-2 animate-pulse" />
            50+ Projects
          </div>
        </div>

        {/* Orbit 2 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <div className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur border border-purple-500/30 rounded-full text-xs text-purple-400 font-mono whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block mr-2 animate-pulse" />
            10+ Certifications
          </div>
        </div>

        {/* Orbit 3 */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '14s' }}>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur border border-emerald-500/30 rounded-full text-xs text-emerald-400 font-mono whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block mr-2 animate-pulse" />
            Enterprise Scale
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-float"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Placeholder for old WebBuilderSimulation to maintain compatibility
const WebBuilderSimulation = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [phase, setPhase] = useState('init');

  useEffect(() => {
    let mounted = true;
    const typeLine = async (line) => {
      if (!mounted) return;
      setCodeLines(prev => [...prev, line]);
      await new Promise(r => setTimeout(r, 400));
    };

    const runSequence = async () => {
      if (!mounted) return;
      setPhase('init');
      setCodeLines([]);
      await new Promise(r => setTimeout(r, 1000));

      setPhase('imports');
      await typeLine("import { Navbar } from './components';");
      await typeLine("import { Hero } from './components';");
      await typeLine("import { Features } from './components';");
      await new Promise(r => setTimeout(r, 500));

      setPhase('render_start');
      await typeLine("\nexport default function App() {");
      await typeLine("  return (");
      await typeLine("    <main className='layout'>");

      await new Promise(r => setTimeout(r, 600));
      setPhase('add_navbar');
      await typeLine("      <Navbar variant='dark' />");

      await new Promise(r => setTimeout(r, 600));
      setPhase('add_hero');
      await typeLine("      <Hero title='Next Gen' />");

      await new Promise(r => setTimeout(r, 600));
      setPhase('add_grid');
      await typeLine("      <Features data={items} />");

      setPhase('close');
      await typeLine("    </main>");
      await typeLine("  );");
      await typeLine("}");

      await new Promise(r => setTimeout(r, 1500));
      setPhase('optimizing');
      setCodeLines(prev => [
        "const Hero = lazy(() => import('./Hero'));",
        ...prev.slice(3)
      ]);

      await new Promise(r => setTimeout(r, 2000));
      setPhase('done');

      await new Promise(r => setTimeout(r, 5000));
      runSequence();
    };

    runSequence();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full bg-slate-900/50 rounded-2xl border border-slate-800 p-2 shadow-2xl flex gap-2 h-[380px] md:h-[400px] overflow-hidden">

      {/* Left Panel: The Architect (Code) */}
      <div className="flex-1 bg-[#0d1117] rounded-xl border border-slate-800 flex flex-col font-mono text-[10px] md:text-xs overflow-hidden relative group">
        {/* IDE Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <FileCode size={12} className="text-blue-400" />
            <span className="text-slate-400">Page.tsx</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          </div>
        </div>
        {/* Code Content */}
        <div className="p-3 text-slate-300 space-y-1 overflow-y-auto custom-scrollbar">
          {codeLines.map((line, i) => (
            <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-200">
              <span className="text-slate-700 select-none w-4 text-right shrink-0">{i + 1}</span>
              <pre className={`whitespace-pre-wrap font-mono ${line.includes('import') || line.includes('lazy') ? 'text-purple-400' : ''} ${line.includes('<') ? 'text-blue-300' : ''} ${line.includes('return') || line.includes('export') ? 'text-red-400' : ''}`}>
                {line}
              </pre>
            </div>
          ))}
          <div className="w-1.5 h-4 bg-cyan-500 animate-pulse ml-8 mt-1"></div>
        </div>

        {/* Status Bar */}
        <div className="mt-auto px-2 py-1 bg-slate-800 text-slate-500 text-[9px] flex justify-between border-t border-slate-700">
          <span className="flex items-center gap-1"><GitBranch size={8} /> main*</span>
          <span className="flex items-center gap-1">
            {phase === 'optimizing' ? <RefreshCw size={8} className="animate-spin text-cyan-400" /> : <CheckCircle size={8} className="text-emerald-500" />}
            {phase === 'optimizing' ? 'Bundling...' : 'Live'}
          </span>
        </div>
      </div>

      {/* Right Panel: The Experience (Preview) */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col relative transition-all duration-500">
        {/* Browser Header */}
        <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
          </div>
          <div className="bg-white border border-slate-200 rounded h-3 w-1/2 mx-auto flex items-center px-1">
            <Lock size={6} className="text-slate-400" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-3 bg-slate-50 relative overflow-hidden flex flex-col gap-3">

          {/* 1. Navbar Component */}
          {(['add_navbar', 'add_hero', 'add_grid', 'close', 'optimizing', 'done'].includes(phase)) && (
            <div className="h-8 w-full bg-slate-800 rounded-md shadow-sm flex items-center px-3 justify-between animate-in slide-in-from-top-2 duration-500">
              <div className="w-16 h-2 bg-slate-600 rounded"></div>
              <div className="flex gap-1">
                <div className="w-8 h-2 bg-slate-700 rounded"></div>
                <div className="w-8 h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          )}

          {/* 2. Hero Component */}
          {(['add_hero', 'add_grid', 'close', 'optimizing', 'done'].includes(phase)) && (
            <div className="h-24 w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md flex flex-col justify-center px-4 animate-in zoom-in-95 duration-500">
              <div className="w-1/2 h-3 bg-white/20 rounded mb-2"></div>
              <div className="w-1/3 h-2 bg-white/10 rounded"></div>
            </div>
          )}

          {/* 3. Grid/Features Component */}
          {(['add_grid', 'close', 'optimizing', 'done'].includes(phase)) && (
            <div className="grid grid-cols-2 gap-2 flex-1 animate-in slide-in-from-bottom-4 duration-500">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded border border-slate-200 p-2 shadow-sm">
                  <div className="w-full h-8 bg-slate-100 rounded mb-1"></div>
                  <div className="w-3/4 h-1.5 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Optimization Overlay */}
          {phase === 'optimizing' && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in">
              <div className="bg-white p-3 rounded-xl shadow-2xl border border-slate-200 flex flex-col items-center">
                <Activity className="text-cyan-500 animate-bounce mb-2" size={20} />
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Code Splitting...</span>
              </div>
            </div>
          )}

          {/* 5. Done State */}
          {phase === 'done' && (
            <div className="absolute top-2 right-2 flex gap-1 animate-in slide-in-from-top-2 z-30">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[8px] font-bold border border-emerald-200 shadow-sm flex items-center gap-1">
                <Zap size={8} fill="currentColor" /> Fast
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Live Code Scroller Component (Dev Mode Sidebar) ---
const LiveCodeSidebar = ({ activeSection }) => {
  const containerRef = useRef(null);

  // Define code snippets for each section in sequence
  // Order: Hero -> Lens -> Engineering -> Work -> Journey -> Articles
  const codeSnippets = {
    hero: [
      "import { Hero, Navbar } from '@components';",
      "import { TWA_Lens } from '@tools';",
      "",
      "export default function Portfolio() {",
      "  return (",
      "    <main className='bg-slate-950'>",
      "      <Navbar user='Paramvir' />",
      "      <Hero",
      "        title='Architecting Digital Velocity'",
      "        role='SDE 2 @ AngelOne'",
      "        stack={['React', 'SvelteKit', 'Node.js']}",
      "      />"
    ],
    "twa-lens": [
      "      {/* Innovation Highlight */}",
      "      <Section id='twa-lens'>",
      "        <TWA_Lens",
      "           features={['Network Mocking', 'CSS Inspector', 'Storage']}",
      "           impact='No USB Debugging Required'",
      "           award='Best Innovation Idea'",
      "        />",
      "      </Section>"
    ],
    engineering: [
      "      {/* Engineering Metrics */}",
      "      <Section id='deep-dives'>",
      "        <PerformanceCard",
      "           clsReduction='79% (PLP), 72% (PDP)'",
      "           homepagePerf='+18%'",
      "        />",
      "        <SystemInternals",
      "           memoryLeakFix='30-40%'",
      "           context='TnC, PnL, Ledger Services'",
      "        />",
      "        <Security",
      "           vulnerabilitiesFixed='10+'",
      "           measures={['PII Scrubbing', 'Source Maps Disabled']}",
      "        />",
      "      </Section>"
    ],
    work: [
      "      {/* Career History */}",
      "      <Timeline>",
      "        <Experience",
      "           company='AngelOne'",
      "           role='SDE 2 (05/2024 – Present)'",
      "           highlights={[",
      "             'Built Trading Services (Order History, Algo)',",
      "             'Migrated SvelteKit v2 -> v4',",
      "             'Automated n8n Perf Reports'",
      "           ]}",
      "        />",
      "        <Experience",
      "           company='Nykaa'",
      "           role='Software Engineer 2 (09/2020 – 04/2024)'",
      "           highlights={[",
      "             'Reduced CDN Cache 1.6TB -> 1TB',",
      "             'Migrated Adobe Launch -> Mixpanel',",
      "             'Moved Remote Config Firebase -> S3'",
      "           ]}",
      "        />",
      "      </Timeline>"
    ],
    journey: [
      "      {/* Life Path */}",
      "      <MapVisualization",
      "         education='VESIT, Mumbai (2016-2020)'",
      "         path={['Uttarakhand', 'Dadra', 'Mumbai', 'Gurgaon']}",
      "         current='AngelOne (Remote)'",
      "      />"
    ],
    articles: [
      "      <MediumArticles count={4} />",
      "      <Skills list={['React', 'SvelteKit', 'Redux', 'Node.js']} />",
      "      <Achievements list={['Individual Excellence Q4 2024', 'Employee of Quarter 2022']} />",
      "    </main>",
      "  );",
      "}"
    ]
  };

  // Build the code array based on scroll position/active section
  const getVisibleCode = () => {
    let lines = [...codeSnippets.hero];

    if (activeSection === 'hero') return lines;

    lines = [...lines, ...codeSnippets["twa-lens"]];
    if (activeSection === 'twa-lens') return lines;

    lines = [...lines, ...codeSnippets.engineering];
    if (activeSection === 'engineering') return lines;

    lines = [...lines, ...codeSnippets.work];
    if (activeSection === 'work') return lines;

    lines = [...lines, ...codeSnippets.journey];
    if (activeSection === 'journey') return lines;

    lines = [...lines, ...codeSnippets.articles];
    return lines;
  };

  const visibleLines = getVisibleCode();

  // Scroll logic using setTimeout to ensure DOM update first
  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }, [visibleLines.length]);

  return (
    <div className="hidden lg:flex w-1/3 sticky top-24 flex-col bg-[#0d1117] rounded-xl border border-slate-800 h-[calc(100vh-8rem)] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0d1117] rounded-t-xl">
        <div className="flex items-center gap-2 text-slate-400">
          <FileCode size={14} className="text-blue-400" />
          <span>portfolio.tsx</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500/20 border border-red-500/50 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500/20 border border-yellow-500/50 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-green-500/20 border border-green-500/50 rounded-full"></div>
        </div>
      </div>

      {/* Content Area - Fixed Flex Growth + Scroll */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-0 w-full">
        {visibleLines.map((line, i) => (
          <div key={i} className="flex gap-4 leading-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-slate-700 select-none w-6 text-right shrink-0">{i + 1}</span>
            <pre className={`whitespace-pre-wrap break-all ${line.includes('import') || line.includes('export') ? 'text-purple-400' : ''} ${line.includes('<') || line.includes('/>') ? 'text-blue-300' : 'text-slate-300'} ${line.includes('//') ? 'text-slate-500 italic' : ''}`}>
              {line}
            </pre>
          </div>
        ))}
        <div className="h-4 w-2 bg-cyan-500 animate-pulse ml-10 mt-1"></div>
      </div>

      {/* Footer - Fixed at Bottom */}
      <div className="shrink-0 mt-auto p-2 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between rounded-b-xl z-10">
        <span>Ln {visibleLines.length}, Col 1</span>
        <span>UTF-8</span>
        <span className="text-blue-400">TypeScript React</span>
      </div>
    </div>
  );
};

// --- Journey Map Components ---

const MapNode = ({ x, y, title, subtitle, icon: Icon, delay, active }) => (
  <div
    className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer hover:z-50`}
    style={{ left: x, top: y }}
  >
    <div className="relative">
      <div className={`absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-500 group-hover:opacity-60 ${active ? 'bg-cyan-400 opacity-40' : 'bg-slate-500'}`}></div>
      <div className={`w-14 h-14 border-2 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${active ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'}`}>
        <Icon size={24} />
      </div>
      {/* Pulse effect for active node */}
      {active && <div className="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-20"></div>}
    </div>

    <div className={`mt-4 px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-center w-48 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-70 group-hover:opacity-100 group-hover:-translate-y-1'}`}>
      <div className={`font-bold text-sm mb-0.5 ${active ? 'text-white' : 'text-slate-300'}`}>{title}</div>
      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">{subtitle}</div>
    </div>
  </div>
);

const JourneyMap = () => {
  return (
    <div className="relative w-full h-[500px] bg-slate-900/30 rounded-3xl border border-slate-800 overflow-hidden hidden md:block">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #64748b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      {/* Map Outline (Abstract) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {/* Abstract "Region" Polygon to simulate map outline */}
        <path d="M 200 50 L 800 50 L 900 250 L 700 450 L 200 450 L 100 250 Z" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="10 5" />
        <path d="M 150 250 L 850 250" stroke="#64748b" strokeWidth="0.5" strokeDasharray="5 5" />
        <path d="M 500 50 L 500 450" stroke="#64748b" strokeWidth="0.5" strokeDasharray="5 5" />
      </svg>

      {/* Connection Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 800 50 Q 500 50 200 150 L 200 350 Q 200 425 500 425 T 800 250"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          strokeDasharray="8 4"
          strokeLinecap="round"
          filter="url(#glow)"
          className="opacity-60"
        >
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Nodes */}
      <MapNode x="80%" y="10%" title="Uttarakhand" subtitle="Born & Raised" icon={Baby} />
      <MapNode x="20%" y="30%" title="Dadra & Nagar Haveli" subtitle="Early Schooling" icon={BookOpen} />
      <MapNode x="20%" y="70%" title="Mumbai" subtitle="Engineering (VESIT)" icon={GraduationCap} />
      <MapNode x="50%" y="85%" title="Gurgaon" subtitle="Nykaa (SDE 2)" icon={Building2} />
      <MapNode x="80%" y="50%" title="Uttarakhand" subtitle="AngelOne (Remote)" icon={Home} active={true} />
    </div>
  );
};

// --- TWA Lens Simulation Component ---
const MobileSimulator = () => {
  const [activeTab, setActiveTab] = useState('network');

  useEffect(() => {
    const tabs = ['network', 'console', 'storage', 'css', 'perf'];
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[450px] w-[240px] shadow-2xl flex flex-col overflow-hidden transform transition-transform hover:scale-105 duration-500">
      <div className="h-[18px] w-[80px] bg-gray-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[1rem] z-20"></div>

      <div className="flex-1 bg-slate-800 p-3 pt-10 opacity-50 blur-[1px] flex flex-col gap-3">
        <div className="h-32 bg-slate-700 rounded-lg animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
          <div className="h-3 bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[65%] bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/30 flex flex-col transition-all duration-500 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="px-3 py-1.5 flex justify-between items-center border-b border-slate-800/50 bg-slate-900/50">
          <div className="flex items-center gap-1.5">
            <Search size={10} className="text-cyan-400" />
            <span className="text-[9px] font-bold text-slate-200 tracking-wide">TWA LENS</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        <div className="flex border-b border-slate-800 text-[9px] font-mono font-bold text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap">
          {['network', 'console', 'storage', 'css', 'perf'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 uppercase transition-colors relative flex-shrink-0 ${activeTab === tab ? 'text-cyan-400 bg-cyan-950/20' : 'hover:text-slate-300'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500"></div>}
            </button>
          ))}
        </div>

        <div className="p-3 font-mono text-[9px] space-y-2 overflow-hidden flex-1 bg-[#0a0f16]">
          {activeTab === 'network' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center text-green-400 border-l-2 border-green-500 pl-2 bg-green-500/5 py-1 rounded-r">
                <span className="font-bold">GET /api/user</span>
                <span className="bg-green-500/20 px-1 rounded text-[8px]">200 OK</span>
              </div>
              <div className="flex justify-between items-center text-yellow-400 border-l-2 border-yellow-500 pl-2 bg-yellow-500/5 py-1 rounded-r">
                <span className="font-bold">POST /api/order</span>
                <span className="bg-yellow-500/20 px-1 rounded text-[8px]">201 Created</span>
              </div>
              <div className="flex justify-between items-center text-red-400 opacity-70 pl-2 py-1">
                <span>GET /analytics</span>
                <span className="italic text-[8px] border border-red-500/30 px-1 rounded">(Mocked)</span>
              </div>
            </div>
          )}
          {activeTab === 'console' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-slate-400 flex gap-2">
                <span className="text-blue-500">ℹ</span> <span>[Lens] Init v1.0</span>
              </div>
              <div className="text-yellow-500 flex gap-2">
                <span>⚠</span> <span>DeprecationWarning: ..</span>
              </div>
              <div className="text-slate-300 flex gap-2 border-l-2 border-blue-500 pl-2">
                <span>User session restored</span>
              </div>
            </div>
          )}
          {activeTab === 'storage' && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-1 text-[8px] uppercase">
                <span>Key</span><span>Value</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/30">
                <span className="text-cyan-400">auth_token</span><span className="truncate max-w-[60px]">eyJhbGci...</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/30">
                <span className="text-purple-400">theme</span><span>dark</span>
              </div>
            </div>
          )}
          {activeTab === 'css' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-slate-500 text-[8px] uppercase border-b border-slate-800 pb-1">Computed Styles</div>
              <div className="flex justify-between text-slate-300">
                <span className="text-blue-400">display</span>
                <span>flex</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-blue-400">color</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full border border-slate-600"></span> #ffffff</span>
              </div>
            </div>
          )}
          {activeTab === 'perf' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <div className="flex justify-between text-[8px] text-slate-500 mb-1">
                  <span>LCP (Largest Contentful Paint)</span>
                  <span className="text-green-400">1.2s</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full"><div className="w-[30%] h-full bg-green-500 rounded-full"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-slate-500 mb-1">
                  <span>CLS (Layout Shift)</span>
                  <span className="text-green-400">0.01</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full"><div className="w-[5%] h-full bg-green-500 rounded-full"></div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Code/Dev Components (Dev Mode) ---

const CodeBlock = ({ fileName, code, language = 'json' }) => (
  <div className="rounded-lg border border-slate-800 bg-[#0d1117] overflow-hidden font-mono text-sm shadow-xl">
    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
      <div className="flex items-center gap-2">
        <FileCode size={14} className="text-blue-400" />
        <span className="text-slate-400 text-xs">{fileName}</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
      </div>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const ExperienceCard = ({ role, company, period, highlights, skills, active, devMode, type }) => {
  if (devMode) {
    const jobData = {
      position: role,
      company: company,
      duration: period,
      type: type,
      impact: highlights,
      tech_stack: skills
    };
    return (
      <div className="mb-8 font-mono">
        <span className="text-purple-400">const</span> <span className="text-blue-400">{company.toLowerCase().replace(/\s/g, '_')}Experience</span> <span className="text-slate-400">=</span>
        <CodeBlock fileName={`${company.toLowerCase()}.ts`} code={JSON.stringify(jobData, null, 2)} />
      </div>
    );
  }

  // --- Domain Specific Visuals ---
  const isFintech = type === 'fintech';
  const isEcommerce = type === 'ecommerce';

  return (
    <div className={`relative pl-8 pb-12 border-l ${active ? 'border-cyan-500' : 'border-slate-800'} last:border-0 group`}>
      <div className={`absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full ring-4 ring-slate-950 transition-colors duration-300 ${active ? 'bg-cyan-500' : 'bg-slate-700'}`} />

      {/* Background Domain Visuals (Subtle) */}
      {isFintech && (
        <div className="absolute right-0 top-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
          <div className="flex items-end gap-1">
            <div className="w-4 h-16 bg-emerald-500 rounded-sm animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-24 bg-emerald-500 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-12 bg-red-500 rounded-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-4 h-32 bg-emerald-500 rounded-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-4 h-20 bg-emerald-500 rounded-sm animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          </div>
          <TrendingUp size={120} className="text-emerald-500 absolute -bottom-4 -right-4 opacity-20" />
        </div>
      )}

      {isEcommerce && (
        <div className="absolute right-0 top-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
          <ShoppingBag size={120} className="text-pink-500 absolute -bottom-4 -right-4 opacity-20" />
          <Tag size={40} className="text-pink-400 absolute top-0 right-20 rotate-12" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {role}
              {active && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
            </h3>
            {/* Domain Badge */}
            {isFintech && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1"><TrendingUp size={10} /> FinTech & Trading</span>}
            {isEcommerce && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1"><ShoppingBag size={10} /> E-commerce & Retail</span>}
          </div>
          <div className="text-lg text-cyan-400 font-medium">{company}</div>
        </div>
        <div className="text-sm font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded border border-slate-800">
          {period}
        </div>
      </div>

      <ul className="space-y-3 mb-6 relative z-10">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed group/item">
            <ChevronRight size={16} className="mt-1 text-slate-600 group-hover/item:text-cyan-400 transition-colors shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 relative z-10">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-800/80 backdrop-blur rounded hover:text-white hover:bg-slate-800 transition-colors cursor-default border border-slate-800">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function Portfolio() {
  const [devMode, setDevMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
      // Root Margin determines "active area"
      // "-10% 0px -50% 0px" means:
      // Trigger when top of element is 10% from top of viewport
      // Stop triggering when bottom of element is 50% from bottom of viewport
      { rootMargin: "-10% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${devMode ? 'bg-[#0a0a0a] font-mono selection:bg-purple-500/30' : 'bg-slate-950 font-sans selection:bg-cyan-500/30'} text-slate-200`}>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      {!devMode && <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_70%)]"></div>}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || devMode ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
            {devMode ? <Terminal className="text-green-500" size={20} /> : <Activity className="text-cyan-400" size={20} />}
            Paramvir Ramola
          </div>

          <div className="flex items-center gap-6">
            {!devMode && (
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
                <a href="#twa-lens" className="hover:text-cyan-400 transition-colors">Innovation</a>
                <a href="#engineering" className="hover:text-cyan-400 transition-colors">Engineering</a>
                <a href="#articles" className="hover:text-cyan-400 transition-colors">Articles</a>
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
      <div className={`relative z-10 pt-24 ${devMode ? 'flex' : 'max-w-6xl mx-auto px-4 md:px-6 pb-20'}`}>

        {/* Left Side: Live Code Editor (Only in Dev Mode) */}
        {devMode && <LiveCodeSidebar activeSection={activeSection} />}

        {/* Right Side: Scrollable Content */}
        <main className={`${devMode ? 'w-full lg:w-2/3 px-4 lg:px-12' : 'w-full'}`}>

          {/* Hero Section - Immersive Experience */}
          <section id="hero" className="min-h-[90vh] flex items-center justify-center relative mb-24 scroll-mt-24 -mt-16">
            {/* Background effects */}
            <FloatingOrbs />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />

            <div className="relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left: Text Content */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Greeting with animation */}
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Available for opportunities
                    </span>
                  </div>

                  {/* Name */}
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                      <span className="text-white">Hi, I'm </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                        Paramvir
                      </span>
                    </h1>
                  </div>

                  {/* Role with typing effect */}
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light">
                      <span className="text-cyan-400 font-mono">&lt;</span>
                      <TypewriterText text="Senior Frontend Engineer" delay={1000} className="font-medium" />
                      <span className="text-cyan-400 font-mono">/&gt;</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Crafting <span className="text-white font-medium">high-performance</span>,
                      <span className="text-white font-medium"> scalable</span> web experiences.
                      Specialized in performance optimization, security architecture, and building
                      products that millions use daily.
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                    <FloatingTechStack />
                  </div>

                  {/* CTA Buttons */}
                  <div className="opacity-0 animate-fade-in-up flex flex-wrap gap-4 justify-center lg:justify-start" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
                    <a
                      href="#engineering"
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Explore My Work
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>

                    <div className="flex items-center gap-1">
                      <a
                        href="https://github.com/param2350"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all hover:scale-105"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/paramvir-ramola/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all hover:scale-105"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href="mailto:ramolaparamvir99@gmail.com"
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all hover:scale-105"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right: Visual Element */}
                <div className="hidden lg:block">
                  <HeroVisual />
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                  <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-slate-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE SECTION: TWA LENS */}
          <section id="twa-lens" className="mb-32 relative scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-blue-900/10 rounded-3xl blur-3xl -z-10"></div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 order-2 lg:order-1">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                        <Search size={20} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase tracking-wider border border-yellow-500/20 flex items-center gap-2">
                        <Award size={12} /> Best Innovation Idea
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      The <span className="text-cyan-400">TWA Lens</span>
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                      An internal, on-device WebView debugging tool built to solve the black-box nature of mobile WebViews.
                      It exposes a DevTools-like interface directly within the app, enabling engineers and QA to debug issues on production hardware without cables.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-cyan-500/30 transition-colors group">
                      <Activity size={20} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-bold text-sm mb-1">Network Inspector</h4>
                      <p className="text-xs text-slate-500">Mock APIs & inspect headers.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-blue-500/30 transition-colors group">
                      <Terminal size={20} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-bold text-sm mb-1">Console Streaming</h4>
                      <p className="text-xs text-slate-500">Real-time logs on-device.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-pink-500/30 transition-colors group">
                      <Palette size={20} className="text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-bold text-sm mb-1">CSS Inspector</h4>
                      <p className="text-xs text-slate-500">Edit styles live.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-amber-500/30 transition-colors group">
                      <BarChart3 size={20} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-bold text-sm mb-1">Perf Monitor</h4>
                      <p className="text-xs text-slate-500">Web Vitals & Waterfall.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center relative order-1 lg:order-2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] -z-10"></div>
                  <MobileSimulator />
                </div>
              </div>
            </div>
          </section>

          {/* Engineering Section - The Core Request */}
          <section id="engineering" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Engineering Deep Dives</h2>
                <p className="text-slate-400">Beyond the UI: Infrastructure, Security, and Scale.</p>
              </div>
            </div>

            {/* Responsive Grid / Carousel */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 no-scrollbar">

              {/* Card 1: Performance */}
              <VisualCard title="Performance" icon={Zap} gradient="bg-amber-500">
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Optimized Core Web Vitals for high-traffic e-commerce pages.
                  </p>

                  <div className="space-y-4">
                    {/* CLS Improvements */}
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 font-mono">CLS on PLP</span>
                        <span className="text-xs text-amber-400 font-bold">-79%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[79%]"></div>
                      </div>
                    </div>

                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-400 font-mono">CLS on PDP</span>
                        <span className="text-xs text-amber-400 font-bold">-72%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[72%]"></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/50">
                      <Activity size={12} className="text-amber-500" />
                      <span>Homepage speed up 18% (Lazy Loading)</span>
                    </div>
                  </div>
                </div>
              </VisualCard>

              {/* Card 2: CDN / Infrastructure */}
              <VisualCard title="Infrastructure" icon={Server} gradient="bg-blue-500">
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Advanced image optimization strategies reducing bandwidth costs significantly.
                  </p>
                  <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <ProgressBar
                      label="CDN Cache Size"
                      before={1.6}
                      after={0.8}
                      max={1.6}
                      unit="TB"
                      colorClass="text-blue-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> AWS S3 Configs
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Cache Invalidation Logic
                    </div>
                  </div>
                </div>
              </VisualCard>

              {/* Card 3: System Internals (Updated with stats) */}
              <VisualCard title="System Internals" icon={Cpu} gradient="bg-purple-500">
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Diagnosed and resolved critical memory leaks in high-scale environments.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-400 font-bold">AngelOne Frontend</span>
                        <span className="text-white">30-40% Saved</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Ledger, PnL, TnC Services</p>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-purple-400 font-bold">NykaaFashion Node.js</span>
                        <span className="text-white">20-30% Saved</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Fixed Hash Key logic in Server</p>
                    </div>
                  </div>
                </div>
              </VisualCard>

              {/* Card 4: Security (Updated) */}
              <VisualCard title="Security" icon={Shield} gradient="bg-emerald-500">
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">10+</div>
                    <div className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Critical Vulnerabilities</div>
                    <div className="text-[10px] text-emerald-400/60 mt-1">Patched across TWA</div>
                  </div>

                  <SecurityList items={[
                    { title: "PII Data Protection", desc: "Log sanitization & masking" },
                    { title: "GDPR Controls", desc: "Consent management implementation" },
                  ]} />
                </div>
              </VisualCard>

              {/* Card 5: Observability (New) */}
              <VisualCard title="Observability" icon={Eye} gradient="bg-pink-500">
                <div className="space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Built proactive monitoring architecture to catch issues before users do.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <Activity size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">Grafana Dashboards</span>
                        Real-time health monitoring
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <AlertTriangle size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">Slack Alerts</span>
                        5xx Errors & Web Vital Spikes
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                      <GitBranch size={16} className="text-pink-400" />
                      <div className="text-xs text-slate-300">
                        <span className="block font-bold text-white">n8n Pipelines</span>
                        Automated Daily Performance Reports
                      </div>
                    </div>
                  </div>
                </div>
              </VisualCard>

            </div>
          </section>

          {/* Experience Section */}
          <section id="work" className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 scroll-mt-24">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-white mb-6 sticky top-24">
                Career <br />Timeline
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
                  "Created TWA Lens (Best Innovation Idea): An on-device WebView debugging tool.",
                  "Built SvelteKit-based Trading Services for Order History & Algo Trading.",
                  "Established automated pipelines (n8n) for daily Web Vitals performance reports.",
                  "Resolved critical memory leaks in PnL services, reducing usage by 30-40%."
                ]}
                skills={['SvelteKit', 'TypeScript', 'Web Security', 'n8n', 'Performance']}
              />

              <ExperienceCard
                devMode={devMode}
                active={false}
                type="ecommerce"
                role="Software Engineer 2"
                company="Nykaa"
                period="09/2020 – 05/2024"
                highlights={[
                  "Engineered Image Optimization strategies, reducing CDN cache from 1.6TB to 0.8TB (50% reduction).",
                  "Led the analytics infrastructure migration from Adobe Launch to Mixpanel.",
                  "Improved homepage performance by 18% via above-the-fold rendering optimization.",
                  "Identified and patched a critical memory leak in the Node.js server layer."
                ]}
                skills={['React', 'Node.js', 'Redis', 'AWS S3', 'Mixpanel']}
              />
            </div>
          </section>

          {/* NEW SECTION: Journey Map */}
          <section id="journey" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">My Journey</h2>
                <p className="text-slate-400">From the Mountains to the Metropolis.</p>
              </div>
            </div>

            {/* Desktop Map View */}
            <JourneyMap />

            {/* Mobile Timeline View */}
            <div className="flex flex-col space-y-8 md:hidden px-4 border-l-2 border-slate-800 ml-4 relative">
              <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="absolute bottom-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>

              <div className="relative pl-6 pb-2">
                <div className="absolute -left-[30px] top-1 bg-slate-900 border border-slate-700 rounded-full p-1.5 text-slate-400">
                  <Baby size={16} />
                </div>
                <h3 className="text-white font-bold">Uttarakhand</h3>
                <p className="text-sm text-slate-500">Born & Raised</p>
              </div>

              <div className="relative pl-6 pb-2">
                <div className="absolute -left-[30px] top-1 bg-slate-900 border border-slate-700 rounded-full p-1.5 text-slate-400">
                  <BookOpen size={16} />
                </div>
                <h3 className="text-white font-bold">Dadra & Nagar Haveli</h3>
                <p className="text-sm text-slate-500">Early Schooling</p>
              </div>

              <div className="relative pl-6 pb-2">
                <div className="absolute -left-[30px] top-1 bg-slate-900 border border-slate-700 rounded-full p-1.5 text-slate-400">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-white font-bold">Mumbai</h3>
                <p className="text-sm text-slate-500">Engineering (VESIT)</p>
              </div>

              <div className="relative pl-6 pb-2">
                <div className="absolute -left-[30px] top-1 bg-slate-900 border border-slate-700 rounded-full p-1.5 text-slate-400">
                  <Building2 size={16} />
                </div>
                <h3 className="text-white font-bold">Gurgaon</h3>
                <p className="text-sm text-slate-500">Software Engineer 2 (Nykaa)</p>
              </div>

              <div className="relative pl-6 pb-2">
                <div className="absolute -left-[30px] top-1 bg-slate-900 border border-cyan-500 rounded-full p-1.5 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  <Home size={16} />
                </div>
                <h3 className="text-cyan-400 font-bold">Uttarakhand</h3>
                <p className="text-sm text-slate-500">Current Stay (AngelOne Remote)</p>
              </div>
            </div>
          </section>

          {/* New Technical Writing Section */}
          <section id="articles" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Technical Writing</h2>
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

          {/* Footer */}
          <footer id="contact" className="border-t border-slate-800 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Let's Build Something<br /><span className="text-cyan-400">Secure & Scalable.</span></h2>
                <div className="flex flex-col gap-4">
                  <a href="mailto:ramolaparamvir99@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                    <Mail size={18} /> ramolaparamvir99@gmail.com
                  </a>
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${devMode ? 'bg-[#0d1117] border-green-900' : 'bg-slate-900 border-slate-800'}`}>
                <h3 className={`${devMode ? 'text-green-400 font-mono' : 'text-white font-bold'} mb-4`}>
                  {devMode ? '> ./links.sh' : 'Quick Links'}
                </h3>
                <div className="space-y-4">
                  <a href="#" className="flex justify-between items-center text-slate-400 hover:text-cyan-400 transition-colors">
                    <span>Download Resume</span> <ExternalLink size={16} />
                  </a>
                  <a href="https://github.com/param2350" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center text-slate-400 hover:text-cyan-400 transition-colors">
                    <span>GitHub Profile</span> <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/paramvir-ramola/" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center text-slate-400 hover:text-cyan-400 transition-colors">
                    <span>LinkedIn Profile</span> <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center text-slate-600 text-sm font-mono pt-8 border-t border-slate-900">
              <p>{devMode ? 'EOF' : `© ${new Date().getFullYear()} Paramvir Ramola.`}</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}