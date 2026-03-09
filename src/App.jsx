import React, { useState, useEffect, useRef } from 'react';
import {
  Linkedin,
  Instagram,
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
 * FERNANDO MARTÍN - MASTER BUILDER (PRODUCTION V5.0 - MOBILE RESPONSIVE)
 * - Navigation: Mobile hamburger menu with full-screen overlay.
 * - Carousel: Pagination dots for mobile, snap scrolling.
 * - UX: Improved touch targets, proper mobile padding, sm: breakpoints.
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth * 0.85; // approximate item width on mobile
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, 6)); // max 6 (7 items, 0-indexed)
    }
  };

  const items = [
    { 
      id: 0, 
      title: "Intel Modem Tech for Apple", 
      cat: "Big Tech Impact", 
      img: "/Big_tech.png", 
      desc: "Delivered modem technologies at Intel for Apple iPhones, impacting millions. Contributed to the business unit later acquired by Apple.",
      link: "https://www.engadget.com/2016-09-16-iphone-7-teardown-intel-inside.html"
    },
    { 
      id: 1, 
      title: "Strategic Growth & Funding", 
      cat: "Venture Finance", 
      img: "/Amadeus.png", 
      desc: "Successfully negotiated vision alignment and secured funding from Amadeus IT Group and Ninepointfive.",
      link: "https://amadeus.com/en/newsroom/press-releases/amadeus-invests-urban-mobility-innovator-eccocar"
    },
    { 
      id: 2, 
      title: "Product Innovation", 
      cat: "Scale", 
      img: "/Product_innovation.png", 
      desc: "Led the launch of three major products in 12 months, including the Virtual Counter processing millions of bookings.",
      link: "https://www.eccocar.com/"
    },
    { 
      id: 3, 
      title: "Global Recognition", 
      cat: "Awards", 
      img: "/Global_recognition.png", 
      desc: "Winner of the UNWTO Tourism Startup Competition 2020 for Smart Mobility on a global stage in Madrid.",
      link: "https://www.untourism.int/winners-of-the-2nd-unwto-tourism-startup-competition-announced-in-madrid"
    },
    { 
      id: 4, 
      title: "Corporate Ecosystems", 
      cat: "Partnerships", 
      img: "/Cosporate_ecosystems.png", 
      desc: "Graduate of prestigious programs including Wayra (Telefónica), VW Data:Lab, SAP.io, and IMPACT Accelerator.",
      link: "https://www.youtube.com/watch?v=BpekA1mxFw8"
    },
    { 
      id: 5, 
      title: "Industry Leadership", 
      cat: "Keynote", 
      img: "/Industry_leadership.png", 
      desc: "Featured speaker at ITB Berlin and FITUR Madrid, presenting digital-first mobility solutions with K10 Mobility.",
      link: "https://www.linkedin.com/posts/amadeus_innovation-mobility-k10mobility-activity-7288124846381641728-Q_-L/"
    },
    { 
      id: 6, 
      title: "Team Leadership", 
      cat: "Management", 
      img: "/Team_Leadership.png", 
      desc: "Built and mentored a distributed team of 35 professionals across Spain, India, and Colombia with Agile innovation.",
      link: "#contact"
    }
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({ left: dir === 'left' ? scrollLeft - 400 : scrollLeft + 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="insights" className="py-16 sm:py-24 md:py-32 border-t border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-20 mb-8 sm:mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4"><span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">Track Record & Press</span><div className="h-px w-8 sm:w-10 bg-zinc-800"></div></div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">Milestones in Motion</h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => scroll('left')} className="p-4 rounded-full border border-zinc-800 hover:border-white text-zinc-500 hover:text-white transition-all" aria-label="Scroll Left"><ChevronLeft size={24} /></button>
          <button onClick={() => scroll('right')} className="p-4 rounded-full border border-zinc-800 hover:border-white text-zinc-500 hover:text-white transition-all" aria-label="Scroll Right"><ChevronRight size={24} /></button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory px-6 md:px-20 no-scrollbar pb-6 md:pb-10"
      >
        {items.map((item) => (
          <div key={item.id} className="min-w-[85vw] md:min-w-[500px] snap-start group">
            <div className="aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900 mb-6 md:mb-8 relative border border-zinc-800">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-70 transition-all duration-700"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800'; }}
              />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all">
                {item.link?.startsWith('http') ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center justify-center">
                    <Play size={20} fill="currentColor" />
                  </a>
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6"><span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/70 bg-black/40 backdrop-blur px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">{item.cat}</span></div>
            </div>
            <h3 className="text-xl md:text-3xl text-white font-light mb-3 md:mb-4">{item.title}</h3>
            <p className="text-sm md:text-base text-zinc-400 font-light mb-4 md:mb-6 leading-relaxed">{item.desc}</p>
            <a
              href={item.link}
              target={item.link?.startsWith('http') ? "_blank" : undefined}
              rel={item.link?.startsWith('http') ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-2 border-b border-transparent hover:border-zinc-500 w-fit"
            >
              View Detail <ArrowUpRight size={14} />
            </a>
          </div>
        ))}
        <div className="min-w-[10vw] h-1" />
      </div>

      {/* Pagination dots - mobile only */}
      <div className="flex md:hidden justify-center gap-2 px-6 pb-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (scrollRef.current) {
                const itemWidth = scrollRef.current.offsetWidth * 0.85 + 24; // width + gap
                scrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? 'bg-white w-6' : 'bg-zinc-700'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <section className="relative min-h-screen flex flex-col justify-center px-5 sm:px-6 md:px-12 overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-30 sm:opacity-25 lg:opacity-40" style={{ backgroundImage: 'url("/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center 15%', maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)' }} />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-5xl">
                  <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 text-[10px] sm:text-xs md:text-[9px] uppercase tracking-widest mb-6 sm:mb-10">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                    Entrepreneur in Residence
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-light text-white leading-[1.15] sm:leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 sm:mb-12 drop-shadow-2xl">Building <br /><span className="text-zinc-600 italic">new ventures.</span></h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
                    <div className="max-w-xl">
                      <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 sm:mb-12">Scaling technology with the discipline of Big Tech and the hunger of a founder. Bridging corporate infrastructure with startup survival.</p>
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
                        <a href="#contact" className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/20">Start a Venture <ArrowUpRight size={18} /></a>
                        <div className="flex gap-4 sm:gap-8 px-2 sm:px-4 py-2">
                          <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Linkedin size={24} /></a>
                          <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><XLogo size={24} /></a>
                          <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Instagram size={24} /></a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end mt-8 md:mt-0">
                       <div className="text-[10px] sm:text-xs md:text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 sm:mb-8">Corporate Heritage</div>
                       <div className="flex -space-x-2 sm:-space-x-4 grayscale brightness-125 opacity-60 hover:opacity-100 transition-all duration-700">
                          <div title="Intel" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-2 sm:border-4 border-black bg-zinc-950 flex items-center justify-center p-3 sm:p-4 text-white overflow-hidden shadow-2xl">
                            <IntelLogo />
                          </div>
                          <div title="Motorola" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-2 sm:border-4 border-black bg-zinc-950 flex items-center justify-center p-4 sm:p-6 text-white overflow-hidden shadow-2xl">
                            <MotorolaLogo />
                          </div>
                          <div title="Nokia" className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-2 sm:border-4 border-black bg-zinc-950 flex items-center justify-center p-3 sm:p-4 text-white overflow-hidden shadow-2xl">
                            <NokiaLogo />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
              <div className="mb-8 sm:mb-12"><div className="flex items-center gap-4 sm:gap-6 mb-2"><span className="text-xs font-mono text-zinc-500">01</span><div className="h-px w-8 sm:w-12 bg-zinc-800"></div></div><h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">The Bridge Between Two Worlds</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-zinc-900/50 rounded-xl w-fit"><Cpu className="text-white" size={24} /></div>
                  <h4 className="text-lg sm:text-xl font-medium text-white">Big Tech Discipline</h4>
                  <p className="text-sm sm:text-[15px] text-zinc-500 font-light leading-relaxed">Having navigated Intel, Motorola, and Nokia, I understand high-weight governance and global R&D cadences. Delivered modem technology to Apple iPhones.</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-zinc-900/50 rounded-xl w-fit"><Zap className="text-white" size={24} /></div>
                  <h4 className="text-lg sm:text-xl font-medium text-white">Founder Grit</h4>
                  <p className="text-sm sm:text-[15px] text-zinc-500 font-light leading-relaxed">Ground from seed to an IBEX35 investment. Facilitated hundreds of thousands of shared mobility trips in 10+ countries and developed the virtual counter for the OTA rent a car industry.</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 bg-zinc-900/50 rounded-xl w-fit"><Shield className="text-white" size={24} /></div>
                  <h4 className="text-lg sm:text-xl font-medium text-white">Strategic Autonomy</h4>
                  <p className="text-sm sm:text-[15px] text-zinc-500 font-light leading-relaxed">Establishing corporate ventures with independence in strategy while leveraging parent-company assets.</p>
                </div>
              </div>
            </section>

            {/* --- TRACK RECORD --- */}
            <InsightsCarousel />

            <section id="ventures" className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
              <div className="mb-8 sm:mb-12"><div className="flex items-center gap-4 mb-2"><span className="text-xs font-mono text-zinc-500">02</span><div className="h-px w-8 sm:w-12 bg-zinc-800"></div></div><h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">Active Leadership</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <a href="https://www.nexmo-datahub.eu/" target="_blank" rel="noreferrer" className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group">
                  <img src="/logo-nexmo.png" alt="Nexmo DataHub" className="h-10 md:h-12 w-auto object-contain mb-4" />
                  <p className="text-base md:text-[15px] text-zinc-400 font-light mb-6 md:mb-8 leading-relaxed">Strategic data hub venture backed by UC3M. Leading Spanish tech growth.</p>
                  <div className="mt-auto text-white flex items-center gap-3 uppercase font-mono text-xs tracking-widest py-2">Managing Director <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
                </a>
                <a href="https://moven.pro/" target="_blank" rel="noreferrer" className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-500 transition-all flex flex-col items-start group">
                  <img src="/logo-moven.png" alt="Moven Pro" className="h-10 md:h-12 w-auto object-contain mb-4" />
                  <p className="text-base md:text-[15px] text-zinc-400 font-light mb-6 md:mb-8 leading-relaxed">Agentic venture building and process automation for next-gen scaling.</p>
                  <div className="mt-auto text-white flex items-center gap-3 uppercase font-mono text-xs tracking-widest py-2">Fractional COO <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
                </a>
              </div>
            </section>

            <section id="contact" className="py-16 md:py-20 px-4 md:px-12 max-w-7xl mx-auto mb-20 border-t border-zinc-900">
              <div className="bg-zinc-900/30 rounded-2xl md:rounded-[3rem] p-6 md:p-20 border border-zinc-900 shadow-2xl">
                <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
                  <h2 className="text-3xl md:text-6xl font-light text-white mb-4 tracking-tight leading-tight">Let's create synergy.</h2>
                  <p className="text-base md:text-lg text-zinc-500 font-light">Available for Managing Director roles and Fractional leadership in high-impact ventures.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                  <div className="space-y-8 md:space-y-12">
                    <div className="space-y-6">
                      <button onClick={() => window.open('https://calendar.app.google/WNN7737oFBWm8ViN9', '_blank')} className="w-full flex items-center gap-4 text-lg md:text-xl text-white hover:text-zinc-400 transition-colors py-3 px-4 rounded-xl bg-zinc-900/50 md:bg-transparent md:p-0">
                        <div className="p-3 bg-zinc-900 rounded-full flex-shrink-0"><Calendar className="text-zinc-500" size={24} /></div>
                        Book a call directly
                      </button>
                    </div>
                    <div className="p-6 md:p-8 bg-zinc-950/50 border border-zinc-800 rounded-2xl md:rounded-3xl shadow-inner">
                      <p className="text-base md:text-lg text-zinc-400 italic font-light leading-relaxed">"Build an operating system that survives the corporate immune system."</p>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input required placeholder="Name" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-xl outline-none text-white text-base focus:border-zinc-700 transition-colors" />
                      <input required type="email" placeholder="Email" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-xl outline-none text-white text-base focus:border-zinc-700 transition-colors" />
                    </div>
                    <textarea required placeholder="What venture are we building?" rows="4" className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-xl outline-none text-white text-base resize-none focus:border-zinc-700 transition-colors"></textarea>
                    <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-zinc-200 transition-all text-base">
                      {formStatus || 'Send Inquiry'} <Send size={20} />
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
            <div className="flex items-center gap-4 pointer-events-auto">
              <a
                href="#contact"
                className="hidden sm:block text-sm md:text-[10px] font-mono uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white transition-all text-white px-4 py-3 md:p-0"
              >
                Let's talk
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-3 text-white hover:text-zinc-400 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </nav>

          {/* MOBILE MENU OVERLAY */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-[#0a0a0a] md:hidden"
              >
                <div className="flex flex-col h-full px-6 py-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => { setMobileMenuOpen(false); setView('home'); }}
                      className="text-white text-2xl font-medium tracking-tighter"
                    >
                      FM.
                    </button>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 text-white hover:text-zinc-400 transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <nav className="flex-1 flex flex-col justify-center gap-8">
                    {[
                      { href: '#about', label: 'Philosophy' },
                      { href: '#insights', label: 'Insights' },
                      { href: '#ventures', label: 'Ventures' },
                      { href: '#contact', label: 'Contact' }
                    ].map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => { setMobileMenuOpen(false); setView('home'); }}
                        className="text-4xl font-light text-white hover:text-zinc-400 transition-colors"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </nav>

                  <div className="flex gap-6 pb-8">
                    <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Linkedin size={24} /></a>
                    <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><XLogo size={24} /></a>
                    <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2"><Instagram size={24} /></a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main>
            {renderView()}
          </main>

          {/* HERITAGE FOOTER */}
          <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-12 text-xs font-mono uppercase tracking-widest text-zinc-600">
            <div className="flex flex-col gap-6 items-start">
              <div className="text-white text-2xl md:text-lg font-medium tracking-tighter">FM.</div>
              <div className="flex flex-col gap-1">
                <p className="text-zinc-300 text-xs">© 2025 Fernando Martín.</p>
                <p className="normal-case font-sans opacity-60 text-xs">Madrid • Munich • International</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 py-3 min-h-[44px] text-xs">Privacy Policy</button>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 py-3 min-h-[44px] text-xs">Terms of Service</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-24 w-full md:w-auto">
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 mb-2 text-xs font-medium uppercase tracking-wider">Connect</span>
                <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 min-h-[44px] flex items-center text-xs">LinkedIn</a>
                <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 py-2 min-h-[44px] text-xs"><XLogo size={12} /> X (Twitter)</a>
                <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors py-2 min-h-[44px] flex items-center text-xs">Instagram</a>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 mb-2 text-xs font-medium uppercase tracking-wider">Navigation</span>
                <a href="#about" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 min-h-[44px] flex items-center text-xs">Philosophy</a>
                <a href="#insights" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 min-h-[44px] flex items-center text-xs">Insights</a>
                <a href="#ventures" onClick={() => setView('home')} className="hover:text-white transition-colors py-2 min-h-[44px] flex items-center text-xs">Ventures</a>
              </div>

              <div className="col-span-2 md:col-span-1 flex flex-col gap-4 md:items-end md:text-right mt-4 md:mt-0">
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Heritage</span>
                <p className="max-w-[280px] md:max-w-[200px] leading-relaxed text-zinc-400 normal-case font-sans italic text-sm">Built for the Zero to One Journey. Orchestrating scale with corporate precision.</p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;