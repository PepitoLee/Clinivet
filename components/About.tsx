import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ============================================
// SCROLL-DRIVEN TEXT REVEAL COMPONENT
// ============================================
interface ScrollRevealTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'italic bg-gradient-to-r from-vet-orange-deep to-vet-yellow-deep bg-clip-text text-transparent'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<{ char: string; isHighlight: boolean; wordIndex: number }[]>([]);

  // Parse text into characters with highlight info
  useEffect(() => {
    const words = text.split(' ');
    const chars: { char: string; isHighlight: boolean; wordIndex: number }[] = [];

    words.forEach((word, wordIndex) => {
      const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));

      // Add each character of the word
      word.split('').forEach(char => {
        chars.push({ char, isHighlight, wordIndex });
      });

      // Add space after word (except last)
      if (wordIndex < words.length - 1) {
        chars.push({ char: ' ', isHighlight: false, wordIndex });
      }
    });

    setCharacters(chars);
  }, [text, highlightWords]);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"]
  });

  return (
    <div ref={containerRef} className={className}>
      {characters.map((charData, index) => (
        <ScrollChar
          key={index}
          char={charData.char}
          index={index}
          total={characters.length}
          scrollProgress={scrollYProgress}
          isHighlight={charData.isHighlight}
          highlightClassName={highlightClassName}
        />
      ))}
    </div>
  );
};

// ============================================
// INDIVIDUAL SCROLL CHARACTER
// ============================================
interface ScrollCharProps {
  char: string;
  index: number;
  total: number;
  scrollProgress: any;
  isHighlight: boolean;
  highlightClassName: string;
}

const ScrollChar: React.FC<ScrollCharProps> = ({
  char,
  index,
  total,
  scrollProgress,
  isHighlight,
  highlightClassName
}) => {
  // Calculate when this character should start and end revealing
  const charStart = index / total;
  const charEnd = (index + 1) / total;

  // Transform scroll progress to opacity for this specific character
  const opacity = useTransform(
    scrollProgress,
    [charStart, charEnd],
    [0.15, 1]
  );

  // Subtle Y movement for extra polish
  const y = useTransform(
    scrollProgress,
    [charStart, charEnd],
    [4, 0]
  );

  // Blur effect for unrevealed characters
  const filter = useTransform(
    scrollProgress,
    [charStart, charEnd],
    ['blur(3px)', 'blur(0px)']
  );

  if (char === ' ') {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`inline-block transition-colors duration-300 ${isHighlight ? highlightClassName : ''}`}
    >
      {char}
    </motion.span>
  );
};

// ============================================
// SCROLL REVEAL PARAGRAPH (Word-based for body text)
// ============================================
interface ScrollRevealParagraphProps {
  text: string;
  className?: string;
  highlightPhrases?: string[];
}

const ScrollRevealParagraph: React.FC<ScrollRevealParagraphProps> = ({
  text,
  className = '',
  highlightPhrases = []
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.5"]
  });

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => {
        const isHighlight = highlightPhrases.some(phrase =>
          word.toLowerCase().includes(phrase.toLowerCase())
        );

        return (
          <ScrollWord
            key={index}
            word={word}
            index={index}
            total={words.length}
            scrollProgress={scrollYProgress}
            isHighlight={isHighlight}
          />
        );
      })}
    </div>
  );
};

// ============================================
// INDIVIDUAL SCROLL WORD
// ============================================
interface ScrollWordProps {
  word: string;
  index: number;
  total: number;
  scrollProgress: any;
  isHighlight: boolean;
}

