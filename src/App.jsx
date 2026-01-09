import React, { useState, useEffect } from 'react';
import { MapPin, Heart, ClipboardCheck, ArrowDown, Plane, Globe, Sun } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
    <div className="font-ticket text-white flex gap-6 justify-center my-6 text-2xl md:text-3xl drop-shadow-lg">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-bold leading-none">{value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold mt-1 opacity-90">{label}</span>
        </div>
      ))}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const totalPhotos = 89;
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div className="min-h-screen selection:bg-salvia/30 selection:text-white overflow-x-hidden">
      
      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-mattone z-[100] origin-left shadow-sm"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 z-0">
          <img src="/hero-wedding.jpg" alt="Miriam & Claudio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]"></div>
        </div>
        
        <motion.div style={{ y: yHeroText }} className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="font-ticket text-[11px] tracking-[0.6em] text-white mb-6 block uppercase font-bold drop-shadow-md"
          >
            The Wedding of
          </motion.span>
          
          <div className="relative inline-block">
            <motion.h1 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
              className="text-[18vw] md:text-9xl text-white leading-none mb-4 font-script drop-shadow-2xl py-2 px-4"
            >
              Miriam & Claudio
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
              className="h-[1.5px] bg-white/60 w-full origin-left"
            />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
            <Countdown />
            <div className="font-ticket text-sm md:text-xl tracking-[0.4em] text-white/90 mb-10 uppercase font-bold drop-shadow-md">
              02 • 05 • 2026
            </div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
              <span className="font-ticket text-[9px] text-white/70 uppercase tracking-widest font-bold">Scroll Down</span>
              <ArrowDown className="text-white/80" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CONTENUTO */}
      <main className="relative z-20 shadow-[0_-30px_50px_rgba(0,0,0,0.1)]">
        
        {/* CITAZIONE & METEO */}
        <section className="bg-white pt-32 pb-20 px-8 rounded-t-[60px]">
          <div className="max-w-xl mx-auto text-center text-gray-700">
            <Heart className="mx-auto text-mattone/20 mb-8" size={40} />
            <p className="text-xl italic font-light leading-relaxed">
              "Solo se si è amati si ama: amati non da chi e nei modi che noi desideriamo, ma molto più profondamente, essenzialmente."
            </p>
            <p className="font-ticket text-xs tracking-widest text-salvia mt-6 uppercase font-bold italic">— Luigi Giussani</p>
            
            <div className="mt-16 inline-flex items-center gap-4 bg-salvia/5 px-6 py-3 rounded-2xl border border-salvia/10">
              <Sun className="text-salvia animate-pulse" size={20} />
              <p className="text-[10px] font-ticket text-gray-500 uppercase tracking-widest font-bold">Meteo Previsto: 22°C Soleggiato • Cremona</p>
            </div>
          </div>
        </section>

        {/* LOGISTICA - MAPPE REALI */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-md mx-auto border-2 border-dashed border-salvia/30 rounded-[40px] bg-salvia/5 p-2 shadow-sm">
            <div className="bg-white rounded-[35px] p-8 text-center border border-salvia/10 relative overflow-hidden">
               <h3 className="font-ticket text-xl text-salvia mb-6 font-bold uppercase tracking-widest">Dove & Quando</h3>
               <div className="space-y-8 relative z-10">
                  <div>
                    <p className="font-ticket text-mattone font-bold text-lg">ORE 11:00</p>
                    <p className="font-ticket text-sm text-gray-600 mb-3 italic">Chiesa di San Sebastiano, Cremona</p>
                    <a href="https://maps.app.goo.gl/9uG5m6D7vS7vS7vS7" target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-salvia/10 text-salvia px-6 py-2 rounded-full font-ticket text-[10px] font-bold uppercase hover:bg-salvia hover:text-white transition-all">
                      <MapPin size={12} /> Naviga alla Chiesa
                    </a>
                  </div>
                  <div className="border-t border-dashed border-salvia/20 pt-8">
                    <p className="font-ticket text-mattone font-bold uppercase">A Seguire</p>
                    <p className="font-ticket text-sm text-gray-600 mb-3 italic">Villa Corti, Pieranica (CR)</p>
                    <a href="https://maps.app.goo.gl/LZrJrDU3gUcRsxTJ9" target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-salvia/10 text-salvia px-6 py-2 rounded-full font-ticket text-[10px] font-bold uppercase hover:bg-salvia hover:text-white transition-all">
                      <MapPin size={12} /> Raggiungi la Villa
                    </a>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* GALLERY "NOI & VOI" MIGLIORATA */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="px-8 mb-10 font-ticket">
            <h2 className="text-3xl text-salvia italic font-bold uppercase tracking-tighter">Noi & Voi</h2>
            <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mt-2">Trascina per scorrere i ricordi ({totalPhotos} foto)</p>
          </div>
          
          <div className="cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -(totalPhotos * 330) }} 
              className="flex gap-6 px-8 no-scrollbar" 
              style={{ width: 'max-content' }}
            >
              {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
                <motion.div 
                  key={num} 
                  whileHover={{ scale: 1.02, rotate: num % 2 === 0 ? 0.5 : -0.5 }}
                  className="w-[75vw] md:w-[320px] h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl flex-shrink-0 bg-white border-[6px] border-white"
                >
                  <img 
                    src={`/amici-${num}.jpg`} 
                    loading="lazy" 
                    alt={`Momento ${num}`} 
                    className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VIAGGIO & IBAN */}
        <section className="bg-salvia py-32 px-8 text-white rounded-t-[60px] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center"><Globe size={600} strokeWidth={1}/></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 font-ticket">
            <h2 className="text-3xl mb-16 uppercase tracking-[0.3em] italic font-bold">Il Nostro Viaggio</h2>
            
            <div className="relative h-24 mb-20 flex items-center justify-between px-10">
               <div className="h-[1px] w-full bg-white/20 absolute top-1/2 left-0"></div>
               <motion.div className="absolute left-0" animate={{ x: ["0vw", "85vw"] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                  <Plane className="text-white rotate-45" size={24} />
               </motion.div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center uppercase font-bold text-[10px]">
                  <div className="w-3 h-3 bg-white rounded-full mb-2 shadow-[0_0_15px_white]"></div>
                  <span>Milano</span>
               </div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center uppercase font-bold text-[10px]">
                  <div className="w-3 h-3 bg-mattone rounded-full mb-2 animate-pulse"></div>
                  <span>NY & Turks</span>
               </div>
            </div>

            <motion.div className="glass-card p-10 rounded-[3rem] inline-block w-full max-w-lg shadow-2xl">
               <p className="text-xs italic mb-8 opacity-90 leading-relaxed font-light font-body uppercase tracking-tighter italic">"Aiutaci a scrivere le pagine di questo viaggio indimenticabile tra i grattacieli e il mare turchese."</p>
               <p className="text-[8px] tracking-[0.4em] mb-3 opacity-60 uppercase font-bold text-gray-300">Coordinate IBAN</p>
               <p className="text-sm md:text-lg break-all select-all font-bold tracking-widest text-white">IT02F0623001614000015826730</p>
               <p className="mt-4 text-[9px] opacity-40 uppercase font-bold tracking-[0.3em]">Siri Claudio & Ravera Miriam</p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* RSVP BOTTONE */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full px-8 max-w-sm text-center">
        <motion.a 
          whileTap={{ scale: 0.95 }} 
          href="https://forms.gle/BMBUYA4Mz1yHubes6" 
          target="_blank" 
          className="bg-salvia text-white flex items-center justify-center gap-4 py-5 rounded-full shadow-2xl font-ticket text-xs font-bold uppercase tracking-[0.2em]"
        >
          <ClipboardCheck size={20} /> RSVP - Conferma Presenza
        </motion.a>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 bg-gray-50 py-32 pb-40 px-8 text-center font-ticket">
        <div className="text-[10px] tracking-[0.5em] text-gray-300 mb-12 uppercase font-bold">In caso di bisogno</div>
        <div className="grid grid-cols-2 gap-8 italic">
          <div><p className="text-salvia uppercase font-bold text-sm">Miriam</p><p className="text-[10px] text-gray-400 mt-1">334 2918425</p></div>
          <div><p className="text-salvia uppercase font-bold text-sm">Claudio</p><p className="text-[10px] text-gray-400 mt-1">340 8080773</p></div>
        </div>
        <p className="mt-24 text-[8px] text-gray-200 tracking-[0.8em] uppercase font-bold">M & C • 02.05.2026</p>
      </footer>
    </div>
  );
}

export default App;