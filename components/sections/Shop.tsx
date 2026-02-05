import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '../shop/ProductGrid';
import { CategoryFilter } from '../shop/CategoryFilter';
import { products } from '../../data/products';
import { ProductCategory } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const Shop: React.FC = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('todos');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="shop" className={`py-24 section-divider relative overflow-hidden z-0 transition-colors duration-500 ${isDark ? 'bg-[#0F1E33]' : 'bg-vet-warm'}`}>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-vet-orange-deep" />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep">
              Tienda
            </span>
            <span className="w-8 h-px bg-vet-orange-deep" />
          </div>

          <h2 className={`font-serif text-display-sm mb-6 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
            Todo para el{' '}
            <em className="italic text-gradient-animated">bienestar</em>
            <br />
            de tu mascota
          </h2>

          <p className={`font-light text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/40'}`}>
            Productos seleccionados por nuestros veterinarios. Calidad premium para quienes más quieres.
          </p>

          <p className={`font-mono text-[0.6rem] tracking-[0.15em] uppercase ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>
            Envio gratis +$500 · Calidad garantizada · Recomendado por vets
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </motion.div>

        {/* Product count */}
        <motion.div
          layout
          className="flex items-center justify-between mb-8"
        >
          <p className={`font-mono text-xs ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
            Mostrando{' '}
            <span className={isDark ? 'text-slate-300' : 'text-vet-blue-dark/60'}>{filteredProducts.length}</span>{' '}
            productos
          </p>
        </motion.div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-vet-dark rounded-[2rem] p-8 md:p-14 relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto text-center">
              <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-white/30 block mb-4">
                Newsletter exclusivo
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
                ¿Primera compra? Obtén 15% de descuento
              </h3>
              <p className="text-white/40 font-light text-sm mb-10 max-w-md mx-auto">
                Suscríbete a nuestro newsletter y recibe un código de descuento exclusivo para tu primera compra.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-end justify-center max-w-md mx-auto">
                <div className="flex-1 w-full">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/25 py-3 text-sm font-light focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <button className="px-8 py-3 bg-white text-vet-dark font-medium text-sm rounded-full hover:bg-white/90 transition-colors shrink-0">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
