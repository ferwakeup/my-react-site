import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowUpRight, 
  Calendar, 
  Cpu,
  Zap, 
  Shield, 
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FERNANDO MARTÍN - PERSONAL WEBSITE
 * Feature: Granize-inspired Loader + Responsive Mobile Safari Optimization
 */

// --- Custom Brand Components ---

const IntelLogo = () => (
  <svg className="w-10 md:w-12 h-auto fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.112 18.002H2.888L0 20.352h24l-2.888-2.35zm-2.434-12.82c-.848 0-1.53.682-1.53 1.53 0 .847.682 1.53 1.53 1.53.847 0 1.53-.683 1.53-1.53a1.532 1.532 0 00-1.53-1.53zm-.08 3.515h-.452c-1.28 0-2.32 1.04-2.32 2.321v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25h.451V8.697zm-3.324 2.321c0-1.28-1.041-2.32-2.32-2.32-1.28 0-2.32 1.04-2.32 2.32v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v5.043h1.071l-.002-5.043zm-5.715-4.642V8.697h.804v1.272H8.755v5.093h1.071v-5.043h.804v6.315H8.755v-1.272h-.804V8.697h-.804V7.425h.804V6.376h1.071v1.049h.537zm-3.044 2.321c-1.28 0-2.32 1.04-2.32 2.32v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25.69 0 1.25.56 1.25 1.25v5.043h1.071v-5.043c0-1.28-1.04-2.321-2.321-2.321zM3.463 8.697V7.425h1.071v1.272H3.463zm0 6.365V10.02h1.071v5.043H3.463z"/>
  </svg>
);

const MotorolaLogo = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm1.905-13.43c-.477-.042-1.393.125-1.894.614l-2.016 3.024-2.016-3.024c-.5-.49-1.417-.656-1.894-.614-.72.062-1.3.643-1.3 1.37v6.626h1.636V9.16l2.164 3.246c.3.451.92.451 1.22 0l2.164-3.246v7.006h1.636V9.54c0-.727-.58-1.308-1.3-1.37z"/>
  </svg>
);

const NokiaLogo = () => (
  <svg className="w-12 md:w-16 h-auto fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.848 15.548l-5.836-7.854v7.854H9.554V8.452h2.24l5.836 7.854V8.452h2.458v7.096h-2.24zm-11.41 0H4v-7.096h2.458l5.837 7.854V8.452h2.24v7.096h-2.24l-5.837-7.854v7.854zM24 15.548h-2.61l-3.256-4.38-3.256 4.38H12.27l4.893-6.586-4.893-6.586h2.608l3.257 4.38 3.256-4.38H24l-4.893 6.586L24 15.548z"/>
  </svg>
);

const XLogo = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

const NexmoLogo = () => (
  <svg className="h-6 md:h-8 w-auto fill-white mb-2 md:mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="30" r="8" fill="currentColor" opacity="0.8" />
    <circle cx="45" cy="15" r="5" fill="currentColor" />
    <circle cx="45" cy="45" r="5" fill="currentColor" />
    <line x1="15" y1="30" x2="45" y2="15" stroke="currentColor" strokeWidth="2" />
    <line x1="15" y1="30" x2="45" y2="45" stroke="currentColor" strokeWidth="2" />
    <text x="65" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="24">NEXMO</text>
  </svg>
);

const MovenLogo = () => (
  <svg className="h-6 md:h-8 w-auto fill-white mb-2 md:mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45L25 10L40 45L55 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <text x="70" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="28" letterSpacing="2">MOVEN</text>
  </svg>
);

// --- Loader Component (Granize Style) ---

