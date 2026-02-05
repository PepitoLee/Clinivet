import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ============================================
// MAIN ABOUT COMPONENT (Performance Optimized)
// ============================================
export const About: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      text: 'Certificacion Fear Free',
      description: 'Ambiente sin estres para tu mascota'
    },
    {
      text: 'Tecnologia No Invasiva',
      description: 'Diagnostico preciso y delicado'
    },
    {
      text: 'Atencion 24/7',
      description: 'Siempre disponibles cuando nos necesitas'
    },
  ];

  const headingWords = 'Mas que una clinica, un segundo hogar.'.split(' ');
  const highlightWords = ['segundo', 'hogar.'];

  return (
    <section
      id="about"
      className={`py-28 md:py-40 relative overflow-hidden section-divider transition-colors duration-500 ${isDark ? 'bg-[#0F1E33]' : 'bg-vet-warm'}`}
    >
      {/* Static Decorative Blobs (no motion/parallax) */}
      <div className="absolute top-16 right-[10%] w-72 h-72 bg-vet-orange-pastel/30 blob blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-vet-blue-pastel/25 blob blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Editorial Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4 md:gap-5 items-start">
              {/* Tall left image */}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-7 h-[280px] md:h-[460px] rounded-4xl overflow-hidden shadow-elevated relative group"
              >
                <img
                  src="/Imagenes/clinivet-2.webp"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  alt="CliniVet atencion veterinaria profesional"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vet-blue-dark/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Shorter right image */}
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-5 h-[200px] md:h-[340px] rounded-4xl overflow-hidden shadow-card mt-16 md:mt-24 relative group"
              >
                <img
                  src="/Imagenes/clinivet-3.webp"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  alt="CliniVet equipo medico veterinario"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vet-blue-dark/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>

            {/* Experience Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.5 }}
              className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                <div className={`glass w-28 h-28 md:w-36 md:h-36 rounded-full shadow-elevated flex flex-col items-center justify-center relative ${isDark ? 'border border-white/10' : 'border border-white/60'}`}>
                  <span className={`text-3xl md:text-4xl font-serif font-bold leading-none ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                    15+
                  </span>
                  <span className={`font-mono text-[9px] md:text-[10px] tracking-mega uppercase mt-1 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/50'}`}>
                    Anos de Exp.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-4">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px bg-vet-orange-deep/60" />
              <span className={`font-mono text-[11px] tracking-mega uppercase ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/50'}`}>
                Sobre Nosotros
              </span>
            </motion.div>

            {/* Main Heading - Simple word-level stagger (NOT per-character) */}
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } }
              }}
              className={`text-display-sm mb-10 leading-[1.1] flex flex-wrap gap-x-[0.3em] ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}
            >
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0.15, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className={`inline-block ${highlightWords.includes(word) ? 'italic bg-gradient-to-r from-vet-orange-deep to-vet-yellow-deep bg-clip-text text-transparent' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Paragraphs - Simple fade in (NO per-word transforms) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`mb-6 leading-relaxed text-base md:text-lg font-light ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}
            >
              En CliniVet, <span className="text-vet-orange-deep font-medium">redefinimos</span> la experiencia veterinaria. Nos alejamos de los ambientes frios y esteriles para crear espacios que <span className="text-vet-orange-deep font-medium">calman</span> la ansiedad de tu mascota.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`mb-12 leading-relaxed text-base md:text-lg font-light ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}
            >
              Utilizamos aromaterapia adaptada a especies, iluminacion circadiana en hospitalizacion y un enfoque <span className="text-vet-orange-deep font-medium">Fear Free</span> en cada consulta. Porque la medicina cura el cuerpo, pero el ambiente cura el <span className="text-vet-orange-deep font-medium">espiritu</span>.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="space-y-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } }
              }}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }
                  }}
                  className={`group flex items-start gap-5 py-5 border-b last:border-b-0 cursor-default ${isDark ? 'border-white/[0.06]' : 'border-vet-blue-dark/[0.06]'}`}
                >
                  <span className="font-mono text-xs text-vet-orange-deep/70 mt-1 shrink-0 w-7 group-hover:text-vet-orange-deep transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={`w-px h-10 shrink-0 mt-0.5 group-hover:bg-vet-orange-deep/20 transition-colors duration-300 ${isDark ? 'bg-white/[0.08]' : 'bg-vet-blue-dark/[0.08]'}`} />
                  <div className="flex-1">
                    <span className={`font-serif text-lg md:text-xl group-hover:text-vet-blue-deep transition-colors duration-300 block leading-snug ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
                      {item.text}
                    </span>
                    <span className={`text-sm mt-1 block font-light ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
                      {item.description}
                    </span>
                  </div>
                  <span className="text-vet-orange-deep/0 group-hover:text-vet-orange-deep/50 transition-all duration-300 text-sm mt-1.5 shrink-0">
                    &rarr;
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
