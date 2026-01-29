import { useState, useRef, useEffect } from 'react';
import { Lock, Mail, Github, Linkedin } from 'lucide-react';

// --- Footer Contact Section - Locked until Contact Me is clicked ---
const FooterSection = ({ triggerUnlock }) => {
  const [phase, setPhase] = useState('locked'); // locked -> unlocking -> revealed
  const footerRef = useRef(null);

  // Trigger unlock animation ONLY when button is clicked
  useEffect(() => {
    if (triggerUnlock && phase === 'locked') {
      // Start unlocking animation
      setTimeout(() => setPhase('unlocking'), 0);

      // Then reveal content
      setTimeout(() => {
        setPhase('revealed');
      }, 1200);
    }
  }, [triggerUnlock, phase]);

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
        <div
          className={`w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        />
      </div>

      {/* Locked State - Visible until Contact Me is clicked */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-700 ${phase === 'locked' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center gap-3 px-8 py-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700 mb-6">
          <Lock size={24} className="text-cyan-400" />
          <span className="font-mono text-lg tracking-[0.2em] text-white">
            SECURE CHANNEL
          </span>
        </div>
        <p className="text-slate-500 text-sm font-mono animate-pulse">
          Click &quot;Contact Me&quot; to unlock
        </p>
      </div>

      {/* Unlocking Animation - Expanding Lines from Center */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${phase === 'unlocking' ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Horizontal expanding line */}
        <div
          className={`absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-1000 ease-out ${isUnlocking ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
        />
        {/* Vertical expanding line */}
        <div
          className={`absolute w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent transition-all duration-1000 ease-out ${isUnlocking ? 'h-full opacity-100' : 'h-0 opacity-0'}`}
        />
      </div>

      {/* Main Content - Expands from center */}
      <div
        className={`max-w-4xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ease-out
          ${
            isRevealed
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-lg scale-y-0'
          }`}
        style={{ transformOrigin: 'center center' }}
      >
        {/* Heading */}
        <div
          className={`mb-12 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: isRevealed ? '200ms' : '0ms' }}
        >
          <div
            className={`w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 transition-all duration-500 ${isRevealed ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}
          >
            <Mail size={32} className="text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg">
            I&apos;d love to hear from you
          </p>
        </div>

        {/* Contact links */}
        <div
          className={`flex flex-wrap justify-center gap-8 md:gap-12 mb-16 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: isRevealed ? '400ms' : '0ms' }}
        >
          <a
            href="https://github.com/param2350"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Github size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
              GitHub
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/paramvir-ramola/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:text-blue-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Linkedin size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
              LinkedIn
            </span>
          </a>

          <a
            href="mailto:ramolaparamvir99@gmail.com"
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-purple-500/50 group-hover:text-purple-400 group-hover:bg-slate-800 transition-all duration-300 backdrop-blur-sm">
              <Mail size={32} />
            </div>
            <span className="text-xs font-medium text-slate-500 group-hover:text-white transition-colors">
              Email
            </span>
          </a>
        </div>

        {/* Divider that expands from center */}
        <div
          className={`w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8 transition-all duration-1000 ${isRevealed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
          style={{ transitionDelay: isRevealed ? '600ms' : '0ms' }}
        />

        {/* Copyright */}
        <div
          className={`transition-all duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: isRevealed ? '700ms' : '0ms' }}
        >
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Paramvir Ramola
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
