import { useEffect, useRef, useState } from 'react';
import { STAGES } from './data';

// Winding trail across Bikini Bottom (viewBox 800 x 450)
const PTS: [number, number][] = [
  [70, 380], [160, 300], [90, 210], [180, 120], [300, 70], [380, 160], [330, 260],
  [440, 330], [550, 260], [500, 160], [620, 90], [730, 160], [690, 270], [740, 370],
];

const pathD = PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

interface Props {
  solved: number; // stages solved so far
  from?: number; // 0-based index the token starts on (travel mode)
  to?: number; // 0-based index the token moves to (travel mode)
  onDone?: () => void;
}

const TravelMap = ({ solved, from, to, onDone }: Props) => {
  const traveling = from !== undefined && to !== undefined;
  const done = useRef(onDone);
  done.current = onDone;
  const [at, setAt] = useState(traveling ? from! : Math.min(solved, STAGES.length - 1));

  useEffect(() => {
    if (!traveling) return;
    const a = setTimeout(() => setAt(to!), 120);
    const b = setTimeout(() => done.current?.(), 2300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [traveling, to]);

  const [tx, ty] = PTS[Math.min(at, PTS.length - 1)];

  return (
    <svg viewBox="0 0 800 450" className="w-full rounded-2xl border-2 border-white/30 select-none" role="img" aria-label="Map of Bikini Bottom">
      <defs>
        <radialGradient id="seaBg" cx=".5" cy=".4" r=".8">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0c4a6e" />
        </radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#seaBg)" />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={(i * 97) % 800} cy={(i * 61) % 450} r={2 + (i % 3)} fill="#fff" opacity=".18" />
      ))}
      <path d="M0 410 Q200 370 400 410 T800 410 V450 H0Z" fill="#fde68a" opacity=".5" />
      <path d={pathD} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 18" />
      {STAGES.map((s, i) => {
        const [x, y] = PTS[i];
        const done = i < solved;
        return (
          <g key={s.id}>
            <circle cx={x} cy={y} r="26" fill={done ? s.hex : '#0f172a'} stroke={s.hex} strokeWidth="5" opacity={i > solved ? 0.6 : 1} />
            <text x={x} y={y + 1} fontSize="22" textAnchor="middle" dominantBaseline="middle">
              {done ? '✅' : i > solved ? '🔒' : s.emoji}
            </text>
            <text x={x} y={y + 44} fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle" stroke="#0c4a6e" strokeWidth="3" paintOrder="stroke">
              {s.id}. {s.color}
            </text>
          </g>
        );
      })}
      <g style={{ transform: `translate(${tx}px, ${ty - 46}px)`, transition: 'transform 2s ease-in-out' }}>
        <text fontSize="40" textAnchor="middle" className="chroma-bob">
          🧽
        </text>
      </g>
    </svg>
  );
};

export default TravelMap;
