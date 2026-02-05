import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseTextRevealOptions {
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export function useTextReveal(options: UseTextRevealOptions = {}) {
  const { threshold = 0.5, once = true, delay = 0 } = options;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return { ref, isInView, shouldAnimate };
}

// Helper to split text into spans
export function splitTextIntoChars(text: string): string[] {
  return text.split('');
}

export function splitTextIntoWords(text: string): string[] {
  return text.split(' ');
}
