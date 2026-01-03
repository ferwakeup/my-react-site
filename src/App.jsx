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
 * FERNANDO MARTÍN - MASTER BUILDER (PRODUCTION V4.7)
 * - Navigation: Direct synergy-scroll for "Let's talk".
 * - Carousel: Intel/Apple Modem tech priority + Custom image assets (png).
 * - UX: Responsive breakpoints and optimized white space for breathability.
 * - Content: Preserved all professional milestones (Apple, Shared Mobility).
 * - Performance: Balanced 3.5s preloader breathing time.
 */

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    html { scroll-behavior: smooth; }
    body { background-color: #0a0a0a; margin: 0; padding: 0; overflow-x: hidden; }
    h1, h2, h3, p, a, button { -webkit-text-size-adjust: 100%; }
    
    /* Ensure no text is ever smaller than 12px on mobile for accessibility */
    @media (max-width: 768px) {
      body { font-size: 16px; }
    }
  `}} />
);

// --- CORPORATE LOGOS (FORCING WHITE VIA FILTERS) ---
const IntelLogo = () => (
  <img 
    src="/logo-intel.svg" 
    alt="Intel" 
    className="w-full h-auto object-contain" 
    style={{ filter: 'brightness(0) invert(1)' }}
  />
);

const MotorolaLogo = () => (
  <img 
    src="/logo-motorola.png" 
    alt="Motorola" 
    className="w-full h-auto object-contain scale-110" 
    style={{ filter: 'brightness(0) invert(1)' }}
  />
);

const NokiaLogo = () => (
  <img 
    src="/logo-nokia.png" 
    alt="Nokia" 
    className="w-full h-auto object-contain" 
    style={{ filter: 'brightness(0) invert(1)' }}
  />
);

// --- VENTURE LOGOS ---
const NexmoLogo = () => (
  <svg className="h-8 w-auto fill-white mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="30" r="8" fill="currentColor" opacity="0.8" />
    <circle cx="45" cy="15" r="5" fill="currentColor" />
    <circle cx="45" cy="45" r="5" fill="currentColor" />
    <line x1="15" cy="30" x2="45" y2="15" stroke="currentColor" strokeWidth="2" />
    <line x1="15" cy="30" x2="45" y2="45" stroke="currentColor" strokeWidth="2" />
    <text x="65" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="24">NEXMO</text>
  </svg>
);

const MovenLogo = () => (
  <svg className="h-6 md:h-8 w-auto fill-white mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45L25 10L40 45L55 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <text x="70" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="28" letterSpacing="2">MOVEN</text>
  </svg>
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

  const CurrentIcon = words[wordIndex].Icon;

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-between h-full py-10 md:py-20">
        <div className="overflow-hidden h-24 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={wordIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4 md:gap-8"
            >
              <div className="text-zinc-500">
                <motion.div
                  animate={wordIndex === 2 ? { rotate: 360 } : {}}
                  transition={wordIndex === 2 ? { repeat: Infinity, duration: 3, ease: "linear" } : {}}
                >
                  {React.createElement(CurrentIcon, { size: 40, strokeWidth: 1 })}
                </motion.div>
              </div>
              <p className="text-4xl md:text-7xl font-light text-zinc-500 tracking-tighter uppercase">{words[wordIndex].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-end justify-between w-full border-t border-zinc-800 pt-8">
           <span className="text-zinc-600 font-mono text-xs md:text-[10px] uppercase tracking-widest">Mastering Zero to One</span>
           <span className="text-6xl md:text-9xl font-light text-white tracking-tighter tabular-nums leading-none">{counter}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- TRACK RECORD & PRESS CAROUSEL ---
const InsightsCarousel = () => {
  const scrollRef = useRef(null);
  const items = [
    { 
      id: 0, 
      title: "Intel Modem Tech for Apple", 
      cat: "Big Tech Impact", 
      img: "/Big_tech.png", 
      desc: "Delivered modem technologies at Intel for Apple iPhones, impacting millions. Contributed to the business unit later acquired by Apple." 
    },
    { 
      id: 1, 
      title: "Strategic Growth & Funding", 
      cat: "Venture Finance", 
      img: "/Amadeus.png", 
      desc: "Successfully negotiated vision alignment and secured €2M in funding from Amadeus IT Group and industrial investors." 
    },
    { 
      id: 2, 
      title: "Product Innovation", 
      cat: "Scale", 
      img: "/Product_innovation.png", 
      desc: "Led the launch of three major products in 12 months, including the Virtual Counter processing millions of bookings." 
    },
    { 
      id: 3, 
      title: "Global Recognition", 
      cat: "Awards", 
      img: "/Global_recognition.png", 
      desc: "Winner of the UNWTO Tourism Startup Competition 2020 for Smart Mobility on a global stage in Madrid." 
    },
    { 
      id: 4, 
      title: "Corporate Ecosystems", 
      cat: "Partnerships", 
      img: "/Cosporate_ecosystems.png", 
      desc: "Graduate of prestigious programs including Wayra (Telefónica), VW Data:Lab, SAP.io, and IMPACT Accelerator." 
    },
    { 
      id: 5, 
      title: "Industry Leadership", 
      cat: "Keynote", 
      img: "/Industry_leadership.png", 
      desc: "Featured speaker at ITB Berlin and FITUR Madrid, presenting digital-first mobility solutions with K10 Mobility." 
    },
    { 
      id: 6, 
      title: "Team Leadership", 
      cat: "Management", 
      img: "/Team_Leadership.png", 
      desc: "Built and mentored a distributed team of 35 professionals across Spain, India, and Colombia with Agile innovation." 
    }
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({ left: dir === 'left' ? scrollLeft - 400 : scrollLeft + 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="insights" className="py-24 md:py-32 border-t border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-4"><span className="text-sm md:text-xs font-mono text-zinc-500 uppercase tracking-widest">Track Record & Press</span><div className="h-px w-10 bg-zinc-800"></div></div>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">Milestones in Motion</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll('left')} className="p-4 rounded-full border border-zinc-800 hover:border-white text-zinc-500 hover:text-white transition-all" aria-label="Scroll Left"><ChevronLeft size={24} /></button>
          <button onClick={() => scroll('right')} className="p-4 rounded-full border border-zinc-800 hover:border-white text-zinc-500 hover:text-white transition-all" aria-label="Scroll Right"><ChevronRight size={24} /></button>
        </div>
      </div>
      
      {/* Refined Carousel Container with balanced padding/breath */}
      <div 
        ref={scrollRef} 
        className="flex gap-10 overflow-x-auto snap-x snap-mandatory px-8 md:px-20 no-scrollbar pb-10"
      >
        {items.map((item) => (
          <div key={item.id} className="min-w-[80vw] md:min-w-[500px] snap-start group">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-900 mb-8 relative border border-zinc-800">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-70 transition-all duration-700" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800'; }}
              />
              <div className="absolute top-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all"><Play size={24} fill="currentColor" /></div>
              <div className="absolute bottom-6 left-6"><span className="text-xs font-mono uppercase tracking-widest text-white/70 bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/10">{item.cat}</span></div>
            </div>
            <h3 className="text-2xl md:text-3xl text-white font-light mb-4">{item.title}</h3>
            <p className="text-lg md:text-base text-zinc-400 font-light mb-6 leading-relaxed">{item.desc}</p>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm md:text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-2 border-b border-transparent hover:border-zinc-500 w-fit">View Detail <ArrowUpRight size={14} /></a>
          </div>
        ))}
        {/* End Spacer for breathability when scrolling to the end */}
        <div className="min-w-[10vw] h-1" />
      </div>
    </section>
  );
};

const LegalLayout = ({ title, children, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 py-3 transition-colors group"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
    </button>
    <h1 className="text-4xl md:text-6xl font-light text-white mb-12 tracking-tight">{title}</h1>
    <div className="prose prose-invert max-w-none prose-zinc text-zinc-400 text-lg font-light leading-relaxed">
      {children}
    </div>
  </motion.div>
);

// --- MAIN APP ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('home');
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    setTimeout(() => setFormStatus('Message sent.'), 1500);
  };

  const renderView = () => {
    switch(view) {
      case 'privacy':
        return (
          <LegalLayout title="Privacy Policy" onBack={() => setView('home')}>
            <div className="space-y-8">
              <section>
                <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">1. Data Responsibility</h3>
                <p>Fernando Martín is the controller of personal data gathered via this portal. We adhere strictly to GDPR principles ensuring your professional and personal info is handled with extreme discretion.</p>
              </section>
            </div>
          </LegalLayout>
        );
      case 'terms':
        return (
          <LegalLayout title="Terms of Service" onBack={() => setView('home')}>
            <div className="space-y-8">
              <section>
                <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">1. Site Purpose</h3>
                <p>This digital space is a portfolio and professional contact point. Content reflects professional experience at global technology entities.</p>
              </section>
            </div>
          </LegalLayout>
        );
      default:
        return (
          <>
            {/* HERO */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-32 pb-16">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-20 lg:opacity-40" style={{ backgroundImage: 'url("/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center 15%', maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)' }} />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-5xl">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-xs md:text-[9px] uppercase tracking-widest mb-10">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                    Entrepreneur in Residence
                  </div>
                  <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-light text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-12 drop-shadow-2xl">Building <br /><span className="text-zinc-600 italic">new ventures.</span></h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-end">
                    <div className="max-w-xl">
                      <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12">Scaling technology with the discipline of Big Tech and the hunger of a founder. Bridging corporate infrastructure with startup survival.</p>
                      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <a href="#contact" className="bg-white text-black px-10 py-5 rounded-full text-base font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl shadow-black/20">Start a Venture <ArrowUpRight size={20} /></a>
                        <div className="flex gap-8 px-4 py-2">
                          <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Linkedin size={28} /></a>
                          <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><XLogo size={28} /></a>
                          <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Instagram size={28} /></a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-12 md:mt-0">
                       <div className="text-xs md:text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-8">Corporate Heritage</div>
                       <div className="flex -space-x-3 sm:-space-x-4 grayscale brightness-125 opacity-50 hover:opacity-100 transition-all duration-700">
                          <div title="Intel" className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-4 text-white overflow-hidden shadow-2xl">
                            <IntelLogo />
                          </div>
                          <div title="Motorola" className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-6 text-white overflow-hidden shadow-2xl">
                            <MotorolaLogo />
                          </div>
                          <div title="Nokia" className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-4 text-white overflow-hidden shadow-2xl">
                            <NokiaLogo />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="py-24 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
              <div className="mb-12"><div className="flex items-center gap-6 mb-2"><span className="text-sm md:text-xs font-mono text-zinc-500">01</span><div className="h-px w-12 bg-zinc-800"></div></div><h2 className="text-4xl md:text-4xl font-light text-white tracking-tight">The Bridge Between Two Worlds</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl w-fit"><Cpu className="text-white" size={28} /></div>
                  <h4 className="text-2xl md:text-xl font-medium text-white">Big Tech Discipline</h4>
                  <p className="text-lg md:text-[15px] text-zinc-500 font-light leading-relaxed">Having navigated Intel, Motorola, and Nokia, I understand high-weight governance and global R&D cadences. Delivered modem technology to Apple iPhones.</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl w-fit"><Zap className="text-white" size={28} /></div>
                  <h4 className="text-2xl md:text-xl font-medium text-white">Founder Grit</h4>
                  <p className="text-lg md:text-[15px] text-zinc-500 font-light leading-relaxed">Ground from seed to an IBEX35 investment. Facilitated hundreds of thousands of shared mobility trips in 10+ countries and developed the virtual counter for the OTA rent a car industry.</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded-xl w-fit"><Shield className="text-white" size={28} /></div>
                  <h4 className="text-2xl md:text-xl font-medium text-white">Strategic Autonomy</h4>
                  <p className="text-lg md:text-[15px] text-zinc-500 font-light leading-relaxed">Establishing corporate ventures with independence in strategy while leveraging parent-company assets.</p>
                </div>
              </div>
            </section>

            {/* --- TRACK RECORD --- */}
            <InsightsCarousel />

            <section id="ventures" className="py-24 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
              <div className="mb-12"><div className="flex items-center gap-4 mb-2"><span className="text-sm md:text-xs font-mono text-zinc-500">02</span><div className="h-px w-12 bg-zinc-800"></div></div><h2 className="text-4xl md:text-4xl font-light text-white tracking-tight">Active Leadership</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                <a href="https://www.nexmo-datahub.eu/" target="_blank" rel="noreferrer" className="p-10 md:p-8 rounded-[2.5rem] md:rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group"><NexmoLogo /><p className="text-xl md:text-[15px] text-zinc-400 font-light mb-12 md:mb-8 leading-relaxed">Strategic data hub venture backed by UC3M. Leading Spanish tech growth.</p><div className="mt-auto text-white flex items-center gap-3 uppercase font-mono text-sm md:text-xs tracking-widest py-2">Managing Director <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div></a>
                <a href="https://moven.pro/" target="_blank" rel="noreferrer" className="p-10 md:p-8 rounded-[2.5rem] md:rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group"><MovenLogo /><p className="text-xl md:text-[15px] text-zinc-400 font-light mb-12 md:mb-8 leading-relaxed">Agentic venture building and process automation for next-gen scaling.</p><div className="mt-auto text-white flex items-center gap-2 uppercase font-mono text-sm md:text-xs tracking-widest py-2">Fractional COO <ArrowUpRight size={18} /></div></a>
              </div>
            </section>

            <section id="contact" className="py-24 md:py-20 px-6 md:px-12 max-w-7xl mx-auto mb-20 border-t border-zinc-900">
              <div className="bg-zinc-900/30 rounded-[3rem] p-10 md:p-20 border border-zinc-900 shadow-2xl">
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                  <h2 className="text-4xl md:text-6xl font-light text-white mb-6 md:mb-4 tracking-tight leading-tight">Let's create synergy.</h2>
                  <p className="text-xl md:text-zinc-500 font-light">Available for Managing Director roles and Fractional leadership in high-impact ventures.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12 md:space-y-12">
                    <div className="space-y-8 md:space-y-6">
                      <button onClick={() => window.open('https://calendar.app.google/WNN7737oFBWm8ViN9', '_blank')} className="w-full flex items-center gap-6 text-2xl md:text-xl text-white hover:text-zinc-400 transition-colors py-4 px-6 rounded-2xl bg-zinc-900/50 md:bg-transparent md:p-0">
                        <div className="p-5 md:p-3 bg-zinc-900 rounded-full flex-shrink-0"><Calendar className="text-zinc-500" size={32} /></div>
                        Book a call directly
                      </button>
                    </div>
                    <div className="p-10 md:p-8 bg-zinc-950/50 border border-zinc-800 rounded-3xl shadow-inner">
                      <p className="text-xl md:text-zinc-400 italic font-light leading-relaxed">"Build an operating system that survives the corporate immune system."</p>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-8 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-4">
                      <input required placeholder="Name" className="w-full bg-zinc-950 border border-zinc-900 p-6 md:p-4 rounded-2xl outline-none text-white text-lg md:text-sm" />
                      <input required type="email" placeholder="Email" className="w-full bg-zinc-950 border border-zinc-900 p-6 md:p-4 rounded-2xl outline-none text-white text-lg md:text-sm" />
                    </div>
                    <textarea required placeholder="What venture are we building?" rows="4" className="w-full bg-zinc-950 border border-zinc-900 p-6 md:p-4 rounded-2xl outline-none text-white text-lg md:text-sm resize-none min-h-[160px] md:min-h-0"></textarea>
                    <button type="submit" className="w-full bg-white text-black py-6 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-4 md:gap-3 shadow-xl hover:bg-zinc-200 transition-all text-xl md:text-base">
                      {formStatus || 'Send Inquiry'} <Send size={24} />
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-zinc-100 selection:text-black antialiased overflow-x-hidden font-sans">
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader finishLoading={() => setIsLoading(false)} key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {/* NAVIGATION */}
          <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none">
            <button 
              onClick={() => setView('home')}
              className="text-white text-2xl md:text-lg font-medium tracking-tighter pointer-events-auto hover:opacity-70 transition-opacity"
            >
              FM.
            </button>
            <div className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-auto">
              <a href="#about" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors py-2">Philosophy</a>
              <a href="#insights" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors py-2">Insights</a>
              <a href="#ventures" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors py-2">Ventures</a>
              <a href="#contact" onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors py-2">Contact</a>
            </div>
            <a 
              href="#contact" 
              className="text-sm md:text-[10px] font-mono uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white transition-all text-white pointer-events-auto px-4 py-3 md:p-0"
            >
              Let's talk
            </a>
          </nav>

          <main>
            {renderView()}
          </main>

          {/* HERITAGE FOOTER */}
          <footer className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12 text-sm md:text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            <div className="flex flex-col gap-8 md:gap-6 items-start">
              <div className="text-white text-3xl md:text-lg font-medium tracking-tighter">FM.</div>
              <div className="flex flex-col gap-2">
                <p className="text-zinc-300">© 2025 Fernando Martín.</p>
                <p className="normal-case font-sans opacity-60">Madrid • Munich • International</p>
              </div>
              <div className="flex gap-8 md:gap-6">
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 py-2">Privacy Policy</button>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 py-2">Terms of Service</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 w-full md:w-auto">
              <div className="flex flex-col gap-6 md:gap-4">
                <span className="text-zinc-500 mb-2 font-bold md:font-normal uppercase tracking-wider">Connect</span>
                <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 md:py-0">LinkedIn</a>
                <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 py-2 md:py-0"><XLogo size={14} className="md:w-[10px] md:h-[10px]" /> X (Twitter)</a>
                <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 md:py-0">Instagram</a>
              </div>
              
              <div className="flex flex-col gap-6 md:gap-4">
                <span className="text-zinc-500 mb-2 font-bold md:font-normal uppercase tracking-wider">Navigation</span>
                <a href="#about" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 md:py-0">Philosophy</a>
                <a href="#insights" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 md:py-0">Insights</a>
                <a href="#ventures" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 md:py-0">Ventures</a>
              </div>

              <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-10 md:gap-6 md:items-end md:text-right">
                <span className="text-zinc-500 mb-2 font-bold md:font-normal uppercase tracking-wider">Heritage</span>
                <p className="max-w-[300px] md:max-w-[200px] leading-relaxed text-zinc-400 normal-case font-sans italic text-base md:text-[14px]">Built for the Zero to One Journey. Orchestrating scale with corporate precision.</p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;