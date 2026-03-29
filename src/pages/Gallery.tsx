import { motion } from 'motion/react';

const placeholderImages = [
  "/gallery_1.png",
  "/gallery_2.png",
  "/gallery_3.png",
  "/gallery_4.png",
  "/rose.png",
  "/propose.png" // using existing ones too just to flesh out the masonry grid
];

export default function Gallery() {
  return (
    <main className="min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden scroll-smooth relative bg-black">
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-48 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light italic">Captured Moments</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mt-4">A masonry of our memories</p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {placeholderImages.map((src, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
               className="break-inside-avoid shadow-xl relative group overflow-hidden bg-white/5 rounded-sm"
             >
                <img src={src} className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale-[0.3] group-hover:grayscale-0" alt="Gallery memory" />
                <div className="absolute inset-0 bg-romantic-red mix-blend-color opacity-20 pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />
             </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
