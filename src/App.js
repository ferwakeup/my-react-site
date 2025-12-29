import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight, 
  Layers, 
  Zap, 
  Shield, 
  Cpu,
  Send,
  ExternalLink
} from 'lucide-react';

/**
 * FERNANDO MARTÍN - PERSONAL WEBSITE
 * Theme: Minimalist Dark (Integrated Blend)
 * Tech: React, Tailwind CSS, Lucide Icons
 */

// --- Custom Brand Components ---

const IntelLogo = () => (
  <svg className="w-12 h-auto fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.112 18.002H2.888L0 20.352h24l-2.888-2.35zm-2.434-12.82c-.848 0-1.53.682-1.53 1.53 0 .847.682 1.53 1.53 1.53.847 0 1.53-.683 1.53-1.53a1.532 1.532 0 00-1.53-1.53zm-.08 3.515h-.452c-1.28 0-2.32 1.04-2.32 2.321v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25h.451V8.697zm-3.324 2.321c0-1.28-1.041-2.32-2.32-2.32-1.28 0-2.32 1.04-2.32 2.32v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v5.043h1.071l-.002-5.043zm-5.715-4.642V8.697h.804v1.272H8.755v5.093h1.071v-5.043h.804v6.315H8.755v-1.272h-.804V8.697h-.804V7.425h.804V6.376h1.071v1.049h.537zm-3.044 2.321c-1.28 0-2.32 1.04-2.32 2.32v5.043h1.071v-5.043c0-.69.56-1.25 1.25-1.25.69 0 1.25.56 1.25 1.25v5.043h1.071v-5.043c0-1.28-1.04-2.321-2.321-2.321zM3.463 8.697V7.425h1.071v1.272H3.463zm0 6.365V10.02h1.071v5.043H3.463z"/>
  </svg>
);

const MotorolaLogo = () => (
  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm1.905-13.43c-.477-.042-1.393.125-1.894.614l-2.016 3.024-2.016-3.024c-.5-.49-1.417-.656-1.894-.614-.72.062-1.3.643-1.3 1.37v6.626h1.636V9.16l2.164 3.246c.3.451.92.451 1.22 0l2.164-3.246v7.006h1.636V9.54c0-.727-.58-1.308-1.3-1.37z"/>
  </svg>
);

const NokiaLogo = () => (
  <svg className="w-16 h-auto fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

// --- Custom Current Venture Logos ---

const NexmoLogo = () => (
  <svg className="h-8 w-auto fill-white mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="30" r="8" fill="currentColor" opacity="0.8" />
    <circle cx="45" cy="15" r="5" fill="currentColor" />
    <circle cx="45" cy="45" r="5" fill="currentColor" />
    <line x1="15" y1="30" x2="45" y2="15" stroke="currentColor" strokeWidth="2" />
    <line x1="15" y1="30" x2="45" y2="45" stroke="currentColor" strokeWidth="2" />
    <text x="65" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="24">NEXMO</text>
  </svg>
);

const MovenLogo = () => (
  <svg className="h-8 w-auto fill-white mb-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45L25 10L40 45L55 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <text x="70" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="28" letterSpacing="2">MOVEN</text>
  </svg>
);

// --- Components ---

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-2">
      <span className="text-xs font-mono text-zinc-500">{number}</span>
      <div className="h-px w-8 bg-zinc-800"></div>
    </div>
    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">{title}</h2>
    {subtitle && <p className="text-zinc-500 font-light max-w-lg">{subtitle}</p>}
  </div>
);

