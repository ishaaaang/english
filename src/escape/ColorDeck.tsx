import { X } from 'lucide-react';
import { DECK } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  highlight?: string;
}

const ColorDeck = ({ open, onClose, highlight }: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-label="Color Deck">
      <button className="absolute inset-0 bg-black/60" aria-label="Close Color Deck" onClick={onClose} />
      <aside className="relative w-full max-w-md h-full overflow-y-auto bg-[#062a3a] border-l border-white/20 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">🎨 The Color Deck</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <p className="text-sm text-cyan-100/80 mb-4">
          Every color has two sides. A word only counts as evidence when the scene supports it.
        </p>
        <div className="space-y-3">
          {DECK.map((d) => (
            <div
              key={d.color}
              className="rounded-xl overflow-hidden border-2"
              style={{ borderColor: d.color === highlight ? '#fde047' : 'rgba(255,255,255,0.15)' }}
            >
              <div className="px-3 py-2 font-bold flex justify-between" style={{ background: d.hex, color: d.ink }}>
                <span>{d.color}</span>
                {d.label && <span className="text-xs font-semibold opacity-90 self-center">{d.label}</span>}
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="p-2 bg-emerald-900/40">
                  <div className="text-xs uppercase tracking-wide text-emerald-300 mb-1">Positive</div>
                  {d.positive.join(', ')}
                </div>
                <div className="p-2 bg-rose-900/40">
                  <div className="text-xs uppercase tracking-wide text-rose-300 mb-1">Negative</div>
                  {d.negative.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ColorDeck;
