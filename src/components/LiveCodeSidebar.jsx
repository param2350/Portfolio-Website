import React, { useMemo } from 'react';
import { FileText, Folder, ChevronDown, Monitor, Rocket, Layers, Database, BookOpen } from 'lucide-react';
import CodeBlock from './CodeBlock';

const LiveCodeSidebar = ({ activeSection }) => {
    const activeFile = useMemo(() => {
        switch (activeSection) {
            case 'hero': return 'intro.tsx';
            case 'projects': return 'twa_lens_config.ts';
            case 'engineering': return 'performance_metrics.rs';
            case 'stack': return 'tech_stack.json';
            case 'work': return 'career_graph.ts';
            case 'articles': return 'publications.md';
            default: return 'intro.tsx';
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
// Paramvir Ramola
// Senior Frontend Engineer
// Implementing scalable systems...

const Specialist = {
  name: "Paramvir Ramola",
  role: "Senior Frontend Engineer",
  focus: ["Performance", "Scalability", "UX"],
  status: "Available for new challenges"
};

export default Specialist;
`;
            case 'twa_lens_config.ts':
                return `
export const TWALensConfig = {
    target: "WebView",
    features: [
        "NetworkInspector",
        "ConsoleStreaming",
        "CSSInspector",
        "PerformanceMonitor"
    ],
    deviceSupport: ["Android", "iOS"],
    security: {
        piiMasking: true,
        tlsValidation: true
    }
};
`;
            case 'performance_metrics.rs':
                return `
struct WebVitals {
    lcp: Duration,
    fid: Duration,
    cls: f32,
}

impl WebVitals {
    fn optimize(&mut self) {
        // Reduced LCP by 40%
        self.lcp = Duration::from_millis(800);
        // Zero layout shifts
        self.cls = 0.0;
    }
}
`;
            case 'tech_stack.json':
                return `
{
  "frontend": ["React", "Svelte", "Next.js"],
  "backend": ["Node.js", "Rust", "Go"],
  "infrastructure": ["AWS", "Docker", "K8s"],
  "tools": ["Figma", "Postman", "Grafana"]
}
`;
            case 'career_graph.ts':
                return `
const career = new Timeline();

career.add({
  company: "AngelOne",
  role: "SDE 2",
  impact: "Built TWA Lens, 30% Perf Boost"
});

career.add({
  company: "Nykaa",
  role: "Software Engineer",
  impact: "CDN Opt, Metric Migration"
});
`;
            case 'publications.md':
                return `
# Recent Articles

- [Matcha.css](https://medium.com/...)
- [Singleton Pattern](https://medium.com/...)
- [CSP Unleashed](https://medium.com/...)

 Sharing knowledge is key to growth.
`;
            default:
                return "// Select a file to view code";
        }
    };

    return (
        <div className="hidden lg:flex flex-col w-1/3 h-[calc(100vh-6rem)] sticky top-24 border-r border-slate-800 bg-[#0d1117]">
            {/* File Explorer Header */}
            <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Explorer</span>
            </div>

            {/* File List */}
            <div className="py-2 border-b border-slate-800">
                <div className="px-4 py-1 flex items-center gap-2 text-slate-400 text-sm">
                    <ChevronDown size={14} />
                    <Folder size={14} className="text-blue-400" />
                    <span className="font-bold">src</span>
                </div>
                <ul className="mt-1">
                    {files.map(f => (
                        <li key={f.name} className={`px-8 py-1.5 flex items-center gap-2 text-sm cursor-default transition-colors border-l-2 ${activeFile === f.name ? 'bg-slate-800/50 text-white border-cyan-500' : 'text-slate-500 border-transparent hover:bg-slate-900'}`}>
                            <f.icon size={14} className={activeFile === f.name ? 'text-cyan-400' : 'text-slate-600'} />
                            <span className="font-mono text-xs">{f.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 overflow-auto bg-[#0d1117] p-4 custom-scrollbar">
                <CodeBlock fileName={activeFile} code={getCodeContent(activeFile).trim()} />
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
