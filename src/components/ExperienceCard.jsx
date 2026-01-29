import React from 'react';
import { TrendingUp, ShoppingBag, ChevronRight } from 'lucide-react';
import CodeBlock from './CodeBlock';

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

// Missing dependency Tag needs to be imported or removed if unused.
// In the original code, Tag was used in isEcommerce block.
// Let's add Tag to imports.
import { Tag } from 'lucide-react';

export default ExperienceCard;
