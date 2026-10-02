import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock, Lightbulb, Palette, RotateCcw, Lock, ArrowRight } from 'lucide-react';
import ColorDeck from './ColorDeck';
import {
  FEEDBACK,
  HINTS_PER_TEAM,
  PASSWORD,
  ROLE_GROUPS,
  STAGES,
  TARGET_MINUTES,
  type Stage,
} from './data';
import './escape.css';

interface Save {
  started: boolean;
  letters: string[];
  hintsShown: Record<number, boolean>;
  startedAt: number | null;
  finishedAt: number | null;
  vaultOpen: boolean;
  escaped: boolean;
  names: string[];
  sentence: string;
  security: Record<string, string>;
  debrief: Record<string, string>;
}

const KEY = 'chroma-heist-v1';
const fresh = (): Save => ({
  started: false,
  letters: [],
  hintsShown: {},
  startedAt: null,
  finishedAt: null,
  vaultOpen: false,
  escaped: false,
  names: ROLE_GROUPS.map(() => ''),
  sentence: '',
  security: {},
  debrief: {},
});

const load = (): Save => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {
    /* storage unavailable */
  }
  return fresh();
};

const fmt = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// Drop your artwork in public/escape/ (stage-1.png ... stage-14.png, hero.png).
// If a file is missing, the emoji shows instead.
const Art = ({ src, fallback, className }: { src: string; fallback: string; className: string }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="text-5xl">{fallback}</span>
  ) : (
    <img src={src} alt="" className={className} onError={() => setFailed(true)} />
  );
};

const Bubbles = () => (
  <div className="chroma-bubbles" aria-hidden>
    {Array.from({ length: 14 }, (_, i) => (
      <span
        key={i}
        style={{
          left: `${(i * 73) % 100}%`,
          width: 10 + ((i * 7) % 26),
          height: 10 + ((i * 7) % 26),
          animationDuration: `${9 + ((i * 5) % 11)}s`,
          animationDelay: `${(i * 1.3) % 9}s`,
        }}
      />
    ))}
  </div>
);

