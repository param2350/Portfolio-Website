import { useEffect } from 'react';
import { X } from 'lucide-react';
import MobileSimulator from './MobileSimulator';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 md:pt-20 md:pb-8 overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[80vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-300">
        {/* Decor */}
        <div
          className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${project.gradient.replace('from-', 'from-').replace('to-', 'to-').replace('/10', '')}`}
        ></div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-slate-400 text-lg">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Stats Grid */}
          {project.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl"
                >
                  <div className={`text-2xl font-bold ${project.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              Overview
            </h3>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <p className="text-slate-400 leading-relaxed text-lg flex-1">
                {project.description}
              </p>
              {project.id === 'twa-lens' && (
                <div className="w-full lg:w-auto flex justify-center lg:block">
                  <div className="transform scale-75 md:scale-90 origin-top">
                    <MobileSimulator />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors"
                >
                  <div className={`mt-1 ${feature.color}`}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
