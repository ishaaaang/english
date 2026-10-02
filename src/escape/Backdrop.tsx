import type { ReactNode } from 'react';

interface Theme {
  top: string;
  bottom: string;
  floor: string;
  floor2: string;
}

const THEMES: Record<number, Theme> = {
  1: { top: '#7f1d1d', bottom: '#b91c1c', floor: '#78350f', floor2: '#92400e' },
  2: { top: '#38bdf8', bottom: '#bae6fd', floor: '#374151', floor2: '#4b5563' },
  3: { top: '#fde68a', bottom: '#fbbf24', floor: '#b45309', floor2: '#d97706' },
  4: { top: '#14532d', bottom: '#166534', floor: '#365314', floor2: '#3f6212' },
  5: { top: '#1e3a8a', bottom: '#3b82f6', floor: '#1e293b', floor2: '#334155' },
  6: { top: '#2e1065', bottom: '#7e22ce', floor: '#4c1d95', floor2: '#6d28d9' },
  7: { top: '#fbcfe8', bottom: '#f472b6', floor: '#e9d5a1', floor2: '#d6bd7a' },
  8: { top: '#a8d8f0', bottom: '#e0f2fe', floor: '#78350f', floor2: '#92400e' },
  9: { top: '#1f2937', bottom: '#6b7280', floor: '#374151', floor2: '#4b5563' },
  10: { top: '#020617', bottom: '#134e4a', floor: '#1c1917', floor2: '#292524' },
  11: { top: '#e2e8f0', bottom: '#f8fafc', floor: '#cbd5e1', floor2: '#e2e8f0' },
  12: { top: '#422006', bottom: '#a16207', floor: '#713f12', floor2: '#854d0e' },
  13: { top: '#0f172a', bottom: '#334155', floor: '#1e293b', floor2: '#334155' },
  14: { top: '#0f3d3e', bottom: '#115e59', floor: '#431407', floor2: '#7c2d12' },
};

const Bubbles = ({ n = 7 }: { n?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <circle key={i} cx={60 + ((i * 113) % 700)} cy={40 + ((i * 67) % 240)} r={4 + (i % 4) * 3} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
    ))}
  </>
);

