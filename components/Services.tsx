import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Activity, Scissors, ScanLine, Stethoscope, Microscope, ArrowUpRight } from 'lucide-react';
import { Service } from '../types';

// ============================================
// MOBILE SERVICE CARD WITH SCROLL REVEAL
// ============================================
const MobileServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.85", "center 0.5"]
  });

  const imageHeight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 220, 220]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.5, 1, 1]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="py-8 border-b border-white/[0.06] last:border-none"
    >
      {/* Number + Title */}
      <div className="flex items-start gap-4 mb-4">
        <span className="font-mono text-xs text-vet-orange-deep/60 mt-1">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <h3 className="text-2xl font-serif text-white mb-3">{service.title}</h3>
          <motion.p
            style={{ opacity: descriptionOpacity }}
            className="text-sm text-white/50 font-light leading-relaxed"
          >
            {service.description}
          </motion.p>
        </div>
      </div>

      {/* Image reveal */}
      <motion.div
        style={{ height: imageHeight, opacity: imageOpacity }}
        className="rounded-2xl overflow-hidden relative ml-8"
      >
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-vet-dark/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 text-vet-orange-deep">{service.icon}</div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN SERVICES COMPONENT
// ============================================
export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 1,
      title: "Medicina Interna",
      description: "Diagnostico preciso mediante evaluacion integral y tecnologia avanzada para detectar patologias complejas.",
      icon: <Stethoscope size={28} />,
      image: "/Imagenes/clinivet-4.png"
    },
    {
      id: 2,
      title: "Cirugia Avanzada",
      description: "Quirofanos de ultima generacion para procedimientos de tejidos blandos y ortopedia con monitoreo constante.",
      icon: <Scissors size={28} />,
      image: "/Imagenes/clinivet-5.png"
    },
    {
      id: 3,
      title: "Imagenologia Digital",
      description: "Rayos X digital y ecografia Doppler para ver lo invisible y asegurar un tratamiento efectivo.",
      icon: <ScanLine size={28} />,
      image: "/Imagenes/clinivet-6.png"
    },
    {
      id: 4,
      title: "Laboratorio Clinico",
      description: "Resultados en tiempo real con nuestro laboratorio in-house para emergencias y chequeos rutinarios.",
      icon: <Microscope size={28} />,
      image: "/Imagenes/clinivet-7.png"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 md:py-36 bg-vet-dark text-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-vet-orange-deep/[0.04] rounded-full blur-[150px] blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-vet-blue-deep/[0.06] rounded-full blur-[120px] blob" style={{ animationDelay: '6s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-vet-orange-deep" />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep">
              Servicios
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-sm text-white max-w-xl"
          >
            Nuestra{' '}
            <span className="italic text-gradient-animated">Expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/30 text-sm font-light mt-4 max-w-md md:hidden"
          >
            Desplazate para ver mas detalles
          </motion.p>
        </div>

        {/* === MOBILE VERSION === */}
        <div className="md:hidden">
          {services.map((service, index) => (
            <MobileServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* === DESKTOP VERSION === */}
        <div className="hidden md:flex flex-row gap-16 lg:gap-20">
          {/* List */}
          <div className="w-[45%]">
            <div className="flex flex-col">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`group cursor-pointer py-8 border-b border-white/[0.06] transition-all duration-500 ${
                    activeService === service.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                  }`}
                  whileHover={{ x: activeService === service.id ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs text-vet-orange-deep/50 mt-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl lg:text-3xl font-serif">{service.title}</h3>
                        <motion.span
                          animate={{ rotate: activeService === service.id ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className={`${activeService === service.id ? 'text-vet-orange-deep' : 'text-white/20'} transition-colors duration-300`}
                        >
                          <ArrowUpRight size={20} />
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {activeService === service.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-base text-white/40 font-light max-w-md pb-2 leading-relaxed">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Display */}
          <div className="w-[55%] relative">
            <div className="sticky top-32 w-full h-[580px] rounded-[2rem] overflow-hidden border border-white/[0.06] bg-vet-dark shadow-elevated">
              <AnimatePresence mode="wait">
                {services.map((service) => (
                  activeService === service.id && (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-vet-dark via-vet-dark/20 to-transparent" />

                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 w-full p-8">
                        <div className="flex items-end justify-between">
                          <div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-vet-orange-deep mb-3"
                            >
                              {service.icon}
                            </motion.div>
                            <motion.h4
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-2xl font-serif text-white"
                            >
                              {service.title}
                            </motion.h4>
                          </div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="font-mono text-[0.55rem] tracking-[0.3em] text-white/20 uppercase"
                          >
                            CliniVet
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
