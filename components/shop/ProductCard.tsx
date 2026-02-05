import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Star, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isDark } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const badgeColors: Record<string, string> = {
    nuevo: 'bg-vet-blue-dark',
    oferta: 'bg-vet-orange-deep',
    popular: 'bg-vet-blue-dark/80',
  };

  const badgeLabels: Record<string, string> = {
    nuevo: 'Nuevo',
    oferta: 'Oferta',
    popular: 'Popular',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-[1.5rem] overflow-hidden border shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer group ${
        isDark
          ? 'bg-[#111D30] border-white/[0.06] hover:border-white/[0.12]'
          : 'bg-white border-vet-blue-dark/[0.04] hover:border-vet-blue-dark/[0.08]'
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-4 left-4 z-10 ${badgeColors[product.badge]} text-white font-mono text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full`}
        >
          {badgeLabels[product.badge]}
        </div>
      )}

      {/* Image container */}
      <div className={`relative h-52 overflow-hidden ${isDark ? 'bg-[#0F1E33]' : 'bg-vet-warm'}`}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-vet-blue-dark/40 flex items-center justify-center"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-full transition-colors ${
              isAdded ? 'bg-green-500' : 'bg-white hover:bg-vet-orange-deep'
            }`}
          >
            {isAdded ? (
              <Check className="w-6 h-6 text-white" />
            ) : (
              <Plus className="w-6 h-6 text-vet-blue-dark group-hover:text-white" />
            )}
          </motion.button>
        </motion.div>

        {/* Stock indicator */}
        {product.stock < 10 && (
          <div className="absolute bottom-2 right-2 bg-vet-orange-deep/10 text-vet-orange-deep text-xs px-2 py-1 rounded-full">
            Solo {product.stock} disponibles
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-vet-orange-deep/60">
          {product.category}
        </span>

        {/* Name */}
        <h3 className={`font-serif text-lg mt-1 line-clamp-1 group-hover:text-vet-orange-deep transition-colors ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-sm font-light mt-2 line-clamp-2 ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/40'}`}>
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.floor(product.rating)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-vet-blue-dark/15'
              }
            />
          ))}
          <span className={`font-mono text-[0.65rem] ml-1 ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>
            ({product.rating})
          </span>
        </div>

        {/* Price and Add button */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className={`text-sm line-through ${isDark ? 'text-slate-500' : 'text-vet-blue-dark/30'}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            disabled={isAdded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full transition-colors ${
              isAdded
                ? 'bg-green-500 text-white'
                : isDark
                  ? 'bg-white/[0.06] text-slate-400 hover:bg-vet-orange-deep hover:text-white'
                  : 'bg-vet-blue-dark/[0.04] text-vet-blue-dark/60 hover:bg-vet-orange-deep hover:text-white'
            }`}
          >
            {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
