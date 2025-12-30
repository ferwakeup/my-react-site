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
  Send,
  ArrowLeft,
  Building2,
  Rocket,
  Cog
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FERNANDO MARTÍN - PERSONAL WEBSITE (MASTER BUILDER)
 * Includes: 
 * - Multi-stage PreLoader (Perfectly Balanced Timing)
 * - Animated Word Icons (Spinning Gears for Builder)
 * - Official Corporate Logos (Intel, Motorola, Nokia)
 * - Overlapping Circle Heritage Design
 * - Mobile Safari Optimized Typography
 * - Updated Hero Image Path to /hero.png
 */

// --- BRAND LOGOS (IMAGE BASED) ---

const IntelLogo = () => (
  <img src="/logo-intel.svg" alt="Intel" className="w-full h-auto grayscale invert brightness-200" />
);

const MotorolaLogo = () => (
  <img src="/logo-motorola.png" alt="Motorola" className="w-full h-auto grayscale invert brightness-200" />
);

const NokiaLogo = () => (
  <img src="/logo-nokia.png" alt="Nokia" className="w-full h-auto grayscale invert brightness-200" />
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

// --- PRELOADER COMPONENT ---

const PreLoader = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  const words = [
    { text: "CORPORATE", Icon: Building2 },
    { text: "FOUNDER", Icon: Rocket },
    { text: "BUILDER", Icon: Cog }
  ];

  useEffect(() => {
    const totalDuration = 4500; 
    const interval = totalDuration / 100;
    
    const countInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(countInterval);
        return 100;
      });
    }, interval);

    const t1 = setTimeout(() => setWordIndex(1), 1500);
    const t2 = setTimeout(() => setWordIndex(2), 3000);
    const tFinish = setTimeout(() => finishLoading(), 4800);

    return () => {
      clearInterval(countInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tFinish);
    };
  }, [finishLoading]);

  const CurrentIcon = words[wordIndex].Icon;

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 sm:p-12"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-between h-full py-10 md:py-20">
        <div className="overflow-hidden h-24 md:h-32 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={wordIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="flex items-center gap-4 md:gap-8"
            >
              <div className="text-zinc-500">
                <motion.div
                  animate={wordIndex === 2 ? { rotate: 360 } : { rotate: 0 }}
                  transition={wordIndex === 2 ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
                >
                  <CurrentIcon size={40} strokeWidth={1} className="md:w-16 md:h-16" />
                </motion.div>
              </div>
              <p className="text-4xl sm:text-5xl md:text-7xl font-light text-zinc-500 tracking-tighter">
                {words[wordIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-end justify-between w-full border-t border-zinc-800 pt-8">
           <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">System Initialization</span>
           <span className="text-6xl sm:text-8xl md:text-9xl font-light text-white tracking-tighter tabular-nums leading-none">
             {counter}%
           </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- LEGAL VIEWS ---

const LegalLayout = ({ title, children, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto"
  >
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
    </button>
    <h1 className="text-4xl md:text-6xl font-light text-white mb-12 tracking-tight">{title}</h1>
    <div className="prose prose-invert max-w-none prose-zinc">
      {children}
    </div>
  </motion.div>
);

const PrivacyPolicy = () => (
  <div className="space-y-8 text-zinc-400 font-light leading-relaxed text-sm md:text-base">
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">1. Data Responsibility</h3>
      <p>Fernando Martín is the primary controller of personal data gathered via this portal. We adhere strictly to GDPR principles ensuring your professional and personal info is handled with extreme discretion.</p>
    </section>
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">2. Data Scope</h3>
      <p>Collection is limited to voluntary inputs through our contact form (Name, Email, Message) used solely for the purpose of discussing strategic ventures or professional collaborations.</p>
    </section>
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">3. Analytics</h3>
      <p>We utilize privacy-respecting analytics to gauge interaction quality. We do not engage in invasive tracking or third-party data brokerage.</p>
    </section>
  </div>
);

const TermsOfService = () => (
  <div className="space-y-8 text-zinc-400 font-light leading-relaxed text-sm md:text-base">
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">1. Site Purpose</h3>
      <p>This digital space is a portfolio and professional contact point for strategic venture building. Content is for informational purposes reflecting professional experience at global technology entities.</p>
    </section>
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">2. IP Rights</h3>
      <p>All design assets, layout patterns, and case study descriptions are proprietary IP. Corporate logos displayed remain the property of their respective trademark holders.</p>
    </section>
    <section>
      <h3 className="text-white text-xl font-medium mb-4 underline decoration-zinc-800 underline-offset-8">3. Communication</h3>
      <p>Engagement via this site does not constitute a formal board-level or employment contract until specific strategic agreements are executed offline.</p>
    </section>
  </div>
);

// --- REUSABLE UI ---

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-6 md:mb-10">
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
    className={`group relative block p-5 md:p-8 rounded-2xl border transition-all duration-500 ${
      isCurrent ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600' : 'border-transparent hover:bg-zinc-900/30'
    }`}
  >
    <div className="flex justify-between items-start mb-3 md:mb-6">
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
    setTimeout(() => setFormStatus('Message sent successfully.'), 1500);
  };

  const renderView = () => {
    switch(view) {
      case 'privacy':
        return (
          <LegalLayout title="Privacy Policy" onBack={() => setView('home')}>
            <PrivacyPolicy />
          </LegalLayout>
        );
      case 'terms':
        return (
          <LegalLayout title="Terms of Service" onBack={() => setView('home')}>
            <TermsOfService />
          </LegalLayout>
        );
      default:
        return (
          <>
            {/* HERO SECTION - Optimized for smallest screens and shrunken width */}
            <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-44 md:pt-40">
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div 
                  className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-20 lg:opacity-40 transition-opacity duration-1000"
                  style={{
                    backgroundImage: 'url("/hero.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 15%',
                    maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)'
                  }}
                />
              </div>

              <div className="relative z-10 max-w-5xl mx-auto w-full">
                <div className="max-w-4xl">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-6"
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
                    transition={{ duration: 1, delay: 0.9 }}
                    className="text-3xl sm:text-6xl md:text-8xl lg:text-[9.5rem] font-light text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 md:mb-10 drop-shadow-2xl"
                  >
                    Building <br />
                    <span className="text-zinc-600 italic block mt-1 md:mt-2">new ventures.</span>
                  </motion.h1>
                  
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.3 }}
                      className="max-w-md"
                    >
                      <p className="text-[14px] md:text-xl text-zinc-400 font-light leading-relaxed mb-6 md:mb-10">
                        I bridge the gap between corporate infrastructure and founder grit. Scaling technology with the discipline of Big Tech and the hunger of a startup.
                      </p>
                      <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                        <a 
                          href="#contact" 
                          className="bg-white text-black px-6 md:px-10 py-3.5 md:py-5 rounded-full text-[13px] md:text-base font-medium hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl shadow-black/20"
                        >
                          Start a Venture <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <div className="flex gap-4">
                          <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-1 md:p-2" title="LinkedIn"><Linkedin size={22} /></a>
                          <a href="https://x.com/ferwakeup" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-1 md:p-2" title="X (Twitter)"><XLogo size={22} /></a>
                          <a href="https://www.instagram.com/ferwakeup/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-1 md:p-2" title="Instagram"><Instagram size={22} /></a>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* CORPORATE HERITAGE SECTION - RESTORED CIRCLE DESIGN WITH PROVIDED LOGOS */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.6 }}
                      className="flex flex-col items-start md:items-end mt-12 md:mt-0"
                    >
                       <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-6">Corporate Heritage</div>
                       <div className="flex -space-x-4 grayscale brightness-125 opacity-50 hover:opacity-100 transition-all duration-700">
                          <div title="Intel Corporation" className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-3 shadow-2xl">
                             <IntelLogo />
                          </div>
                          <div title="Motorola" className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-4 shadow-2xl">
                             <MotorolaLogo />
                          </div>
                          <div title="Nokia" className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center p-3 shadow-2xl">
                             <NokiaLogo />
                          </div>
                       </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* PHILOSOPHY SECTION */}
            <section id="about" className="py-12 md:py-20 px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900">
              <SectionHeading number="01" title="The Bridge Between Two Worlds" subtitle="Corporations often fail at ventures because they struggle to balance structure with existential survival." />
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-8 md:mt-16">
                <div className="space-y-3 group">
                  <div className="p-2.5 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Cpu className="text-white" size={18} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Big Tech Precision</h4>
                  <p className="text-[14px] md:text-base text-zinc-500 font-light leading-relaxed">Having navigated Intel, Motorola, and Nokia, I understand high-weight governance, P&L reporting, and global R&D cadences.</p>
                </div>
                <div className="space-y-3 group">
                  <div className="p-2.5 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Zap className="text-white" size={18} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Founder Grit</h4>
                  <p className="text-[14px] md:text-base text-zinc-500 font-light leading-relaxed">I've ground from seed to scale, "eating glass" to prove UVPs in markets that didn't yet understand the solution.</p>
                </div>
                <div className="space-y-3 group sm:col-span-2 md:col-span-1">
                  <div className="p-2.5 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Shield className="text-white" size={18} /></div>
                  <h4 className="text-lg md:text-xl font-medium text-white">Strategic Autonomy</h4>
                  <p className="text-[14px] md:text-base text-zinc-500 font-light leading-relaxed">I help companies launch startups with independence in strategy and operations, while leveraging parent-company assets.</p>
                </div>
              </div>
            </section>

            {/* ACTIVE VENTURES SECTION */}
            <section id="ventures" className="py-12 md:py-20 px-6 md:px-12 max-w-5xl mx-auto">
              <SectionHeading number="02" title="Active Leadership" subtitle="Spearheading strategic data hub deployment and agentifying the modern venture process." />
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                <VentureCard LogoComponent={NexmoLogo} role="Managing Director" desc="Strategic data infrastructure venture backed by UC3M." link="https://www.nexmo-datahub.eu/" isCurrent={true} />
                <VentureCard LogoComponent={MovenLogo} role="Fractional COO" desc="Agentic venture building and process automation for high-scale environments." link="https://moven.pro/" isCurrent={true} />
              </div>
            </section>

            {/* TRACK RECORD SECTION */}
            <section className="py-12 md:py-20 border-t border-zinc-900 px-6 md:px-12 max-w-5xl mx-auto">
              <SectionHeading number="03" title="Track Record" subtitle="Ventures built, products scaled, and strategic ecosystems developed." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 items-center justify-center">
                {[
                  { name: "Eccocar", url: "https://www.eccocar.com/" },
                  { name: "CEEI Asturias", url: "https://www.ceei.es/" },
                  { name: "Terradat", url: "https://terradat.es/" },
                  { name: "Microbioma", url: "https://microbioma.org/" },
                  { name: "El camaleón de Rubik", url: "https://elcamaleonderubik.com/" }
                ].map((v) => (
                  <a key={v.name} href={v.url} target="_blank" rel="noreferrer" className="group p-5 md:p-8 text-center bg-zinc-900/30 border border-zinc-900 rounded-2xl md:rounded-3xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all">
                    <span className="text-zinc-500 group-hover:text-white font-medium tracking-tight text-sm md:text-base">{v.name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-12 md:py-20 mb-6 md:mb-12 px-6 md:px-12 max-w-5xl mx-auto">
              <div className="bg-zinc-900/30 rounded-[1.5rem] md:rounded-[3rem] p-6 md:p-16 border border-zinc-900 shadow-2xl">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-6xl font-light text-white mb-3 md:mb-6 tracking-tight">Let's create synergy.</h2>
                    <p className="text-zinc-500 max-w-lg mx-auto font-light text-sm md:text-base">Available for Managing Director roles and Fractional leadership within high-impact venture builders.</p>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                    <div className="space-y-8 md:space-y-12">
                      <div className="space-y-4 md:space-y-6">
                        <a href="mailto:info@fernando-martin.eu" className="flex items-center gap-4 text-[14px] md:text-xl text-white hover:text-zinc-400 transition-colors">
                          <div className="p-2 md:p-3 bg-zinc-900 rounded-full"><Mail size={16} className="text-zinc-400" /></div>
                          info@fernando-martin.eu
                        </a>
                        <button onClick={() => window.open('https://calendar.app.google/WNN7737oFBWm8ViN9', '_blank')} className="flex items-center gap-4 text-[14px] md:text-xl text-white hover:text-zinc-400 transition-colors text-left">
                          <div className="p-2 md:p-3 bg-zinc-900 rounded-full"><Calendar size={16} className="text-zinc-400" /></div>
                          Book a call directly
                        </button>
                      </div>
                      <div className="p-6 md:p-10 bg-zinc-950/50 border border-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] shadow-inner">
                        <p className="text-zinc-400 italic font-light text-[14px] md:text-lg">"Build an operating system that survives the corporate immune system."</p>
                      </div>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                        <input required type="text" placeholder="Name" className="w-full bg-zinc-950 border border-zinc-900 p-3.5 md:p-5 rounded-xl md:rounded-2xl outline-none text-white text-sm" />
                        <input required type="email" placeholder="Work Email" className="w-full bg-zinc-950 border border-zinc-900 p-3.5 md:p-5 rounded-xl md:rounded-2xl outline-none text-white text-sm" />
                      </div>
                      <textarea required placeholder="What venture are we building?" rows="3" className="w-full bg-zinc-950 border border-zinc-900 p-3.5 md:p-5 rounded-xl md:rounded-2xl outline-none text-white text-sm resize-none"></textarea>
                      <button type="submit" className="w-full bg-white text-black py-3.5 md:py-6 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 text-sm md:text-lg">
                        {formStatus || 'Send Inquiry'} <Send size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-100 selection:text-black antialiased overflow-x-hidden">
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
          <nav className="fixed top-0 w-full z-50 px-6 py-4 md:py-8 md:px-12 flex justify-between items-center pointer-events-none">
            <button 
              onClick={() => setView('home')}
              className="text-white text-lg font-medium tracking-tighter pointer-events-auto hover:opacity-70 transition-opacity"
            >
              FM.
            </button>
            <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-auto">
              <a href={view === 'home' ? '#about' : '#'} onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors">Philosophy</a>
              <a href={view === 'home' ? '#ventures' : '#'} onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors">Ventures</a>
              <a href={view === 'home' ? '#contact' : '#'} onClick={(e) => { if(view !== 'home') { e.preventDefault(); setView('home'); } }} className="hover:text-white transition-colors">Contact</a>
            </div>
            <a 
              href="mailto:info@fernando-martin.eu" 
              className="text-[10px] md:text-xs font-mono uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white transition-all text-white pointer-events-auto"
            >
              Let's talk
            </a>
          </nav>

          <main>
            {renderView()}
          </main>

          {/* FOOTER */}
          <footer className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 text-center">
            <div className="flex flex-col md:items-start gap-2 text-left">
              <p>© 2025 Fernando Martín. Madrid • Munich • International</p>
              <div className="flex gap-4">
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800">Privacy Policy</button>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800">Terms of Service</button>
              </div>
            </div>
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