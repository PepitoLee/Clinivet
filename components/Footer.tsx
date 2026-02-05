import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowUpRight, Heart, Code2, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

/* ====== CONFETTI + FIREWORKS ENGINE ====== */
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
  type: 'confetti' | 'spark' | 'star';
  opacity: number;
  delay: number;
}

const COLORS = ['#E85D2A', '#F07D4F', '#F4B942', '#F5C84C', '#5A7FB5', '#FF6B9D', '#C770F0', '#36D399', '#FBBF24', '#FB923C'];

const createParticles = (count: number, originX: number, originY: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = 2 + Math.random() * 6;
    const types: Particle['type'][] = ['confetti', 'spark', 'star'];
    return {
      id: Date.now() + i,
      x: originX,
      y: originY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      velocity: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed - 3 },
      type: types[Math.floor(Math.random() * types.length)],
      opacity: 1,
      delay: Math.random() * 0.3,
    };
  });
};

const ConfettiCanvas: React.FC<{ active: boolean; containerRef: React.RefObject<HTMLDivElement | null> }> = ({ active, containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const launchBurst = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // Multiple bursts from different points
    const burst1 = createParticles(40, cx, cy);
    const burst2 = createParticles(25, cx - 80, cy + 10);
    const burst3 = createParticles(25, cx + 80, cy + 10);
    particlesRef.current = [...burst1, ...burst2, ...burst3];
  }, [containerRef]);

  useEffect(() => {
    if (active) {
      launchBurst();
      // Continuous confetti every 3 seconds to match bombardas
      const interval = setInterval(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const randomX = rect.width * (0.2 + Math.random() * 0.6);
        const randomY = rect.height * (0.2 + Math.random() * 0.4);
        particlesRef.current = [
          ...particlesRef.current,
          ...createParticles(20 + Math.floor(Math.random() * 15), randomX, randomY),
        ];
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [active, launchBurst, containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === 'confetti') {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === 'spark') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
        // Glow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Star shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const r = i % 2 === 0 ? p.size / 2 : p.size / 4;
          if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.velocity.x,
          y: p.y + p.velocity.y,
          velocity: { x: p.velocity.x * 0.98, y: p.velocity.y + 0.12 },
          rotation: p.rotation + p.velocity.x * 2,
          opacity: Math.max(0, p.opacity - 0.008),
        }))
        .filter(p => p.opacity > 0);

      particlesRef.current.forEach(drawParticle);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [active, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

/* ====== SVG BOMBARDA (FIREWORK MORTAR) - CONTINUOUS FIRING ====== */
const BURST_COLORS = ['#E85D2A', '#F4B942', '#FF6B9D', '#36D399', '#5A7FB5', '#C770F0', '#FB923C', '#FBBF24'];

type FireworkType = 'chrysanthemum' | 'peony' | 'willow' | 'palm' | 'crossette' | 'ring' | 'comet' | 'dahlia';
const FIREWORK_TYPES: FireworkType[] = ['chrysanthemum', 'peony', 'willow', 'palm', 'crossette', 'ring', 'comet', 'dahlia'];

/* Individual explosion instance */
const FireworkExplosion: React.FC<{ type: FireworkType; colorSet: string[]; id: number }> = ({ type, colorSet, id }) => {
  const renderExplosion = () => {
    switch (type) {
      /* === CHRYSANTHEMUM: many fine rays fanning out evenly === */
      case 'chrysanthemum': {
        const count = 24;
        return [...Array(count)].map((_, i) => {
          const angle = (360 / count) * i;
          const dist = 30 + Math.random() * 25;
          const rad = (angle * Math.PI) / 180;
          const c = colorSet[i % colorSet.length];
          return (
            <motion.div
              key={`chr-${id}-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ width: 2.5, height: 2.5, backgroundColor: c, boxShadow: `0 0 6px ${c}, 0 0 10px ${c}60` }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist + 12, opacity: [1, 1, 0.4, 0], scale: [0.5, 1.3, 0.8, 0] }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        });
      }

      /* === PEONY: big round burst with glowing dots === */
      case 'peony': {
        const count = 16;
        return [...Array(count)].map((_, i) => {
          const angle = (360 / count) * i + (Math.random() - 0.5) * 15;
          const dist = 20 + Math.random() * 35;
          const rad = (angle * Math.PI) / 180;
          const c = colorSet[i % colorSet.length];
          return (
            <motion.div
              key={`peo-${id}-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ width: 4 + Math.random() * 3, height: 4 + Math.random() * 3, backgroundColor: c, boxShadow: `0 0 8px ${c}, 0 0 16px ${c}40` }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist + 18, opacity: [1, 1, 0], scale: [0, 1.5, 0.6] }}
              transition={{ duration: 1.2 + Math.random() * 0.4, ease: 'easeOut' }}
            />
          );
        });
      }

      /* === WILLOW: long droopy trails falling down like a willow tree === */
      case 'willow': {
        const count = 12;
        return [...Array(count)].map((_, i) => {
          const angle = (360 / count) * i;
          const rad = (angle * Math.PI) / 180;
          const c = colorSet[i % colorSet.length];
          return (
            <motion.div
              key={`wil-${id}-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ width: 2, height: 2, backgroundColor: c, boxShadow: `0 0 5px ${c}` }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos(rad) * 22, y: [Math.sin(rad) * 18, Math.sin(rad) * 18 + 55], opacity: [1, 0.9, 0.5, 0] }}
              transition={{ duration: 2.2, ease: [0.33, 1, 0.68, 1] }}
            />
          );
        });
      }

      /* === PALM: few thick rays that curve outward then fall === */
      case 'palm': {
        const count = 6;
        return (
          <>
            {[...Array(count)].map((_, i) => {
              const angle = (360 / count) * i - 90;
              const rad = (angle * Math.PI) / 180;
              const c = colorSet[i % colorSet.length];
              const dist = 35 + Math.random() * 15;
              return (
                <motion.div
                  key={`plm-${id}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 5, height: 5, backgroundColor: c, boxShadow: `0 0 10px ${c}, 0 0 20px ${c}30` }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ x: Math.cos(rad) * dist, y: [Math.sin(rad) * dist, Math.sin(rad) * dist + 40], opacity: [1, 1, 0.3, 0], scale: [0, 1.8, 1, 0.3] }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
            {/* Secondary spark rain */}
            {[...Array(10)].map((_, i) => {
              const c = colorSet[(i + 2) % colorSet.length];
              return (
                <motion.div
                  key={`plm-rain-${id}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 1.5, height: 1.5, backgroundColor: c }}
                  initial={{ x: (Math.random() - 0.5) * 20, y: -5, opacity: 0 }}
                  animate={{ x: (Math.random() - 0.5) * 50, y: [0, 40 + Math.random() * 30], opacity: [0, 1, 0.5, 0] }}
                  transition={{ duration: 1.5, delay: 0.5 + Math.random() * 0.3, ease: 'easeOut' }}
                />
              );
            })}
          </>
        );
      }

      /* === CROSSETTE: bursts that split into secondary bursts === */
      case 'crossette': {
        const primary = 8;
        return (
          <>
            {[...Array(primary)].map((_, i) => {
              const angle = (360 / primary) * i;
              const rad = (angle * Math.PI) / 180;
              const dist = 25;
              const c = colorSet[i % colorSet.length];
              return (
                <React.Fragment key={`cross-${id}-${i}`}>
                  <motion.div
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{ width: 3, height: 3, backgroundColor: c, boxShadow: `0 0 6px ${c}` }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Secondary split */}
                  {[0, 90, 180, 270].map((subAngle, j) => {
                    const sRad = ((angle + subAngle) * Math.PI) / 180;
                    return (
                      <motion.div
                        key={`cross-sub-${id}-${i}-${j}`}
                        className="absolute left-1/2 top-1/2 rounded-full"
                        style={{ width: 2, height: 2, backgroundColor: c, boxShadow: `0 0 4px ${c}` }}
                        initial={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: 0 }}
                        animate={{ x: Math.cos(rad) * dist + Math.cos(sRad) * 15, y: Math.sin(rad) * dist + Math.sin(sRad) * 15, opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </>
        );
      }

      /* === RING: expanding circle of evenly-spaced dots === */
      case 'ring': {
        const count = 20;
        return (
          <>
            {[...Array(count)].map((_, i) => {
              const angle = (360 / count) * i;
              const rad = (angle * Math.PI) / 180;
              const c = colorSet[i % colorSet.length];
              return (
                <motion.div
                  key={`ring-${id}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 3, height: 3, backgroundColor: c, boxShadow: `0 0 6px ${c}` }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x: Math.cos(rad) * 30, y: Math.sin(rad) * 30, opacity: [0, 1, 1, 0], scale: [0, 1, 1.2, 0.5] }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
            {/* Inner ring */}
            {[...Array(count)].map((_, i) => {
              const angle = (360 / count) * i + 9;
              const rad = (angle * Math.PI) / 180;
              const c = colorSet[(i + 3) % colorSet.length];
              return (
                <motion.div
                  key={`ring-in-${id}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 2, height: 2, backgroundColor: c, boxShadow: `0 0 4px ${c}` }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: Math.cos(rad) * 16, y: Math.sin(rad) * 16, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </>
        );
      }

      /* === COMET: single bright trail that arcs upward then rains sparks === */
      case 'comet': {
        const c = colorSet[0];
        return (
          <>
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ width: 6, height: 6, backgroundColor: '#FFF', boxShadow: `0 0 12px ${c}, 0 0 24px ${c}60` }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: [0, 15, 5], y: [0, -35, -20], opacity: [1, 1, 0], scale: [1, 1.5, 0] }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            {[...Array(14)].map((_, i) => {
              const cc = colorSet[i % colorSet.length];
              return (
                <motion.div
                  key={`comet-sp-${id}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 2, height: 2, backgroundColor: cc, boxShadow: `0 0 4px ${cc}` }}
                  initial={{ x: 10, y: -25, opacity: 0 }}
                  animate={{ x: 10 + (Math.random() - 0.5) * 40, y: [-25, -25 + 20 + Math.random() * 40], opacity: [0, 1, 0.5, 0] }}
                  transition={{ duration: 1.4, delay: 0.6 + Math.random() * 0.3, ease: 'easeOut' }}
                />
              );
            })}
          </>
        );
      }

      /* === DAHLIA: layered star-shaped burst === */
      case 'dahlia': {
        const layers = [
          { count: 5, dist: 35, size: 4, delay: 0 },
          { count: 5, dist: 22, size: 3, delay: 0.1 },
          { count: 10, dist: 15, size: 2, delay: 0.2 },
        ];
        return (
          <>
            {layers.map((layer, li) =>
              [...Array(layer.count)].map((_, i) => {
                const angle = (360 / layer.count) * i + li * 18;
                const rad = (angle * Math.PI) / 180;
                const c = colorSet[(i + li * 2) % colorSet.length];
                return (
                  <motion.div
                    key={`dah-${id}-${li}-${i}`}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{ width: layer.size, height: layer.size, backgroundColor: c, boxShadow: `0 0 ${layer.size * 2}px ${c}` }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ x: Math.cos(rad) * layer.dist, y: Math.sin(rad) * layer.dist + 8, opacity: [0, 1, 1, 0], scale: [0, 1.4, 1, 0.3] }}
                    transition={{ duration: 1.3, delay: layer.delay, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })
            )}
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ bottom: '90px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Central flash */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, #FFF 0%, ${colorSet[0]} 30%, transparent 70%)` }}
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: [0, 40, 20], height: [0, 40, 20], opacity: [1, 0.7, 0] }}
        transition={{ duration: 0.5 }}
      />
      {renderExplosion()}
    </motion.div>
  );
};

/* Main Bombarda component with continuous firing */
const BombardaSVG: React.FC<{ side: 'left' | 'right'; active: boolean; delay?: number }> = ({ side, active, delay = 0 }) => {
  const [phase, setPhase] = useState<'idle' | 'launch' | 'explode'>('idle');
  const [shotCount, setShotCount] = useState(0);
  const [currentType, setCurrentType] = useState<FireworkType>('chrysanthemum');
  const [currentColors, setCurrentColors] = useState<string[]>(BURST_COLORS.slice(0, 4));
  const trailSparks = 6;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const pickRandomFirework = useCallback(() => {
    const type = FIREWORK_TYPES[Math.floor(Math.random() * FIREWORK_TYPES.length)];
    // Pick a random palette of 3-5 colors
    const shuffled = [...BURST_COLORS].sort(() => Math.random() - 0.5);
    const colors = shuffled.slice(0, 3 + Math.floor(Math.random() * 3));
    setCurrentType(type);
    setCurrentColors(colors);
  }, []);

  const fireSingle = useCallback(() => {
    pickRandomFirework();
    setPhase('launch');
    const t = setTimeout(() => {
      setPhase('explode');
      setShotCount(c => c + 1);
      const t2 = setTimeout(() => setPhase('idle'), 2200);
      timeoutsRef.current.push(t2);
    }, 700);
    timeoutsRef.current.push(t);
  }, [pickRandomFirework]);

  useEffect(() => {
    if (active) {
      // Initial delayed fire
      const initT = setTimeout(() => fireSingle(), delay * 1000);
      timeoutsRef.current.push(initT);

      // Then fire every 3 seconds continuously
      intervalRef.current = setInterval(() => {
        fireSingle();
      }, 3000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        timeoutsRef.current.forEach(t => clearTimeout(t));
        timeoutsRef.current = [];
      };
    } else {
      setPhase('idle');
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
    }
  }, [active, delay, fireSingle]);

  const offsetX = side === 'left' ? 'left-2 md:left-8' : 'right-2 md:right-8';

  return (
    <div className={`absolute ${offsetX} bottom-0 z-10 w-16 h-32 pointer-events-none`}>
      {/* === MORTAR TUBE (base) === */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width="28" height="36" viewBox="0 0 28 36" fill="none"
      >
        <rect x="8" y="6" width="12" height="28" rx="3" fill="#1B3A91" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
        <rect x="6" y="4" width="16" height="5" rx="2.5" fill="#0F2847" stroke="#5A7FB5" strokeWidth="0.5" strokeOpacity="0.3" />
        <rect x="8" y="14" width="12" height="1.5" rx="0.5" fill="#E85D2A" opacity="0.6" />
        <rect x="8" y="22" width="12" height="1.5" rx="0.5" fill="#F4B942" opacity="0.4" />
        <rect x="4" y="30" width="20" height="6" rx="2" fill="#0C1B2E" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />
        {/* Fuse spark at top */}
        {phase === 'launch' && (
          <>
            <motion.circle cx="14" cy="5" r="2" fill="#FFF"
              animate={{ opacity: [1, 0.3, 1], r: [1.5, 3, 1.5] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
            <motion.circle cx="14" cy="5" r="4" fill="#F4B942" opacity={0.4}
              animate={{ opacity: [0.4, 0.1, 0.4], r: [3, 5, 3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </>
        )}
        {/* Muzzle flash on fire */}
        {phase === 'launch' && (
          <motion.ellipse
            cx="14" cy="3" rx="8" ry="4"
            fill="url(#muzzleGrad)"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        )}
        <defs>
          <radialGradient id="muzzleGrad">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="40%" stopColor="#F4B942" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* === SHELL PROJECTILE (flies up) === */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-8"
        key={`shell-${shotCount}`}
        initial={{ y: 0, opacity: 0 }}
        animate={phase === 'launch' ? { y: [0, -60, -90], opacity: [1, 1, 0] } : { y: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0, 0.67, 0] }}
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <ellipse cx="5" cy="7" rx="4" ry="6" fill={currentColors[0]} />
          <ellipse cx="5" cy="5" rx="2.5" ry="3" fill={currentColors[1] || '#F4B942'} opacity="0.6" />
          <circle cx="5" cy="4" r="1.5" fill="#FFF" opacity="0.5" />
        </svg>
        {phase === 'launch' && [...Array(trailSparks)].map((_, i) => (
          <motion.div
            key={`trail-${shotCount}-${i}`}
            className="absolute left-1/2 top-3 rounded-full"
            style={{ width: 2 + Math.random() * 2, height: 2 + Math.random() * 2, backgroundColor: currentColors[i % currentColors.length] }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: (Math.random() - 0.5) * 12, y: [0, 10 + i * 6], opacity: [0.9, 0], scale: [1, 0.3] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.06 }}
          />
        ))}
      </motion.div>

      {/* === EXPLOSION === */}
      <AnimatePresence>
        {phase === 'explode' && (
          <FireworkExplosion
            key={`explosion-${shotCount}`}
            type={currentType}
            colorSet={currentColors}
            id={shotCount}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ====== SPARKLE STAR SVG ====== */
const SparkleStarSVG: React.FC<{ className?: string; delay?: number; active: boolean }> = ({ className, delay = 0, active }) => (
  <motion.svg
    className={className}
    width="24" height="24" viewBox="0 0 24 24" fill="none"
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={active ? { scale: [0, 1.3, 1], rotate: [0, 180, 360], opacity: [0, 1, 0.8] } : { scale: 0, opacity: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" fill="currentColor" />
  </motion.svg>
);

export const Footer: React.FC = () => {
  const { openModal } = useModal();
  const [showCredit, setShowCredit] = useState(false);
  const creditRef = useRef<HTMLDivElement>(null);

  return (
    <footer id="contact" className="bg-vet-dark text-white relative overflow-hidden z-10">

      {/* === TOP CTA SECTION === */}
      <div className="relative py-28 md:py-36">
        {/* Background ambient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-vet-orange-deep/[0.04] rounded-full blur-[200px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-vet-orange-deep/60 block mb-6">
              Agenda tu visita
            </span>
            <h2 className="font-serif text-display-sm md:text-display text-white mb-6 max-w-3xl mx-auto">
              Listo para{' '}
              <span className="italic text-gradient-animated">visitarnos</span>?
            </h2>
            <p className="text-white/35 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
              Descubre por que somos la clinica veterinaria preferida por las mascotas y sus familias.
            </p>
            <motion.button
              onClick={() => openModal('appointment')}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 bg-white text-vet-dark px-10 py-5 rounded-full text-lg font-medium shadow-elevated overflow-hidden"
            >
              <span className="relative z-10">Agendar Cita Ahora</span>
              <motion.span className="relative z-10">
                <ArrowUpRight size={20} />
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-vet-orange-deep to-vet-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-medium">
                Agendar Cita Ahora
                <ArrowUpRight size={20} />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* === DIVIDER === */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* === INFO GRID === */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group p-8 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.05] hover:border-vet-orange-deep/20 transition-all duration-500 hover:bg-white/[0.05]"
          >
            <div className="w-10 h-10 rounded-xl bg-vet-orange-deep/10 flex items-center justify-center mb-5">
              <MapPin className="text-vet-orange-deep" size={20} />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Ubicacion</h3>
            <p className="text-white/40 font-light text-sm leading-relaxed mb-4">
              URB Jose Carlos Mariategui J3 Lote 37,<br/>
              Nuevo Chimbote, Santa 051
            </p>
            {/* Mapa embebido */}
            <div className="rounded-xl overflow-hidden border border-white/[0.06] aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps?q=URB+Jose+Carlos+Mariategui+J3+Lote+37+Nuevo+Chimbote+Peru&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion CliniVet Buenos Aires"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/URB+Jose+Carlos+Mariategui+J3+Lote+37+Nuevo+Chimbote"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-vet-orange-deep/70 hover:text-vet-orange-deep text-xs font-mono tracking-wider uppercase transition-colors duration-300"
            >
              <span>Abrir en Google Maps</span>
              <ArrowUpRight size={12} />
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group p-8 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.05] hover:border-vet-orange-deep/20 transition-all duration-500 hover:bg-white/[0.05]"
          >
            <div className="w-10 h-10 rounded-xl bg-vet-orange-deep/10 flex items-center justify-center mb-5">
              <Phone className="text-vet-orange-deep" size={20} />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Contacto</h3>
            <div className="space-y-1.5">
              <p><a href="tel:043311341" className="text-white/40 hover:text-vet-orange-deep transition-colors text-sm font-light">(043) 311341</a></p>
              <p><a href="tel:+51914808462" className="text-white/40 hover:text-vet-orange-deep transition-colors text-sm font-light">+51 914 808 462</a></p>
              <p><a href="mailto:clinivetbuenosaires@gmail.com" className="text-white/40 hover:text-vet-orange-deep transition-colors text-sm font-light">clinivetbuenosaires@gmail.com</a></p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group p-8 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.05] hover:border-vet-yellow-deep/20 transition-all duration-500 hover:bg-white/[0.05] md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-green-400">Abierto Ahora</span>
            </div>
            <h3 className="font-serif text-xl text-white mb-4">Horario</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-white/40 font-light">
                <span>Lunes - Sabado</span>
                <span className="font-mono text-white/50">7:00 — 23:00</span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div className="flex justify-between font-light">
                <span className="text-vet-orange-deep/70">Emergencias</span>
                <span className="font-mono text-vet-orange-deep/50">23:00 — 7:00</span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div className="flex justify-between text-white/40 font-light">
                <span>Domingos y Feriados</span>
                <span className="font-mono text-white/50">8:00 — 24:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* === BOTTOM BAR === */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="h-px bg-white/[0.05]" />
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/Imagenes/Logo.jpg"
              alt="CliniVet"
              className="h-10 w-10 rounded-full border border-white/10"
            />
            <div>
              <span className="font-serif text-lg font-bold block leading-none">
                Clini<span className="text-vet-orange-deep">Vet</span>
              </span>
              <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/25">Buenos Aires</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={16} />, href: '#', hoverColor: 'hover:bg-vet-orange-deep/15 hover:text-vet-orange-deep hover:border-vet-orange-deep/20' },
              { icon: <Facebook size={16} />, href: '#', hoverColor: 'hover:bg-vet-blue/15 hover:text-vet-blue-soft hover:border-vet-blue/20' },
              { icon: <Twitter size={16} />, href: '#', hoverColor: 'hover:bg-vet-yellow-deep/15 hover:text-vet-yellow-deep hover:border-vet-yellow-deep/20' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className={`w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-white/30 transition-all duration-300 ${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Credit - Spectacular Presentation */}
          <motion.div
            ref={creditRef}
            className="relative w-full md:w-auto flex flex-col items-center gap-3 py-4 px-6 md:px-10 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            onViewportEnter={() => {
              setTimeout(() => setShowCredit(true), 300);
            }}
          >
            {/* Confetti Canvas */}
            <ConfettiCanvas active={showCredit} containerRef={creditRef} />

            {/* Bombardas */}
            <BombardaSVG side="left" active={showCredit} delay={0.1} />
            <BombardaSVG side="right" active={showCredit} delay={0.35} />

            {/* Sparkle Stars floating around */}
            <SparkleStarSVG active={showCredit} delay={0.2} className="absolute top-1 left-10 text-vet-yellow-deep w-4 h-4" />
            <SparkleStarSVG active={showCredit} delay={0.5} className="absolute top-0 right-12 text-vet-orange w-3 h-3" />
            <SparkleStarSVG active={showCredit} delay={0.8} className="absolute bottom-2 left-20 text-vet-blue-soft w-3 h-3" />
            <SparkleStarSVG active={showCredit} delay={0.4} className="absolute bottom-1 right-20 text-vet-yellow w-4 h-4" />
            <SparkleStarSVG active={showCredit} delay={1.0} className="absolute top-3 left-1/3 text-vet-orange-deep w-2 h-2" />
            <SparkleStarSVG active={showCredit} delay={0.6} className="absolute top-2 right-1/3 text-vet-yellow-deep w-3 h-3" />

            {/* Glow backdrop */}
            <motion.div
              className="absolute inset-0 rounded-[2rem]"
              initial={{ opacity: 0 }}
              animate={showCredit ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(232,93,42,0.08) 0%, transparent 70%)',
              }}
            />

            {/* MVP text with entrance */}
            <motion.p
              className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase relative z-10"
              initial={{ opacity: 0, y: 10, letterSpacing: '0em' }}
              animate={showCredit ? { opacity: 1, y: 0, letterSpacing: '0.2em' } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              MVP creado para CliniVet Buenos Aires 2026
            </motion.p>

            {/* Main credit badge */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, rotateX: 90 }}
              animate={showCredit ? { scale: 1, rotateX: 0 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
            >
              <motion.a
                href="#"
                className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border-2 overflow-hidden"
                style={{
                  borderImage: 'linear-gradient(135deg, #E85D2A, #F4B942, #E85D2A) 1',
                  borderImageSlice: 1,
                }}
                animate={showCredit ? {
                  boxShadow: [
                    '0 0 20px rgba(232,93,42,0.0)',
                    '0 0 30px rgba(232,93,42,0.3), 0 0 60px rgba(244,185,66,0.15)',
                    '0 0 20px rgba(232,93,42,0.15), 0 0 40px rgba(244,185,66,0.08)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowCredit(false);
                  setTimeout(() => setShowCredit(true), 100);
                }}
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(232,93,42,0.15), rgba(244,185,66,0.1), rgba(232,93,42,0.15))',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                />

                <motion.span
                  animate={showCredit ? { rotate: [0, 15, -15, 10, 0] } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <Sparkles size={14} className="text-vet-orange-deep relative z-10" />
                </motion.span>
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-white/50 relative z-10">
                  by
                </span>
                <motion.span
                  className="font-serif text-base md:text-lg font-bold relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #E85D2A 0%, #F4B942 25%, #F07D4F 50%, #F5C84C 75%, #E85D2A 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  Gacz Developer
                </motion.span>
                <motion.span
                  animate={showCredit ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Code2 size={14} className="text-vet-yellow-deep relative z-10" />
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Animated tagline */}
            <motion.div
              className="flex items-center gap-2 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={showCredit ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              {['C', 'r', 'a', 'f', 't', 'e', 'd'].map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-mono text-[0.5rem] tracking-wider text-white/20"
                  initial={{ y: 10, opacity: 0 }}
                  animate={showCredit ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 1.2 + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
              <span className="font-mono text-[0.5rem] text-white/15 mx-1">with</span>
              <motion.span
                animate={showCredit ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.6, delay: 1.6, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart size={10} className="text-vet-orange-deep/60" fill="currentColor" />
              </motion.span>
              <span className="font-mono text-[0.5rem] text-white/15">&</span>
              <span className="font-mono text-[0.5rem] text-vet-orange-deep/40">code</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
