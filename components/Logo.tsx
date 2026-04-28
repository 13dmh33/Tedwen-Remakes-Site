interface LogoProps { size?: number; variant?: "light" | "dark"; className?: string; }
export default function Logo({ size = 200, variant = "light", className = "" }: LogoProps) {
  const fg = variant === "light" ? "#FFFFFF" : "#000000";
  const bg = variant === "light" ? "#1C1C1C" : "#FFFFFF";
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Tedwen Remakes LLC logo">
      <defs>
        <path id="topArc" d="M 22 100 A 78 78 0 0 1 178 100" fill="none" />
        <path id="bottomArc" d="M 24 108 A 76 76 0 0 0 176 108" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="99" fill={bg} />
      <circle cx="100" cy="100" r="95" fill="none" stroke={fg} strokeWidth="5" />
      <circle cx="100" cy="100" r="63" fill="none" stroke={fg} strokeWidth="2" />
      <text fontFamily="'Arial Black', Arial, sans-serif" fontSize="19" fontWeight="900" fill={fg} letterSpacing="5">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">TEDWEN</textPath>
      </text>
      <text fontFamily="'Arial Black', Arial, sans-serif" fontSize="13" fontWeight="900" fill={fg} letterSpacing="3">
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">REMAKES LLC</textPath>
      </text>
      <polygon points="66,77 80,131 100,101 120,131 134,77 127,77 113,123 100,93 87,123 73,77" fill={fg} />
      <rect x="63" y="77" width="74" height="12" fill={bg} />
      <rect x="94" y="77" width="12" height="57" fill={bg} />
      <rect x="63" y="77" width="74" height="12" fill={fg} />
      <rect x="94" y="89" width="12" height="45" fill={fg} />
    </svg>
  );
}
