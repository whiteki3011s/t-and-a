import { motion } from 'motion/react';

export default function Letter() {
  return (
    <main className="min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth relative bg-black">
      <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-black pb-32">
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-romantic-red/5 rounded-full blur-[150px]" />
           <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[150px]" />
        </div>
        
        {/* Split Layout Container */}
        <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-48 gap-16 relative z-10 w-full min-h-[80vh]">
           
           {/* Left Quote */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="w-full md:w-5/12 mb-16 md:mb-0"
           >
             <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.1] font-light drop-shadow-lg italic">
               The Words I <br/> Kept For You.
             </h1>
             <div className="mt-8 h-px w-24 bg-white/20" />
           </motion.div>

           {/* Right Letter */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
             className="w-full md:w-6/12 flex flex-col gap-6"
           >
              <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#d4af37] mb-4">A Personal Note</h3>
              <div className="text-white/70 font-serif text-lg md:text-xl leading-relaxed font-light flex flex-col gap-6 text-justify">
                <p>
                  Hello Tanya,
                </p>
                <p>
                  I am so incredibly happy today, as I finally get to share this website I've been building just for you. I think it turned out beautifully, and I hope you love it as much as I loved making it.
                </p>
                <p>
                  Today, I just want to express my deepest feelings and tell you that I love you with all my heart. You are truly beautiful—the way you speak, the way you laugh, and the way you care about me makes me fall for you a million times over. You look absolutely stunning in every single dress you wear.
                </p>
                <p>
                  Just so you know, I love every second I spend with you, and I promise to try and make even more time for us. I also want to sincerely apologize for anything I did to hurt you over these past nine months. 
                </p>
                <p>
                  Even the way you act crazy sometimes fills me with energy; to me, you are absolutely perfect (sometimes <em>kaleshi</em>, but yeah, same same). 
                </p>
                <p>
                  So, finally, I just want to say I will love you forever and ever.
                </p>
                <p>
                  Forever Yours,<br/>
                  <span className="italic mt-4 block text-white">Abhay</span>
                </p>
              </div>
           </motion.div>

        </div>
      </section>
    </main>
  );
}
