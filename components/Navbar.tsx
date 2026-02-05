import React, { useState } from 'react';
import { Menu, X, ShoppingCart, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Tienda', href: '#shop' },
  { label: 'Equipo', href: '#doctors' },
  { label: 'Contacto', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');
  const [isHidden, setIsHidden] = useState(false);
  const { openModal } = useModal();
  const { toggleCart, totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  // Smart hide/show on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setIsScrolled(latest > 50);
    if (latest > 300 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const handleOpenAppointment = () => {
    setIsOpen(false);
    openModal('appointment');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'py-2 px-4 md:px-6'
            : 'py-4 px-4 md:px-8'
        }`}
      >
        <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'glass rounded-full px-5 py-2 shadow-elevated'
            : 'px-2'
        }`}>
          {/* Logo */}
          <a href="#" className="relative group flex items-center gap-3">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <img
                src="/Imagenes/Logo.jpg"
                alt="CliniVet Buenos Aires"
                className="h-11 w-11 rounded-full object-cover border-2 border-white/80 shadow-lg"
              />
              <motion.div
                className="absolute -inset-1 rounded-full border border-vet-orange-deep/30"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-serif text-base sm:text-lg font-bold leading-none tracking-tight transition-colors duration-500 ${
                isDark
                  ? 'text-slate-100'
                  : isScrolled ? 'text-vet-blue-dark' : 'text-vet-blue-deep'
              }`}>
                Clini<span className="text-vet-orange-deep">Vet</span>
              </span>
              <span className={`font-mono text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/40'}`}>
                Buenos Aires
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveLink(item.href)}
                className={`relative px-4 py-2 text-[0.8rem] font-medium tracking-wide transition-colors duration-300 group ${
                  isDark ? 'text-slate-300 hover:text-white' : 'text-vet-blue-dark/70 hover:text-vet-blue-dark'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Active indicator dot */}
                {activeLink === item.href && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-vet-orange-deep"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {/* Hover background */}
                <span className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${
                  isDark ? 'bg-white/[0.06]' : 'bg-vet-blue-dark/[0.04]'
                }`} />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-2.5 rounded-full transition-colors duration-300 ${
                isDark
                  ? 'bg-white/[0.08] hover:bg-white/[0.12]'
                  : 'bg-vet-blue-dark/[0.04] hover:bg-vet-blue-dark/[0.08]'
              }`}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Sun size={18} className="text-vet-yellow-deep" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Moon size={18} className="text-vet-blue-dark/70" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={toggleCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2.5 rounded-full transition-colors duration-300 ${
                isDark
                  ? 'bg-white/[0.08] hover:bg-white/[0.12]'
                  : 'bg-vet-blue-dark/[0.04] hover:bg-vet-blue-dark/[0.08]'
              }`}
            >
              <ShoppingCart size={18} className={isDark ? 'text-slate-300' : 'text-vet-blue-dark/70'} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, y: 5 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-vet-orange-deep text-white text-[0.65rem] font-bold rounded-full flex items-center justify-center shadow-lg shadow-vet-orange-deep/30"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <motion.button
              onClick={handleOpenAppointment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-vet-blue-dark text-white px-6 py-2.5 rounded-full text-[0.8rem] font-medium flex items-center gap-2 shadow-lg shadow-vet-blue-dark/20"
            >
              <span className="relative z-10">Agendar Cita</span>
              <motion.span
                className="relative z-10"
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 2, y: -2 }}
              >
                <ArrowUpRight size={15} />
              </motion.span>
              {/* Hover gradient reveal */}
              <div className="absolute inset-0 bg-gradient-to-r from-vet-orange-deep to-vet-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2"
            >
              {isDark ? (
                <Sun size={20} className="text-vet-yellow-deep" />
              ) : (
                <Moon size={20} className={isDark ? 'text-slate-300' : 'text-vet-blue-dark'} />
              )}
            </motion.button>

            <button
              onClick={toggleCart}
              className="relative p-2"
            >
              <ShoppingCart size={20} className={isDark ? 'text-slate-200' : 'text-vet-blue-dark'} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-vet-orange-deep text-white text-[0.65rem] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-vet-blue-dark/[0.05]'}`}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} className={isDark ? 'text-slate-200' : 'text-vet-blue-dark'} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} className={isDark ? 'text-slate-200' : 'text-vet-blue-dark'} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className={`absolute inset-0 backdrop-blur-xl ${isDark ? 'bg-[#0A1628]/98' : 'bg-vet-cream/98'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
              {/* Logo + Name */}
              <motion.div
                className="flex flex-col items-center mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                <img
                  src="/Imagenes/Logo.jpg"
                  alt="CliniVet"
                  className="h-16 w-16 rounded-full shadow-xl border-2 border-white mb-3"
                />
                <span className={`font-serif text-xl font-bold leading-none ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                  Clini<span className="text-vet-orange-deep">Vet</span>
                </span>
                <span className={`font-mono text-[0.55rem] tracking-[0.2em] uppercase mt-1 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/40'}`}>
                  Buenos Aires
                </span>
              </motion.div>

              {/* Nav Items */}
              <nav className="flex flex-col items-center gap-2 mb-10">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-3xl font-serif hover:text-vet-orange-deep transition-colors py-2 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.button
                onClick={handleOpenAppointment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-vet-blue-dark text-white px-10 py-4 rounded-full text-lg font-medium shadow-elevated flex items-center gap-2"
              >
                <span>Agendar Cita</span>
                <ArrowUpRight size={18} />
              </motion.button>

              {/* Contact quick info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mt-8 font-mono text-[0.65rem] tracking-[0.2em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}
              >
                +51 914 808 462
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