const EscapeRoom = () => {
  const [save, setSave] = useState<Save>(load);
  const [now, setNow] = useState(Date.now());
  const [deckOpen, setDeckOpen] = useState(false);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(save));
    } catch {
      /* ignore */
    }
  }, [save]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const update = (patch: Partial<Save>) => setSave((s) => ({ ...s, ...patch }));

  const hintsUsed = Object.keys(save.hintsShown).length;
  const solved = save.letters.length;
  const viewIdx = revealing ? solved - 1 : solved;
  const stage = STAGES[viewIdx] as Stage | undefined;
  const elapsed = save.startedAt ? (save.finishedAt ?? now) - save.startedAt : 0;
  const overtime = elapsed > TARGET_MINUTES * 60000;

  const reset = () => {
    if (window.confirm('Start over? This clears all progress.')) {
      setSave(fresh());
      setRevealing(false);
    }
  };

  let body;
  if (!save.started) {
    body = <Intro save={save} update={update} />;
  } else if (save.escaped) {
    body = <Escape save={save} update={update} elapsed={elapsed} hintsUsed={hintsUsed} onReset={reset} />;
  } else if (stage) {
    body = (
      <StageView
        key={stage.id}
        stage={stage}
        save={save}
        hintsUsed={hintsUsed}
        revealing={revealing}
        update={update}
        onSolved={(letter) => {
          update({ letters: [...save.letters, letter] });
          setRevealing(true);
        }}
        onNext={() => setRevealing(false)}
      />
    );
  } else {
    body = <Vault save={save} update={update} elapsed={elapsed} />;
  }

  return (
    <div className="chroma-root">
      <Bubbles />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-5">
        {save.started && (
          <header className="chroma-card px-4 py-3 mb-6 flex flex-wrap items-center gap-3 justify-between">
            <div className="font-extrabold text-lg">🎨 Operation Chroma Heist</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 font-mono ${overtime ? 'text-rose-300' : ''}`}>
                <Clock size={16} /> {fmt(elapsed)} / {TARGET_MINUTES}:00
              </span>
              <span className="inline-flex items-center gap-1 text-sm">
                <Lightbulb size={16} /> {HINTS_PER_TEAM - hintsUsed} hints left
              </span>
              <button
                onClick={() => setDeckOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-300 text-slate-900 font-semibold text-sm hover:bg-yellow-200"
              >
                <Palette size={16} /> Color Deck
              </button>
              <button onClick={reset} className="p-2 rounded-full hover:bg-white/10" aria-label="Restart">
                <RotateCcw size={16} />
              </button>
            </div>
            <ProgressTrail letters={save.letters} current={viewIdx} />
          </header>
        )}
        {body}
      </div>
      <ColorDeck open={deckOpen} onClose={() => setDeckOpen(false)} highlight={stage?.color} />
    </div>
  );
};

const ProgressTrail = ({ letters, current }: { letters: string[]; current: number }) => (
  <div className="w-full flex flex-wrap gap-1.5 justify-center" aria-label="Progress">
    {STAGES.map((s, i) => (
      <div
        key={s.id}
        title={`${s.id}. ${s.color}`}
        className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-extrabold border-2"
        style={{
          background: i < letters.length ? s.hex : 'transparent',
          color: i < letters.length ? s.ink : '#fff',
          borderColor: i === current ? '#fde047' : s.hex,
          opacity: i > current ? 0.5 : 1,
        }}
      >
        {letters[i] ?? s.id}
      </div>
    ))}
  </div>
);

/* ---------------------------------- Intro --------------------------------- */

const Intro = ({ save, update }: { save: Save; update: (p: Partial<Save>) => void }) => (
  <div className="space-y-6">
    <div className="chroma-card p-8 text-center">
      <div className="mb-2">
        <Art src="/escape/hero.png" fallback="🦀 🧽 🟢" className="mx-auto max-h-56 object-contain" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Operation Chroma Heist</h1>
      <p className="text-yellow-200 font-semibold mb-4">A Bikini Bottom Color Escape Room</p>
      <p className="max-w-2xl mx-auto text-lg text-cyan-50">
        Plankton has stolen the Krabby Patty secret formula and locked it in a vault. Travel across 14 Bikini Bottom
        locations, decode the color symbolism in each scene, and earn the letters of the vault’s password.
      </p>
    </div>

    <div className="chroma-card p-6">
      <h2 className="text-2xl font-bold mb-2">📣 Mission Briefing</h2>
      <p className="mb-3">
        <strong>Mr. Krabs:</strong> “The safe is EMPTY! Somebody took my formula, and I know exactly who. SpongeBob,
        gather your search team!”
      </p>
      <p className="mb-3">
        You are members of SpongeBob’s search team. At each location you will read the scene, consult the Color Deck,
        and decide which interpretation of the color is best supported by the evidence.
      </p>
      <ul className="list-disc pl-6 space-y-1 text-cyan-50">
        <li>Each stage has one scene, one question and four lettered answers. The correct answer’s letter is your password letter.</li>
        <li>Every color has a <em>positive</em> and a <em>negative</em> side. The best answer uses both, backed by the scene.</li>
        <li>You can’t move on until you find the right letter. The Color Deck stays open beside you.</li>
        <li>Your team has {HINTS_PER_TEAM} hint cards. A hint tells you which side of a color the scene is hiding, never the answer.</li>
        <li>Suggested time: about {TARGET_MINUTES} minutes, plus the vault and debrief.</li>
      </ul>
    </div>

    <div className="chroma-card p-6">
      <h2 className="text-2xl font-bold mb-3">👥 Group Roles (optional)</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {ROLE_GROUPS.map((g, i) => (
          <label key={g.stages} className="flex items-center gap-3 text-sm">
            <span className="w-40 shrink-0">
              Stages {g.stages}
              <br />
              <span className="text-cyan-200">{g.colors}</span>
            </span>
            <input
              value={save.names[i] ?? ''}
              onChange={(e) => update({ names: save.names.map((n, j) => (j === i ? e.target.value : n)) })}
              placeholder="Student name"
              className="flex-1 rounded-lg bg-black/30 border border-white/20 px-3 py-2"
            />
          </label>
        ))}
      </div>
      <p className="text-sm text-cyan-200 mt-3">Stages 15–16, the form and the key are shared by the whole group.</p>
    </div>

    <div className="text-center">
      <button
        onClick={() => update({ started: true, startedAt: Date.now() })}
        className="px-8 py-4 rounded-full bg-yellow-300 text-slate-900 text-xl font-extrabold hover:bg-yellow-200 shadow-lg"
      >
        Start the Mission →
      </button>
    </div>
  </div>
);

/* ---------------------------------- Stage --------------------------------- */

interface StageProps {
  stage: Stage;
  save: Save;
  hintsUsed: number;
  revealing: boolean;
  update: (p: Partial<Save>) => void;
  onSolved: (letter: string) => void;
  onNext: () => void;
}

const StageView = ({ stage, save, hintsUsed, revealing, update, onSolved, onNext }: StageProps) => {
  const [message, setMessage] = useState('');
  const [wrong, setWrong] = useState<string[]>([]);
  const [shake, setShake] = useState(0);
  const options = useMemo(() => [...stage.options].sort((a, b) => a.letter.localeCompare(b.letter)), [stage]);
  const correct = stage.options.find((o) => o.kind === 'correct')!;
  const hintShown = !!save.hintsShown[stage.id];
  const canHint = !hintShown && hintsUsed < HINTS_PER_TEAM;

  const choose = (letter: string) => {
    if (stage.creation) {
      const s = save.sentence.toLowerCase();
      const hasPos = stage.creation.positive.some((w) => s.includes(w));
      const hasNeg = stage.creation.negative.some((w) => s.includes(w));
      if (!hasPos || !hasNeg) {
        setMessage('✍️ Your sentence needs one positive and one negative white word first (see the Color Deck).');
        setShake((n) => n + 1);
        return;
      }
    }
    const opt = stage.options.find((o) => o.letter === letter)!;
    if (opt.kind === 'correct') {
      setMessage('');
      onSolved(letter);
    } else {
      setWrong((w) => [...w, letter]);
      setMessage(`Option ${letter}: ${FEEDBACK[opt.kind]}`);
      setShake((n) => n + 1);
    }
  };

  return (
    <div className="space-y-5">
      <div className="chroma-card overflow-hidden">
        <div className="px-6 py-4 flex items-center gap-4" style={{ background: stage.hex, color: stage.ink }}>
          <Art src={`/escape/stage-${stage.id}.png`} fallback={stage.emoji} className="h-20 w-20 object-contain" />
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80">
              Stage {stage.id} of {STAGES.length}
            </div>
            <h2 className="text-3xl font-extrabold">
              {stage.color} at {stage.location}
            </h2>
            <div className="text-sm opacity-90">{stage.cast}</div>
          </div>
        </div>
        <div className="p-6 space-y-3 text-lg leading-relaxed">
          {stage.id === 1 && (
            <p className="text-sm text-yellow-200">
              📣 Mission briefing: recover the formula. Every stage hands you one password letter.
            </p>
          )}
          {stage.scene.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-sm text-cyan-200">🧠 Thinking skill: {stage.skill}</p>
        </div>
      </div>

      <div className="chroma-card p-6">
        <h3 className="text-xl font-bold mb-4">{stage.question}</h3>

        {stage.creation && (
          <div className="mb-5">
            <label className="block font-semibold mb-1">{stage.creation.prompt}</label>
            <textarea
              value={save.sentence}
              onChange={(e) => update({ sentence: e.target.value })}
              disabled={revealing}
              rows={3}
              placeholder="“Gee, this blank board is …”"
              className="w-full rounded-lg bg-black/30 border border-white/25 px-3 py-2"
            />
            <p className="text-xs text-cyan-200 mt-1">Show your sentence to the game master. It is checked by a person.</p>
          </div>
        )}

        <div key={shake} className={`grid gap-3 ${shake ? 'chroma-shake' : ''}`}>
          {options.map((o) => {
            const isRight = revealing && o.letter === correct.letter;
            const isWrong = wrong.includes(o.letter);
            return (
              <button
                key={o.letter}
                disabled={revealing || isWrong}
                onClick={() => choose(o.letter)}
                className="chroma-option"
                style={{
                  borderColor: isRight ? '#4ade80' : isWrong ? '#f87171' : undefined,
                  background: isRight ? 'rgba(74,222,128,0.2)' : isWrong ? 'rgba(248,113,113,0.12)' : undefined,
                  opacity: isWrong ? 0.55 : 1,
                }}
              >
                <span
                  className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-extrabold"
                  style={{ background: stage.hex, color: stage.ink }}
                >
                  {o.letter}
                </span>
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>

        {message && !revealing && (
          <p className="mt-4 rounded-lg bg-rose-900/50 border border-rose-400/40 px-4 py-3">{message}</p>
        )}

        {hintShown && !revealing && (
          <p className="mt-4 rounded-lg bg-yellow-200/15 border border-yellow-200/40 px-4 py-3">
            💡 <strong>Hint card:</strong> {stage.hint}
          </p>
        )}

        {!revealing && (
          <button
            disabled={!canHint}
            onClick={() => update({ hintsShown: { ...save.hintsShown, [stage.id]: true } })}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-200/60 text-yellow-100 disabled:opacity-40 hover:bg-yellow-200/10"
          >
            <Lightbulb size={16} />
            {hintShown ? 'Hint used for this stage' : `Use a hint card (${HINTS_PER_TEAM - hintsUsed} left)`}
          </button>
        )}
      </div>

      {revealing && (
        <div className="chroma-card p-6 text-center border-2" style={{ borderColor: stage.hex }}>
          <div className="text-sm uppercase tracking-widest text-cyan-200">Password letter unlocked</div>
          <div
            className="chroma-pop mx-auto my-3 h-24 w-24 rounded-2xl flex items-center justify-center text-6xl font-extrabold"
            style={{ background: stage.hex, color: stage.ink }}
          >
            {correct.letter}
          </div>
          <p className="max-w-xl mx-auto mb-4">{stage.why}</p>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-300 text-slate-900 font-extrabold hover:bg-yellow-200"
          >
            {stage.id === STAGES.length ? 'To the vault' : `On to stage ${stage.id + 1}`} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------- Vault --------------------------------- */

const Vault = ({ save, update, elapsed }: { save: Save; update: (p: Partial<Save>) => void; elapsed: number }) => {
  const [chars, setChars] = useState<string[]>(Array(PASSWORD.length).fill(''));
  const [error, setError] = useState('');
  const [shake, setShake] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [formError, setFormError] = useState('');

  const setChar = (i: number, v: string) => {
    const c = v.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
    setChars((cs) => cs.map((x, j) => (j === i ? c : x)));
    if (c && i < PASSWORD.length - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, PASSWORD.length);
    if (!text) return;
    e.preventDefault();
    setChars(Array.from({ length: PASSWORD.length }, (_, i) => text[i] ?? ''));
  };

  const tryVault = () => {
    if (chars.join('') === PASSWORD) {
      setError('');
      update({ vaultOpen: true });
    } else {
      setError('The vault buzzes. Check the letters in stage order.');
      setShake((n) => n + 1);
    }
  };

  const sec = save.security;
  const setSec = (k: string, v: string) => update({ security: { ...sec, [k]: v } });
  const colors = STAGES.map((s) => s.color);

  const submit = () => {
    const needed = ['c1', 'c2', 'p1', 'n1', 'e1', 'p2', 'n2', 'e2', 'why'];
    if (needed.some((k) => !(sec[k] ?? '').trim()) || sec.c1 === sec.c2) {
      setFormError('Choose two different colors and complete every box.');
      return;
    }
    if (sec.why.trim().length < 30) {
      setFormError('Explain what the password says about Plankton in a full sentence or two.');
      return;
    }
    update({ escaped: true, finishedAt: save.finishedAt ?? Date.now() });
  };

  const field = 'w-full rounded-lg bg-black/30 border border-white/25 px-3 py-2';

  return (
    <div className="space-y-5">
      <div className="chroma-card p-6 text-center">
        <div className="text-6xl mb-2">🔐</div>
        <h2 className="text-3xl font-extrabold mb-1">Plankton’s Vault</h2>
        <p className="text-cyan-100 mb-4">Enter all 14 letters in stage order.</p>
        <div className="flex flex-wrap justify-center gap-1.5 mb-4" aria-label="Collected letters">
          {save.letters.map((l, i) => (
            <span
              key={i}
              className="h-9 w-9 rounded-lg flex items-center justify-center font-extrabold"
              style={{ background: STAGES[i].hex, color: STAGES[i].ink }}
              title={STAGES[i].color}
            >
              {l}
            </span>
          ))}
        </div>
        {!save.vaultOpen && (
          <>
            <div key={shake} className={`flex flex-wrap justify-center gap-1.5 ${shake ? 'chroma-shake' : ''}`} onPaste={onPaste}>
              {chars.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  value={c}
                  aria-label={`Letter ${i + 1}`}
                  onChange={(e) => setChar(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !c && i > 0) refs.current[i - 1]?.focus();
                    if (e.key === 'Enter') tryVault();
                  }}
                  className="chroma-vault-box"
                  maxLength={2}
                />
              ))}
            </div>
            {error && <p className="mt-3 text-rose-300">{error}</p>}
            <button
              onClick={tryVault}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-300 text-slate-900 font-extrabold hover:bg-yellow-200"
            >
              <Lock size={18} /> Open the vault
            </button>
          </>
        )}
      </div>

      {save.vaultOpen && (
        <div className="chroma-card p-6 space-y-4">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-yellow-200">TRUE COLORS SHOW</p>
            <p className="text-sm text-cyan-200">The lock clicks, but a security question is still guarding the formula.</p>
          </div>
          <h3 className="text-xl font-bold">Security question</h3>
          <p>
            Choose the <strong>two colors</strong> that best represent Plankton. For each, give one positive and one
            negative Color Deck word, plus a scene as evidence. Then explain what the password says about him.
          </p>
          {[1, 2].map((n) => (
            <fieldset key={n} className="rounded-xl border border-white/20 p-4 space-y-2">
              <legend className="px-2 font-semibold">Color {n}</legend>
              <select value={sec[`c${n}`] ?? ''} onChange={(e) => setSec(`c${n}`, e.target.value)} className={field}>
                <option value="">Pick a color…</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="grid sm:grid-cols-2 gap-2">
                <input placeholder="One positive word" value={sec[`p${n}`] ?? ''} onChange={(e) => setSec(`p${n}`, e.target.value)} className={field} />
                <input placeholder="One negative word" value={sec[`n${n}`] ?? ''} onChange={(e) => setSec(`n${n}`, e.target.value)} className={field} />
              </div>
              <textarea placeholder="Scene evidence (which stage, what happened?)" rows={2} value={sec[`e${n}`] ?? ''} onChange={(e) => setSec(`e${n}`, e.target.value)} className={field} />
            </fieldset>
          ))}
          <textarea
            placeholder="What does the password TRUE COLORS SHOW say about Plankton?"
            rows={3}
            value={sec.why ?? ''}
            onChange={(e) => setSec('why', e.target.value)}
            className={field}
          />
          {formError && <p className="text-rose-300">{formError}</p>}
          <div className="text-center">
            <button onClick={submit} className="px-6 py-3 rounded-full bg-yellow-300 text-slate-900 font-extrabold hover:bg-yellow-200">
              Recover the formula ({fmt(elapsed)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* --------------------------------- Escape --------------------------------- */

const PROMPTS = [
  { k: 'compare', label: 'Compare', q: 'Which color changed meaning the most? Cite two scenes.' },
  { k: 'interpret', label: 'Interpret', q: 'Rank gold, silver and bronze from most to least trustworthy in this story, and defend the order.' },
  { k: 'create', label: 'Create', q: 'Design a 15th stage: a color, a location, and one trap answer.' },
];

const Escape = ({
  save,
  update,
  elapsed,
  hintsUsed,
  onReset,
}: {
  save: Save;
  update: (p: Partial<Save>) => void;
  elapsed: number;
  hintsUsed: number;
  onReset: () => void;
}) => (
  <div className="space-y-5">
    <div className="chroma-card p-8 text-center">
      <div className="text-6xl mb-2">🎉 🦀 🧽 🎉</div>
      <h2 className="text-4xl font-extrabold mb-2">You escaped!</h2>
      <p className="text-lg max-w-2xl mx-auto mb-3">
        The vault swings open and the Krabby Patty secret formula is safe again. Plankton hid behind the positive side
        of every color, but your team saw both sides.
      </p>
      <p className="font-mono text-yellow-200">
        Time {fmt(elapsed)} · Hints used {hintsUsed}/{HINTS_PER_TEAM}
      </p>
    </div>
    <div className="chroma-card p-6 space-y-4">
      <h3 className="text-2xl font-bold">Debrief</h3>
      {PROMPTS.map((p) => (
        <label key={p.k} className="block">
          <span className="font-semibold text-yellow-200">{p.label}:</span> {p.q}
          <textarea
            rows={3}
            value={save.debrief[p.k] ?? ''}
            onChange={(e) => update({ debrief: { ...save.debrief, [p.k]: e.target.value } })}
            className="mt-1 w-full rounded-lg bg-black/30 border border-white/25 px-3 py-2"
          />
        </label>
      ))}
      <p className="text-sm text-cyan-200">Your answers are saved in this browser. Share them with your class.</p>
    </div>
    <div className="text-center">
      <button onClick={onReset} className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10">
        Play again
      </button>
    </div>
  </div>
);

export default EscapeRoom;
