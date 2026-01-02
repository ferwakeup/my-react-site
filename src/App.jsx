import React, { useState, useEffect, useRef } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowUpRight, 
  Calendar, 
  Cpu,
  Zap, 
  Shield, 
  Send,
  ArrowLeft,
  Building2,
  Rocket,
  Cog,
  Play,
  ChevronRight,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FERNANDO MARTÍN - MASTER BUILDER (PRODUCTION V4.0)
 * SENIOR UX REFACTOR:
 * 1. Adaptive Breakpoints: Mobile-first stacking vs desktop expansion.
 * 2. Finger-Friendly UX: Min 48px touch targets for all interactive elements.
 * 3. Legibility: Responsive typography (Fluid scaling).
 * 4. Navigation: Conditional mobile menu for small screens.
 */

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body { 
      background-color: #0a0a0a; 
      margin: 0; 
      padding: 0; 
      overflow-x: hidden; 
      -webkit-font-smoothing: antialiased;
    }
    
    /* Safari specific fixes */
    h1, h2, h3, p, a, button { -webkit-text-size-adjust: 100%; }
    
    /* Ensure no tiny text */
    p, a, span, button { font-size: 1rem; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
  `}} />
);

// --- ASSET HELPERS ---
const IntelLogo = () => (
  <img src="/logo-intel.svg" alt="Intel" className="w-full h-auto object-contain invert grayscale brightness-200" />
);

const MotorolaLogo = () => (
  <img src="/logo-motorola.png" alt="Motorola" className="w-full h-auto object-contain invert grayscale brightness-200" />
);

const NokiaLogo = () => (
  <img src="/logo-nokia.png" alt="Nokia" className="w-full h-auto object-contain invert grayscale brightness-200" />
);

const NexmoLogo = () => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5">
      <Building2 className="text-black w-full h-full" />
    </div>
    <span className="text-white font-bold text-xl tracking-tighter">NEXMO</span>
  </div>
);

const MovenLogo = () => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1.5">
      <Rocket className="text-black w-full h-full" />
    </div>
    <span className="text-white font-bold text-xl tracking-tighter">MOVEN</span>
  </div>
);

const XLogo = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

// --- PRELOADER ---
const PreLoader = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    { text: "CORPORATE", Icon: Building2 },
    { text: "FOUNDER", Icon: Rocket },
    { text: "BUILDER", Icon: Cog }
  ];

  useEffect(() => {
    const duration = 2300; 
    const countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(countInterval);
        return 100;
      });
    }, duration / 100);

    const t1 = setTimeout(() => setWordIndex(1), 850);
    const t2 = setTimeout(() => setWordIndex(2), 1700);
    const tFinish = setTimeout(() => finishLoading(), 2600);

    return () => {
      clearInterval(countInterval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(tFinish);
    };
  }, [finishLoading]);

  return (
    <motion.div 
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 md:p-12"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-between h-full py-12 md:py-20">
        <div className="overflow-hidden h-24 md:h-32 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={wordIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-6 md:gap-8"
            >
              <div className="text-zinc-500">
                <motion.div
                  animate={wordIndex === 2 ? { rotate: 360 } : {}}
                  transition={wordIndex === 2 ? { repeat: Infinity, duration: 4, ease: "linear" } : {}}
                >
                  {React.createElement(words[wordIndex].Icon, { size: 48, strokeWidth: 1.5 })}
                </motion.div>
              </div>
              <p className="text-4xl md:text-8xl font-light text-zinc-500 tracking-tighter uppercase">{words[wordIndex].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-end justify-between w-full border-t border-zinc-800 pt-10">
           <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">Initialization</span>
           <span className="text-7xl md:text-9xl font-light text-white tracking-tighter tabular-nums leading-none">{counter}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- INSIGHTS CAROUSEL ---
const InsightsCarousel = () => {
  const scrollRef = useRef(null);
  const items = [
    { id: 1, title: "The Zero to One Strategy", cat: "Venture Building", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800", desc: "Navigating corporate R&D to market-ready startups." },
    { id: 2, title: "Big Tech Discipline", cat: "Governance", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", desc: "Global structures integrated into high-speed operations." },
    { id: 3, title: "Spanish Tech Ecosystem", cat: "Keynote", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800", desc: "Growth strategies for data-centric ventures in Iberia." },
    { id: 4, title: "Agentic AI Ventures", cat: "Future Tech", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800", desc: "Automating the early venture construction cycle." }
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({ left: dir === 'left' ? scrollLeft - 300 : scrollLeft + 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="insights" className="py-24 md:py-32 border-t border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-4"><span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Insights</span><div className="h-px w-12 bg-zinc-800"></div></div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">Knowledge in Motion</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll('left')} className="p-5 rounded-full border border-zinc-800 hover:border-white text-zinc-400 hover:text-white transition-all"><ChevronLeft size={28} /></button>
          <button onClick={() => scroll('right')} className="p-5 rounded-full border border-zinc-800 hover:border-white text-zinc-400 hover:text-white transition-all"><ChevronRight size={28} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="min-w-[85vw] md:min-w-[500px] snap-start group">
            <div className="aspect-[16/10] md:aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 mb-8 relative border border-zinc-800">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-70 transition-all duration-700" />
              <div className="absolute top-6 right-6 p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all"><Play size={32} fill="currentColor" /></div>
              <div className="absolute bottom-6 left-6"><span className="text-sm font-mono uppercase tracking-widest text-white/90 bg-black/60 backdrop-blur px-5 py-2.5 rounded-full border border-white/10">{item.cat}</span></div>
            </div>
            <h3 className="text-3xl text-white font-light mb-4">{item.title}</h3>
            <p className="text-xl text-zinc-400 font-light mb-8 leading-relaxed">{item.desc}</p>
            <a href="#contact" className="inline-flex items-center gap-3 text-base font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-4 group">
              View Session <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        ))}
        <div className="min-w-[60px] h-1" />
      </div>
    </section>
  );
};

// --- MAIN APP ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [view]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    setTimeout(() => setFormStatus('Message sent.'), 1500);
  };

  const NavLinks = () => (
    <>
      <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-4 px-2">Philosophy</a>
      <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-4 px-2">Insights</a>
      <a href="#ventures" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-4 px-2">Ventures</a>
      <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-4 px-2">Contact</a>
    </>
  );

  const renderView = () => {
    if (view === 'privacy') {
      return (
        <LegalLayout title="Privacy Policy" onBack={() => setView('home')}>
          <p>Fernando Martín is the controller of personal data gathered via this portal. We adhere strictly to GDPR principles ensuring your professional and personal info is handled with extreme discretion.</p>
        </LegalLayout>
      );
    }
    if (view === 'terms') {
      return (
        <LegalLayout title="Terms of Service" onBack={() => setView('home')}>
          <p>This digital space is a portfolio and professional contact point. Content reflects professional experience at global technology entities.</p>
        </LegalLayout>
      );
    }

    return (
      <>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-30 lg:opacity-40" style={{ backgroundImage: 'url("/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center 15%', maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 text-sm md:text-base uppercase tracking-widest mb-12">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
                Entrepreneur in Residence
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light text-white leading-[1.1] md:leading-[0.85] tracking-tighter mb-12 drop-shadow-2xl">
                Building <br /><span className="text-zinc-600 italic">new ventures.</span>
              </h1>
              <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-end">
                <div className="max-w-xl">
                  <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-16">Scaling technology with the discipline of Big Tech and the hunger of a founder. Bridging corporate infrastructure with startup survival.</p>
                  <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
                    <a href="#contact" className="w-full sm:w-auto bg-white text-black px-12 py-7 rounded-full text-lg font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-2xl">Start a Venture <ArrowUpRight size={24} /></a>
                    <div className="flex gap-10 px-4 w-full sm:w-auto justify-center sm:justify-start">
                      <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={36} /></a>
                      <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><XLogo size={36} /></a>
                      <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={36} /></a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end mt-24 md:mt-0 w-full">
                   <div className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-10">Corporate Heritage</div>
                   <div className="flex -space-x-4 grayscale brightness-125 opacity-50 hover:opacity-100 transition-all duration-700">
                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-6 text-white shadow-2xl overflow-hidden"><IntelLogo /></div>
                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-8 text-white shadow-2xl overflow-hidden"><MotorolaLogo /></div>
                      <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-6 text-white shadow-2xl overflow-hidden"><NokiaLogo /></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: PHILOSOPHY */}
        <section id="about" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
          <div className="mb-20 md:mb-24">
            <div className="flex items-center gap-6 mb-6"><span className="text-sm font-mono text-zinc-500 tracking-[0.2em]">01</span><div className="h-px w-20 bg-zinc-800"></div></div>
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight leading-tight">The Bridge Between <br className="hidden md:block"/> Two Worlds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12">
            <div className="space-y-8 group">
              <div className="p-6 bg-zinc-900/50 rounded-[2rem] w-fit group-hover:bg-zinc-800 transition-colors"><Cpu className="text-white" size={40} /></div>
              <h4 className="text-3xl font-medium text-white tracking-tight">Big Tech Discipline</h4>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">Navigated Intel, Motorola, and Nokia. I understand global R&D and high-weight governance. Delivered modem technology to Apple iPhones.</p>
            </div>
            <div className="space-y-8 group">
              <div className="p-6 bg-zinc-900/50 rounded-[2rem] w-fit group-hover:bg-zinc-800 transition-colors"><Zap className="text-white" size={40} /></div>
              <h4 className="text-3xl font-medium text-white tracking-tight">Founder Grit</h4>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">Ground from seed to IBEX35 investment. Facilitated 100k+ shared mobility trips in 10+ countries. Developed virtual counters for OTA rent-a-car.</p>
            </div>
            <div className="space-y-8 group">
              <div className="p-6 bg-zinc-900/50 rounded-[2rem] w-fit group-hover:bg-zinc-800 transition-colors"><Shield className="text-white" size={40} /></div>
              <h4 className="text-3xl font-medium text-white tracking-tight">Strategic Autonomy</h4>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">Establishing corporate ventures with independence in strategy while leveraging parent-company assets for global scaling.</p>
            </div>
          </div>
        </section>

        <InsightsCarousel />

        {/* SECTION 2: VENTURES */}
        <section id="ventures" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
          <div className="mb-20 md:mb-24">
            <div className="flex items-center gap-6 mb-6"><span className="text-sm font-mono text-zinc-500 tracking-[0.2em]">02</span><div className="h-px w-20 bg-zinc-800"></div></div>
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight leading-tight">Active Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <a href="https://www.nexmo-datahub.eu/" target="_blank" rel="noreferrer" className="p-10 md:p-16 rounded-[3rem] border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group min-h-[400px]">
              <NexmoLogo />
              <p className="text-2xl text-zinc-400 font-light mb-12 leading-relaxed">Strategic data hub venture backed by UC3M. Leading Spanish tech growth and data democratization.</p>
              <div className="mt-auto text-white flex items-center gap-4 uppercase font-mono text-sm tracking-[0.2em] py-4">Managing Director <ArrowUpRight size={24} className="group-hover:translate-x-2 transition-transform" /></div>
            </a>
            <a href="https://moven.pro/" target="_blank" rel="noreferrer" className="p-10 md:p-16 rounded-[3rem] border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group min-h-[400px]">
              <MovenLogo />
              <p className="text-2xl text-zinc-400 font-light mb-12 leading-relaxed">Agentic venture building and process automation for next-gen scaling and high-impact operations.</p>
              <div className="mt-auto text-white flex items-center gap-4 uppercase font-mono text-sm tracking-[0.2em] py-4">Fractional COO <ArrowUpRight size={24} className="group-hover:translate-x-2 transition-transform" /></div>
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto mb-20">
          <div className="bg-zinc-900/30 rounded-[3rem] p-10 md:p-24 border border-zinc-900 shadow-2xl">
            <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
              <h2 className="text-5xl md:text-8xl font-light text-white mb-10 tracking-tight leading-tight">Let's create synergy.</h2>
              <p className="text-2xl md:text-3xl text-zinc-500 font-light">Available for Managing Director roles and Fractional leadership in high-impact ventures.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-20">
                <button onClick={() => window.open('https://calendar.app.google/WNN7737oFBWm8ViN9', '_blank')} className="w-full flex items-center gap-8 text-2xl md:text-3xl text-white hover:text-zinc-400 transition-colors py-10 text-left border-b-2 border-zinc-800 hover:border-white group">
                  <div className="p-6 bg-zinc-900 rounded-full flex-shrink-0 group-hover:bg-zinc-800"><Calendar className="text-zinc-400" size={40} /></div>
                  Book a call directly
                </button>
                <div className="p-12 bg-zinc-950/50 border border-zinc-800 rounded-[3rem] shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800" />
                  <p className="text-2xl md:text-3xl text-zinc-400 italic font-light leading-relaxed">"Build an operating system that survives the corporate immune system."</p>
                </div>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-10">
                  <input required placeholder="Name" className="w-full bg-zinc-950 border-b border-zinc-800 p-8 text-white text-2xl focus:border-white transition-colors outline-none bg-transparent" />
                  <input required type="email" placeholder="Email" className="w-full bg-zinc-950 border-b border-zinc-800 p-8 text-white text-2xl focus:border-white transition-colors outline-none bg-transparent" />
                </div>
                <textarea required placeholder="What venture are we building?" rows="4" className="w-full bg-zinc-950 border-b border-zinc-800 p-8 text-white text-2xl focus:border-white transition-colors outline-none bg-transparent resize-none min-h-[200px]"></textarea>
                <button type="submit" className="w-full bg-white text-black py-8 rounded-full font-bold flex items-center justify-center gap-5 shadow-2xl hover:bg-zinc-200 transition-all text-2xl h-28">
                  {formStatus || 'Send Inquiry'} <Send size={32} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 antialiased overflow-x-hidden font-sans">
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader finishLoading={() => setIsLoading(false)} key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* NAVIGATION */}
          <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center pointer-events-none">
            <button onClick={() => setView('home')} className="text-white text-3xl font-medium tracking-tighter pointer-events-auto">FM.</button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-12 text-sm font-mono uppercase tracking-[0.4em] text-zinc-500 pointer-events-auto">
              <NavLinks />
            </div>

            {/* Let's Talk & Mobile Trigger */}
            <div className="flex items-center gap-8 pointer-events-auto">
              <a href="#contact" className="text-sm md:text-base font-mono uppercase tracking-widest border-b-2 border-zinc-800 pb-1 hover:border-white transition-all text-white font-bold px-4 py-3 hidden sm:flex">
                Let's talk
              </a>
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white p-4 bg-zinc-900/50 rounded-full backdrop-blur-md border border-zinc-800">
                <Menu size={32} />
              </button>
            </div>
          </nav>

          {/* MOBILE OVERLAY MENU */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed inset-0 z-[100] bg-zinc-950 p-12 flex flex-col"
              >
                <div className="flex justify-between items-center mb-24">
                  <span className="text-white text-3xl font-medium tracking-tighter">FM.</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white p-6 bg-zinc-900 rounded-full">
                    <X size={32} />
                  </button>
                </div>
                <div className="flex flex-col gap-12 text-4xl font-light text-zinc-400">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Philosophy</a>
                  <a href="#insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Insights</a>
                  <a href="#ventures" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Ventures</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white font-medium text-white underline decoration-zinc-800 underline-offset-8">Let's talk</a>
                </div>
                <div className="mt-auto flex gap-10">
                  <a href="https://linkedin.com" className="text-zinc-500"><Linkedin size={32} /></a>
                  <a href="https://x.com" className="text-zinc-500"><XLogo size={32} /></a>
                  <a href="https://instagram.com" className="text-zinc-500"><Instagram size={32} /></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main>{renderView()}</main>

          {/* HERITAGE FOOTER */}
          <footer className="max-w-7xl mx-auto px-6 md:px-12 py-32 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start gap-24 text-lg font-mono uppercase tracking-widest text-zinc-500">
            <div className="flex flex-col gap-12 items-start w-full md:w-auto">
              <div className="text-white text-5xl font-medium tracking-tighter">FM.</div>
              <div className="flex flex-col gap-6">
                <p className="text-zinc-300 text-xl tracking-tight">© 2025 Fernando Martín.</p>
                <p className="normal-case font-sans tracking-normal opacity-60">Madrid • Munich • International</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-10">
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors underline underline-offset-8 decoration-zinc-800 py-4 text-left">Privacy Policy</button>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors underline underline-offset-8 decoration-zinc-800 py-4 text-left">Terms of Service</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-32 w-full">
              <div className="flex flex-col gap-10">
                <span className="text-zinc-700 font-bold tracking-[0.3em] text-sm">Connect</span>
                <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 flex items-center gap-4">LinkedIn <ArrowUpRight size={24} /></a>
                <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 flex items-center gap-4">X (Twitter) <XLogo size={24} /></a>
                <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 flex items-center gap-4">Instagram <ArrowUpRight size={24} /></a>
              </div>
              
              <div className="flex flex-col gap-10">
                <span className="text-zinc-700 font-bold tracking-[0.3em] text-sm">Navigation</span>
                <a href="#about" onClick={() => setView('home')} className="hover:text-white transition-colors py-2">Philosophy</a>
                <a href="#insights" onClick={() => setView('home')} className="hover:text-white transition-colors py-2">Insights</a>
                <a href="#ventures" onClick={() => setView('home')} className="hover:text-white transition-colors py-2">Ventures</a>
              </div>

              <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-12 md:items-end md:text-right">
                <span className="text-zinc-700 font-bold tracking-[0.3em] text-sm">Heritage</span>
                <p className="max-w-[320px] leading-relaxed text-zinc-400 normal-case font-sans italic text-xl">Built for the Zero to One Journey. Orchestrating scale with corporate precision.</p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;