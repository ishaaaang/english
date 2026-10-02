import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DECK, type Stage } from './data';
import { ROOMS, type Line, type Side } from './rooms';
import { sfx } from './sfx';

export const PHASES = ['Briefing', 'Investigate', 'Analyze', 'Challenge', 'Deck Check', 'Question'] as const;

const Continue = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-300 text-slate-900 font-extrabold hover:bg-yellow-200">
    {children} <ArrowRight size={18} />
  </button>
);

export const Stepper = ({ phase, color }: { phase: number; color: string }) => (
  <ol className="flex flex-wrap gap-1.5 justify-center text-xs sm:text-sm" aria-label="Room steps">
    {PHASES.map((p, i) => (
      <li
        key={p}
        className="px-3 py-1 rounded-full border font-semibold"
        style={{
          background: i < phase ? color : 'transparent',
          borderColor: i === phase ? '#fde047' : color,
          color: i < phase ? '#fff' : i === phase ? '#fde047' : 'rgba(255,255,255,.55)',
        }}
      >
        {i < phase ? '✓ ' : `${i + 1}. `}
        {p}
      </li>
    ))}
  </ol>
);

/* ------------------------------- Dialogue -------------------------------- */

export const Dialogue = ({ lines, cta, onDone }: { lines: Line[]; cta: string; onDone: () => void }) => {
  const [i, setI] = useState(0);
  const line = lines[i];
  const last = i === lines.length - 1;
  return (
    <div className="chroma-card p-5 flex gap-4 items-start">
      <div className="text-5xl">{line.emoji}</div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-widest text-yellow-200">{line.who}</div>
        <p className="text-lg my-1">“{line.text}”</p>
        <div className="mt-3">
          {last ? (
            <Continue onClick={onDone}>{cta}</Continue>
          ) : (
            <button
              onClick={() => {
                sfx.click();
                setI(i + 1);
              }}
              className="px-5 py-2 rounded-full bg-white/15 font-semibold hover:bg-white/25"
            >
              Next ▸
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------- Shared choice UI ---------------------------- */

const Choice = ({
  label,
  onClick,
  tone,
}: {
  label: string;
  onClick: () => void;
  tone: 'pos' | 'neg' | 'other';
}) => {
  const bg = tone === 'pos' ? 'hover:bg-emerald-500/30 border-emerald-400/50' : tone === 'neg' ? 'hover:bg-rose-500/30 border-rose-400/50' : 'hover:bg-slate-400/30 border-slate-300/50';
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full border text-sm font-semibold bg-white/5 ${bg}`}>
      {label}
    </button>
  );
};

const hashOrder = <T,>(items: T[], salt: number, key: (t: T) => string) =>
  [...items].sort((a, b) => {
    const h = (t: T) => key(t).split('').reduce((n, c) => (n * 31 + c.charCodeAt(0) + salt) % 1009, 7);
    return h(a) - h(b);
  });

/* ------------------------------ Analyze (tags) ----------------------------- */

const SIDE_LABEL: Record<Side, string> = { positive: 'Positive side', negative: 'Negative side', herring: 'Red herring' };

export const TagPhase = ({ stage, onWrong, onDone }: { stage: Stage; onWrong: () => void; onDone: () => void }) => {
  const props = ROOMS[stage.id].props;
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState('');
  const all = props.every((p) => done[p.id]);

  const tag = (id: string, side: Side) => {
    const p = props.find((x) => x.id === id)!;
    if (p.side === side) {
      sfx.found();
      setMsg('');
      setDone((d) => ({ ...d, [id]: true }));
    } else {
      sfx.bad();
      onWrong();
      setMsg(
        p.side === 'herring'
          ? `“${p.label}” doesn’t actually show a ${stage.color} meaning. Look at what the clue really says.`
          : side === 'herring'
            ? `“${p.label}” does connect to ${stage.color}. Check the clue again.`
            : `Not quite. Reread the clue for “${p.label}” and compare it with the ${stage.color} slide on the Color Deck.`,
      );
    }
  };

  return (
    <div className="chroma-card p-5 space-y-4">
      <div>
        <h3 className="text-xl font-bold">🧠 Analyze your evidence</h3>
        <p className="text-cyan-100">
          Sort each object. Does it show the <strong>positive</strong> side of {stage.color}, the <strong>negative</strong> side, or is it a{' '}
          <strong>red herring</strong> that has nothing to do with the color?
        </p>
      </div>
      <div className="grid gap-3">
        {props.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/15 p-3" style={{ background: done[p.id] ? 'rgba(74,222,128,.12)' : 'rgba(255,255,255,.05)' }}>
            <div className="flex gap-3 items-start">
              <div className="text-3xl">{p.emoji}</div>
              <div className="flex-1">
                <div className="font-bold">{p.label}</div>
                <p className="text-sm text-cyan-50">{p.clue}</p>
                {done[p.id] ? (
                  <p className="mt-2 text-sm font-semibold text-emerald-300">
                    ✓ {SIDE_LABEL[p.side]}
                    {p.word ? ` · Deck word: ${p.word}` : ' · Not part of the color story'}
                  </p>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Choice tone="pos" label="👍 Positive side" onClick={() => tag(p.id, 'positive')} />
                    <Choice tone="neg" label="👎 Negative side" onClick={() => tag(p.id, 'negative')} />
                    <Choice tone="other" label="🐟 Red herring" onClick={() => tag(p.id, 'herring')} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {msg && <p className="rounded-lg bg-rose-900/50 border border-rose-400/40 px-4 py-3">{msg}</p>}
      {all && <Continue onClick={onDone}>On to the challenge</Continue>}
    </div>
  );
};

/* ------------------------------- Challenge -------------------------------- */

export const ChallengePhase = ({ stage, onWrong, onDone }: { stage: Stage; onWrong: () => void; onDone: () => void }) => {
  const ch = ROOMS[stage.id].challenge;
  const [msg, setMsg] = useState('');
  const [next, setNext] = useState(0); // order: how many tapped correctly
  const [answered, setAnswered] = useState<Record<number, boolean>>({});

  const shuffled = useMemo(
    () => (ch.kind === 'order' ? hashOrder(ch.items, stage.id, (t) => t) : []),
    [ch, stage.id],
  );

  let body: React.ReactNode = null;
  let complete = false;

  if (ch.kind === 'order') {
    complete = next >= ch.items.length;
    body = (
      <div className="grid gap-2">
        {shuffled.map((text) => {
          const idx = ch.items.indexOf(text);
          const placed = idx < next;
          return (
            <button
              key={text}
              disabled={placed}
              onClick={() => {
                if (idx === next) {
                  sfx.found();
                  setMsg('');
                  setNext(next + 1);
                } else {
                  sfx.bad();
                  onWrong();
                  setMsg('That one didn’t happen next. Think about what came right before it.');
                }
              }}
              className="chroma-option"
              style={{ borderColor: placed ? '#4ade80' : undefined, background: placed ? 'rgba(74,222,128,.15)' : undefined }}
            >
              <span className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-extrabold" style={{ background: placed ? '#16a34a' : stage.hex, color: placed ? '#fff' : stage.ink }}>
                {placed ? idx + 1 : '?'}
              </span>
              <span>{text}</span>
            </button>
          );
        })}
      </div>
    );
  } else {
    complete = ch.items.every((_, i) => answered[i]);
    body = (
      <div className="grid gap-2">
        {ch.items.map((it, i) => (
          <div key={it.text} className="rounded-xl border border-white/15 p-3" style={{ background: answered[i] ? 'rgba(74,222,128,.12)' : 'rgba(255,255,255,.05)' }}>
            <p className="mb-2">{it.text}</p>
            {answered[i] ? (
              <p className="text-sm font-semibold text-emerald-300">
                ✓ {it.answer ? 'True' : 'False'}. {it.why}
              </p>
            ) : (
              <div className="flex gap-2">
                {[true, false].map((v) => (
                  <Choice
                    key={String(v)}
                    tone={v ? 'pos' : 'neg'}
                    label={v ? 'True' : 'False'}
                    onClick={() => {
                      if (v === it.answer) {
                        sfx.found();
                        setMsg('');
                        setAnswered((a) => ({ ...a, [i]: true }));
                      } else {
                        sfx.bad();
                        onWrong();
                        setMsg('Check the scene description again. Details matter.');
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="chroma-card p-5 space-y-4">
      <div>
        <h3 className="text-xl font-bold">🧩 Room challenge</h3>
        <p className="text-cyan-100">{ch.prompt}</p>
      </div>
      {body}
      {msg && <p className="rounded-lg bg-rose-900/50 border border-rose-400/40 px-4 py-3">{msg}</p>}
      {complete && <Continue onClick={onDone}>On to the deck check</Continue>}
    </div>
  );
};

/* -------------------------------- Deck check ------------------------------- */

type Bin = 'positive' | 'negative' | 'other';

export const deckWords = (stage: Stage) => {
  const own = new Set([...stage.positive, ...stage.negative].flatMap((w) => w.toLowerCase().split(' / ')));
  const ours: { word: string; bin: Bin }[] = [
    ...stage.positive.slice(0, 3).map((word) => ({ word, bin: 'positive' as Bin })),
    ...stage.negative.slice(0, 3).map((word) => ({ word, bin: 'negative' as Bin })),
  ];
  const decoys: { word: string; bin: Bin }[] = [];
  const idx = DECK.findIndex((d) => d.color === stage.color);
  for (const off of [3, 6, 9, 11]) {
    const d = DECK[(idx + off) % DECK.length];
    const pool = [...d.positive, ...d.negative];
    const w = pool.find((x) => !x.toLowerCase().split(' / ').some((p) => own.has(p)) && !decoys.some((e) => e.word === x));
    if (w) decoys.push({ word: w, bin: 'other' });
    if (decoys.length === 3) break;
  }
  return hashOrder([...ours, ...decoys], stage.id, (t) => t.word);
};

export const DeckPhase = ({ stage, onWrong, onDone }: { stage: Stage; onWrong: () => void; onDone: () => void }) => {
  const words = useMemo(() => deckWords(stage), [stage]);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [msg, setMsg] = useState('');
  const all = words.every((w) => done[w.word]);

  const place = (w: { word: string; bin: Bin }, bin: Bin) => {
    if (w.bin === bin) {
      sfx.found();
      setMsg('');
      setDone((d) => ({ ...d, [w.word]: true }));
    } else {
      sfx.bad();
      onWrong();
      setMsg(`Check the ${stage.color} slide on the Color Deck for “${w.word}”.`);
    }
  };

  return (
    <div className="chroma-card p-5 space-y-4">
      <div>
        <h3 className="text-xl font-bold">🎨 Deck check: build the {stage.color} slide</h3>
        <p className="text-cyan-100">
          Some of these words are on {stage.color}’s slide and some belong to other colors. Sort each word. Open the Color Deck if you need it.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {words.map((w) => (
          <div key={w.word} className="rounded-xl border border-white/15 p-3" style={{ background: done[w.word] ? 'rgba(74,222,128,.12)' : 'rgba(255,255,255,.05)' }}>
            <div className="font-bold mb-2">{w.word}</div>
            {done[w.word] ? (
              <p className="text-sm font-semibold text-emerald-300">
                ✓ {w.bin === 'positive' ? `Positive ${stage.color}` : w.bin === 'negative' ? `Negative ${stage.color}` : 'Belongs to another color'}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Choice tone="pos" label={`+ ${stage.color}`} onClick={() => place(w, 'positive')} />
                <Choice tone="neg" label={`– ${stage.color}`} onClick={() => place(w, 'negative')} />
                <Choice tone="other" label="Other color" onClick={() => place(w, 'other')} />
              </div>
            )}
          </div>
        ))}
      </div>
      {msg && <p className="rounded-lg bg-rose-900/50 border border-rose-400/40 px-4 py-3">{msg}</p>}
      {all && <Continue onClick={onDone}>Unlock the final question</Continue>}
    </div>
  );
};
