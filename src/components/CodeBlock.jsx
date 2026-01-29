import { FileCode } from 'lucide-react';

const CodeBlock = ({ fileName, code }) => (
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

export default CodeBlock;