const ScrollWord: React.FC<ScrollWordProps> = ({
  word,
  index,
  total,
  scrollProgress,
  isHighlight
}) => {
  const wordStart = index / total;
  const wordEnd = Math.min((index + 3) / total, 1);

  const opacity = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [0.2, 1]
  );

  const y = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [8, 0]
  );

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.3em] ${isHighlight ? 'text-vet-orange-deep font-medium' : ''}`}
    >
      {word}
    </motion.span>
  );
};

// ============================================
// MAIN ABOUT COMPONENT
// ============================================
export const About: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const decorY3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-28 md:py-40 relative overflow-hidden section-divider transition-colors duration-500 ${isDark ? 'bg-[#0F1E33]' : 'bg-vet-warm'}`}
    >
      {/* Animated Decorative Blobs */}
      <motion.div
        style={{ y: decorY1 }}
        className="absolute top-16 right-[10%] w-72 h-72 bg-vet-orange-pastel/30 blob blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: decorY2 }}
        className="absolute bottom-20 left-[5%] w-80 h-80 bg-vet-blue-pastel/25 blob blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: decorY3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vet-yellow-pastel/15 blob blur-3xl pointer-events-none"
      />

      {/* Subtle grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Editorial Image Grid - Asymmetric Layout */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4 md:gap-5 items-start">
              {/* Tall left image */}
              <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.97 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-7 h-[280px] md:h-[460px] rounded-4xl overflow-hidden shadow-elevated relative group"
              >
                <motion.img
                  src="/Imagenes/clinivet-2.png"
                  className="w-full h-full object-cover transition-transform duration-700"
                  alt="CliniVet atencion veterinaria profesional"
                  style={{ transformOrigin: 'center center' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-vet-blue-dark/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Shorter right image, offset down */}
              <motion.div
                initial={{ y: -40, opacity: 0, scale: 0.97 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-5 h-[200px] md:h-[340px] rounded-4xl overflow-hidden shadow-card mt-16 md:mt-24 relative group"
              >
                <motion.img
                  src="/Imagenes/clinivet-3.png"
                  className="w-full h-full object-cover transition-transform duration-700"
                  alt="CliniVet equipo medico veterinario"
                  style={{ transformOrigin: 'center center' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vet-blue-dark/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>

            {/* Experience Circle - Refined & Minimal */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
                delay: 0.5
              }}
              className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="relative">
                {/* Single subtle pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-vet-orange-deep/30"
                  animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Main circle - glass effect with clean design */}
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

          {/* Right: Content with Scroll-Driven Text */}
          <div className="lg:pl-4">
            {/* Section Label - font-mono with tracking-mega */}
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

            {/* Main Heading - Scroll Reveal Character by Character */}
            <ScrollRevealText
              text="Mas que una clinica, un segundo hogar."
              className={`text-display-sm mb-10 leading-[1.1] ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}
              highlightWords={['segundo', 'hogar.']}
              highlightClassName="italic bg-gradient-to-r from-vet-orange-deep to-vet-yellow-deep bg-clip-text text-transparent"
            />

            {/* Paragraphs - Scroll Reveal Word by Word */}
            <ScrollRevealParagraph
              text="En CliniVet, redefinimos la experiencia veterinaria. Nos alejamos de los ambientes frios y esteriles para crear espacios que calman la ansiedad de tu mascota."
              className={`mb-6 leading-relaxed text-base md:text-lg font-light ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}
              highlightPhrases={['redefinimos', 'calman']}
            />

            <ScrollRevealParagraph
              text="Utilizamos aromaterapia adaptada a especies, iluminacion circadiana en hospitalizacion y un enfoque Fear Free en cada consulta. Porque la medicina cura el cuerpo, pero el ambiente cura el espiritu."
              className={`mb-12 leading-relaxed text-base md:text-lg font-light ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}
              highlightPhrases={['Fear', 'espiritu']}
            />

            {/* Features List - Numbered with font-mono */}
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
                  {/* Numbered index */}
                  <span className="font-mono text-xs text-vet-orange-deep/70 mt-1 shrink-0 w-7 group-hover:text-vet-orange-deep transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Thin vertical separator */}
                  <div className={`w-px h-10 shrink-0 mt-0.5 group-hover:bg-vet-orange-deep/20 transition-colors duration-300 ${isDark ? 'bg-white/[0.08]' : 'bg-vet-blue-dark/[0.08]'}`} />

                  {/* Content */}
                  <div className="flex-1">
                    <span className={`font-serif text-lg md:text-xl group-hover:text-vet-blue-deep transition-colors duration-300 block leading-snug ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
                      {item.text}
                    </span>
                    <span className={`text-sm mt-1 block font-light ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
                      {item.description}
                    </span>
                  </div>

                  {/* Subtle arrow indicator on hover */}
                  <motion.span
                    className="text-vet-orange-deep/0 group-hover:text-vet-orange-deep/50 transition-all duration-300 text-sm mt-1.5 shrink-0"
                    initial={false}
                  >
                    &rarr;
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
