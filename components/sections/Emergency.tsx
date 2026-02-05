import React from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertCircle, Clock, Heart } from 'lucide-react';

const premiumEase = [0.16, 1, 0.3, 1] as const;

export const Emergency: React.FC = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Premium animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-vet-blue-dark via-[#1a3561] to-vet-blue-deep" />

      {/* Animated mesh blobs for depth */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[160%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(232, 93, 42, 0.45) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[70%] h-[140%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 185, 66, 0.4) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 25, -35, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/3 w-[40%] h-[80%] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(240, 125, 79, 0.5) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(15, 40, 71, 0.5) 100%)',
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left content */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Refined pulsing icon */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: premiumEase,
              }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 glass-dark rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-vet-orange" />
              </div>
              {/* Single refined pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-vet-orange/30"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: premiumEase,
                }}
              />
            </motion.div>

            <div>
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: premiumEase }}
              >
                <Clock className="w-3.5 h-3.5 text-vet-orange-soft" />
                <span className="font-mono text-[0.65rem] tracking-mega uppercase text-white/50">
                  Atencion 24/7
                </span>
              </motion.div>
              <motion.h2
                className="text-display-sm font-serif text-white"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.05, ease: premiumEase }}
              >
                Emergencias Veterinarias
              </motion.h2>
              <motion.p
                className="text-white/45 mt-2 max-w-md text-sm md:text-base font-light leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: premiumEase }}
              >
                Nuestro equipo esta disponible las 24 horas, los 7 dias de la semana para atender cualquier emergencia.
              </motion.p>
            </div>
          </div>

          {/* Right - Phone CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: premiumEase }}
          >
            <motion.a
              href="tel:+51914808462"
              className="group relative glass-dark rounded-4xl px-8 py-5 flex items-center gap-5 card-shine"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: premiumEase }}
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(232, 93, 42, 0.12) 0%, transparent 70%)',
                }}
              />

              <motion.div
                className="relative w-11 h-11 bg-gradient-to-br from-vet-orange-deep to-vet-orange rounded-full flex items-center justify-center shadow-glow-orange flex-shrink-0"
                animate={{
                  rotate: [0, -8, 8, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: premiumEase,
                }}
              >
                <Phone className="w-5 h-5 text-white" />
              </motion.div>
              <div className="relative">
                <p className="font-mono text-[0.6rem] tracking-mega uppercase text-white/40 mb-0.5">
                  Llamar ahora
                </p>
                <p className="text-lg md:text-xl font-semibold text-white tracking-wide">
                  +51 914 808 462
                </p>
              </div>
            </motion.a>

            <div className="flex items-center gap-2 text-white/35">
              <Heart className="w-4 h-4 text-vet-orange-soft/60" />
              <span className="text-xs font-light">Respuesta inmediata</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom stats */}
        <div className="mt-14 pt-8 relative">
          {/* Separator line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {[
              { value: '15min', label: 'Tiempo promedio de respuesta' },
              { value: '24/7', label: 'Disponibilidad total' },
              { value: '98%', label: 'Casos resueltos' },
              { value: '+500', label: 'Emergencias atendidas/ano' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: premiumEase }}
                className={`text-center relative ${
                  i < 3 ? 'md:border-r md:border-white/[0.06]' : ''
                }`}
              >
                <p className="font-mono text-2xl md:text-3xl font-medium text-white tracking-wide">
                  {stat.value}
                </p>
                <p className="text-white/30 text-xs mt-1.5 font-light max-w-[160px] mx-auto leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
