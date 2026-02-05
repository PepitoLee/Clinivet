import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  magnetic?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-vet-terra text-white hover:bg-vet-dark',
  secondary: 'bg-vet-dark text-white hover:bg-vet-terra',
  outline: 'border-2 border-vet-dark text-vet-dark hover:bg-vet-dark hover:text-white',
  ghost: 'text-vet-dark hover:bg-vet-dark/5',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  magnetic = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMagneticPos({
      x: x * 0.3,
      y: y * 0.3,
    });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setMagneticPos({ x: 0, y: 0 });
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: magneticPos.x,
        y: magneticPos.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 20,
      }}
      whileHover={{ scale: magnetic ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-full font-medium
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: [-100, 200],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </span>
    </motion.button>
  );
};

// Specialized CTA Button with glow effect
interface CTAButtonProps extends Omit<ButtonProps, 'variant'> {
  glowColor?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  glowColor = 'rgba(192, 86, 67, 0.5)',
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="relative inline-block group">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: glowColor }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <Button
        variant="primary"
        magnetic
        className={`relative ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

// Icon button variant
interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeMap: Record<ButtonSize, string> = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${sizeMap[size]}
        rounded-full flex items-center justify-center
        transition-colors duration-300
        ${variant === 'primary' ? 'bg-vet-terra text-white hover:bg-vet-dark' : ''}
        ${variant === 'secondary' ? 'bg-vet-dark text-white hover:bg-vet-terra' : ''}
        ${variant === 'outline' ? 'border-2 border-vet-dark text-vet-dark hover:bg-vet-dark hover:text-white' : ''}
        ${variant === 'ghost' ? 'text-vet-dark hover:bg-vet-dark/10' : ''}
        ${className}
      `}
      {...props}
    >
      {icon}
    </motion.button>
  );
};
