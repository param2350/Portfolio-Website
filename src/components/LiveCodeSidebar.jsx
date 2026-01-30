import { useMemo } from 'react';
import {
  FileText,
  Folder,
  ChevronDown,
  Monitor,
  Rocket,
  Layers,
  Database,
  BookOpen,
} from 'lucide-react';
import CodeBlock from './CodeBlock';

const LiveCodeSidebar = ({ activeSection }) => {
  const activeFile = useMemo(() => {
    switch (activeSection) {
      case 'hero':
        return 'intro.tsx';
      case 'projects':
        return 'twa_lens_config.ts';
      case 'engineering':
        return 'performance_metrics.rs';
      case 'stack':
        return 'tech_stack.json';
      case 'work':
        return 'career_graph.ts';
      case 'articles':
        return 'publications.md';
      default:
        return 'intro.tsx';
    }
  }, [activeSection]);

  const files = [
    { name: 'intro.tsx', icon: Monitor, section: 'hero' },
    { name: 'twa_lens_config.ts', icon: Rocket, section: 'projects' },
    { name: 'performance_metrics.rs', icon: Database, section: 'engineering' },
    { name: 'tech_stack.json', icon: Layers, section: 'stack' },
    { name: 'career_graph.ts', icon: FileText, section: 'work' },
    { name: 'publications.md', icon: BookOpen, section: 'articles' },
  ];

  const getCodeContent = (file) => {
    switch (file) {
      case 'intro.tsx':
        return `
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Shield } from 'lucide-react';

interface Props {
  name: string;
  role: string;
  isAvailable: boolean;
}

export const DeveloperCard: React.FC<Props> = ({ 
  name, 
  role, 
  isAvailable 
}) => {
  return (
    <motion.div 
      className="relative p-8 rounded-3xl bg-slate-900"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-5xl font-bold text-white">
        {name}
      </h1>
      
      <h2 className="text-2xl text-cyan-400 mt-4">
        {role}
      </h2>

      <div className="flex gap-4 mt-8">
        <Badge icon={Code} label="TypeScript" />
        <Badge icon={Zap} label="Performance" />
        <Badge icon={Shield} label="Security" />
      </div>

      {isAvailable && (
        <span className="absolute top-4 right-4 
          flex items-center gap-2 text-green-400">
          <span className="w-2 h-2 bg-green-400 
            rounded-full animate-pulse" />
          Open to Work
        </span>
      )}
    </motion.div>
  );
};
`;
      case 'twa_lens_config.ts':
        return `
import React, { useState } from 'react';
import { Network, Terminal, Palette } from 'lucide-react';

// TWA Lens - DevTools for WebViews
// No USB debugging required!

export const TWALensPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('network');
  const [logs, setLogs] = useState<ConsoleLog[]>([]);

  return (
    <div className="fixed bottom-0 left-0 right-0 
      h-[40vh] bg-slate-950 border-t border-slate-800">
      
      {/* Tab Bar */}
      <nav className="flex gap-1 p-2 bg-slate-900">
        <TabButton 
          icon={<Network size={14} />}
          label="Network"
          active={activeTab === 'network'}
          onClick={() => setActiveTab('network')}
        />
        <TabButton
          icon={<Terminal size={14} />} 
          label="Console"
          active={activeTab === 'console'}
          onClick={() => setActiveTab('console')}
        />
        <TabButton
          icon={<Palette size={14} />}
          label="Elements"
          active={activeTab === 'elements'}
          onClick={() => setActiveTab('elements')}
        />
      </nav>

      {/* Network Inspector */}
      {activeTab === 'network' && (
        <NetworkTable 
          requests={capturedRequests}
          onSelect={inspectRequest}
        />
      )}

      {/* Console Logs */}
      {activeTab === 'console' && (
        <ConsoleViewer 
          logs={logs}
          maskPII={true}  // Security: Hide sensitive data
        />
      )}
    </div>
  );
};
`;
      case 'performance_metrics.rs':
        return `
// Core Web Vitals Optimization @ Nykaa
// Achieved significant improvements on high-traffic pages

#[derive(Debug, Clone)]
pub struct WebVitalsReport {
    pub page: PageType,
    pub lcp: Duration,      // Largest Contentful Paint
    pub fid: Duration,      // First Input Delay  
    pub cls: f32,           // Cumulative Layout Shift
}

impl WebVitalsReport {
    /// Optimizations applied to Product Listing Page
    pub fn optimize_plp(&mut self) -> Result<Improvements> {
        // Before: CLS = 0.42 (Poor)
        // After:  CLS = 0.09 (Good) — 79% reduction!
        
        self.apply_skeleton_loaders()?;
        self.reserve_image_dimensions()?;
        self.lazy_load_below_fold()?;
        
        Ok(Improvements {
            cls_reduction: 0.79,
            lcp_improvement: Duration::from_millis(400),
        })
    }

    /// Memory leak fixes in Ledger & PnL services
    pub fn fix_memory_leaks(&self) -> MemoryStats {
        // Identified: Detached DOM nodes, unclosed sockets
        // Result: 40% memory reduction
        
        cleanup_detached_nodes();
        close_stale_connections();
        
        MemoryStats { saved_mb: 120 }
    }
}
`;
      case 'tech_stack.json':
        return `
{
  "frontend": {
    "frameworks": ["React", "Svelte", "SvelteKit", "SolidJS"],
    "styling": ["Tailwind CSS", "Emotion", "CSS Modules"],
    "state": ["Redux", "Zustand", "Svelte Stores"],
    "build": ["Vite", "Webpack", "Rollup"]
  },
  
  "languages": {
    "primary": ["TypeScript", "JavaScript"],
    "markup": ["HTML5", "CSS3", "SCSS"]
  },
  
  "testing": {
    "unit": ["Jest", "Vitest"],
    "integration": ["React Testing Library"],
    "e2e": ["Playwright", "Cypress"]
  },
  
  "devops": {
    "cloud": ["AWS S3", "CloudFront", "Lambda"],
    "monitoring": ["Grafana", "New Relic"],
    "automation": ["n8n", "GitHub Actions"]
  },
  
  "analytics": {
    "tools": ["Mixpanel", "Adobe Analytics", "GTM"],
    "migrations": ["Adobe Launch → Mixpanel via GTM"]
  }
}
`;
      case 'career_graph.ts':
        return `
import React from 'react';
import { TrendingUp, ShoppingBag } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  period: string;
  type: 'fintech' | 'ecommerce';
}

const experiences: Experience[] = [
  {
    company: 'AngelOne',
    role: 'SDE 2',
    period: '2024 - Present',
    type: 'fintech'
  },
  {
    company: 'Nykaa',
    role: 'Software Engineer 2',
    period: '2020 - 2024',
    type: 'ecommerce'
  }
];

export const Timeline: React.FC = () => (
  <div className="space-y-4">
    {experiences.map((exp, i) => (
      <article 
        key={exp.company}
        className="p-6 rounded-2xl bg-slate-900 
          border border-slate-800 
          hover:border-cyan-500/50 transition-all"
      >
        <div className="flex items-center gap-3">
          {exp.type === 'fintech' ? (
            <TrendingUp className="text-emerald-400" />
          ) : (
            <ShoppingBag className="text-pink-400" />
          )}
          <h3 className="text-xl font-bold text-white">
            {exp.company}
          </h3>
        </div>
        
        <p className="text-cyan-400 mt-2">{exp.role}</p>
        <time className="text-slate-500 text-sm">
          {exp.period}
        </time>
      </article>
    ))}
  </div>
);
`;
      case 'publications.md':
        return `
# Technical Writing

Sharing knowledge through detailed articles on Medium.

---

## Latest Articles

### 🎨 Matcha.css
Transform your web pages instantly with this 
classless CSS framework. Zero config, pure elegance.
→ Read on Medium

### 🔒 CSP Unleashed  
Your web bodyguard against cyber invaders.
Deep dive into Content Security Policy.
→ Read on Medium

### 🔧 DevTools Mastery
Stop using just 10% of Chrome DevTools.
Here's what you're missing.
→ Read on Medium

### 📐 Singleton Pattern
Exploring the magic of design patterns.
When and why to use Singletons.
→ Read on Medium

---

> "The best way to learn is to teach."
`;
      default:
        return '// Select a file to view code';
    }
  };

  return (
    <div className="hidden lg:flex flex-col w-1/3 h-[calc(100vh-6rem)] sticky top-24 border-r border-slate-800 bg-[#0d1117]">
      {/* File Explorer Header */}
      <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Explorer
        </span>
      </div>

      {/* File List */}
      <div className="py-2 border-b border-slate-800">
        <div className="px-4 py-1 flex items-center gap-2 text-slate-400 text-sm">
          <ChevronDown size={14} />
          <Folder size={14} className="text-blue-400" />
          <span className="font-bold">src</span>
        </div>
        <ul className="mt-1">
          {files.map((f) => (
            <li
              key={f.name}
              className={`px-8 py-1.5 flex items-center gap-2 text-sm cursor-default transition-colors border-l-2 ${activeFile === f.name ? 'bg-slate-800/50 text-white border-cyan-500' : 'text-slate-500 border-transparent hover:bg-slate-900'}`}
            >
              <f.icon
                size={14}
                className={
                  activeFile === f.name ? 'text-cyan-400' : 'text-slate-600'
                }
              />
              <span className="font-mono text-xs">{f.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Viewer */}
      <div className="flex-1 overflow-auto bg-[#0d1117] p-4 custom-scrollbar">
        <CodeBlock
          fileName={activeFile}
          code={getCodeContent(activeFile).trim()}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-cyan-900/20 px-4 py-1 text-[10px] font-mono text-cyan-500 flex justify-between items-center border-t border-slate-800">
        <span>MASTER branch</span>
        <span>Ln 12, Col 4</span>
      </div>
    </div>
  );
};

export default LiveCodeSidebar;