const PreLoader = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);
  const words = ["CORPORATE", "FOUNDER", "BUILDER"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(countInterval);
        setTimeout(finishLoading, 800);
        return 100;
      });
    }, 25);

    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 800);

    return () => {
      clearInterval(countInterval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-between h-full py-20">
        <div className="overflow-hidden">
          <motion.p 
            key={words[index]}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="text-4xl md:text-6xl font-light text-zinc-500 tracking-tighter"
          >
            {words[index]}
          </motion.p>
        </div>
        
        <div className="flex items-end justify-between w-full border-t border-zinc-800 pt-8">
           <span className="text-zinc-600 font-mono text-xs uppercase tracking-[0.3em]">System Initialization</span>
           <span className="text-7xl md:text-9xl font-light text-white tracking-tighter tabular-nums leading-none">
             {counter}%
           </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Standard UI Components ---

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-8 md:mb-12">
    <div className="flex items-center gap-4 mb-2">
      <span className="text-xs font-mono text-zinc-500">{number}</span>
      <div className="h-px w-8 bg-zinc-800"></div>
    </div>
    <h2 className="text-2xl md:text-4xl font-light tracking-tight text-white mb-2">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-zinc-500 font-light max-w-lg">{subtitle}</p>}
  </div>
);

const VentureCard = ({ LogoComponent, name, role, desc, link, isCurrent = false }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative block p-6 md:p-8 rounded-2xl border transition-all duration-500 ${
      isCurrent ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600' : 'border-transparent hover:bg-zinc-900/30'
    }`}
  >
    <div className="flex justify-between items-start mb-4 md:mb-6">
      <div className="flex flex-col">
        <span className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 md:mb-3">{role}</span>
        {LogoComponent ? <LogoComponent /> : <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors">{name}</h3>}
      </div>
      <div className="p-2 rounded-full bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-all">
        <ArrowUpRight size={16} />
      </div>
    </div>
    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-4">{desc}</p>
  </a>
);

// --- Main App ---

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    setTimeout(() => setFormStatus('Message sent successfully.'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-100 selection:text-black antialiased">
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content Entrance */}
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 px-6 py-6 md:py-8 md:px-12 flex justify-between items-center pointer-events-none">
            <div className="text-white text-lg font-medium tracking-tighter pointer-events-auto">FM.</div>
            <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-auto">
              <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
              <a href="#ventures" className="hover:text-white transition-colors">Ventures</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <a 
              href="mailto:info@fernando-martin.eu" 
              className="text-[10px] md:text-xs font-mono uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white transition-all text-white pointer-events-auto"
            >
              Let's talk
            </a>
          </nav>

          <main>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-20 md:pt-0">
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div 
                  className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-20 lg:opacity-40"
                  style={{
                    backgroundImage: 'url("Screenshot 2025-12-29 at 15.31.57.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 15%',
                    maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)'
                  }}
                />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-4xl">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Entrepreneur in Residence
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-4xl sm:text-6xl md:text-8xl lg:text-[9.5rem] font-light text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 drop-shadow-2xl"
                  >
                    Building <br />
                    <span className="text-zinc-600 italic block mt-1 md:mt-2">new ventures.</span>
                  </motion.h1>
                  
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    >
                      <p className="text-base md:text-xl text-zinc-400 font-light leading-relaxed max-w-md mb-8 md:mb-12">
                        I bridge the gap between corporate infrastructure and founder grit. Scaling technology with the discipline of Big Tech and the hunger of a startup.
                      </p>
                      <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                        <a 
                          href="#contact" 
                          className="bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-medium hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl shadow-black/20"
                        >
                          Start a Venture <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <div className="flex gap-4">
                          <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Linkedin size={22} /></a>
                          <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><XLogo size={22} /></a>
                          <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Instagram size={22} /></a>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 1, delay: 1.4 }}
                      className="hidden md:flex flex-col items-end hover:opacity-100 transition-all duration-500"
                    >
                       <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-6">Corporate Heritage</div>
                       <div className="flex items-center gap-8 text-white grayscale brightness-150">
                          <IntelLogo />
                          <MotorolaLogo />
                          <NokiaLogo />
                       </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
              <SectionHeading number="01" title="The Bridge Between Two Worlds" subtitle="Most corporations fail at ventures because they can't balance structure with survival." />
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mt-12 md:mt-16">
                <div className="space-y-4 group">
                  <div className="p-3 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Cpu className="text-white" size={20} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Big Tech Discipline</h4>
                  <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">Operated within Intel, Motorola, and Nokia. I understand the complexities of global R&D and high-weight governance.</p>
                </div>
                <div className="space-y-4 group">
                  <div className="p-3 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Zap className="text-white" size={20} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Founder Grit</h4>
                  <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">Ground from zero to an IBEX35 investment. I've "eaten glass" to find product-market fit when the market didn't even know it needed it.</p>
                </div>
                <div className="space-y-4 group sm:col-span-2 md:col-span-1">
                  <div className="p-3 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Shield className="text-white" size={20} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Strategic Independence</h4>
                  <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">I believe corporate ventures need independence in budgeting and strategy, using the parent as the first customer to prove PMF.</p>
                </div>
              </div>
            </section>

            <section id="ventures" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
              <SectionHeading number="02" title="Active Leadership" subtitle="Currently leading strategic product ventures and agentifying the venture building process." />
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <VentureCard LogoComponent={NexmoLogo} role="Managing Director" desc="Backed by UC3M. Leading data-centric ventures in the Spanish ecosystem." link="https://www.nexmo-datahub.eu/" isCurrent={true} />
                <VentureCard LogoComponent={MovenLogo} role="Fractional COO" desc="Driving the transition towards agentic venture building, streamlining the Zero to One process." link="https://moven.pro/" isCurrent={true} />
              </div>
            </section>

            <section className="py-20 md:py-32 border-t border-zinc-900 px-6 md:px-12 max-w-7xl mx-auto">
              <SectionHeading number="03" title="Track Record" subtitle="Previous ventures built, scaled, or strategically advised." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center justify-center">
                {[
                  { name: "Eccocar", url: "https://www.eccocar.com/" },
                  { name: "CEEI Asturias", url: "https://www.ceei.es/" },
                  { name: "Terradat", url: "https://terradat.es/" },
                  { name: "Microbioma", url: "https://microbioma.org/" },
                  { name: "El camaleón de Rubik", url: "https://elcamaleonderubik.com/" }
                ].map((v) => (
                  <a key={v.name} href={v.url} target="_blank" rel="noreferrer" className="group p-6 md:p-8 text-center bg-zinc-900/30 border border-zinc-900 rounded-3xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all">
                    <span className="text-zinc-500 group-hover:text-white font-medium tracking-tight text-sm md:text-base">{v.name}</span>
                  </a>
                ))}
              </div>
            </section>

            <section id="contact" className="py-20 md:py-32 mb-10 md:mb-20 px-6 md:px-12 max-w-7xl mx-auto">
              <div className="bg-zinc-900/30 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-zinc-900 shadow-2xl">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-6xl font-light text-white mb-4 md:mb-6 tracking-tight">Let's create synergy.</h2>
                    <p className="text-zinc-500 max-w-lg mx-auto font-light text-sm md:text-base">Available for Managing Director roles, Fractional COO positions, and high-impact Entrepreneur in Residence programs.</p>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="space-y-10 md:space-y-12">
                      <div className="space-y-6">
                        <a href="mailto:info@fernando-martin.eu" className="flex items-center gap-4 text-base md:text-xl text-white hover:text-zinc-400 transition-colors">
                          <div className="p-2 md:p-3 bg-zinc-900 rounded-full"><Mail size={18} className="text-zinc-400" /></div>
                          info@fernando-martin.eu
                        </a>
                        <button onClick={() => window.open('https://calendar.app.google/WNN7737oFBWm8ViN9', '_blank')} className="flex items-center gap-4 text-base md:text-xl text-white hover:text-zinc-400 transition-colors text-left">
                          <div className="p-2 md:p-3 bg-zinc-900 rounded-full"><Calendar size={18} className="text-zinc-400" /></div>
                          Book a call directly
                        </button>
                      </div>
                      <div className="p-8 md:p-10 bg-zinc-950/50 border border-zinc-800 rounded-[2rem] shadow-inner">
                        <p className="text-zinc-400 italic font-light text-base md:text-lg">"Build an operating system that survives the corporate immune system."</p>
                      </div>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input required type="text" placeholder="Name" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-2xl outline-none text-white text-sm" />
                        <input required type="email" placeholder="Work Email" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-2xl outline-none text-white text-sm" />
                      </div>
                      <textarea required placeholder="What venture are we building?" rows="4" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-2xl outline-none text-white text-sm resize-none"></textarea>
                      <button type="submit" className="w-full bg-white text-black py-4 md:py-6 rounded-2xl font-bold flex items-center justify-center gap-3 text-base md:text-lg">
                        {formStatus || 'Send Inquiry'} <Send size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 text-center">
            <div>© 2025 Fernando Martín. Madrid • Munich • International</div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><XLogo size={10} /> X</a>
              <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <div>Built for the Zero to One Journey</div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;