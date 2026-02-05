import React from 'react';
import { motion } from 'framer-motion';
import { useTextReveal } from '../../hooks/useTextReveal';

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  staggerDelay?: number;
  animationDelay?: number;
  as?: React.ElementType;
}

const charVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.02,
    },
  }),
};

const wordVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

const lineVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  type = 'words',
  staggerDelay,
  animationDelay = 0,
  as: Tag = 'span',
}) => {
  const { ref, shouldAnimate } = useTextReveal({ delay: animationDelay });

  if (type === 'chars') {
    const chars = text.split('');
    const delay = staggerDelay || 0.02;

    return (
      <Tag ref={ref as any} className={`inline-block ${className}`}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              variants={{
                hidden: { y: '100%', opacity: 0 },
                visible: (i: number) => ({
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * delay,
                  },
                }),
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  if (type === 'words') {
    const words = text.split(' ');
    const delay = staggerDelay || 0.08;

    return (
      <Tag ref={ref as any} className={`inline-block ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              variants={{
                hidden: { y: '100%', opacity: 0 },
                visible: (i: number) => ({
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * delay,
                  },
                }),
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Lines
  return (
    <Tag ref={ref as any} className={className}>
      <motion.span
        className="block"
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        variants={lineVariants}
      >
        {text}
      </motion.span>
    </Tag>
  );
};

// Specialized heading component
interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className = '',
  level = 2,
  type = 'words',
  delay = 0,
}) => {
  const { ref, shouldAnimate } = useTextReveal({ delay });
  const Tag = `h${level}` as React.ElementType;

  const text = typeof children === 'string' ? children : '';

  if (type === 'chars') {
    const chars = text.split('');
    return (
      <Tag ref={ref as any} className={className}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              variants={charVariants}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <Tag ref={ref as any} className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              custom={i}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as any} className={className}>
      <motion.span
        className="block"
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        variants={lineVariants}
      >
        {children}
      </motion.span>
    </Tag>
  );
};
