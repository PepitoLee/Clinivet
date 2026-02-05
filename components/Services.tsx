import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, ScanLine, Stethoscope, Microscope, ChevronDown } from 'lucide-react';
import { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────
const services: Service[] = [
  {
    id: 1,
    title: "Medicina Interna",
    description: "Diagnostico preciso mediante evaluacion integral y tecnologia avanzada para detectar patologias complejas.",
    icon: <Stethoscope size={28} />,
    image: "/Imagenes/clinivet-4.webp"
  },
  {
    id: 2,
    title: "Cirugia Avanzada",
    description: "Quirofanos de ultima generacion para procedimientos de tejidos blandos y ortopedia con monitoreo constante.",
    icon: <Scissors size={28} />,
    image: "/Imagenes/clinivet-5.webp"
  },
  {
    id: 3,
    title: "Imagenologia Digital",
    description: "Rayos X digital y ecografia Doppler para ver lo invisible y asegurar un tratamiento efectivo.",
    icon: <ScanLine size={28} />,
    image: "/Imagenes/clinivet-6.webp"
  },
  {
    id: 4,
    title: "Laboratorio Clinico",
    description: "Resultados en tiempo real con nuestro laboratorio in-house para emergencias y chequeos rutinarios.",
    icon: <Microscope size={28} />,
    image: "/Imagenes/clinivet-7.webp"
  }
];

const SERVICE_COUNT = services.length;
const ICON_COMPONENTS = [Stethoscope, Scissors, ScanLine, Microscope];

// ─── Mobile Fullscreen Card ─────────────────────────────
const MobileServiceCard = forwardRef<HTMLDivElement, {
  service: Service;
  index: number;
}>(({ service, index }, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 overflow-hidden"
    style={{ willChange: 'transform, opacity' }}
  >
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform' }}
        data-parallax-img={index}
        loading={index < 2 ? 'eager' : 'lazy'}
      />
    </div>

    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(to top, rgba(12,27,46,0.97) 0%, rgba(12,27,46,0.6) 35%, rgba(12,27,46,0.1) 55%, transparent 70%)',
      }}
    />

    <span
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-white/[0.03] select-none pointer-events-none"
      style={{ fontSize: '45vw', lineHeight: 1 }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="absolute top-5 right-5 z-10">
      <div className="w-11 h-11 rounded-full bg-vet-orange-deep/90 flex items-center justify-center shadow-lg">
        <span className="font-mono text-xs text-white font-medium">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full p-6 pb-20 z-10">
      <div className="text-vet-orange-deep mb-3">
        {service.icon}
      </div>
      <h4 className="font-serif text-2xl text-white leading-tight mb-2">
        {service.title}
      </h4>
      <p className="text-white/45 font-light text-sm leading-relaxed mb-4 max-w-[300px]">
        {service.description}
      </p>
    </div>
  </div>
));

