import { ArrowRight, Star } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const { title, subtitle, tags, color } = project;

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-full bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 cursor-pointer overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
    >
      {/* Hover Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-slate-950/50 border border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                {i === 0 && (
                  <Star size={10} className={color} fill="currentColor" />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <h3
          className={`text-2xl font-bold text-white mb-3 group-hover:${color} transition-colors`}
        >
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6 flex-1">{subtitle}</p>

        {/* Footer */}
        <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
          View Details{' '}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
