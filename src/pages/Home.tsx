import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { LOVE_DAYS } from '../constants';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Static 250px searchlight (mean of previous values) that does not shrink or expand.
  const maskRadius = 250;

  // Reusable component perfectly rendering the typographic layout so we can duplicate it on both the Base and Reveal layers effortlessly.
  const HeroTypography = ({ isRevealLayer = false }) => (
    <div className="relative z-20 flex-1 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-32 pointer-events-auto w-full h-full pointer-events-none">
       <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
         
         {/* Left Bottom Text */}
         <div 
           className="max-w-2xl pointer-events-auto"
           onMouseEnter={() => !isRevealLayer && setIsHoveringText(true)}
           onMouseLeave={() => !isRevealLayer && setIsHoveringText(false)}
         >
           <h1 className={`font-serif text-4xl md:text-5xl lg:text-5xl leading-tight font-normal transition-colors duration-300 ${isRevealLayer ? 'text-white font-light drop-shadow-[-2px_2px_15px_rgba(255,255,255,0.8)] tracking-widest' : 'text-white/20'}`}>
             {isRevealLayer ? (
               <>Hello Panda</>
             ) : (
               <>Because Our Love Story <br /> Deserves a Celebration</>
             )}
           </h1>
         </div>

         {/* Right Bottom Text */}
         <div 
           className="max-w-sm flex flex-col md:items-end text-left md:text-right pointer-events-auto"
           onMouseEnter={() => !isRevealLayer && setIsHoveringText(true)}
           onMouseLeave={() => !isRevealLayer && setIsHoveringText(false)}
         >
           <h2 className={`font-serif text-3xl md:text-4xl mb-4 transition-colors duration-300 ${isRevealLayer ? 'text-white drop-shadow-md' : 'text-white/20'}`}>
             June 27th, 2025
           </h2>
           <p className={`text-[10px] md:text-xs tracking-wider uppercase leading-relaxed md:text-right w-full transition-colors duration-300 ${isRevealLayer ? 'text-white/90 drop-shadow-lg' : 'opacity-0'}`}>
              It was on this very day that our story began. Through nine beautiful months of shared highs and lows, woven together with endless laughter and profound joy, you have been my constant. Thank you for walking this journey by my side, Tanya.
           </p>
         </div>

       </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-black selection:bg-romantic-red selection:text-white overflow-hidden text-white font-sans">
      <main className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth relative">
        
        {/* HERO SECTION (Now Highly Interactive) */}
        <section 
          id="hero" 
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[100dvh] shrink-0 flex flex-col overflow-hidden cursor-crosshair"
        >
          {/* BASE LAYER: Tanya's Image (Dim, Out of Focus, Mysterious) */}
          <div className="absolute inset-0 z-0 bg-black pointer-events-none">
             <img 
               src="/tanya.jpg" 
               alt="Tanya Focus"
               className="w-full h-full object-cover object-[center_30%] opacity-[0.3] grayscale-[0.5] contrast-[1.2] blur-[3px]"
             />
             <div className="absolute inset-0 bg-romantic-red mix-blend-color opacity-20" />
             <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
             
             {/* Base Layer Dimly Lit Typography */}
             <div className="absolute inset-0 flex flex-col pointer-events-auto">
                <HeroTypography isRevealLayer={false} />
             </div>
          </div>

          {/* REVEAL LAYER: Abhay's Placeholder Image + Glowing Perfect Text masked by Cursor Spotlight */}
          <div 
             className="absolute inset-0 z-10 pointer-events-none transition-all duration-[400ms] ease-out"
             style={{
               WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
               maskImage: `radial-gradient(circle ${maskRadius}px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
             }}
          >
             {/* Note: The src here is gallery_1.png acting purely as a placeholder for Abhay's eventual portrait */}
             <img 
               src="/abhay_reveal.jpg" 
               alt="Abhay Reveal"
               className="w-full h-full object-cover object-[center_30%] opacity-[0.8] grayscale-[0.2] contrast-[1.1] blur-none"
             />
             <div className="absolute inset-0 bg-romantic-red mix-blend-color opacity-40" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-95" />
             <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)]" />

             {/* Reveal Layer Bright Typography */}
             <div className="absolute inset-0 flex flex-col pointer-events-none">
                <HeroTypography isRevealLayer={true} />
             </div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce cursor-pointer mix-blend-difference"
            onClick={() => document.getElementById('day-1')?.scrollIntoView({ behavior: 'smooth' })}
          >
             <span className="text-[9px] uppercase tracking-widest font-light text-white/60">Scroll to Discover</span>
             <ChevronDown className="w-4 h-4 text-white/60" />
          </motion.div>

        </section>

        {/* SEQUENCE DOM */}
        {LOVE_DAYS.map((day, ix) => (
          <section key={day.id} id={`day-${ix+1}`} className="relative w-full h-[100dvh] shrink-0 flex flex-col overflow-hidden">
            <DayContent day={day} index={ix} />
          </section>
        ))}

      </main>



    </div>
  );
}

function DayContent({ day, index }: { day: any, index: number }) {
  return (
    <>
      {/* Background Ambience / Image */}
      {day.imageUrl ? (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.1, margin: "-100px 0px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black"
        >
          <img 
            src={day.imageUrl} 
            alt={day.title}
            className="w-full h-full object-cover object-[center_30%] opacity-[0.85] grayscale-[0.4] contrast-[1.1]"
          />
          {/* Lighter Gradients to reveal generated background art */}
          <div className="absolute inset-0 bg-romantic-red mix-blend-color opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: false }}
            className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-romantic-red rounded-full blur-[150px]"
          />
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-romantic-red/5 rounded-full blur-[120px]" />
        </div>
      )}

      {/* Main Content precisely mirroring Hero Section Setup */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-32 pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           viewport={{ once: false, amount: 0.4 }}
           transition={{ delay: 0.1, duration: 1.2 }}
           className="flex flex-col md:flex-row justify-between items-end w-full gap-8 pointer-events-auto"
        >
          {/* Left Bottom Text: Mirroring Hero H1 */}
          <div className="max-w-2xl flex flex-col gap-6 relative">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-white leading-tight font-normal relative z-10 drop-shadow-lg">
              {day.title}
            </h2>
          </div>

          {/* Right Bottom Text: Mirroring Hero Date & Description */}
          <div className="max-w-sm flex flex-col md:items-end text-left md:text-right relative z-10 mt-8 md:mt-0">
             <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 drop-shadow-md">
               {day.date}
             </h3>
             <p className="text-white/80 text-[10px] md:text-xs tracking-wider uppercase leading-relaxed md:text-right w-full drop-shadow-lg">
               {day.description}
             </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
