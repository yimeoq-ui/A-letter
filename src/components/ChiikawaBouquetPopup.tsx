import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChiikawaBouquetPopupProps {
  triggerKey: number; // Incrementing > 0 triggers the 2.5s popup
  isDark: boolean;
  onComplete?: () => void;
}

/**
 * Hand-crafted Nagano-style flower bouquet SVG designed with the exact warm
 * charcoal-brown marker linework (#382A27), soft pastel fills, and round
 * Chiikawa paws clasping the bouquet wrap so it seamlessly integrates with
 * the official transparent Chiikawa character art.
 */
const NaganoFlowerBouquetSVG: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const strokeColor = '#382A27';
  const wrapFill = isDark ? '#F4ACB7' : '#FFE3EC';
  const wrapInner = isDark ? '#FFE5EC' : '#FFF5F8';
  const ribbonColor = isDark ? '#E11D48' : '#F46A97';

  return (
    <svg
      viewBox="0 0 260 230"
      className="w-full h-full overflow-visible drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back Leaf Sprigs & Stems (Bloom outward) */}
      <motion.g
        initial={{ scale: 0.3, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.08 }}
        style={{ transformOrigin: '130px 155px' }}
      >
        {/* Left eucalyptus leaves */}
        <path
          d="M95 125 C68 102, 52 78, 46 54"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse
          cx="58"
          cy="76"
          rx="14"
          ry="9"
          transform="rotate(-32 58 76)"
          fill="#B8E0B8"
          stroke={strokeColor}
          strokeWidth="3.8"
        />
        <ellipse
          cx="46"
          cy="54"
          rx="13"
          ry="8.5"
          transform="rotate(-18 46 54)"
          fill="#C7E9C0"
          stroke={strokeColor}
          strokeWidth="3.8"
        />

        {/* Right eucalyptus leaves */}
        <path
          d="M165 125 C192 102, 208 78, 214 54"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse
          cx="202"
          cy="76"
          rx="14"
          ry="9"
          transform="rotate(32 202 76)"
          fill="#B8E0B8"
          stroke={strokeColor}
          strokeWidth="3.8"
        />
        <ellipse
          cx="214"
          cy="54"
          rx="13"
          ry="8.5"
          transform="rotate(18 214 54)"
          fill="#C7E9C0"
          stroke={strokeColor}
          strokeWidth="3.8"
        />

        {/* Center top leaf */}
        <ellipse
          cx="130"
          cy="38"
          rx="11"
          ry="16"
          fill="#C7E9C0"
          stroke={strokeColor}
          strokeWidth="3.8"
        />
      </motion.g>

      {/* Bouquet Paper Cone Back Layer */}
      <path
        d="M66 105 C62 84, 198 84, 194 105 L155 194 C146 205, 114 205, 105 194 Z"
        fill={wrapInner}
        stroke={strokeColor}
        strokeWidth="4.2"
        strokeLinejoin="round"
      />

      {/* Blooming Flowers Cluster ("Bó hoa bung ra") */}
      {/* 1. Left Pastel Rose / Camellia */}
      <motion.g
        initial={{ scale: 0, rotate: -35, y: 30 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 14, delay: 0.12 }}
        style={{ transformOrigin: '82px 86px' }}
      >
        <circle cx="72" cy="78" r="16" fill="#FF9EBB" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="92" cy="74" r="15" fill="#FF9EBB" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="68" cy="96" r="15" fill="#FF9EBB" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="90" cy="96" r="15" fill="#FF9EBB" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="81" cy="86" r="18" fill="#FFB8CE" stroke={strokeColor} strokeWidth="3.8" />
        {/* Nagano-style spiral rose center */}
        <path
          d="M76 84 C79 79, 86 80, 86 86 C86 91, 77 92, 74 86"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* 2. Right Pastel Yellow-Cream Daisy Flower */}
      <motion.g
        initial={{ scale: 0, rotate: 35, y: 30 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 14, delay: 0.16 }}
        style={{ transformOrigin: '178px 86px' }}
      >
        <circle cx="168" cy="74" r="14" fill="#FFF3B0" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="188" cy="76" r="14" fill="#FFF3B0" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="166" cy="94" r="14" fill="#FFF3B0" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="188" cy="95" r="14" fill="#FFF3B0" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="178" cy="85" r="11" fill="#FF9F68" stroke={strokeColor} strokeWidth="3.8" />
      </motion.g>

      {/* 3. Top Left Pink Tulip */}
      <motion.g
        initial={{ scale: 0, y: 35 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 13, delay: 0.2 }}
        style={{ transformOrigin: '104px 58px' }}
      >
        <path
          d="M88 64 C84 42, 96 34, 100 46 C104 32, 112 32, 114 46 C120 34, 128 44, 122 64 C116 76, 94 76, 88 64 Z"
          fill="#FF7AA2"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* 4. Top Right Soft Lavender-Pink Blossom */}
      <motion.g
        initial={{ scale: 0, y: 35 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 13, delay: 0.22 }}
        style={{ transformOrigin: '156px 58px' }}
      >
        <circle cx="147" cy="48" r="13" fill="#FBCFE8" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="165" cy="48" r="13" fill="#FBCFE8" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="145" cy="64" r="13" fill="#FBCFE8" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="166" cy="64" r="13" fill="#FBCFE8" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="156" cy="56" r="10" fill="#FDE047" stroke={strokeColor} strokeWidth="3.6" />
      </motion.g>

      {/* 5. Center Hero Cherry-Pink Rose Blossom */}
      <motion.g
        initial={{ scale: 0, y: 25 }}
        animate={{ scale: [0, 1.18, 1], y: 0 }}
        transition={{ duration: 0.48, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '130px 76px' }}
      >
        <circle cx="116" cy="64" r="16" fill="#FF85A9" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="144" cy="64" r="16" fill="#FF85A9" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="112" cy="86" r="16" fill="#FF85A9" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="148" cy="86" r="16" fill="#FF85A9" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="130" cy="94" r="16" fill="#FF85A9" stroke={strokeColor} strokeWidth="3.8" />
        <circle cx="130" cy="76" r="20" fill="#FFA6C1" stroke={strokeColor} strokeWidth="4" />
        <path
          d="M123 74 C126 67, 136 68, 136 75 C136 82, 124 83, 121 76 C119 71, 124 65, 131 65"
          stroke={strokeColor}
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Baby's Breath Little White Buds Popping Out */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.35 }}
        style={{ transformOrigin: '130px 70px' }}
      >
        <circle cx="62" cy="46" r="6.5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="3.2" />
        <circle cx="75" cy="34" r="5.5" fill="#FFF0F5" stroke={strokeColor} strokeWidth="3.2" />
        <circle cx="130" cy="24" r="6.5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="3.2" />
        <circle cx="185" cy="34" r="5.5" fill="#FFF0F5" stroke={strokeColor} strokeWidth="3.2" />
        <circle cx="198" cy="46" r="6.5" fill="#FFFFFF" stroke={strokeColor} strokeWidth="3.2" />
      </motion.g>

      {/* Bouquet Wrapping Paper Front Fold (Coquette Ruffled Cone) */}
      <path
        d="M64 102 C86 118, 112 118, 130 108 C148 118, 174 118, 196 102 L162 192 C154 206, 106 206, 98 192 Z"
        fill={wrapFill}
        stroke={strokeColor}
        strokeWidth="4.2"
        strokeLinejoin="round"
      />
      {/* Delicate Wrap Fold Lines */}
      <path
        d="M130 108 L124 196 M130 108 L138 196"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Coquette Satin Bow on the Bouquet Wrapper */}
      <g>
        {/* Bow Loops */}
        <path
          d="M130 150 C106 130, 88 144, 100 162 C108 170, 122 160, 130 150 Z"
          fill={ribbonColor}
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path
          d="M130 150 C154 130, 172 144, 160 162 C152 170, 138 160, 130 150 Z"
          fill={ribbonColor}
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Bow Tails */}
        <path
          d="M126 154 C116 172, 108 188, 102 204"
          stroke={ribbonColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M126 154 C116 172, 108 188, 102 204"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M134 154 C144 172, 152 188, 158 204"
          stroke={ribbonColor}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M134 154 C144 172, 152 188, 158 204"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Bow Knot Center */}
        <circle
          cx="130"
          cy="150"
          r="8.5"
          fill={ribbonColor}
          stroke={strokeColor}
          strokeWidth="3.8"
        />
      </g>

      {/* Official-style round white Chiikawa paws holding the bouquet wrapper */}
      <ellipse
        cx="90"
        cy="142"
        rx="16"
        ry="12.5"
        transform="rotate(20 90 142)"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth="4.2"
      />
      <ellipse
        cx="170"
        cy="142"
        rx="16"
        ry="12.5"
        transform="rotate(-20 170 142)"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth="4.2"
      />
    </svg>
  );
};

