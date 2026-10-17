import { useMemo, useState } from 'react';

const NO_LINES = [
  'No',
  'Are you sure? 🥺',
  'Really sure?? 💙',
  'Think again, Raaga…',
  'Pretty please? 🫧',
  'I’ll bring snacks 🍪',
  'Don’t do this to me 😭',
  'The Yes button is lonely 🐳',
  'Last chance… 🥹',
  'Okay just press Yes 💙',
];

const NO_GIFS = ['🥺', '😢', '🥹', '😭', '🐶', '🧸', '🌊', '💔', '🫠', '🙏'];

const ACTIVITIES = [
  { id: 'sunset', emoji: '🌅', label: 'Sunset walk' },
  { id: 'cafe', emoji: '☕', label: 'Cute café' },
  { id: 'movie', emoji: '🎬', label: 'Movie night' },
  { id: 'aquarium', emoji: '🐠', label: 'Aquarium' },
  { id: 'picnic', emoji: '🧺', label: 'Picnic' },
  { id: 'arcade', emoji: '🕹️', label: 'Arcade' },
];

const FOODS = [
  { id: 'sushi', emoji: '🍣', label: 'Sushi' },
  { id: 'pizza', emoji: '🍕', label: 'Pizza' },
  { id: 'boba', emoji: '🧋', label: 'Boba' },
  { id: 'icecream', emoji: '🍦', label: 'Ice cream' },
  { id: 'pasta', emoji: '🍝', label: 'Pasta' },
  { id: 'dessert', emoji: '🍰', label: 'Dessert' },
];

const VIBES = ['Chill & cosy', 'Dressy', 'Adventurous', 'Surprise me'];

function Floaters() {
  const items = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 26,
        dur: 9 + Math.random() * 10,
        delay: -Math.random() * 14,
        glyph: ['💙', '🫧', '✨', '🐳', '🦋'][i % 5],
      })),
    []
  );
  return (
    <div className="ask-floaters" aria-hidden>
      {items.map((f) => (
        <span
          key={f.id}
          style={{
            left: `${f.left}%`,
            fontSize: f.size,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          {f.glyph}
        </span>
      ))}
    </div>
  );
}

function Pick({
  options,
  value,
  onChange,
}: {
  options: { id: string; emoji: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="ask-grid">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`ask-chip ${value === o.id ? 'on' : ''}`}
          onClick={() => onChange(o.id)}
        >
          <span>{o.emoji}</span>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function AskRaaga() {
  const [noCount, setNoCount] = useState(0);
  const [stage, setStage] = useState<'ask' | 'plan' | 'done'>('ask');
  const [activity, setActivity] = useState('');
  const [food, setFood] = useState('');
  const [vibe, setVibe] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  const yesScale = Math.min(1 + noCount * 0.28, 4.2);
  const noScale = Math.max(1 - noCount * 0.09, 0.45);
  const line = NO_LINES[Math.min(noCount, NO_LINES.length - 1)];
  const face = NO_GIFS[Math.min(noCount, NO_GIFS.length - 1)];

  const act = ACTIVITIES.find((a) => a.id === activity);
  const eat = FOODS.find((a) => a.id === food);
  const ready = activity && food && vibe && date;

  const summary = () => {
    const when = date
      ? new Date(`${date}T${time || '19:00'}`).toLocaleString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      : '';
    return [
      'Raaga said YES! 💙',
      `Date: ${when}`,
      `Plan: ${act?.emoji} ${act?.label} + ${eat?.emoji} ${eat?.label}`,
      `Vibe: ${vibe}`,
      note ? `Her note: ${note}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="ask-root">
      <Floaters />

      {stage === 'ask' && (
        <section className="ask-card">
          <div className="ask-face" key={noCount}>
            {noCount === 0 ? '🐻‍❄️' : face}
          </div>
          <h1>
            Raaga, will you go
            <br />
            on a date with me? <span className="heart">💙</span>
          </h1>
          <p className="ask-sub">
            {noCount === 0
              ? 'I made you a little website because you deserve something cute.'
              : 'The Yes button is getting bigger for a reason…'}
          </p>
          <div className="ask-buttons">
            <button
              className="ask-yes"
              style={{ transform: `scale(${yesScale})` }}
              onClick={() => setStage('plan')}
            >
              Yes! 💙
            </button>
            <button
              className="ask-no"
              style={{ transform: `scale(${noScale})` }}
              onClick={() => setNoCount((n) => n + 1)}
            >
              {line}
            </button>
          </div>
        </section>
      )}

      {stage === 'plan' && (
        <section className="ask-card plan">
          <div className="ask-face">🎉</div>
          <h1>Yay!! Let&rsquo;s plan our date 🫧</h1>
          <p className="ask-sub">You&rsquo;re in charge, Raaga. Pick what you like.</p>

          <h2>1 · What should we do?</h2>
          <Pick options={ACTIVITIES} value={activity} onChange={setActivity} />

          <h2>2 · What are we eating?</h2>
          <Pick options={FOODS} value={food} onChange={setFood} />

          <h2>3 · What&rsquo;s the vibe?</h2>
          <div className="ask-grid">
            {VIBES.map((v) => (
              <button
                key={v}
                type="button"
                className={`ask-chip ${vibe === v ? 'on' : ''}`}
                onClick={() => setVibe(v)}
              >
                {v}
              </button>
            ))}
          </div>

          <h2>4 · When?</h2>
          <div className="ask-row">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <h2>5 · Anything else?</h2>
          <textarea
            rows={3}
            placeholder="Allergies, song requests, a secret wish…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button className="ask-yes solo" disabled={!ready} onClick={() => setStage('done')}>
            {ready ? 'Lock it in 💙' : 'Pick everything above first'}
          </button>
        </section>
      )}

      {stage === 'done' && (
        <section className="ask-card">
          <div className="ask-face">🥹</div>
          <h1>It&rsquo;s a date, Raaga! 💙</h1>
          <pre className="ask-summary">{summary()}</pre>
          <p className="ask-sub">Screenshot this or copy it and send it to me so I can&rsquo;t forget 🫶</p>
          <div className="ask-row center">
            <button className="ask-yes solo" onClick={copy}>
              {copied ? 'Copied! ✨' : 'Copy the plan'}
            </button>
            <button className="ask-ghost" onClick={() => setStage('plan')}>
              Change something
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
