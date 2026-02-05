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
