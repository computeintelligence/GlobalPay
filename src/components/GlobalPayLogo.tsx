import React from 'react';

interface GlobalPayLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  themeMode?: 'light' | 'dark' | 'auto';
  id?: string;
}

export const GlobalPayLogo: React.FC<GlobalPayLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  showText = true,
  id = 'globalpay-brand-logo',
}) => {
  const sizeMap = {
    sm: { height: 28, emblemSize: 28, textSize: 'text-lg sm:text-xl', taglineSize: 'text-[5.5px] sm:text-[6.5px]' },
    md: { height: 38, emblemSize: 38, textSize: 'text-xl sm:text-2xl', taglineSize: 'text-[6px] sm:text-[7.5px]' },
    lg: { height: 50, emblemSize: 52, textSize: 'text-2xl sm:text-3xl', taglineSize: 'text-[7.5px] sm:text-[9px]' },
    xl: { height: 72, emblemSize: 76, textSize: 'text-4xl sm:text-5xl', taglineSize: 'text-[9px] sm:text-[11px]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div id={id} className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem SVG */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.emblemSize}
          height={currentSize.emblemSize}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_12px_rgba(0,102,255,0.25)] transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Globe Gradients */}
            <radialGradient id={`logoGlobeGrad-${id}`} cx="40%" cy="35%" r="60%">
              <stop offset="0%" stop-color="#00D0FF" />
              <stop offset="35%" stop-color="#0066FF" />
              <stop offset="75%" stop-color="#002E8A" />
              <stop offset="100%" stop-color="#021445" />
            </radialGradient>
            
            {/* Swoosh Gradient */}
            <linearGradient id={`logoSwooshGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#005BFF" />
              <stop offset="30%" stop-color="#0099FF" />
              <stop offset="65%" stop-color="#00D2B4" />
              <stop offset="100%" stop-color="#14DF60" />
            </linearGradient>

            {/* Card Gradient */}
            <linearGradient id={`logoCardGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0077FF" />
              <stop offset="100%" stop-color="#00C4D8" />
            </linearGradient>
          </defs>

          {/* Globe Base Sphere */}
          <circle cx="78" cy="80" r="44" fill={`url(#logoGlobeGrad-${id})`} />
          <circle cx="78" cy="80" r="44" stroke="#00E5FF" strokeWidth="1" strokeOpacity="0.4" />

          {/* Continental Shapes */}
          <g fill="#00E5FF" opacity="0.85">
            <path d="M60 52 C65 48, 73 50, 75 56 C77 60, 71 66, 67 68 C61 70, 56 64, 58 58 Z" />
            <path d="M80 46 C89 42, 102 48, 108 58 C104 68, 97 76, 93 84 C89 92, 95 100, 91 108 C87 102, 84 92, 82 84 C78 76, 80 64, 78 56 Z" />
            <path d="M69 82 C74 84, 76 94, 74 104 C70 112, 66 116, 64 108 C62 100, 64 90, 69 82 Z" />
            <path d="M106 102 C111 100, 116 104, 114 110 C110 113, 105 110, 106 102 Z" />
          </g>

          {/* Rear Swoosh Loop (depth) */}
          <path
            d="M45 85 C50 64, 90 48, 124 58"
            stroke={`url(#logoSwooshGrad-${id})`}
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Front Swoosh Loop */}
          <path
            d="M125 58 C138 64, 130 88, 108 102 C75 122, 36 108, 28 96 C22 86, 30 74, 46 84"
            stroke={`url(#logoSwooshGrad-${id})`}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M125 58 C138 64, 130 88, 108 102 C75 122, 36 108, 28 96 C22 86, 30 74, 46 84"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Orbiting Contactless Card */}
          <g transform="translate(116, 44) rotate(22)">
            {/* Card Body */}
            <rect x="0" y="0" width="32" height="20" rx="3.5" fill={`url(#logoCardGrad-${id})`} stroke="#FFFFFF" strokeWidth="1.2" />
            {/* Chip */}
            <rect x="5" y="6" width="6" height="5" rx="1" fill="#FFFFFF" opacity="0.9" />
            {/* Contactless waves */}
            <path d="M22 7 A4 4 0 0 1 22 13" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M25 5.5 A6.5 6.5 0 0 1 25 14.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`font-extrabold tracking-tight leading-none ${currentSize.textSize}`}>
            <span className="text-[#001D5A] dark:text-white transition-colors duration-200">
              Global
            </span>
            <span className="bg-gradient-to-r from-[#0060FF] via-[#00D0C0] to-[#10DF60] bg-clip-text text-transparent">
              Pay
            </span>
          </div>

          {showTagline && (
            <div
              className={`font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#002B7A] dark:text-cyan-400/90 mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap leading-none ${currentSize.taglineSize}`}
            >
              <span>PAY ANYWHERE</span>
              <span className="text-[#00D2B4] font-black">•</span>
              <span>ANYTIME</span>
              <span className="text-[#00D2B4] font-black">•</span>
              <span>GLOBALLY</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
