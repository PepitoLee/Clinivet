import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalOverlayVariants, modalContentVariants } from '../../animations/variants';
import { useTheme } from '../../context/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
}) => {
  const { isDark } = useTheme();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-vet-dark/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full ${sizeClasses[size]} rounded-[1.5rem] shadow-elevated overflow-hidden ${isDark ? 'bg-[#0F1E33]' : 'bg-white'}`}
          >
            {/* Header */}
            {title && (
              <div className={`flex items-center justify-between px-8 py-6 border-b ${isDark ? 'border-white/[0.06]' : 'border-vet-blue-dark/[0.06]'}`}>
                <h2 className={`text-2xl font-serif ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>{title}</h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors group ${isDark ? 'hover:bg-white/[0.06]' : 'hover:bg-vet-blue-dark/[0.04]'}`}
                >
                  <X size={20} className={`transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-vet-blue-dark/30 group-hover:text-vet-blue-dark'}`} />
                </button>
              </div>
            )}

            {/* Close button if no title */}
            {!title && (
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 group shadow-sm ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/80 hover:bg-white'}`}
              >
                <X size={20} className={`transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-vet-blue-dark/30 group-hover:text-vet-blue-dark'}`} />
              </button>
            )}

            {/* Body */}
            <div className="max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
