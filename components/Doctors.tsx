import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Doctor } from '../types';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ana Silva",
    specialty: "Cirugia Ortopedica",
    image: "/Imagenes/clinivet-1.png",
    description: "Especialista en reconstruccion y traumatologia compleja con 10 anos de experiencia.",
    schedule: "Lun - Vie"
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    specialty: "Cardiologia",
    image: "/Imagenes/clinivet-8.png",
    description: "Pionero en intervenciones cardiacas minimamente invasivas para pequenas especies.",
    schedule: "Mar - Sab"
  },
  {
    id: 3,
    name: "Dra. Elena Vega",
    specialty: "Oncologia",
    image: "/Imagenes/clinivet-9.png",
    description: "Enfoque compasivo y cientifico para el tratamiento del cancer animal.",
    schedule: "Lun - Jue"
  },
  {
    id: 4,
    name: "Dr. Marco Polo",
    specialty: "Exoticos",
    image: "/Imagenes/clinivet-2.png",
    description: "Experto en el manejo de aves, reptiles y pequenos mamiferos.",
    schedule: "Vie - Dom"
  },
  {
    id: 5,
    name: "Dra. Sofia L.",
    specialty: "Dermatologia",
    image: "/Imagenes/clinivet-3.png",
    description: "Soluciones avanzadas para alergias complejas y condiciones de la piel.",
    schedule: "Lun - Vie"
  }
];

export const Doctors: React.FC = () => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.doctor-card');

      if (cards.length === 0) return;

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          start: "top top",
          end: () => "+=" + (cardsRef.current?.scrollWidth || 0),
          invalidateOnRefresh: true,
        }
      });

      // Asegurar z-index en el pin-spacer que GSAP crea
      requestAnimationFrame(() => {
        const pinSpacer = containerRef.current?.parentElement;
        if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
          pinSpacer.style.zIndex = '20';
          pinSpacer.style.isolation = 'isolate';
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="doctors"
      className={`overflow-hidden relative z-10 section-divider transition-colors duration-500 ${isDark ? 'bg-[#0A1628] text-slate-200' : 'bg-vet-cream text-vet-blue-dark'}`}
    >
      <div
        ref={containerRef}
        className="h-screen w-full flex flex-col justify-center py-10 relative z-10 overflow-hidden"
      >
        {/* ── Section Header ── */}
        <div className="absolute top-8 md:top-14 left-6 md:left-20 z-10 w-[calc(100%-3rem)] md:w-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <span className="w-8 h-px bg-vet-orange-deep" />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep">
              Equipo
            </span>
          </div>
          <h2 className={`font-serif text-display-sm leading-[1.1] ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
            Nuestro Equipo
          </h2>
          <p className={`mt-2 md:mt-3 font-sans text-sm md:text-base font-light max-w-sm ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
            Profesionales comprometidos con la salud y bienestar de tu mascota.
          </p>
        </div>

        {/* ── Horizontal Scroll Cards ── */}
        <div
          ref={cardsRef}
          className="flex gap-0 md:gap-7 items-end md:items-center h-[60vh] md:h-[70vh] pl-0 md:pl-[15vw] will-change-transform"
        >
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="doctor-card relative flex-shrink-0 w-[100vw] md:w-[28vw] h-[55vh] md:h-[68vh] px-3 md:px-0"
            >
              <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-vet-dark shadow-card group card-shine">
                {/* Image */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-vet-dark via-vet-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Card number */}
                <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-9">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/40 block mb-2 md:mb-3">
                    {doctor.specialty}
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-tight">
                    {doctor.name}
                  </h4>
                  <p className="text-white/40 font-light text-sm leading-relaxed line-clamp-2 mb-3 md:mb-4 max-w-[280px]">
                    {doctor.description}
                  </p>
                  <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.15em] text-white/30 border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-vet-orange-deep/60" />
                      {doctor.schedule}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer for right padding */}
          <div className="w-[10vw] flex-shrink-0" />
        </div>

        {/* ── Bottom scroll indicator ── */}
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 flex items-center gap-3">
          <span className={`w-6 h-px ${isDark ? 'bg-slate-600' : 'bg-vet-blue-dark/15'}`} />
          <span className={`font-mono text-[0.6rem] tracking-[0.3em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>
            Scroll to explore
          </span>
        </div>

        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-20 flex items-center gap-2">
          <span className={`font-mono text-[0.6rem] tracking-[0.15em] ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/25'}`}>
            {String(doctors.length).padStart(2, '0')} profesionales
          </span>
        </div>
      </div>
    </section>
  );
};