const BURST_PETALS = [
  { id: 1, x: -135, y: -115, rot: -45, delay: 0.1, color: '#FF9EBB' },
  { id: 2, x: 140, y: -110, rot: 40, delay: 0.12, color: '#FFB8CE' },
  { id: 3, x: -165, y: -25, rot: -80, delay: 0.15, color: '#F48FB1' },
  { id: 4, x: 165, y: -20, rot: 75, delay: 0.16, color: '#FF7AA2' },
  { id: 5, x: -95, y: -155, rot: -20, delay: 0.18, color: '#FFD1DC' },
  { id: 6, x: 100, y: -150, rot: 25, delay: 0.2, color: '#FF9EBB' },
  { id: 7, x: 0, y: -175, rot: 12, delay: 0.14, color: '#FB7185' },
  { id: 8, x: -120, y: 65, rot: -110, delay: 0.22, color: '#FBCFE8' },
  { id: 9, x: 125, y: 60, rot: 105, delay: 0.24, color: '#FDA4AF' },
];

export const ChiikawaBouquetPopup: React.FC<ChiikawaBouquetPopupProps> = ({
  triggerKey,
  isDark,
  onComplete,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (triggerKey <= 0) return;
    setVisible(true);

    // Show for 5 seconds (5000ms) then disappear as requested
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`chiikawa-popup-${triggerKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.42, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
        >
          {/* Soft radial glow behind Chiikawa */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-3xl ${
              isDark
                ? 'bg-gradient-to-tr from-rose-900/65 via-pink-700/40 to-red-950/30'
                : 'bg-gradient-to-tr from-pink-200/85 via-rose-100/80 to-white/60'
            }`}
          />

          {/* Main Pop-up Character + Blooming Bouquet Container */}
          <motion.div
            initial={{ scale: 0.35, y: 70, opacity: 0 }}
            animate={{
              scale: [0.35, 1.06, 1],
              y: [70, -8, 0],
              opacity: 1,
            }}
            exit={{
              scale: 0.82,
              y: -30,
              opacity: 0,
              transition: { duration: 0.38, ease: 'easeIn' },
            }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Bursting Flower Petals & Hearts around Chiikawa when Bouquet Blooms */}
            {BURST_PETALS.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{ x: 0, y: 20, scale: 0, rotate: 0, opacity: 0 }}
                animate={{
                  x: petal.x,
                  y: petal.y,
                  scale: [0, 1.25, 1],
                  rotate: petal.rot,
                  opacity: [0, 1, 0.9, 0],
                }}
                transition={{
                  duration: 2.1,
                  delay: petal.delay,
                  ease: 'easeOut',
                }}
                className="absolute z-30"
              >
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 24 C6 18, 4 9, 9 5 C11.5 3, 14 6, 14 7.5 C14 6, 16.5 3, 19 5 C24 9, 22 18, 14 24 Z"
                    fill={petal.color}
                    stroke="#382A27"
                    strokeWidth="2.2"
                  />
                </svg>
              </motion.div>
            ))}

            {/* Official Transparent Chiikawa Character + Composited Nagano-Style Bouquet in Hands */}
            <div className="relative w-64 h-64 sm:w-76 sm:h-76 flex items-center justify-center select-none">
              {/* Official Nagano Chiikawa Transparent PNG */}
              <motion.img
                src="/chiikawa/chiikawa_smile.png"
                alt="Chiikawa"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(190,24,93,0.22)]"
                animate={{
                  rotate: [0, -2, 2, -1, 0],
                }}
                transition={{
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
              />

              {/* Bouquet Composited Directly Into Chiikawa's Paws */}
              <motion.div
                initial={{ scale: 0.2, y: 24, opacity: 0 }}
                animate={{
                  scale: [0.2, 1.14, 1],
                  y: [24, -4, 0],
                  opacity: 1,
                }}
                transition={{
                  duration: 0.52,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-36 h-32 sm:w-44 sm:h-38 z-20"
              >
                <NaganoFlowerBouquetSVG isDark={isDark} />
              </motion.div>
            </div>

            {/* Greeting Ribbon Banner Underneath */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className={`mt-2 px-6 py-2 rounded-full border shadow-lg backdrop-blur-md text-center ${
                isDark
                  ? 'bg-[#260912]/95 border-rose-700/60 text-rose-100 shadow-rose-950/60'
                  : 'bg-white/95 border-pink-300 text-[#6e2b42] shadow-pink-200/70'
              }`}
            >
              <p className="font-script text-xl sm:text-2xl tracking-wide">
                Chúc mừng ngày Phụ nữ Việt Nam 20/10!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