const VentureCard = ({ LogoComponent, name, role, desc, link, isCurrent = false }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative block p-8 rounded-2xl border transition-all duration-500 ${
      isCurrent ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600' : 'border-transparent hover:bg-zinc-900/30'
    }`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="flex flex-col">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">{role}</span>
        {LogoComponent ? <LogoComponent /> : <h3 className="text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors">{name}</h3>}
      </div>
      <div className="p-2 rounded-full bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-all">
        <ArrowUpRight size={18} />
      </div>
    </div>
    <p className="text-zinc-400 font-light leading-relaxed mb-4">{desc}</p>
  </a>
);

const App = () => {
  const [formStatus, setFormStatus] = useState('');
  
  // Google Analytics Initialization (Placeholder)
  useEffect(() => {
    console.log("Analytics Ready.");
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    // Setup with Formspree or similar for f.martin.85@gmail.com
    setTimeout(() => setFormStatus('Message sent successfully. I will get back to you shortly.'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-zinc-100 selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="text-white text-lg font-medium tracking-tighter pointer-events-auto">FM.</div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-auto">
          <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#ventures" className="hover:text-white transition-colors">Ventures</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a 
          href="mailto:info@fernando-martin.eu" 
          className="text-xs font-mono uppercase tracking-widest border-b border-zinc-800 pb-1 hover:border-white transition-all text-white pointer-events-auto"
        >
          Let's talk
        </a>
      </nav>

      <main>
        
        {/* Hero Section with Blended Image */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
          
          {/* THE BLENDED BACKGROUND IMAGE */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute right-0 top-0 w-full lg:w-[65%] h-full grayscale opacity-25 lg:opacity-40 transition-opacity duration-1000"
              style={{
                backgroundImage: 'url("Screenshot 2025-12-30 at 00.13.42.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 15%',
                maskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center right, black 10%, transparent 85%), linear-gradient(to right, #0a0a0a 0%, transparent 50%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Entrepreneur in Residence
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-light text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-2xl">
                Building <br />
                <span className="text-zinc-600 italic block mt-2">new ventures.</span>
              </h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div>
                  <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-md mb-12">
                    I bridge the gap between corporate infrastructure and founder grit. Scaling technology with the discipline of Big Tech and the hunger of a startup.
                  </p>
                  <div className="flex flex-wrap gap-6 items-center">
                    <a 
                      href="#contact" 
                      className="bg-white text-black px-10 py-5 rounded-full font-medium hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-xl shadow-black/20"
                    >
                      Start a Venture <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <div className="flex gap-4">
                      <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2" title="LinkedIn"><Linkedin size={22} /></a>
                      <a href="#" className="text-zinc-500 hover:text-white transition-colors p-2" title="X (Twitter)"><XLogo size={22} /></a>
                    </div>
                  </div>
                </div>
                
                {/* Subtle Corporate Badge with Logos */}
                <div className="hidden md:flex flex-col items-end opacity-30 hover:opacity-100 transition-all duration-500">
                   <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-6">Corporate Heritage</div>
                   <div className="flex items-center gap-8 text-white grayscale brightness-150">
                      <div title="Intel Corporation" className="hover:scale-110 transition-transform"><IntelLogo /></div>
                      <div title="Motorola" className="hover:scale-110 transition-transform"><MotorolaLogo /></div>
                      <div title="Nokia" className="hover:scale-110 transition-transform"><NokiaLogo /></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy - The "Elephant in the Room" */}
        <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
          <SectionHeading 
            number="01" 
            title="The Bridge Between Two Worlds" 
            subtitle="Addressing the elephant in the room: most corporations fail at ventures because they can't balance structure with survival."
          />
          
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            <div className="space-y-6 group">
              <div className="p-4 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Cpu className="text-white" /></div>
              <h4 className="text-xl font-medium text-white">Big Tech Discipline</h4>
              <p className="text-zinc-500 font-light leading-relaxed">
                Operated within Intel, Motorola, and Nokia. I understand the complexities of global R&D, reporting cadences, and high-weight governance.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="p-4 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Zap className="text-white" /></div>
              <h4 className="text-xl font-medium text-white">Founder Grit</h4>
              <p className="text-zinc-500 font-light leading-relaxed">
                Ground from zero to an IBEX35 investment. I've "eaten glass" to find product-market fit when the market didn't even know it needed the product yet.
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="p-4 bg-zinc-900/50 rounded-xl w-fit group-hover:bg-zinc-800 transition-colors"><Shield className="text-white" /></div>
              <h4 className="text-xl font-medium text-white">Strategic Independence</h4>
              <p className="text-zinc-500 font-light leading-relaxed">
                I believe corporate ventures need independence in budgeting and strategy, using the parent as the first customer to prove PMF.
              </p>
            </div>
          </div>
        </section>

        {/* Current Ventures */}
        <section id="ventures" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeading 
            number="02" 
            title="Active Leadership" 
            subtitle="Currently leading strategic product ventures and agentifying the venture building process."
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            <VentureCard 
              LogoComponent={NexmoLogo}
              role="Managing Director"
              desc="Backed by UC3M. Leading the strategic deployment and growth of data-centric ventures in the Spanish ecosystem."
              link="https://www.nexmo-datahub.eu/"
              isCurrent={true}
            />
            <VentureCard 
              LogoComponent={MovenLogo}
              role="Fractional COO"
              desc="Driving the transition towards agentic venture building, streamlining the 'Zero to One' process for next-gen companies."
              link="https://moven.pro/"
              isCurrent={true}
            />
          </div>
        </section>

        {/* Success Ventures (Lean Logo Style) */}
        <section className="py-32 border-t border-zinc-900 px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeading 
            number="03" 
            title="Track Record" 
            subtitle="Previous ventures built, scaled, or strategically advised."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
            {[
              { name: "Eccocar", url: "https://www.eccocar.com/" },
              { name: "CEEI Asturias", url: "https://www.ceei.es/" },
              { name: "Terradat", url: "https://terradat.es/" },
              { name: "Microbioma", url: "https://microbioma.org/" },
              { name: "El camaleón de Rubik", url: "https://elcamaleonderubik.com/" }
            ].map((v) => (
              <a 
                key={v.name} 
                href={v.url} 
                target="_blank" 
                rel="noreferrer" 
                className="group p-8 text-center bg-zinc-900/30 border border-zinc-900 rounded-3xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all"
              >
                <span className="text-zinc-500 group-hover:text-white font-medium tracking-tight transition-colors">
                  {v.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Contact & Calendar */}
        <section id="contact" className="py-32 mb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="bg-zinc-900/30 rounded-[3rem] p-8 md:p-16 border border-zinc-900 shadow-2xl shadow-black/50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">Let's create synergy.</h2>
                <p className="text-zinc-500 max-w-lg mx-auto font-light">Available for Managing Director roles, Fractional COO positions, and high-impact Entrepreneur in Residence programs.</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-8">Direct Channels</h4>
                    <div className="space-y-6">
                      <a href="mailto:info@fernando-martin.eu" className="flex items-center gap-4 text-xl text-white hover:text-zinc-400 transition-colors">
                        <div className="p-3 bg-zinc-900 rounded-full"><Mail size={20} className="text-zinc-400" /></div>
                        info@fernando-martin.eu
                      </a>
                      <button 
                        onClick={() => window.open('https://calendar.google.com/calendar/appointments/schedules/f.martin.85@gmail.com', '_blank')}
                        className="flex items-center gap-4 text-xl text-white hover:text-zinc-400 transition-colors text-left"
                      >
                        <div className="p-3 bg-zinc-900 rounded-full"><Calendar size={20} className="text-zinc-400" /></div>
                        Book a call directly
                      </button>
                    </div>
                  </div>

                  <div className="p-10 bg-zinc-950/50 border border-zinc-800 rounded-[2.5rem] shadow-inner">
                    <p className="text-zinc-400 italic font-light leading-relaxed text-lg">
                      "The goal is not just to launch a product, but to build an operating system that survives the corporate immune system."
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Name" 
                      className="w-full bg-zinc-950 border border-zinc-900 p-5 rounded-2xl focus:border-zinc-500 outline-none transition-all text-white"
                    />
                    <input 
                      required
                      type="email" 
                      placeholder="Work Email" 
                      className="w-full bg-zinc-950 border border-zinc-900 p-5 rounded-2xl focus:border-zinc-500 outline-none transition-all text-white"
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="What venture are we building?" 
                    rows="5"
                    className="w-full bg-zinc-950 border border-zinc-900 p-5 rounded-2xl focus:border-zinc-500 outline-none transition-all text-white resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all text-lg shadow-xl"
                  >
                    {formStatus || 'Send Inquiry'} <Send size={20} />
                  </button>
                  {formStatus && <p className="text-center text-xs text-zinc-500 font-mono mt-4">{formStatus}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
        <div>© 2025 Fernando Martín. Madrid • Munich • International</div>
        <div className="flex gap-8">
          <a href="https://linkedin.com/in/fernandomartinm/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><XLogo size={10} /> X</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
        <div>Built for the Zero to One Journey</div>
      </footer>
    </div>
  );
};

export default App;