import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import { Doctor } from '../types';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ana Silva",
    specialty: "Cirugia Ortopedica",
    image: "/Imagenes/clinivet-1.webp",
    description: "Especialista en reconstruccion y traumatologia compleja con 10 anos de experiencia.",
    schedule: "Lun - Vie"
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    specialty: "Cardiologia",
    image: "/Imagenes/clinivet-8.webp",
    description: "Pionero en intervenciones cardiacas minimamente invasivas para pequenas especies.",
    schedule: "Mar - Sab"
  },
  {
    id: 3,
    name: "Dra. Elena Vega",
    specialty: "Oncologia",
    image: "/Imagenes/clinivet-9.webp",
    description: "Enfoque compasivo y cientifico para el tratamiento del cancer animal.",
    schedule: "Lun - Jue"
  },
  {
    id: 4,
    name: "Dr. Marco Polo",
    specialty: "Exoticos",
    image: "/Imagenes/clinivet-2.webp",
    description: "Experto en el manejo de aves, reptiles y pequenos mamiferos.",
    schedule: "Vie - Dom"
  },
  {
    id: 5,
    name: "Dra. Sofia L.",
    specialty: "Dermatologia",
    image: "/Imagenes/clinivet-3.webp",
    description: "Soluciones avanzadas para alergias complejas y condiciones de la piel.",
    schedule: "Lun - Vie"
  }
];

const CARD_COUNT = doctors.length;

// ─── Section Header (Desktop) ───────────────────────────
const SectionHeader: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20 pointer-events-none">
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-vet-orange-deep" />
      <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep">
        Equipo
      </span>
    </div>
    <h2 className={`font-serif text-3xl lg:text-5xl leading-[1.1] ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
      Nuestro Equipo
    </h2>
    <p className={`mt-2 font-sans text-sm font-light max-w-xs ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
      Profesionales comprometidos con la salud y bienestar de tu mascota.
    </p>
  </div>
);

// ─── SVG Background (Desktop) ───────────────────────────
const SVGBackground = forwardRef<SVGPathElement, { isDark: boolean }>(({ isDark }, ref) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute top-1/2 left-0 -translate-y-1/2 w-[300%] h-[60%]"
      viewBox="0 0 3000 400"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="svgPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E85D2A" stopOpacity={isDark ? 0.2 : 0.1} />
          <stop offset="50%" stopColor="#F4845F" stopOpacity={isDark ? 0.3 : 0.15} />
          <stop offset="100%" stopColor="#E85D2A" stopOpacity={isDark ? 0.1 : 0.05} />
        </linearGradient>
      </defs>
      <path
        ref={ref}
        d="M0,200 C250,80 500,320 750,200 C1000,80 1250,320 1500,200 C1750,80 2000,320 2250,200 C2500,80 2750,320 3000,200"
        stroke="url(#svgPathGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    {doctors.map((_, i) => (
      <span
        key={i}
        className={`absolute top-1/2 -translate-y-1/2 font-serif select-none ${isDark ? 'text-white/[0.015]' : 'text-vet-blue-dark/[0.02]'}`}
        style={{
          left: `${i * 500 + 200}px`,
          fontSize: 'clamp(12rem, 20vw, 22rem)',
          lineHeight: 1,
        }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>
    ))}
  </div>
));

// ─── Desktop Scroll Progress ────────────────────────────
const ScrollProgress: React.FC<{
  activeIndex: number;
  progress: number;
  isDark: boolean;
}> = ({ activeIndex, progress, isDark }) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
    <div className="flex items-baseline gap-1 font-mono">
      <span className="text-2xl font-medium text-vet-orange-deep tabular-nums">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>
      <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-vet-blue-dark/25'}`}>
        / {String(CARD_COUNT).padStart(2, '0')}
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      {doctors.map((_, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: i === activeIndex ? 48 : 8,
            backgroundColor: i === activeIndex
              ? '#E85D2A'
              : isDark ? 'rgba(226,232,240,0.15)' : 'rgba(15,40,71,0.1)',
          }}
        />
      ))}
    </div>
    <div className={`w-24 h-px relative ${isDark ? 'bg-white/10' : 'bg-vet-blue-dark/10'}`}>
      <div
        className="absolute inset-y-0 left-0 bg-vet-orange-deep origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  </div>
);

