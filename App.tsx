import React from 'react';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Doctors } from './components/Doctors';
import { Footer } from './components/Footer';
import { Emergency } from './components/sections/Emergency';
import { Shop } from './components/sections/Shop';
import { AppointmentModal } from './components/forms/AppointmentModal';
import { CartDrawer } from './components/shop/CartDrawer';

const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`font-sans antialiased relative transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>
      {/* Subtle noise texture for organic premium feel */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.35] mix-blend-overlay bg-noise" />

      {/* Ambient gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-[40vh] -right-[20vw] w-[80vw] h-[80vh] rounded-full blur-[120px] animate-float-slow ${isDark ? 'bg-vet-orange-deep/[0.05]' : 'bg-vet-orange-deep/[0.03]'}`} />
        <div className={`absolute -bottom-[30vh] -left-[20vw] w-[70vw] h-[70vh] rounded-full blur-[120px] animate-float-delayed ${isDark ? 'bg-vet-blue-deep/[0.06]' : 'bg-vet-blue-deep/[0.04]'}`} />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Emergency />
        <Services />
        <Shop />
        <Doctors />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <AppointmentModal />
      <CartDrawer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
