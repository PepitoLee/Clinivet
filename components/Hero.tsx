import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, ArrowUpRight, Clock, Award, Users, Shield, Star, Heart, Play } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter: React.FC<{
  end: number;
  suffix?: string;
  duration?: number;
}> = ({ end, suffix = '', duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ============================================
// TESTIMONIALS
// ============================================
const testimonials = [
  {
    text: "La mejor atencion para mi mascota. Profesionales increibles que realmente se preocupan.",
    author: "Maria Garcia",
    location: "Nuevo Chimbote",
    rating: 5,
  },
  {
    text: "Salvaron la vida de mi perrito. Eternamente agradecida con todo el equipo de CliniVet.",
    author: "Carlos Mendoza",
    location: "Chimbote",
    rating: 5,
  },
  {
    text: "Atencion 24/7 real. A las 3am atendieron a mi gata de emergencia. Excelente servicio.",
    author: "Ana Lopez",
    location: "Santa",
    rating: 5,
  },
];

// ============================================
// HERO COMPONENT
// ============================================
export const Hero: React.FC = () => {
  const { openModal } = useModal();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  // Mouse tracking for 3D
  useEffect(() => {
    const container = imageRef.current;
    if (!container) return;
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    const handleLeave = () => setMousePos({ x: 0.5, y: 0.5 });
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const rotateX = (mousePos.y - 0.5) * -6;
  const rotateY = (mousePos.x - 0.5) * 6;

  // Stagger animation for heading lines
  const lineVariants = {
    hidden: { y: '110%', rotateX: -60 },
    visible: (i: number) => ({
      y: '0%',
      rotateX: 0,
      transition: {
        duration: 1,
        delay: 0.6 + i * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0A1628]' : 'bg-vet-cream'}`}
    >
      {/* === AMBIENT BACKGROUND === */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(15,40,71,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        {/* Warm gradient orbs */}
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-40 blob"
          style={{ top: '-20%', right: '-15%', background: 'radial-gradient(circle, rgba(232,93,42,0.12), transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 blob"
          style={{ bottom: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(27,58,145,0.08), transparent 70%)', animationDelay: '4s' }}
        />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 min-h-screen flex items-center pt-28 pb-16">
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-8 items-center w-full">

          {/* === LEFT: CONTENT === */}
          <motion.div style={{ y: contentY }} className="order-2 lg:order-1">

            {/* Premium label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vet-orange-deep/[0.08] border border-vet-orange-deep/10">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-vet-orange-deep"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-vet-orange-deep font-medium">
                  Medicina Veterinaria Premium
                </span>
              </div>
            </motion.div>

            {/* Main Heading - Cinematic reveal */}
            <div className="mb-8" style={{ perspective: '1000px' }}>
              {[
                { text: 'Cuidamos a', highlight: false },
                { text: 'quienes mas', highlight: false },
                { text: 'amas', highlight: true },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className={`font-serif text-display will-change-transform ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {line.highlight ? (
                      <span className="italic text-gradient-animated">{line.text}</span>
                    ) : (
                      line.text
                    )}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base md:text-lg max-w-md leading-[1.8] mb-10 font-light ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/55'}`}
            >
              Combinamos <span className={`font-normal ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>tecnologia de vanguardia</span> con un trato
              <span className="text-vet-orange-deep font-medium"> profundamente humano</span> para el bienestar de tu mascota.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              {/* Primary CTA */}
              <motion.button
                onClick={() => openModal('appointment')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-full bg-vet-blue-dark text-white font-medium overflow-hidden shadow-elevated"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Calendar size={17} />
                  <span>Agendar Cita</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={17} />
                  </motion.span>
                </span>
                {/* Hover sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-vet-orange-deep to-vet-orange translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </motion.button>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/51914808462?text=Hola,%20quisiera%20informacion%20sobre%20sus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-3 px-7 py-4 bg-[#25D366] text-white rounded-full font-medium shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/25 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Stats - Refined minimal design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-8 md:gap-12"
            >
              {[
                { label: 'Atencion', value: '24/7', isCounter: false },
                { label: 'Familias', value: 2500, suffix: '+', isCounter: true },
                { label: 'Experiencia', value: 15, suffix: ' anos', isCounter: true },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <p className={`font-serif text-3xl md:text-4xl mb-1 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                    {stat.isCounter ? (
                      <AnimatedCounter end={stat.value as number} suffix={stat.suffix} />
                    ) : (
                      <span className="text-gradient-animated">{stat.value}</span>
                    )}
                  </p>
                  <p className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/35'}`}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* === RIGHT: IMAGE COMPOSITION === */}
          <div className="order-1 lg:order-2 relative" ref={imageRef}>

            {/* Floating trust badges */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 5 }}
                className="absolute -top-4 -left-6 z-30 animate-float"
              >
                <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-elevated">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vet-blue-deep to-vet-blue flex items-center justify-center text-white">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>Clinica Certificada</p>
                    <p className={`text-[0.6rem] font-mono ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/40'}`}>CMVP Registrada</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 5.3 }}
                className="absolute -top-2 -right-4 z-30 animate-float-delayed"
              >
                <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-elevated">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vet-yellow-deep to-vet-orange flex items-center justify-center text-white">
                    <Star size={16} />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>4.9 ★ Google</p>
                    <p className={`text-[0.6rem] font-mono ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/40'}`}>+200 resenas</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Image with 3D tilt */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                y: imageY,
              }}
              className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-elevated"
            >
              {/* Breathing image */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/Imagenes/Hero fondo version escritorio.jpeg"
                  alt="Veterinaria CliniVet - Cuidado profesional para tu mascota"
                  className="hidden md:block w-full h-[520px] lg:h-[620px] object-cover"
                />
                <img
                  src="/Imagenes/Hero fondo Versión mobil.png"
                  alt="Veterinaria CliniVet"
                  className="md:hidden w-full h-[50vh] object-cover"
                />
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-vet-dark/80 via-vet-dark/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-vet-dark/20 to-transparent" />

              {/* Heartbeat pulse */}
              <motion.div
                className="absolute top-6 right-6 z-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Heart size={20} className="text-white fill-white/40" />
                </div>
              </motion.div>

              {/* Testimonial Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-dark rounded-2xl p-4 md:p-5"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-vet-yellow-deep text-xs">★</span>
                        ))}
                      </div>
                      <p className="font-serif text-sm md:text-base text-white/90 mb-3 leading-relaxed italic">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white text-sm">
                            {testimonials[currentTestimonial].author}
                          </p>
                          <p className="text-[0.65rem] text-white/40 font-mono tracking-wider">
                            {testimonials[currentTestimonial].location}
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          {testimonials.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentTestimonial(i)}
                              className={`h-1 rounded-full transition-all duration-500 ${
                                i === currentTestimonial
                                  ? 'bg-vet-orange-deep w-6'
                                  : 'bg-white/20 w-1 hover:bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-vet-orange-pastel/50 blur-xl animate-float hidden lg:block" />
            <div className="absolute -top-2 right-1/4 w-14 h-14 rounded-full bg-vet-blue-pastel/40 blur-xl animate-float-delayed hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className={`font-mono text-[0.55rem] tracking-[0.3em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>Scroll</span>
        <motion.div
          className={`w-5 h-8 rounded-full border flex justify-center pt-1.5 ${isDark ? 'border-slate-600' : 'border-vet-blue-dark/15'}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 bg-vet-orange-deep rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t to-transparent pointer-events-none z-20 ${isDark ? 'from-[#0A1628]' : 'from-vet-cream'}`} />
    </section>
  );
};
