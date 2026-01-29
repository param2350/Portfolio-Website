import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// --- Mobile Simulator ---
const MobileSimulator = () => {
  const [activeTab, setActiveTab] = useState('network');

  useEffect(() => {
    const tabs = ['network', 'console', 'storage', 'css', 'perf'];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
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
            <span className="text-[9px] font-bold text-slate-200 tracking-wide">
              TWA LENS
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        <div className="flex border-b border-slate-800 text-[9px] font-mono font-bold text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap">
          {['network', 'console', 'storage', 'css', 'perf'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 uppercase transition-colors relative flex-shrink-0 ${activeTab === tab ? 'text-cyan-400 bg-cyan-950/20' : 'hover:text-slate-300'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-3 font-mono text-[9px] space-y-2 overflow-hidden flex-1 bg-[#0a0f16]">
          {activeTab === 'network' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center text-green-400 border-l-2 border-green-500 pl-2 bg-green-500/5 py-1 rounded-r">
                <span className="font-bold">GET /api/user</span>
                <span className="bg-green-500/20 px-1 rounded text-[8px]">
                  200 OK
                </span>
              </div>
              <div className="flex justify-between items-center text-yellow-400 border-l-2 border-yellow-500 pl-2 bg-yellow-500/5 py-1 rounded-r">
                <span className="font-bold">POST /api/order</span>
                <span className="bg-yellow-500/20 px-1 rounded text-[8px]">
                  201 Created
                </span>
              </div>
              <div className="flex justify-between items-center text-red-400 opacity-70 pl-2 py-1">
                <span>GET /analytics</span>
                <span className="italic text-[8px] border border-red-500/30 px-1 rounded">
                  (Mocked)
                </span>
              </div>
            </div>
          )}
          {activeTab === 'console' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-slate-400 flex gap-2">
                <span className="text-blue-500">ℹ</span>{' '}
                <span>[Lens] Init v1.0</span>
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
                <span>Key</span>
                <span>Value</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/30">
                <span className="text-cyan-400">auth_token</span>
                <span className="truncate max-w-[60px]">eyJhbGci...</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/30">
                <span className="text-purple-400">theme</span>
                <span>dark</span>
              </div>
            </div>
          )}
          {activeTab === 'css' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-slate-500 text-[8px] uppercase border-b border-slate-800 pb-1">
                Computed Styles
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-blue-400">display</span>
                <span>flex</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-blue-400">color</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full border border-slate-600"></span>{' '}
                  #ffffff
                </span>
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
                <div className="h-1 bg-slate-800 rounded-full">
                  <div className="w-[30%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-slate-500 mb-1">
                  <span>CLS (Layout Shift)</span>
                  <span className="text-green-400">0.01</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full">
                  <div className="w-[5%] h-full bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSimulator;
