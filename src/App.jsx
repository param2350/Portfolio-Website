import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Play,
  ArrowDown,
  ArrowUpRight,
  Box,
  Coffee,
  Workflow,
  Map as MapIcon,
  X,
  Unlock,
  Scan,
  AlertCircle,
  Power
} from 'lucide-react';

// --- Visual Components ---

const VisualCard = ({ title, icon: Icon, children, gradient }) => (
  <div className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 transition-all hover:border-slate-600 group h-full flex flex-col min-w-[85vw] md:min-w-0 snap-center`}>
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
        <div className="absolute top-0 left-0 h-full bg-slate-700/50" style={{ width: `${(before / max) * 100}%` }}></div>
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
  <a href={link} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all group h-full min-w-[85vw] md:min-w-0 snap-center">
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

// --- Tech Stack "Globe to Grid" Component ---
const TechStackDisplay = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  // Filtered List based on your request
  const skills = useMemo(() => [
    // Frameworks & UI (Group 0)
    { name: 'React', group: 0, color: 'text-cyan-400', icon: 'RC' },
    { name: 'Svelte', group: 0, color: 'text-orange-600', icon: 'SV' },
    { name: 'SvelteKit', group: 0, color: 'text-orange-500', icon: 'SK' },
    { name: 'SolidJS', group: 0, color: 'text-blue-400', icon: 'SD' },
    { name: 'Tailwind', group: 0, color: 'text-cyan-300', icon: 'TW' },
    { name: 'Emotion.js', group: 0, color: 'text-pink-400', icon: 'EM' },

    // Core & Backend (Group 1)
    { name: 'JavaScript', group: 1, color: 'text-yellow-400', icon: 'JS' },
    { name: 'TypeScript', group: 1, color: 'text-blue-500', icon: 'TS' },
    { name: 'HTML', group: 1, color: 'text-orange-400', icon: 'HT' },
    { name: 'CSS', group: 1, color: 'text-blue-400', icon: 'CS' },
    { name: 'Node.js', group: 1, color: 'text-green-500', icon: 'ND' },
    { name: 'Express.js', group: 1, color: 'text-gray-400', icon: 'EX' },

    // State, Test & Build (Group 2)
    { name: 'Redux', group: 2, color: 'text-purple-500', icon: 'RX' },
    { name: 'Jest', group: 2, color: 'text-red-400', icon: 'JE' },
    { name: 'RTL', group: 2, color: 'text-red-300', icon: 'RT' }, // React Testing Library
    { name: 'Webpack', group: 2, color: 'text-blue-300', icon: 'WP' },
    { name: 'Vite', group: 2, color: 'text-purple-400', icon: 'VI' },

    // Tools (Group 3)
    { name: 'Git', group: 3, color: 'text-orange-500', icon: 'GT' },
    { name: 'Grafana', group: 3, color: 'text-orange-400', icon: 'GR' },
    { name: 'n8n', group: 3, color: 'text-red-500', icon: 'N8' },
  ], []);

  const categories = ['FRAMEWORKS', 'CORE & BACKEND', 'BUILD & TEST', 'TOOLS'];

  const getPosition = (index, groupIndex) => {
    // 1. Globe State
    const angle = index * 137.5;
    const r = 140 * Math.sqrt((index + 1) / skills.length);
    const theta = angle * (Math.PI / 180);
    const xGlobe = r * Math.cos(theta);
    const yGlobe = r * Math.sin(theta);

    // 2. Grid State
    const colWidth = 180;
    const xGrid = (groupIndex - 1.5) * colWidth + (groupIndex > 1 ? 40 : -40);

    const groupItems = skills.filter(s => s.group === groupIndex);
    const itemIndexInGroup = groupItems.findIndex(s => s.name === skills[index].name);
    const yGrid = -160 + (itemIndexInGroup * 50);

    return { xGlobe, yGlobe, xGrid, yGrid };
  };

  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-pointer group perspective-1000 bg-slate-950/50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      ref={containerRef}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl transition-opacity duration-700 ${isExpanded ? 'opacity-20' : 'opacity-10'}`}></div>

      <div className={`absolute z-10 text-center transition-all duration-500 pointer-events-none ${isExpanded ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
        <div className="w-20 h-20 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center mx-auto shadow-2xl relative">
          <Layers size={32} className="text-slate-500" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping"></div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-white tracking-widest">MY STACK</h3>
        <p className="text-xs text-slate-500 font-mono mt-1">TAP TO EXPLORE</p>
      </div>

      <div className={`absolute inset-0 flex items-start justify-center pt-12 transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="flex w-full max-w-4xl justify-between px-4 md:px-24 overflow-x-auto no-scrollbar">
          {categories.map((cat, i) => (
            <div key={cat} className="text-center w-[140px] shrink-0">
              <h4 className="text-slate-500 font-bold font-mono tracking-widest text-[10px] md:text-xs border-b border-slate-800 pb-2">{cat}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {skills.map((skill, i) => {
          const { xGlobe, yGlobe, xGrid, yGrid } = getPosition(i, skill.group);
          const x = isExpanded ? xGrid : xGlobe;
          const y = isExpanded ? yGrid : yGlobe;

          return (
            <div
              key={skill.name}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: isExpanded ? 10 : 10 - Math.floor(i / 3)
              }}
            >
              <div className={`
                flex items-center gap-3 transition-all duration-500
                ${isExpanded
                  ? 'justify-start w-[160px] pl-2'
                  : 'justify-center px-4 py-2 rounded-full border backdrop-blur-md shadow-lg bg-slate-900/40 border-slate-800'}
              `}
              >
                <div className={`flex items-center justify-center rounded-full transition-all ${isExpanded ? 'w-6 h-6' : 'w-2 h-2'}`}>
                  {isExpanded ? (
                    <span className={`${skill.color} font-mono text-[10px] font-bold`}>{skill.icon}</span>
                  ) : (
                    <span className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-cyan-400' : 'bg-slate-600'}`}></span>
                  )}
                </div>
                <span className={`font-bold transition-colors ${skill.color} ${isExpanded ? 'text-sm' : 'text-slate-400 text-xs'}`}>
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

// --- MINI-GAME: "System Override" (Memory Sequence) ---
const MiniGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, showing, playing, won, lost
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // 9 grid nodes
  const nodes = Array(9).fill(0);

  const startGame = () => {
    const startSeq = [Math.floor(Math.random() * 9)];
    setSequence(startSeq);
    setUserSequence([]);
    setScore(0);
    setStatus('showing');
    setIsPlaying(true);
  };

  useEffect(() => {
    if (status === 'showing') {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= sequence.length) {
          clearInterval(interval);
          setStatus('playing');
          return;
        }
        setHighlightedNode(sequence[i]);
        setTimeout(() => setHighlightedNode(null), 400);
        i++;
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status, sequence]);

  const [highlightedNode, setHighlightedNode] = useState(null);

  const handleNodeClick = (index) => {
    if (status !== 'playing') return;

    // Visual feedback
    setHighlightedNode(index);
    setTimeout(() => setHighlightedNode(null), 200);

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    // Check correctness
    if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
      setStatus('lost');
      setIsPlaying(false);
      return;
    }

    // Check completion
    if (newUserSeq.length === sequence.length) {
      setScore(s => s + 1);
      if (score + 1 > highScore) setHighScore(s => s + 1);
      setUserSequence([]);
      setStatus('showing');

      // Add next step
      setTimeout(() => {
        setSequence(prev => [...prev, Math.floor(Math.random() * 9)]);
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 group hover:border-slate-600 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent)] pointer-events-none"></div>

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-emerald-400">
          <Terminal size={16} />
          <span className="text-xs font-bold tracking-widest font-mono">SYSTEM_OVERRIDE.exe</span>
        </div>
        <div className="text-xs font-mono text-slate-500">
          SCORE: <span className="text-white">{score}</span> | HI: {highScore}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-3 relative z-10 my-auto">
        {nodes.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNodeClick(i)}
            disabled={status !== 'playing'}
            className={`
              w-16 h-16 rounded-xl border-2 transition-all duration-200
              ${highlightedNode === i
                ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-95'
                : 'bg-slate-900 border-slate-800 hover:border-slate-600'}
              ${status === 'lost' ? 'border-red-500 opacity-50' : ''}
            `}
          ></button>
        ))}
      </div>

      {/* Footer / Controls */}
      <div className="absolute bottom-6 w-full px-6 flex justify-center">
        {status === 'idle' && (
          <button onClick={startGame} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-emerald-900/20">
            <Play size={16} fill="currentColor" /> INITIATE SEQUENCE
          </button>
        )}
        {status === 'lost' && (
          <button onClick={startGame} className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-red-900/20">
            <RefreshCw size={16} /> SYNC FAILED - RETRY?
          </button>
        )}
        {(status === 'showing' || status === 'playing') && (
          <div className="text-emerald-500/50 text-xs font-mono animate-pulse">
            {status === 'showing' ? 'OBSERVE PATTERN...' : 'REPLICATE SEQUENCE...'}
          </div>
        )}
      </div>
    </div>
  );
};

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
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
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

// --- Mobile Simulator ---
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

// --- Footer Contact Section with Scroll-Triggered Unlock ---
const FooterSection = ({ wasUnlockedViaButton }) => {
  const [phase, setPhase] = useState('hidden'); // hidden -> locked -> unlocking -> revealed
  const footerRef = useRef(null);

  useEffect(() => {
    // If unlocked via button, skip to revealed
    if (wasUnlockedViaButton) {
      setPhase('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'hidden') {
          // First show locked state
          setPhase('locked');

          // After a brief moment, start unlocking animation
          setTimeout(() => {
            setPhase('unlocking');
          }, 800);

          // Then reveal content
          setTimeout(() => {
            setPhase('revealed');
          }, 1600);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [phase, wasUnlockedViaButton]);

  const isRevealed = phase === 'revealed';
  const isUnlocking = phase === 'unlocking' || phase === 'revealed';

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 min-h-[60vh]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
      </div>

      {/* Locked State Overlay - shows briefly then fades */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-700 ${phase === 'locked' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center gap-3 px-6 py-3 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700">
          <Lock size={18} className="text-cyan-400 animate-pulse" />
          <span className="font-mono text-sm tracking-[0.2em] text-slate-300">SECURE CHANNEL</span>
        </div>
      </div>

      {/* Unlocking Animation - Expanding Lines from Center */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${phase === 'unlocking' ? 'opacity-100' : 'opacity-0'}`}>
        {/* Horizontal expanding line */}
        <div className={`absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-1000 ease-out ${isUnlocking ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
        {/* Vertical expanding line */}
        <div className={`absolute w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent transition-all duration-1000 ease-out ${isUnlocking ? 'h-full opacity-100' : 'h-0 opacity-0'}`} />
      </div>

      {/* Main Content - Expands from center */}
      <div
        className={`max-w-4xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ease-out
          ${isRevealed
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-lg scale-y-0'
          }`}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Heading */}
        <div className={`mb-12 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: isRevealed ? '200ms' : '0ms' }}>
          <div className={`w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 transition-all duration-500 ${isRevealed ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
            <Mail size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-slate-400 text-lg">I'd love to hear from you</p>
        </div>

        {/* Contact links */}
        <div className={`flex flex-wrap justify-center gap-8 md:gap-12 mb-16 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: isRevealed ? '400ms' : '0ms' }}>
          <a href="https://github.com/param2350" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Github size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/paramvir-ramola/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:text-blue-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Linkedin size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">LinkedIn</span>
          </a>

          <a href="mailto:ramolaparamvir99@gmail.com" className="flex flex-col items-center gap-4 group">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-purple-500/50 group-hover:text-purple-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Mail size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">Email</span>
          </a>
        </div>

        {/* Divider that expands from center */}
        <div className={`w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8 transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: isRevealed ? '600ms' : '0ms' }} />

        {/* Copyright */}
        <div className={`transition-all duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isRevealed ? '700ms' : '0ms' }}>
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Paramvir Ramola</p>
        </div>
      </div>
    </footer>
  );
};

// --- Code Block Component ---
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

// --- Experience Card Component ---
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
  const [isFooterLocked, setIsFooterLocked] = useState(true);
  const [showContactSequence, setShowContactSequence] = useState(false);
  const [highlightContact, setHighlightContact] = useState(false);
  const [wasUnlockedViaButton, setWasUnlockedViaButton] = useState(false);

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
      { rootMargin: "-10% 0px -50% 0px" }
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
    setShowContactSequence(true);
  };

  const onSequenceComplete = () => {
    setShowContactSequence(false);
    setIsFooterLocked(false);
    setWasUnlockedViaButton(true); // Mark that it was unlocked via button (skip scroll animation)
    // Wait for state update then scroll
    setTimeout(() => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFooterLockedClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHighlightContact(true);
    setTimeout(() => setHighlightContact(false), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${devMode ? 'bg-[#0a0a0a] font-mono selection:bg-purple-500/30' : 'bg-slate-950 font-sans selection:bg-cyan-500/30'} text-slate-200`}>

      {/* Unlock Animation Overlay (Global) */}
      {showContactSequence && <ContactSequence onClose={onSequenceComplete} />}

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
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#engineering" className="hover:text-cyan-400 transition-colors">Engineering</a>
                <a href="#stack" className="hover:text-cyan-400 transition-colors">Stack</a>
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
      <div className={`relative z-10 pt-24 ${devMode ? 'flex' : 'max-w-7xl mx-auto px-4 md:px-6 pb-20'}`}>

        {/* Left Side: Live Code Editor (Only in Dev Mode) */}
        {devMode && <LiveCodeSidebar activeSection={activeSection} />}

        {/* Right Side: Scrollable Content */}
        <main className={`${devMode ? 'w-full lg:w-2/3 px-4 lg:px-12' : 'w-full'}`}>

          {/* HERO SECTION: Bento Grid Layout */}
          <section id="hero" className="min-h-screen pt-4 pb-24 flex flex-col justify-center max-w-7xl mx-auto scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">

              {/* 1. Main Intro Card (2x2) */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-slate-600 transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-all duration-500"></div>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse absolute inset-0"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs font-mono text-green-400 tracking-wider">AVAILABLE FOR PROJECTS</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
                    Paramvir <br /> Ramola
                  </h1>
                  <h2 className="text-xl text-cyan-400 font-medium mb-6 flex items-center gap-2">Senior Frontend Engineer <Code size={20} className="text-slate-600" /></h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    I engineer resilient, high-performance web systems. Currently solving scale at <span className="text-white font-bold">AngelOne</span>.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                  <button
                    onClick={handleUnlockSequence}
                    className={`px-6 py-2.5 font-bold rounded-full transition-all flex items-center gap-2 ${highlightContact ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-110' : 'bg-white text-slate-950 hover:bg-cyan-50'}`}
                  >
                    {highlightContact ? 'CLICK HERE TO UNLOCK' : 'Contact Me'} <Mail size={16} />
                  </button>
                  <a href="#projects" className="px-6 py-2.5 bg-transparent border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2">View Work <ArrowDown size={16} /></a>
                </div>
              </div>

              {/* 2. System Override Mini-Game (Replaces System Arch) (2x2 on LG) */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col min-h-[340px] group hover:border-slate-700 transition-all">
                <MiniGame />
              </div>

              {/* 3. Experience Stats (1x1) */}
              <div className="col-span-1 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-center items-center hover:border-cyan-500/30 transition-all group">
                <span className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">5+</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest text-center font-bold">Years Experience</span>
              </div>

              {/* 4. Placeholder / Spacer (1x1) */}
              <div className="col-span-1 bg-slate-900/20 border border-slate-800/50 rounded-3xl p-6 flex items-center justify-center text-center">
                <p className="text-slate-500 text-xs font-mono">
                  <Power size={24} className="mx-auto mb-2 text-slate-600" />
                  SYSTEM_ONLINE
                </p>
              </div>

            </div>
          </section>

          {/* FEATURE SECTION: Featured Projects (Rebranded TWA Lens) */}
          <section id="projects" className="mb-32 relative scroll-mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
                <p className="text-slate-400">Innovations and tools built for scale.</p>
              </div>
            </div>

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

          {/* Engineering Section */}
          <section id="engineering" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Engineering Deep Dives</h2>
                <p className="text-slate-400">Beyond the UI: Infrastructure, Security, and Scale.</p>
              </div>
            </div>

            {/* Responsive Grid / Carousel */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 no-scrollbar">
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
                    {/* ... (Rest of performance card content) ... */}
                  </div>
                </div>
              </VisualCard>

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
                </div>
              </VisualCard>

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
                  </div>
                </div>
              </VisualCard>

              {/* Restored Security Card */}
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

              {/* Restored Observability Card */}
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

          {/* NEW SECTION: Tech Stack */}
          <section id="stack" className="mb-32 scroll-mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">My Tech Stack</h2>
                <p className="text-slate-400">The tools I use to build systems.</p>
              </div>
            </div>
            <div className="bg-slate-900/20 border border-slate-800/50 rounded-3xl overflow-hidden relative">
              {/* Background Grid */}
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

              <TechStackDisplay />

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

          {/* Footer with Scroll-Triggered Unlock Animation */}
          <FooterSection wasUnlockedViaButton={wasUnlockedViaButton} />

        </main>
      </div>
    </div>
  );
}