import { useState } from 'react';
import Backdrop from './Backdrop';
import { ROOMS } from './rooms';
import type { Stage } from './data';

interface Props {
  stage: Stage;
  found: string[];
  pulse: boolean;
  interactive?: boolean;
  onInspect: (propId: string) => void;
}

// The story takes place over one day: morning light early on, night by the vault.
export const clockLabel = (id: number) => {
  const mins = 7 * 60 + 30 + Math.round(((id - 1) / 13) * (22 * 60 - (7 * 60 + 30)));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const icon = h < 11 ? '🌅' : h < 17 ? '☀️' : h < 20 ? '🌇' : '🌙';
  return `${icon} ${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};

const tint = (id: number) => {
  const t = (id - 1) / 13;
  if (t < 0.25) return { c: '#fde68a', o: 0.1 - t * 0.2 };
  if (t < 0.55) return { c: '#fff', o: 0 };
  if (t < 0.8) return { c: '#fb923c', o: 0.12 + (t - 0.55) * 0.5 };
  return { c: '#1e1b4b', o: 0.25 + (t - 0.8) * 1.6 };
};

const RoomScene = ({ stage, found, pulse, interactive = true, onInspect }: Props) => {
  const tn = tint(stage.id);
  const room = ROOMS[stage.id];
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: stage.hex }}>
      <svg viewBox="0 0 800 450" className="w-full block select-none" role="img" aria-label={`${stage.location}: click the objects to investigate`}>
        <Backdrop id={stage.id} />
        <rect width="800" height="450" fill={tn.c} opacity={tn.o} pointerEvents="none" />
        {stage.id >= 10 &&
          Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={30 + ((i * 131) % 760)} cy={16 + ((i * 29) % 70)} r="2" fill="#fff" opacity=".7" pointerEvents="none" />
          ))}

        {room.cast.map((c) => (
          <g key={c.who} className="chroma-bob" style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
            <ellipse cx={c.x} cy={c.y + c.size * 0.45} rx={c.size * 0.45} ry="9" fill="#000" opacity=".25" />
            <text x={c.x} y={c.y} fontSize={c.size} textAnchor="middle" dominantBaseline="middle">
              {c.emoji}
            </text>
            <text x={c.x} y={c.y + c.size * 0.72} fontSize="15" fontWeight="700" textAnchor="middle" fill="#fff" stroke="#000" strokeWidth="3" paintOrder="stroke">
              {c.who}
            </text>
          </g>
        ))}

        {room.props.map((p) => {
          const seen = found.includes(p.id);
          const active = focus === p.id;
          return (
            <g
              key={p.id}
              role="button"
              style={{ cursor: interactive ? 'pointer' : 'default' }}
              tabIndex={interactive ? 0 : -1}
              aria-label={`Inspect ${p.label}${seen ? ' (inspected)' : ''}`}
              className="chroma-hot"
              onClick={() => interactive && onInspect(p.id)}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onInspect(p.id);
                }
              }}
              onMouseEnter={() => setFocus(p.id)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(p.id)}
              onBlur={() => setFocus(null)}
            >
              <circle cx={p.x} cy={p.y} r={p.size * 0.78} fill="#fff" opacity={active ? 0.3 : 0.001} />
              {interactive && !seen && <circle cx={p.x} cy={p.y} r={p.size * 0.7} fill="none" stroke="#fde047" strokeWidth="4" className={pulse ? 'chroma-ring-strong' : 'chroma-ring'} />}
              <text x={p.x} y={p.y} fontSize={p.size} textAnchor="middle" dominantBaseline="middle" style={{ filter: active ? 'drop-shadow(0 0 10px #fde047)' : 'drop-shadow(0 4px 3px rgba(0,0,0,.4))' }}>
                {p.emoji}
              </text>
              {seen && (
                <g>
                  <circle cx={p.x + p.size * 0.45} cy={p.y - p.size * 0.45} r="14" fill="#16a34a" stroke="#fff" strokeWidth="3" />
                  <text x={p.x + p.size * 0.45} y={p.y - p.size * 0.45 + 1} fontSize="17" fontWeight="800" fill="#fff" textAnchor="middle" dominantBaseline="middle">
                    ✓
                  </text>
                </g>
              )}
              {interactive && (active || !seen) && (
                <g opacity={active ? 1 : 0.85}>
                  <rect x={p.x - 62} y={p.y + p.size * 0.62} width="124" height="24" rx="12" fill="#0f172a" opacity=".85" />
                  <text x={p.x} y={p.y + p.size * 0.62 + 13} fontSize="13" fontWeight="700" fill="#fde047" textAnchor="middle" dominantBaseline="middle">
                    {p.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        <g>
          <rect x="14" y="14" width="236" height="34" rx="17" fill="#0f172a" opacity=".8" />
          <text x="32" y="32" fontSize="16" fontWeight="800" fill={stage.hex === '#111827' ? '#fff' : '#fde047'} dominantBaseline="middle">
            🔎 Evidence {found.length}/{room.props.length}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RoomScene;
