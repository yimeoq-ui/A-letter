import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { playPaperRustleShort } from '../utils/soundEffects';

interface SendLoveButtonProps {
  isDark: boolean;
  sfxMuted: boolean;
}

interface FloatingHeartParticle {
  id: number;
  startX: number; // % across viewport or near button
  startY: number; // vh from bottom
  driftX: number;
  riseY: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  strokeColor: string;
}

const LIGHT_HEART_COLORS = [
  { fill: '#ff85a9', stroke: '#592e39' },
  { fill: '#ff9ebb', stroke: '#592e39' },
  { fill: '#f46a97', stroke: '#592e39' },
  { fill: '#ffb8ce', stroke: '#6e2b42' },
  { fill: '#fb7185', stroke: '#592e39' },
];

const DARK_CHERRY_HEART_COLORS = [
  { fill: '#e11d48', stroke: '#ffe4e6' },
  { fill: '#be123c', stroke: '#fda4af' },
  { fill: '#9f1239', stroke: '#fecdd3' },
  { fill: '#f43f5e', stroke: '#ffe4e6' },
  { fill: '#fb7185', stroke: '#881337' },
];

let particleIdCounter = 1;

export const SendLoveButton: React.FC<SendLoveButtonProps> = ({ isDark, sfxMuted }) => {
  const [particles, setParticles] = useState<FloatingHeartParticle[]>([]);
  const [loveCount, setLoveCount] = useState(0);

  const handleSendLove = useCallback(() => {
    playPaperRustleShort(sfxMuted);
    setLoveCount((c) => c + 1);

    const palette = isDark ? DARK_CHERRY_HEART_COLORS : LIGHT_HEART_COLORS;
    const count = 14;
    const batchIds: number[] = [];

    const newParticles: FloatingHeartParticle[] = Array.from({ length: count }, (_, idx) => {
      const id = particleIdCounter++;
      batchIds.push(id);
      const colorChoice = palette[idx % palette.length];
      // Half rise from the bottom-right button area, half shower across the screen
      const fromButton = idx < 6;
      const startX = fromButton
        ? 78 + (Math.random() * 14 - 7)
        : 12 + Math.random() * 76;
      const startY = fromButton
        ? 10 + Math.random() * 6
        : 8 + Math.random() * 25;

      return {
        id,
        startX,
        startY,
        driftX: (Math.random() - 0.5) * 130,
        riseY: -(180 + Math.random() * 260),
        size: 18 + Math.random() * 16,
        rotation: (Math.random() - 0.5) * 50,
        duration: 1.5 + Math.random() * 0.9,
        delay: Math.random() * 0.22,
        color: colorChoice.fill,
        strokeColor: colorChoice.stroke,
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !batchIds.includes(p.id)));
    }, 2700);
  }, [isDark, sfxMuted]);

  return (
    <>
      {/* Full-Screen Floating Heart Shower Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: 0,
                y: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 0.95, 0],
                scale: [0.3, 1.18, 1, 0.75],
                x: p.driftX,
                y: p.riseY,
                rotate: p.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                left: `${p.startX}%`,
                bottom: `${p.startY}%`,
              }}
              className="absolute"
            >
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-sm"
              >
                <path
                  d="M14 24.5 C6 18.5, 3 11.5, 7 6.8 C9.5 4, 12.8 5.8, 14 8 C15.2 5.8, 18.5 4, 21 6.8 C25 11.5, 22 18.5, 14 24.5 Z"
                  fill={p.color}
                  stroke={p.strokeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 9.2 C8.3 10.5, 8.2 12.5, 9 13.8"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating "Send Love" Action Button */}
      <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40">
        <motion.button
          type="button"
          onClick={handleSendLove}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Gửi yêu thương"
          title="Nhấn để thả tim yêu thương"
          className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-lg cursor-pointer select-none transition-colors duration-200 ${
            isDark
              ? 'bg-[#2a0813]/95 border-rose-600/80 text-rose-100 hover:bg-rose-900/95 shadow-rose-950/70'
              : 'bg-white/95 border-pink-300 text-[#6e243b] hover:bg-pink-50 shadow-pink-200/80'
          }`}
        >
          <motion.span
            key={loveCount}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 0.32 }}
            className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isDark ? 'bg-rose-700 text-rose-50' : 'bg-[#f46a97] text-white'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.span>

          <span className="font-ui text-xs sm:text-sm font-medium whitespace-nowrap">
            Gửi yêu thương
          </span>

          {loveCount > 0 && (
            <span
              className={`font-ui text-xs font-semibold tabular-nums pl-0.5 ${
                isDark ? 'text-rose-300' : 'text-[#d14b76]'
              }`}
            >
              · {loveCount}
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
};