const decor = (id: number): ReactNode => {
  switch (id) {
    case 1:
      return (
        <>
          {[130, 400, 670].map((x) => (
            <g key={x}>
              <circle cx={x} cy="110" r="52" fill="#0ea5e9" stroke="#fbbf24" strokeWidth="10" />
              <circle cx={x - 14} cy="96" r="12" fill="#fff" opacity=".35" />
            </g>
          ))}
          <rect x="0" y="230" width="800" height="14" fill="#451a03" />
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={i * 50} y="330" width="50" height="120" fill={i % 2 ? '#7f1d1d' : '#fef3c7'} opacity=".18" />
          ))}
        </>
      );
    case 2:
      return (
        <>
          <circle cx="680" cy="70" r="40" fill="#fde047" />
          <path d="M0 240 L140 200 L260 240 L400 190 L560 240 L800 195 L800 330 L0 330Z" fill="#7dd3fc" opacity=".6" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={20 + i * 100} y="385" width="56" height="9" rx="4" fill="#fde047" />
          ))}
        </>
      );
    case 3:
      return (
        <>
          <circle cx="400" cy="145" r="70" fill="#bae6fd" stroke="#92400e" strokeWidth="12" />
          <path d="M60 330 L60 130 L90 110 L90 330Z" fill="#f59e0b" opacity=".5" />
          <path d="M740 330 L740 130 L710 110 L710 330Z" fill="#f59e0b" opacity=".5" />
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={30 + i * 85} cy={60 + (i % 3) * 25} r="5" fill="#92400e" opacity=".35" />
          ))}
        </>
      );
    case 4:
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={`M${i * 190 - 20} 0 L${i * 190 + 20} 0 L${i * 190 + 20} 330 L${i * 190 - 20} 330Z`} fill="#052e16" opacity=".35" />
          ))}
          {Array.from({ length: 36 }, (_, i) => (
            <circle key={i} cx={10 + (i % 18) * 45} cy={i < 18 ? 14 : 316} r="4" fill="#86efac" opacity=".55" />
          ))}
          <path d="M0 80 Q200 40 400 80 T800 80" stroke="#4ade80" strokeWidth="12" fill="none" opacity=".4" />
          <circle cx="400" cy="160" r="55" fill="#022c22" stroke="#4ade80" strokeWidth="6" opacity=".7" />
        </>
      );
    case 5:
      return (
        <>
          <rect x="40" y="40" width="230" height="270" rx="30" fill="#172554" opacity=".6" />
          <circle cx="155" cy="110" r="42" fill="#60a5fa" opacity=".3" />
          <path d="M520 30 L760 30 L760 300 L520 300Z" fill="#1d4ed8" opacity=".45" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x="535" y={44 + i * 21} width="210" height="9" fill="#93c5fd" opacity=".35" />
          ))}
        </>
      );
    case 6:
      return (
        <>
          {[70, 250, 550, 730].map((x) => (
            <g key={x}>
              <rect x={x - 28} y="30" width="56" height="300" fill="#a855f7" opacity=".55" />
              <rect x={x - 38} y="20" width="76" height="22" fill="#e9d5ff" opacity=".7" />
            </g>
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M${40 + i * 55} ${40 + (i % 3) * 30} l5 12 12 2 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -2z`} fill="#fde047" opacity=".7" />
          ))}
          <path d="M300 330 L500 330 L470 290 L330 290Z" fill="#c084fc" opacity=".5" />
        </>
      );
    case 7:
      return (
        <>
          <path d="M120 330 Q400 -10 680 330Z" fill="#f9a8d4" stroke="#be185d" strokeWidth="8" />
          <ellipse cx="270" cy="230" rx="22" ry="12" fill="#ec4899" opacity=".6" />
          <ellipse cx="500" cy="200" rx="30" ry="14" fill="#ec4899" opacity=".6" />
          <Bubbles n={5} />
          {[60, 740].map((x) => (
            <path key={x} d={`M${x} 330 q-10 -60 10 -90 q10 40 10 90`} fill="#16a34a" />
          ))}
        </>
      );
    case 8:
      return (
        <>
          <path d="M0 330 Q0 0 400 0 Q800 0 800 330" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="6" />
          <rect x="360" y="60" width="80" height="270" fill="#78350f" />
          <circle cx="400" cy="70" r="120" fill="#16a34a" opacity=".85" />
          <circle cx="320" cy="110" r="70" fill="#22c55e" opacity=".85" />
          <circle cx="490" cy="110" r="70" fill="#22c55e" opacity=".85" />
          <Bubbles n={6} />
        </>
      );
    case 9:
      return (
        <>
          <path d="M0 330 L60 190 L100 250 L170 120 L240 260 L300 190 L350 330Z" fill="#374151" />
          <path d="M450 330 L520 160 L580 250 L640 140 L700 240 L760 190 L800 330Z" fill="#374151" />
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={150 + i * 190} cy={150 + (i % 2) * 90} rx="150" ry="34" fill="#d1d5db" opacity=".28" />
          ))}
        </>
      );
    case 10:
      return (
        <>
          <path d="M0 330 L0 60 L800 60 L800 330Z" fill="#0c0a09" opacity=".5" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={i * 90} y="60" width="6" height="270" fill="#44403c" />
          ))}
          <circle cx="400" cy="170" r="160" fill="#34d399" opacity=".14" />
          <circle cx="110" cy="150" r="40" fill="#0f172a" stroke="#6ee7b7" strokeWidth="8" />
          <circle cx="690" cy="150" r="40" fill="#0f172a" stroke="#6ee7b7" strokeWidth="8" />
          <path d="M0 330 Q200 290 400 330 T800 330 L800 360 L0 360Z" fill="#6ee7b7" opacity=".18" />
        </>
      );
    case 11:
      return (
        <>
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={(i % 8) * 100} y={Math.floor(i / 8) * 150} width="100" height="150" fill="none" stroke="#94a3b8" strokeOpacity=".4" />
          ))}
          <rect x="430" y="70" width="180" height="140" fill="#fff" stroke="#475569" strokeWidth="8" rx="6" />
          <path d="M440 90 q60 -14 120 0" stroke="#e2e8f0" strokeWidth="8" fill="none" />
          <path d="M60 330 L60 250 Q60 230 80 230 L110 230 Q130 230 130 250 L130 330Z" fill="#bae6fd" opacity=".6" />
        </>
      );
    case 12:
      return (
        <>
          <path d="M0 0 L120 0 Q80 170 0 330Z" fill="#7f1d1d" />
          <path d="M800 0 L680 0 Q720 170 800 330Z" fill="#7f1d1d" />
          <path d="M400 0 L240 330 L560 330Z" fill="#fde047" opacity=".22" />
          <rect x="60" y="300" width="180" height="30" fill="#92400e" />
          {Array.from({ length: 18 }, (_, i) => (
            <circle key={i} cx={30 + ((i * 97) % 740)} cy={40 + ((i * 53) % 230)} r="3" fill="#fde047" opacity=".8" />
          ))}
        </>
      );
    case 13:
      return (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M0 ${30 + i * 34} H${180 + ((i * 70) % 420)} l24 24 H${420 + ((i * 53) % 380)}`} stroke="#cbd5e1" strokeOpacity=".35" strokeWidth="3" fill="none" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={420 + ((i * 53) % 380)} cy={54 + i * 34} r="6" fill="#e2e8f0" />
          ))}
          <rect x="60" y="30" width="170" height="110" rx="10" fill="#0b1220" stroke="#94a3b8" strokeWidth="6" />
          <rect x="570" y="30" width="170" height="110" rx="10" fill="#0b1220" stroke="#94a3b8" strokeWidth="6" />
        </>
      );
    case 14:
      return (
        <>
          {[60, 250, 550, 740].map((x) => (
            <rect key={x} x={x - 26} y="40" width="52" height="290" fill="#b45309" opacity=".5" />
          ))}
          <path d="M0 40 L800 40 L760 0 L40 0Z" fill="#78350f" />
          <rect x="60" y="300" width="170" height="30" fill="#78350f" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M${20 + i * 100} 330 q10 -40 5 -60`} stroke="#2dd4bf" strokeWidth="5" fill="none" opacity=".6" />
          ))}
        </>
      );
    default:
      return null;
  }
};

const Backdrop = ({ id }: { id: number }) => {
  const t = THEMES[id];
  return (
    <>
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.top} />
          <stop offset="1" stopColor={t.bottom} />
        </linearGradient>
        <pattern id={`fl${id}`} width="80" height="40" patternUnits="userSpaceOnUse">
          <rect width="80" height="40" fill={t.floor} />
          <rect width="40" height="20" fill={t.floor2} />
          <rect x="40" y="20" width="40" height="20" fill={t.floor2} />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={`url(#bg${id})`} />
      {decor(id)}
      <rect y="330" width="800" height="120" fill={`url(#fl${id})`} />
      <rect y="326" width="800" height="8" fill="#000" opacity=".25" />
    </>
  );
};

export default Backdrop;
