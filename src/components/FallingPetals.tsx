import React, { useEffect, useRef } from 'react';

interface FallingPetalsProps {
  isDark: boolean;
  enabled: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  color: string;
  innerColor: string;
  opacity: number;
}

const LIGHT_PETAL_PALETTE = [
  { main: '#ffb7c5', inner: '#ffe4ec' },
  { main: '#f48fb1', inner: '#ffd0e0' },
  { main: '#ffc1d3', inner: '#fff0f5' },
  { main: '#f8a5c2', inner: '#fde2eb' },
  { main: '#fda4af', inner: '#ffe4e6' },
];

const DARK_CHERRY_PETAL_PALETTE = [
  { main: '#be123c', inner: '#fb7185' },
  { main: '#9f1239', inner: '#e11d48' },
  { main: '#881337', inner: '#f43f5e' },
  { main: '#e11d48', inner: '#fda4af' },
  { main: '#4c0519', inner: '#9f1239' },
];

export const FallingPetals: React.FC<FallingPetalsProps> = ({ isDark, enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const palette = isDark ? DARK_CHERRY_PETAL_PALETTE : LIGHT_PETAL_PALETTE;
    const petalCount = Math.min(46, Math.max(24, Math.floor(width / 32)));

    const createPetal = (initialY?: number): Petal => {
      const colorPair = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -20 - Math.random() * 120,
        size: 9 + Math.random() * 11,
        speedY: 0.75 + Math.random() * 1.15,
        speedX: -0.35 + Math.random() * 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.015 + Math.random() * 0.025,
        swayAmplitude: 0.6 + Math.random() * 1.2,
        swayFrequency: 0.008 + Math.random() * 0.014,
        swayOffset: Math.random() * Math.PI * 2,
        color: colorPair.main,
        innerColor: colorPair.inner,
        opacity: isDark ? 0.55 + Math.random() * 0.35 : 0.62 + Math.random() * 0.32,
      };
    };

    const petals: Petal[] = Array.from({ length: petalCount }, () =>
      createPetal(Math.random() * height)
    );

    let tick = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Simulate 3D petal flutter via scaleY
      const scaleY = 0.42 + 0.58 * Math.abs(Math.cos(p.flip));
      ctx.scale(1, scaleY);
      ctx.globalAlpha = p.opacity;

      const s = p.size;
      const grad = ctx.createRadialGradient(0, -s * 0.2, s * 0.1, 0, 0, s);
      grad.addColorStop(0, p.innerColor);
      grad.addColorStop(1, p.color);

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Heart-notched sakura / rose petal silhouette
      ctx.moveTo(0, s * 0.75);
      ctx.bezierCurveTo(-s * 0.85, s * 0.3, -s * 0.9, -s * 0.55, -s * 0.22, -s * 0.85);
      ctx.lineTo(0, -s * 0.58);
      ctx.lineTo(s * 0.22, -s * 0.85);
      ctx.bezierCurveTo(s * 0.9, -s * 0.55, s * 0.85, s * 0.3, 0, s * 0.75);
      ctx.closePath();
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = isDark ? 'rgba(255, 228, 230, 0.16)' : 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.55);
      ctx.quadraticCurveTo(s * 0.08, 0, 0, -s * 0.45);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 30) {
          Object.assign(p, createPetal(-25));
        }
        if (p.x > width + 30) p.x = -25;
        if (p.x < -30) p.x = width + 25;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