// ─── Desktop Doctor Card ────────────────────────────────
const DoctorCard = forwardRef<HTMLDivElement, {
  doctor: Doctor;
  index: number;
  isDark: boolean;
}>(({ doctor, index, isDark }, ref) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative flex-shrink-0 overflow-hidden rounded-[1.5rem] shadow-card group card-shine"
      style={{ width: 450, height: 650, willChange: 'transform' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 40%, transparent 70%)'
            : 'linear-gradient(to top, rgba(12,27,46,0.92) 0%, rgba(12,27,46,0.3) 40%, transparent 70%)',
          opacity: hovered ? 1 : 0.85,
        }}
      />
      <span className="absolute top-6 right-6 font-serif text-6xl text-white/[0.08] select-none z-10">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute bottom-0 left-0 w-full p-8 z-10">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/40 block mb-3">
          {doctor.specialty}
        </span>
        <h4 className="font-serif text-2xl text-white leading-tight mb-2">
          {doctor.name}
        </h4>
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ maxHeight: hovered ? 200 : 0, opacity: hovered ? 1 : 0 }}
        >
          <p className="text-white/50 font-light text-sm leading-relaxed mb-4 max-w-[320px]">
            {doctor.description}
          </p>
        </div>
        <div
          className="flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <Clock className="w-3 h-3" />
            {doctor.schedule}
          </span>
        </div>
        <div
          className="mt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <button className="inline-flex items-center gap-2 bg-vet-orange-deep text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-vet-orange-deep/90 transition-colors duration-300">
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── Mobile Fullscreen Card (for stack effect) ──────────
const MobileStackCard = forwardRef<HTMLDivElement, {
  doctor: Doctor;
  index: number;
  isDark: boolean;
  isActive: boolean;
}>(({ doctor, index, isDark, isActive }, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 overflow-hidden rounded-[1.5rem]"
    style={{ willChange: 'transform, opacity' }}
  >
    {/* Image with parallax container */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform' }}
        data-parallax-img={index}
        loading={index < 2 ? 'eager' : 'lazy'}
      />
    </div>

    {/* Gradient overlay */}
    <div
      className="absolute inset-0"
      style={{
        background: isDark
          ? 'linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.6) 35%, rgba(10,22,40,0.1) 55%, transparent 70%)'
          : 'linear-gradient(to top, rgba(12,27,46,0.95) 0%, rgba(12,27,46,0.5) 35%, rgba(12,27,46,0.05) 55%, transparent 70%)',
      }}
    />

    {/* Giant number watermark */}
    <span
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-white/[0.03] select-none pointer-events-none"
      style={{ fontSize: '45vw', lineHeight: 1 }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Number badge top-right */}
    <div className="absolute top-5 right-5 z-10">
      <div className="w-11 h-11 rounded-full bg-vet-orange-deep/90 flex items-center justify-center shadow-lg">
        <span className="font-mono text-xs text-white font-medium">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>

    {/* Content bottom */}
    <div className="absolute bottom-0 left-0 w-full p-6 pb-20 z-10">
      <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/50 block mb-2">
        {doctor.specialty}
      </span>
      <h4 className="font-serif text-2xl text-white leading-tight mb-2">
        {doctor.name}
      </h4>
      <p className="text-white/45 font-light text-sm leading-relaxed mb-4 max-w-[300px]">
        {doctor.description}
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <Clock className="w-3 h-3" />
          {doctor.schedule}
        </span>
        <button className="inline-flex items-center gap-2 bg-vet-orange-deep text-white text-xs font-medium px-4 py-2 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          Agendar
        </button>
      </div>
    </div>
  </div>
));

// ─── Mobile Progress (vertical, right side) ─────────────
const MobileProgress: React.FC<{
  activeIndex: number;
  progress: number;
  isDark: boolean;
}> = ({ activeIndex, progress, isDark }) => (
  <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
    {/* Vertical dots */}
    <div className="flex flex-col items-center gap-2">
      {doctors.map((_, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            height: i === activeIndex ? 32 : 6,
            backgroundColor: i === activeIndex
              ? '#E85D2A'
              : 'rgba(255,255,255,0.2)',
          }}
        />
      ))}
    </div>
    {/* Counter */}
    <div className="flex flex-col items-center font-mono mt-2">
      <span className="text-lg font-medium text-vet-orange-deep tabular-nums leading-none">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>
      <span className="text-[0.5rem] text-white/30 mt-0.5">
        /{String(CARD_COUNT).padStart(2, '0')}
      </span>
    </div>
  </div>
);

