import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Heart, ClipboardCheck, ArrowDown, Music, Sun, Plane, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- COUNTDOWN COMPONENT ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ giorni: 0, ore: 0, minuti: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date("2026-05-02T11:00:00") - +new Date();
      if (difference > 0) {
        setTimeLeft({
          giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
          ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minuti: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-ticket text-salvia flex gap-4 justify-center my-6 text-xl md:text-2xl drop-shadow-sm">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-bold">{value.toString().padStart(2, '0')}</span>
          <span className="text-[8px] uppercase tracking-widest font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const totalPhotos = 89;

  // Parallasse testo Hero
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen selection:bg-salvia/30 selection:text-salvia overflow-x-hidden">
      
      {/* 1. CURSORE CUSTOM (Desktop) */}
      <motion.div 
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full border border-salvia pointer-events-none z-[9999] mix-blend-difference"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(112, 130, 113, 0.2)" : "rgba(0,0,0,0)"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
      />

      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-mattone z-[100] origin-left shadow-sm"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 2. HERO CON EFFETTO FIRMA */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 z-0">
          <img src="/hero-wedding.jpg" alt="Miriam & Claudio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
        </div>
        
        <motion.div style={{ y: yHeroText }} className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="font-ticket text-[10px] tracking-[0.5em] text-salvia mb-4 block uppercase font-bold"
          >
            The Wedding of
          </motion.span>
          
          {/* EFFETTO FIRMA ANIMATA SUI NOMI */}
          <div className="relative inline-block">
            <motion.h1 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
              className="text-[18vw] md:text-9xl text-salvia leading-none mb-4 font-script drop-shadow-md py-2 px-4"
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            >
              Miriam & Claudio
            </motion.h1>
            {/* Sottolineatura animata stile firma */}
            <motion.div 
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
              className="h-[2px] bg-mattone/40 w-full origin-left"
            />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
            <Countdown />
            <div className="font-ticket text-sm md:text-xl tracking-[0.3em] text-mattone mb-8 uppercase font-bold">02 • 05 • 2026</div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown className="mx-auto text-salvia" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CONTENUTO PRINCIPALE */}
      <main className="relative z-20 shadow-[0_-30px_50px_rgba(0,0,0,0.1)]">
        
        {/* 3. CITAZIONE & METEO */}
        <section className="bg-white pt-32 pb-20 px-8 rounded-t-[60px]">
          <div className="max-w-xl mx-auto text-center">
            <Heart className="mx-auto text-mattone/20 mb-8" size={40} />
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-xl italic text-gray-700 font-light leading-relaxed"
            >
              "Solo se si è amati si ama: amati non da chi e nei modi che noi desideriamo, ma molto più profondamente, essenzialmente."
            </motion.p>
            <p className="font-ticket text-xs tracking-widest text-salvia mt-6 uppercase font-bold italic">— Luigi Giussani</p>
            
            <div className="mt-16 inline-flex items-center gap-4 bg-salvia/5 px-6 py-3 rounded-2xl border border-salvia/10">
              <Sun className="text-salvia animate-pulse" size={20} />
              <p className="text-[10px] font-ticket text-gray-500 uppercase tracking-widest font-bold">Meteo Previsto: 22°C Soleggiato • Cremona</p>
            </div>
          </div>
        </section>

        {/* 4. MEGA GALLERY DRAGGABLE */}
        <section className="bg-white py-10 overflow-hidden">
          <div className="px-8 mb-8">
            <h2 className="font-ticket text-2xl text-salvia italic font-bold uppercase tracking-tighter">Noi & Voi</h2>
            <p className="text-[9px] font-ticket text-gray-400 tracking-[0.2em] uppercase">Trascina per scorrere i ricordi ({totalPhotos} foto)</p>
          </div>
          <div className="cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x" dragConstraints={{ right: 0, left: -(totalPhotos * 310) }} 
              className="flex gap-4 px-8 no-scrollbar" style={{ width: 'max-content' }}
            >
              {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
                <div key={num} className="w-[70vw] md:w-[320px] h-[480px] rounded-[2rem] overflow-hidden shadow-xl flex-shrink-0 bg-gray-50">
                  <img src={`/amici-${num}.jpg`} loading="lazy" alt="" className="w-full h-full object-cover pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. VIAGGIO & IBAN (GLASS STYLE) */}
        <section className="bg-salvia py-32 px-8 text-white rounded-t-[60px] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center"><Globe size={600} strokeWidth={1}/></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-ticket text-3xl mb-16 uppercase tracking-[0.3em] italic font-bold">Il Nostro Viaggio</h2>
            
            {/* AEREO FLUIDO */}
            <div className="relative h-24 mb-20 flex items-center justify-between px-10">
               <div className="h-[1px] w-full bg-white/20 absolute top-1/2 left-0"></div>
               <motion.div 
                className="absolute left-0"
                animate={{ x: ["0vw", "85vw"] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
               >
                  <Plane className="text-white rotate-45" size={24} />
               </motion.div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-white rounded-full mb-2 shadow-[0_0_15px_white]"></div>
                  <span className="font-ticket text-[10px] font-bold uppercase">Milano</span>
               </div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-mattone rounded-full mb-2 animate-pulse"></div>
                  <span className="font-ticket text-[10px] font-bold uppercase tracking-tighter">NY & Turks</span>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 px-4">
               {["Partenza", "City Lights", "Beach Bliss", "Home"].map((step, i) => (
                 <div key={i} className="glass-card p-6 rounded-3xl transition-transform hover:scale-105">
                    <p className="text-[10px] font-ticket uppercase opacity-60 mb-1">{step}</p>
                    <p className="font-ticket text-sm font-bold tracking-widest">{["Milano", "New York", "Turks", "Milano"][i]}</p>
                 </div>
               ))}
            </div>

            <motion.div whileHover={{ y: -5 }} className="glass-card p-10 rounded-[3rem] inline-block w-full max-w-lg shadow-2xl">
               <p className="text-xs italic mb-8 opacity-90 leading-relaxed font-light">"Aiutaci a scrivere le pagine di questo viaggio indimenticabile tra i grattacieli e il mare turchese."</p>
               <p className="font-ticket text-[8px] tracking-[0.4em] mb-3 opacity-60 uppercase font-bold text-gray-300">Coordinate IBAN</p>
               <p className="font-ticket text-sm md:text-lg break-all select-all font-bold tracking-widest text-white selection:bg-white selection:text-salvia">IT02F0623001614000015826730</p>
               <p className="mt-4 text-[9px] font-ticket opacity-40 uppercase font-bold tracking-[0.3em]">Siri Claudio & Ravera Miriam</p>
            </motion.div>
          </div>
        </section>

        {/* 6. SPOTIFY & RSVP */}
        <section className="bg-white py-24 px-8 text-center">
           <div className="max-w-sm mx-auto p-12 rounded-[3.5rem] border-2 border-mattone/10 bg-mattone/5">
              <Music className="text-mattone mx-auto mb-6" size={32} />
              <h3 className="font-ticket text-lg text-mattone font-bold uppercase mb-4 tracking-widest">Party Playlist</h3>
              <p className="text-[11px] text-gray-400 italic mb-8 uppercase tracking-tighter">Suggerisci i brani che non possono mancare!</p>
              <a 
                href="https://open.spotify.com/playlist/IL_TUO_LINK_COLLABORATIVO" target="_blank" rel="noreferrer"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="bg-mattone text-white px-10 py-4 rounded-full font-ticket text-[10px] uppercase font-bold tracking-[0.2em] hover:shadow-2xl transition-all"
              >
                Apri Spotify
              </a>
           </div>
        </section>

      </main>

      {/* 7. RSVP FLOATING BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full px-8 max-w-sm">
        <motion.a 
          whileTap={{ scale: 0.95 }} 
          href="https://docs.google.com/forms/d/IL_TUO_LINK_GOOGLE_MODULI" target="_blank" 
          onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          className="bg-salvia text-white flex items-center justify-center gap-4 py-5 rounded-full shadow-2xl font-ticket text-xs font-bold uppercase tracking-[0.2em]"
        >
          <ClipboardCheck size={20} /> RSVP
        </motion.a>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 bg-gray-50 py-32 pb-40 px-8 text-center font-ticket">
        <div className="text-[10px] tracking-[0.5em] text-gray-300 mb-12 uppercase font-bold">In caso di bisogno</div>
        <div className="grid grid-cols-2 gap-8 italic">
          <div className="border-r border-gray-100 pr-4">
            <p className="text-salvia uppercase font-bold text-sm tracking-tighter">Miriam</p>
            <a href="tel:3342918425" className="text-[10px] text-gray-400 block mt-1">334 2918425</a>
          </div>
          <div>
            <p className="text-salvia uppercase font-bold text-sm tracking-tighter">Claudio</p>
            <a href="tel:3408080773" className="text-[10px] text-gray-400 block mt-1">340 8080773</a>
          </div>
        </div>
        <p className="mt-24 text-[8px] text-gray-200 tracking-[0.8em] uppercase">M & C • 02.05.2026</p>
      </footer>
    </div>
  );
}

export default App;