import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Heart, ClipboardCheck, ArrowDown, Music, Sun, Plane, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- COMPONENTE COUNTDOWN ---
const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-05-02T11:00:00") - +new Date();
    if (difference <= 0) return null;
    return {
      giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
      ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minuti: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="font-ticket text-salvia flex gap-4 justify-center my-8 text-xl md:text-2xl">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-bold">{value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-tighter font-bold">{label}</span>
        </div>
      ))}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  
  // Rimosso lo scale e l'opacity della Hero per non farla scomparire
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const totalPhotos = 89;

  return (
    <div className="min-h-screen bg-bg-light selection:bg-salvia/30 selection:text-salvia overflow-x-hidden font-body">
      
      {/* SCROLL PROGRESS BAR - MATTONE */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-mattone z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. HERO FISSA (EFFETTO PARALLASSE) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 z-0">
          <img 
            src="/hero-wedding.jpg" 
            alt="Miriam & Claudio" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
        </div>
        
        <motion.div 
          style={{ y: yHeroText }}
          className="relative z-10 text-center px-6"
        >
          <span className="font-ticket text-[10px] tracking-[0.5em] text-salvia mb-4 block uppercase font-bold drop-shadow-sm">The Wedding of</span>
          <h1 className="text-[18vw] md:text-9xl text-salvia leading-none mb-4 font-script drop-shadow-md">Miriam & Claudio</h1>
          <Countdown />
          <div className="font-ticket text-sm md:text-xl tracking-[0.3em] text-mattone mb-8 uppercase font-bold drop-shadow-sm">02 • 05 • 2026</div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="mx-auto text-salvia" size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* CONTENITORE PRINCIPALE CHE SCORRE SOPRA LA HERO */}
      <main className="relative z-20 shadow-[0_-30px_50px_rgba(0,0,0,0.1)]">
        
        {/* 2. CITAZIONE & METEO */}
        <section className="bg-white pt-32 pb-20 px-8 rounded-t-[50px]">
          <div className="max-w-xl mx-auto text-center">
            <Heart className="mx-auto text-mattone/20 mb-8" size={40} />
            <p className="text-xl italic text-gray-700 font-light leading-relaxed">
              "Solo se si è amati si ama: amati non da chi e nei modi che noi desideriamo, ma molto più profondamente, essenzialmente."
            </p>
            <p className="font-ticket text-xs tracking-widest text-salvia mt-6 uppercase font-bold">— Luigi Giussani</p>
            
            <div className="mt-12 inline-flex items-center gap-4 bg-salvia/5 px-6 py-3 rounded-2xl border border-salvia/10">
              <Sun className="text-salvia" size={20} />
              <p className="text-[11px] font-ticket text-gray-500 italic uppercase tracking-wider">Meteo: 22°C Soleggiato • Cremona</p>
            </div>
          </div>
        </section>

        {/* 3. GALLERY DRAGGABLE */}
        <section className="bg-white py-10 overflow-hidden">
          <div className="px-8 mb-8">
            <h2 className="font-ticket text-2xl text-salvia italic font-bold">Noi & Voi</h2>
            <p className="text-[10px] font-ticket text-gray-400 tracking-[0.2em] uppercase">Scorri i nostri ricordi ({totalPhotos} foto)</p>
          </div>
          <div className="cursor-grab active:cursor-grabbing">
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -(totalPhotos * 320) }} 
              className="flex gap-4 px-8 no-scrollbar" 
              style={{ width: 'max-content' }}
            >
              {Array.from({ length: totalPhotos }, (_, i) => i + 1).map((num) => (
                <div key={num} className="w-[75vw] md:w-[320px] h-[480px] rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
                  <img src={`/amici-${num}.jpg`} loading="lazy" alt="" className="w-full h-full object-cover pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. LOGISTICA (IL BIGLIETTO) */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-md mx-auto border-2 border-dashed border-salvia/30 rounded-[40px] bg-salvia/5 p-2">
            <div className="bg-white rounded-[35px] p-8 text-center border border-salvia/10 shadow-sm relative overflow-hidden">
               {/* Buchi ticket */}
               <div className="absolute top-1/2 -left-4 w-8 h-8 bg-bg-light rounded-full border border-salvia/10"></div>
               <div className="absolute top-1/2 -right-4 w-8 h-8 bg-bg-light rounded-full border border-salvia/10"></div>
               
               <h3 className="font-ticket text-xl text-salvia mb-6 font-bold">Logistica</h3>
               <div className="space-y-8">
                  <div>
                    <p className="font-ticket text-mattone font-bold">Ore 11:00</p>
                    <p className="font-ticket text-sm text-gray-600">S. Sebastiano, Cremona</p>
                    <a href="https://share.google/..." className="text-[10px] font-bold text-salvia underline uppercase">Mappa</a>
                  </div>
                  <div className="border-t border-dashed border-salvia/20 pt-8">
                    <p className="font-ticket text-mattone font-bold uppercase">A Seguire</p>
                    <p className="font-ticket text-sm text-gray-600">Villa Corti, Pieranica</p>
                    <a href="https://share.google/..." className="text-[10px] font-bold text-salvia underline uppercase">Mappa</a>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 5. VIAGGIO & IBAN (Mappa integrata) */}
        <section className="bg-salvia py-32 px-8 text-white rounded-t-[50px] relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-ticket text-3xl mb-16 uppercase tracking-[0.2em] italic font-bold">Il Nostro Viaggio</h2>
            
            {/* ANIMAZIONE AEREO FLUIDA */}
            <div className="relative h-24 mb-20 flex items-center justify-between px-4 md:px-20">
               <div className="h-[2px] w-full bg-white/20 absolute top-1/2 left-0 z-0"></div>
               <motion.div 
                className="absolute left-0 z-10"
                animate={{ x: ["0vw", "80vw"] }} 
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
               >
                  <Plane className="text-white rotate-45" size={28} />
               </motion.div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-white rounded-full mb-2 shadow-[0_0_15px_white]"></div>
                  <span className="font-ticket text-[10px] font-bold uppercase">Milano</span>
               </div>
               <div className="z-20 bg-salvia px-4 flex flex-col items-center">
                  <div className="w-3 h-3 bg-mattone rounded-full mb-2 animate-pulse"></div>
                  <span className="font-ticket text-[10px] font-bold uppercase tracking-tighter">New York & Turks</span>
               </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-20">
               {["Milano", "New York", "Turks & Caicos", "Milano"].map((step, i) => (
                 <div key={i} className="font-ticket group">
                    <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-salvia transition-all border border-white/20">
                       <Globe size={16} />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-widest">{step}</p>
                 </div>
               ))}
            </div>

            <div className="bg-white text-salvia p-10 rounded-[40px] shadow-2xl inline-block w-full max-w-lg">
               <p className="text-xs italic mb-6">"Aiutaci a scrivere le pagine di questo viaggio indimenticabile."</p>
               <p className="font-ticket text-[8px] tracking-[0.3em] mb-2 opacity-50 uppercase font-bold text-gray-400">IBAN Viaggio di Nozze</p>
               <p className="font-ticket text-sm md:text-lg break-all select-all font-bold text-salvia">IT02F0623001614000015826730</p>
               <p className="mt-4 text-[9px] font-ticket opacity-60 uppercase font-bold">Siri Claudio & Ravera Miriam</p>
            </div>
          </div>
        </section>

        {/* 6. PLAYLIST SPOTIFY */}
        <section className="bg-white py-24 px-8 text-center">
           <div className="max-w-sm mx-auto p-12 rounded-[50px] border-2 border-mattone/10 bg-mattone/5">
              <Music className="text-mattone mx-auto mb-6" size={32} />
              <h3 className="font-ticket text-lg text-mattone font-bold uppercase mb-4 tracking-widest">Party Songs</h3>
              <p className="text-xs text-gray-400 italic mb-8">Suggerisci i brani che non possono mancare alla festa di Miriam e Claudio!</p>
              <a 
                href="https://open.spotify.com/playlist/IL_TUO_LINK_COLLABORATIVO" 
                target="_blank" 
                rel="noreferrer"
                className="bg-mattone text-white px-10 py-4 rounded-full font-ticket text-[10px] uppercase font-bold tracking-widest hover:shadow-xl transition-all inline-block"
              >
                Aggiungi Brani
              </a>
           </div>
        </section>

      </main>

      {/* RSVP FLOATING BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full px-8 max-w-sm">
        <motion.a 
          whileTap={{ scale: 0.95 }} 
          href="https://docs.google.com/forms/..." 
          className="bg-salvia text-white flex items-center justify-center gap-3 py-5 rounded-full shadow-2xl font-ticket text-xs font-bold uppercase tracking-widest"
        >
          <ClipboardCheck size={20} /> Conferma Presenza
        </motion.a>
      </div>
    </div>
  );
}

export default App;