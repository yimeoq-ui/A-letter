import React from 'react';

/**
 * Cute Puffy Hand-Drawn Coquette Ribbon Bow with Heart Center Knot
 * Matches the soft, rounded kawaii ribbon aesthetic of Chiikawa.
 */
export const SatinBowSVG: React.FC<{
  isDark: boolean;
  className?: string;
  size?: number;
}> = ({ isDark, className = '', size = 60 }) => {
  const strokeColor = isDark ? '#4a1222' : '#592e39';
  const mainPink = isDark ? '#e11d48' : '#ff9ebb';
  const deepShade = isDark ? '#9f1239' : '#f2799f';
  const innerFold = isDark ? '#881337' : '#e05c88';
  const highlight = isDark ? '#fda4af' : '#ffe5ee';
  const heartCenter = isDark ? '#ffe4e6' : '#fff0f5';

  return (
    <svg
      width={size}
      height={size * 0.86}
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cute Sparkle Dots Around Bow */}
      <circle cx="14" cy="24" r="2.5" fill={highlight} opacity="0.85" />
      <circle cx="126" cy="24" r="2.5" fill={highlight} opacity="0.85" />

      {/* Left Flowing Ribbon Tail */}
      <path
        d="M62 56 C52 74, 34 90, 22 108 C32 104, 38 105, 42 113 C52 96, 62 78, 68 60 Z"
        fill={deepShade}
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Flowing Ribbon Tail */}
      <path
        d="M78 56 C88 74, 106 90, 118 108 C108 104, 102 105, 98 113 C88 96, 78 78, 72 60 Z"
        fill={deepShade}
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Chubby Puffy Bow Loop */}
      <path
        d="M64 46 C48 16, 12 14, 10 44 C8 72, 44 74, 65 56 Z"
        fill={mainPink}
        stroke={strokeColor}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Inner Ribbon Depth Fold */}
      <path
        d="M58 50 C44 42, 30 46, 26 54 C36 58, 48 56, 59 53 Z"
        fill={innerFold}
        stroke={strokeColor}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Puffy Highlight */}
      <path
        d="M52 36 C38 24, 22 26, 20 38"
        stroke={highlight}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Right Chubby Puffy Bow Loop */}
      <path
        d="M76 46 C92 16, 128 14, 130 44 C132 72, 96 74, 75 56 Z"
        fill={mainPink}
        stroke={strokeColor}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Inner Ribbon Depth Fold */}
      <path
        d="M82 50 C96 42, 110 46, 114 54 C104 58, 92 56, 81 53 Z"
        fill={innerFold}
        stroke={strokeColor}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Puffy Highlight */}
      <path
        d="M88 36 C102 24, 118 26, 120 38"
        stroke={highlight}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Plump Center Ribbon Knot */}
      <ellipse
        cx="70"
        cy="50"
        rx="13"
        ry="14"
        fill={mainPink}
        stroke={strokeColor}
        strokeWidth="3.4"
      />

      {/* Cute Dainty Heart Charm on Center Knot */}
      <path
        d="M70 56 C64 51, 61.5 46, 64.5 43.5 C66.5 41.8, 69 43.5, 70 45.2 C71 43.5, 73.5 41.8, 75.5 43.5 C78.5 46, 76 51, 70 56 Z"
        fill={heartCenter}
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Embossed Wax Seal with Chiikawa Ears Silhouette
 */
export const ChiikawaWaxSeal: React.FC<{ isDark: boolean; className?: string }> = ({
  isDark,
  className = '',
}) => {
  const outerWax = isDark ? '#9f1239' : '#e6678f';
  const innerWax = isDark ? '#881337' : '#d45079';
  const rimHighlight = isDark ? '#fda4af' : '#ffc2d4';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      title="Nhấn để mở thiệp"
    >
      <svg
        width="82"
        height="82"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Organic Wax Seal Outer Scallop */}
        <path
          d="M50 5 C61 4, 68 11, 77 15 C86 19, 93 28, 95 39 C97 50, 93 60, 89 70 C85 80, 77 89, 66 93 C55 97, 44 96, 33 92 C22 88, 13 80, 8 69 C3 58, 4 46, 8 35 C12 24, 20 15, 30 10 C40 5, 43 6, 50 5 Z"
          fill={outerWax}
          stroke={rimHighlight}
          strokeWidth="1.8"
        />
        {/* Inner Embossed Ring */}
        <circle
          cx="50"
          cy="50"
          r="33"
          fill={innerWax}
          stroke={rimHighlight}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        {/* Chiikawa Head & Ears Embossed Silhouette */}
        <path
          d="M36 40 C31 31, 39 25, 44 34 C47 33, 53 33, 56 34 C61 25, 69 31, 64 40 C70 46, 70 59, 62 65 C55 70, 45 70, 38 65 C30 59, 30 46, 36 40 Z"
          fill={rimHighlight}
          fillOpacity="0.28"
          stroke={rimHighlight}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tiny Heart at Center */}
        <path
          d="M50 56 C46 52, 44 48, 46.5 46 C48 44.8, 50 46.5, 50 47.5 C50 46.5, 52 44.8, 53.5 46 C56 48, 54 52, 50 56 Z"
          fill="#fff1f2"
        />
      </svg>
    </div>
  );
};

/**
 * Editorial Pearl & Cute Ribbon Section Divider
 */
export const PearlRibbonDivider: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="flex items-center justify-center gap-3 my-6 select-none" aria-hidden="true">
      <div
        className={`h-px flex-1 max-w-[100px] ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-rose-700/60 to-rose-500/80'
            : 'bg-gradient-to-r from-transparent via-pink-300 to-pink-400'
        }`}
      />
      <span
        className={`w-2 h-2 rounded-full ${
          isDark ? 'bg-rose-400/80' : 'bg-pink-300'
        }`}
      />
      <SatinBowSVG isDark={isDark} size={46} />
      <span
        className={`w-2 h-2 rounded-full ${
          isDark ? 'bg-rose-400/80' : 'bg-pink-300'
        }`}
      />
      <div
        className={`h-px flex-1 max-w-[100px] ${
          isDark
            ? 'bg-gradient-to-l from-transparent via-rose-700/60 to-rose-500/80'
            : 'bg-gradient-to-l from-transparent via-pink-300 to-pink-400'
        }`}
      />
    </div>
  );
};
