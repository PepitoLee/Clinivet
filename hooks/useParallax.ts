import { useEffect, useRef, useState, RefObject } from 'react';
import gsap from 'gsap';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  containerRef?: RefObject<HTMLElement>;
}

export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const { speed = 0.3, direction = 'up', containerRef } = options;
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const container = containerRef?.current || window;
    const isWindow = container === window;

    const handleScroll = () => {
      const scrollY = isWindow ? window.scrollY : (container as HTMLElement).scrollTop;
      const rect = element.getBoundingClientRect();
      const elementTop = isWindow ? rect.top + scrollY : rect.top;
      const elementHeight = element.offsetHeight;

      // Only animate when element is in or near viewport
      const viewportHeight = window.innerHeight;
      if (rect.bottom < -100 || rect.top > viewportHeight + 100) return;

      const progress = (scrollY - elementTop + viewportHeight) / (elementHeight + viewportHeight);
      const yOffset = direction === 'up'
        ? -progress * speed * 100
        : progress * speed * 100;

      gsap.set(element, {
        y: yOffset,
        force3D: true,
      });
    };

    const target = isWindow ? window : container;
    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, containerRef]);

  return elementRef;
}

// Hook for mouse-based parallax (tilt effect)
interface UseMouseParallaxOptions {
  strength?: number;
  perspective?: number;
}

export function useMouseParallax<T extends HTMLElement>(options: UseMouseParallaxOptions = {}) {
  const { strength = 10, perspective = 1000 } = options;
  const elementRef = useRef<T>(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / rect.width) * strength;
      const rotateX = ((centerY - e.clientY) / rect.height) * strength;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: perspective,
      });

      setStyle({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
      setStyle({ rotateX: 0, rotateY: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, perspective]);

  return { ref: elementRef, style };
}

// Scroll progress hook
export function useScrollProgress(elementRef?: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementHeight = elementRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        const start = -elementHeight;
        const end = viewportHeight;
        const current = rect.top;

        const prog = Math.max(0, Math.min(1, (end - current) / (end - start)));
        setProgress(prog);
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const prog = window.scrollY / docHeight;
        setProgress(Math.max(0, Math.min(1, prog)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return progress;
}