// ─── Main Component ─────────────────────────────────────
export const Doctors: React.FC = () => {
  const { isDark } = useTheme();

  // Desktop refs
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile refs
  const mobileSectionRef = useRef<HTMLElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Shared state
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check breakpoint
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ═══ DESKTOP: GSAP horizontal scroll ═══
  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const totalTrackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalTrackWidth - viewportWidth + 160;

    let pathLength = 0;
    if (svgPathRef.current) {
      pathLength = svgPathRef.current.getTotalLength();
      svgPathRef.current.style.strokeDasharray = `${pathLength}`;
      svgPathRef.current.style.strokeDashoffset = `${pathLength}`;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: false,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setActiveIndex(Math.min(Math.floor(p * CARD_COUNT), CARD_COUNT - 1));
        },
      },
    });

    tl.to(track, { x: -scrollDistance, ease: 'none' }, 0);

    if (svgPathRef.current && pathLength > 0) {
      tl.to(svgPathRef.current, { strokeDashoffset: 0, ease: 'none' }, 0);
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        rotateY: -15,
        scale: 0.9,
        opacity: 0.3,
        transformPerspective: 1200,
        transformOrigin: 'center center',
      });
      tl.to(card, {
        rotateY: 0, scale: 1, opacity: 1,
        ease: 'power2.out', duration: 0.2,
      }, i * 0.15);
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === section)
        .forEach(st => st.kill());
    };
  }, [isDesktop]);

  // ═══ MOBILE: GSAP card-stack scroll ═══
  useEffect(() => {
    if (isDesktop || !mobileSectionRef.current || !mobileViewportRef.current) return;

    const section = mobileSectionRef.current;
    const viewport = mobileViewportRef.current;
    const cards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (cards.length === 0) return;

    // Each card gets a segment of the total scroll progress
    // Card 0 is visible at start, then peels away as card 1 appears, etc.
    const segmentSize = 1 / CARD_COUNT;

    // Set all cards stacked, only first visible
    cards.forEach((card, i) => {
      gsap.set(card, {
        zIndex: CARD_COUNT - i,
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.92,
        y: i === 0 ? 0 : 40,
        rotationX: 0,
        transformPerspective: 800,
        transformOrigin: 'center bottom',
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        pin: false,
        onUpdate: (self) => {
          const p = self.progress;
          setMobileProgress(p);
          // Active index: which card is currently "the main one"
          const idx = Math.min(Math.floor(p * CARD_COUNT), CARD_COUNT - 1);
          setMobileActiveIndex(idx);
        },
      },
    });

    cards.forEach((card, i) => {
      const img = card.querySelector(`[data-parallax-img="${i}"]`) as HTMLElement | null;
      const start = i * segmentSize;
      const exitEnd = start + segmentSize;

      if (i < CARD_COUNT - 1) {
        // EXIT animation: current card peels up and away
        tl.to(card, {
          y: '-35%',
          scale: 0.88,
          rotationX: 8,
          opacity: 0,
          ease: 'power2.in',
          duration: segmentSize * 0.6,
        }, start + segmentSize * 0.35);

        // Parallax on image during exit
        if (img) {
          tl.to(img, {
            y: '-15%',
            scale: 1.15,
            ease: 'none',
            duration: segmentSize,
          }, start);
        }
      }

      if (i > 0) {
        // ENTER animation: next card rises from below
        const enterStart = (i - 1) * segmentSize + segmentSize * 0.3;
        tl.fromTo(card, {
          opacity: 0,
          scale: 0.92,
          y: '20%',
          rotationX: -6,
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          ease: 'power2.out',
          duration: segmentSize * 0.65,
        }, enterStart);

        // Parallax: image starts zoomed, settles
        if (img) {
          tl.fromTo(img, {
            scale: 1.2,
            y: '10%',
          }, {
            scale: 1,
            y: '0%',
            ease: 'power2.out',
            duration: segmentSize * 0.7,
          }, enterStart);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars.trigger === section)
        .forEach(st => st.kill());
    };
  }, [isDesktop]);

  return (
    <>
      {/* ═══ DESKTOP: Horizontal Scroll Cinema ═══ */}
      {isDesktop && (
        <section
          ref={sectionRef}
          id="doctors"
          className={`relative transition-colors duration-500 ${isDark ? 'bg-[#0A1628]' : 'bg-vet-cream'}`}
          style={{ height: '300vh' }}
        >
          <div className="sticky top-0 h-screen overflow-hidden" style={{ willChange: 'transform' }}>
            <SVGBackground ref={svgPathRef} isDark={isDark} />
            <SectionHeader isDark={isDark} />
            <div
              ref={trackRef}
              className="absolute top-1/2 -translate-y-1/2 flex items-center gap-12"
              style={{ left: 'max(360px, 25vw)', paddingRight: '20vw' }}
            >
              {doctors.map((doctor, i) => (
                <DoctorCard
                  key={doctor.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  doctor={doctor}
                  index={i}
                  isDark={isDark}
                />
              ))}
            </div>
            <ScrollProgress activeIndex={activeIndex} progress={progress} isDark={isDark} />
          </div>
        </section>
      )}

      {/* ═══ MOBILE: Full-screen Card Stack ═══ */}
      {!isDesktop && (
        <section
          ref={mobileSectionRef}
          id="doctors"
          className={`relative transition-colors duration-500 ${isDark ? 'bg-[#0A1628]' : 'bg-vet-dark'}`}
          style={{ height: `${CARD_COUNT * 100}vh` }}
        >
          {/* Sticky viewport = fullscreen */}
          <div
            ref={mobileViewportRef}
            className="sticky top-0 h-screen overflow-hidden"
          >
            {/* Header overlay */}
            <div className="absolute top-0 left-0 w-full z-20 p-5 pt-20 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-vet-orange-deep" />
                <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-vet-orange-deep">
                  Equipo
                </span>
              </div>
              <h2 className="font-serif text-2xl text-white leading-[1.1]">
                Nuestro Equipo
              </h2>
            </div>

            {/* Stacked cards container */}
            <div className="absolute inset-0">
              {doctors.map((doctor, i) => (
                <MobileStackCard
                  key={doctor.id}
                  ref={(el) => { mobileCardRefs.current[i] = el; }}
                  doctor={doctor}
                  index={i}
                  isDark={isDark}
                  isActive={i === mobileActiveIndex}
                />
              ))}
            </div>

            {/* Vertical progress (right side) */}
            <MobileProgress
              activeIndex={mobileActiveIndex}
              progress={mobileProgress}
              isDark={isDark}
            />

            {/* Scroll hint (bottom center) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center"
              >
                <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/25 mb-1">
                  Scroll
                </span>
                <ChevronDown className="w-4 h-4 text-white/20" />
              </motion.div>
            </div>

            {/* Progress bar bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] z-30">
              <div
                className="h-full bg-vet-orange-deep origin-left transition-transform duration-150"
                style={{ transform: `scaleX(${mobileProgress})` }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
