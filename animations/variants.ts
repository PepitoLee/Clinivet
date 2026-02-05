import { Variants } from 'framer-motion';

// ========== MODAL VARIANTS ==========
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
};

// ========== DRAWER VARIANTS ==========
export const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
};

// ========== STAGGER CONTAINER ==========
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ========== FADE UP ==========
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== FADE IN ==========
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// ========== SCALE UP ==========
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

// ========== SLIDE IN LEFT ==========
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== SLIDE IN RIGHT ==========
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ========== CHARACTER REVEAL ==========
export const charReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ========== WORD REVEAL ==========
export const wordReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ========== PRODUCT CARD ==========
export const productCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ========== CART ITEM ==========
export const cartItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: -20,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.2 },
  },
};

// ========== PULSE ==========
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ========== GLOW ==========
export const glow: Variants = {
  initial: { boxShadow: '0 0 0 0 rgba(232, 93, 42, 0)' },
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(232, 93, 42, 0.3)',
      '0 0 0 15px rgba(232, 93, 42, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};