// ─── Mobile Progress (vertical dots + counter) ──────────
const MobileProgress: React.FC<{
  activeIndex: number;
  progress: number;
}> = ({ activeIndex, progress }) => (
  <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
    <div className="flex flex-col items-center gap-2">
      {services.map((_, i) => (
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
    <div className="flex flex-col items-center font-mono mt-2">
      <span className="text-lg font-medium text-vet-orange-deep tabular-nums leading-none">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>
      <span className="text-[0.5rem] text-white/30 mt-0.5">
        /{String(SERVICE_COUNT).padStart(2, '0')}
      </span>
    </div>
  </div>
);

// ─── Desktop: Service List Item ─────────────────────────
const ServiceItem: React.FC<{
  service: Service;
  index: number;
  isActive: boolean;
}> = ({ service, index, isActive }) => (
  <div
    className="py-7 border-b border-white/[0.06] last:border-none transition-all duration-500"
    data-service-item={index}
    style={{
      opacity: isActive ? 1 : 0.25,
      transform: isActive ? 'translateX(12px)' : 'translateX(0)',
      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
    }}
  >
    <div className="flex items-start gap-5">
      <span className="font-mono text-xs text-vet-orange-deep/50 mt-2">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl lg:text-3xl font-serif text-white">{service.title}</h3>
          <span className={`text-vet-orange-deep transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            {service.icon}
          </span>
        </div>
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            maxHeight: isActive ? 120 : 0,
            opacity: isActive ? 1 : 0,
          }}
        >
          <p className="text-base text-white/40 font-light max-w-md pb-2 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Services Component ────────────────────────────
export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ═══ DESKTOP: GSAP scroll-driven reveal takeover ═══
  useEffect(() => {
    if (!isDesktop || !sectionRef.current) return;

    const section = sectionRef.current;
    const images = desktopImageRefs.current.filter(Boolean) as HTMLDivElement[];

    if (images.length === 0) return;

    // Set initial states: first image visible, rest hidden
    images.forEach((img, i) => {
      gsap.set(img, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.08,
        zIndex: SERVICE_COUNT - i,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: false,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(Math.floor(p * SERVICE_COUNT), SERVICE_COUNT - 1);
          setActiveIndex(idx);

          // Progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${p})`;
          }
          // Vertical line progress
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleY(${p})`;
          }
        },
      },
    });

    const segmentSize = 1 / SERVICE_COUNT;

    // Animate image transitions
    images.forEach((img, i) => {
      const start = i * segmentSize;

      if (i > 0) {
        // Enter: fade in + scale down from 1.08 to 1
        tl.fromTo(img, {
          opacity: 0,
          scale: 1.08,
        }, {
          opacity: 1,
          scale: 1,
          ease: 'power2.inOut',
          duration: segmentSize * 0.5,
        }, start - segmentSize * 0.15);
      }

      if (i < SERVICE_COUNT - 1) {
        // Exit: fade out + scale down to 0.95
        const exitStart = start + segmentSize * 0.6;
        tl.to(img, {
          opacity: 0,
          scale: 0.95,
          ease: 'power2.in',
          duration: segmentSize * 0.4,
        }, exitStart);
      }
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
    const cards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (cards.length === 0) return;

    const segmentSize = 1 / SERVICE_COUNT;

    cards.forEach((card, i) => {
      gsap.set(card, {
        zIndex: SERVICE_COUNT - i,
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
          const idx = Math.min(Math.floor(p * SERVICE_COUNT), SERVICE_COUNT - 1);
          setMobileActiveIndex(idx);
        },
      },
    });

    cards.forEach((card, i) => {
      const img = card.querySelector(`[data-parallax-img="${i}"]`) as HTMLElement | null;
      const start = i * segmentSize;

      if (i < SERVICE_COUNT - 1) {
        tl.to(card, {
          y: '-35%',
          scale: 0.88,
          rotationX: 8,
          opacity: 0,
          ease: 'power2.in',
          duration: segmentSize * 0.6,
        }, start + segmentSize * 0.35);

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

  // ─── Active icon for desktop overlay ───
  const ActiveIcon = ICON_COMPONENTS[activeIndex];

  return (
    <>
      {/* ═══ DESKTOP: Reveal Takeover ═══ */}
      {isDesktop && (
        <section
          ref={sectionRef}
          id="services"
          className="relative bg-vet-dark"
          style={{ height: '400vh' }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background dot pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Right side: Image display (55%) */}
            <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden">
              {/* Stacked images */}
              {services.map((service, i) => (
                <div
                  key={service.id}
                  ref={(el) => { desktopImageRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-vet-dark/30 to-vet-dark/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-vet-dark/60 via-transparent to-vet-dark/30" />
                </div>
              ))}

              {/* Giant decorative number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className="font-serif text-white/[0.03] select-none transition-all duration-700"
                  style={{ fontSize: 'clamp(15rem, 22vw, 28rem)', lineHeight: 1 }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Active icon glow overlay */}
              <div className="absolute bottom-16 right-16 pointer-events-none">
                <div className="relative">
                  <div className="absolute inset-0 bg-vet-orange-deep/20 blur-[40px] rounded-full scale-150" />
                  <div className="relative text-vet-orange-deep/80 transition-all duration-500">
                    <ActiveIcon size={64} strokeWidth={1.2} />
                  </div>
                </div>
              </div>
            </div>

            {/* Left Panel (45%) */}
            <div className="absolute top-0 left-0 w-[45%] h-full flex flex-col justify-center px-10 lg:px-16">
              {/* Section header */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-vet-orange-deep" />
                  <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep">
                    Servicios
                  </span>
                </div>
                <h2 className="font-serif text-display-sm text-white leading-[1.1]">
                  Nuestra{' '}
                  <span className="italic text-gradient-animated">Expertise</span>
                </h2>
              </div>

              {/* Service list with vertical progress line */}
              <div className="relative">
                {/* Vertical progress line */}
                <div className="absolute left-0 top-0 w-[2px] h-full bg-white/[0.06]">
                  <div
                    ref={lineRef}
                    className="w-full bg-vet-orange-deep origin-top"
                    style={{ height: '100%', transform: 'scaleY(0)' }}
                  />
                </div>

                <div className="pl-8">
                  {services.map((service, index) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      index={index}
                      isActive={index === activeIndex}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] z-30">
              <div className="h-full bg-white/[0.06]">
                <div
                  ref={progressBarRef}
                  className="h-full origin-left"
                  style={{
                    background: 'linear-gradient(90deg, #E85D2A, #F4845F)',
                    transform: 'scaleX(0)',
                  }}
                />
              </div>
            </div>

            {/* Bottom counter */}
            <div className="absolute bottom-6 left-10 lg:left-16 z-20 flex items-center gap-4">
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-2xl font-medium text-vet-orange-deep tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-white/25">
                  / {String(SERVICE_COUNT).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      width: i === activeIndex ? 48 : 8,
                      backgroundColor: i === activeIndex ? '#E85D2A' : 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ MOBILE: Full-Screen Card Stack ═══ */}
      {!isDesktop && (
        <section
          ref={mobileSectionRef}
          id="services"
          className="relative bg-vet-dark"
          style={{ height: `${SERVICE_COUNT * 100}vh` }}
        >
          <div
            ref={mobileViewportRef}
            className="sticky top-0 h-screen overflow-hidden"
          >
            {/* Header overlay */}
            <div className="absolute top-0 left-0 w-full z-20 p-5 pt-20 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-vet-orange-deep" />
                <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-vet-orange-deep">
                  Servicios
                </span>
              </div>
              <h2 className="font-serif text-2xl text-white leading-[1.1]">
                Nuestra{' '}
                <span className="italic text-gradient-animated">Expertise</span>
              </h2>
            </div>

            {/* Stacked cards */}
            <div className="absolute inset-0">
              {services.map((service, i) => (
                <MobileServiceCard
                  key={service.id}
                  ref={(el) => { mobileCardRefs.current[i] = el; }}
                  service={service}
                  index={i}
                />
              ))}
            </div>

            {/* Vertical progress */}
            <MobileProgress
              activeIndex={mobileActiveIndex}
              progress={mobileProgress}
            />

            {/* Scroll hint */}
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
