import React from 'react';
import { motion } from 'framer-motion';
import { ProductCategory } from '../../types';
import { categories } from '../../data/products';
import { useTheme } from '../../context/ThemeContext';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id as ProductCategory)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-6 py-3 rounded-full font-mono text-[0.75rem] tracking-wide transition-colors ${
            activeCategory === category.id
              ? 'text-white'
              : isDark
                ? 'text-slate-400 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08]'
                : 'text-vet-blue-dark/60 bg-white/80 border border-vet-blue-dark/[0.06] hover:bg-vet-blue-dark/[0.04]'
          }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategoryBg"
              className="absolute inset-0 bg-vet-blue-dark rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};
