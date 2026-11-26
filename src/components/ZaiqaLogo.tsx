interface ZaiqaLogoProps {
  size?: number;
  className?: string;
}

export function ZaiqaLogo({ size = 38, className = '' }: ZaiqaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="zj-gold" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDF6E9" />
          <stop offset="30%" stopColor="#F5C451" />
          <stop offset="75%" stopColor="#EAB344" />
          <stop offset="100%" stopColor="#C88220" />
        </linearGradient>
        <linearGradient id="zj-copper" x1="18" y1="28" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E87A3D" />
          <stop offset="55%" stopColor="#D96B27" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
      </defs>

      {/* Outer Warm Plate / Mughal Seal */}
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="#1A0D08"
        stroke="url(#zj-gold)"
        strokeWidth="2.2"
      />
      <circle
        cx="32"
        cy="32"
        r="25.2"
        stroke="#EAB344"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="2.5 2.5"
      />

      {/* Crossed Culinary Spoon & Fork Behind Handi */}
      <g stroke="url(#zj-gold)" strokeLinecap="round" strokeLinejoin="round">
        {/* Spoon (left-top to right-bottom) */}
        <path d="M16.5 16.5L46 46" strokeWidth="2.1" />
        <ellipse
          cx="15.5"
          cy="15.5"
          rx="3.3"
          ry="4.6"
          transform="rotate(-45 15.5 15.5)"
          fill="#2E1910"
          strokeWidth="1.8"
        />
        {/* Fork (right-top to left-bottom) */}
        <path d="M44.5 19.5L18 46" strokeWidth="2.1" />
        <path d="M44.5 19.5L49 15" strokeWidth="1.8" />
        <path d="M42.5 17.5L47 13" strokeWidth="1.6" />
        <path d="M46.5 21.5L51 17" strokeWidth="1.6" />
      </g>

      {/* Rising Aromatic Biryani Steam */}
      <path
        d="M25.5 20.5C24.2 17.5 27.2 15.5 25.8 12.2"
        stroke="#FDF6E9"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <path
        d="M32 18.8C30.4 15.2 33.8 12.8 32.2 9"
        stroke="#F5C451"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38.5 20.5C37.2 17.5 40.2 15.5 38.8 12.2"
        stroke="#FDF6E9"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />

      {/* Slightly Tilted Golden Handi Lid */}
      <g transform="rotate(-7 32 28)">
        <path
          d="M20.5 29C22.2 23.6 26.8 21.5 32 21.5C37.2 21.5 41.8 23.6 43.5 29H20.5Z"
          fill="#2E1910"
          stroke="url(#zj-gold)"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="19.5" r="2.1" fill="#F5C451" stroke="#1A0D08" strokeWidth="0.9" />
      </g>

      {/* Handi / Deg Pot Body */}
      <path
        d="M17.5 32.5H46.5C46.5 41.5 40.8 47.5 32 47.5C23.2 47.5 17.5 41.5 17.5 32.5Z"
        fill="url(#zj-copper)"
        stroke="url(#zj-gold)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Handi Rim & Side Brass Handles */}
      <rect
        x="15.5"
        y="30.5"
        width="33"
        height="3.4"
        rx="1.7"
        fill="url(#zj-gold)"
      />
      <path
        d="M17.5 35.5C14.6 35.5 13.8 38.5 16.5 39.8"
        stroke="#F5C451"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M46.5 35.5C49.4 35.5 50.2 38.5 47.5 39.8"
        stroke="#F5C451"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Cream Gloss Highlight on Handi */}
      <path
        d="M22 37.5C22.5 41.2 24.8 43.2 28.2 44"
        stroke="#FDF6E9"
        strokeOpacity="0.65"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Tandoor Ember / Spice Flame Accent Below Pot */}
      <path
        d="M32 50C33.8 52 35.2 53.5 35.2 55.2C35.2 56.8 33.8 58 32 58C30.2 58 28.8 56.8 28.8 55.2C28.8 53.5 30.2 52 32 50Z"
        fill="#F5C451"
      />
      <circle cx="24" cy="53.5" r="1.1" fill="#EAB344" />
      <circle cx="40" cy="53.5" r="1.1" fill="#EAB344" />
    </svg>
  );
}
