export type OptionKind = 'correct' | 'wrongColor' | 'oneSided' | 'surface' | 'reversed';

export interface Option {
  letter: string;
  text: string;
  kind: OptionKind;
}

export interface Stage {
  id: number;
  color: string;
  hex: string;
  ink: string; // readable text color on top of `hex`
  location: string;
  emoji: string;
  cast: string;
  scene: string[];
  skill: string;
  question: string;
  positive: string[];
  negative: string[];
  options: Option[];
  why: string;
  hint: string;
  creation?: { prompt: string; positive: string[]; negative: string[] };
}

export const PASSWORD = 'TRUECOLORSSHOW';
export const TARGET_MINUTES = 45;
export const HINTS_PER_TEAM = 2;

export const FEEDBACK: Record<Exclude<OptionKind, 'correct'>, string> = {
  wrongColor:
    'That word is real, but it belongs to a different color on the Color Deck. Check this color’s own slide.',
  oneSided:
    'Half right. The scene shows both sides of this color, and this answer keeps only one.',
  surface:
    'A tempting word, but the scene doesn’t support it. Go back to the evidence.',
  reversed:
    'Right words, wrong direction. Check whose meaning the scene actually shows.',
};

export const STAGES: Stage[] = [
  {
    id: 1,
    color: 'Red',
    hex: '#dc2626',
    ink: '#ffffff',
    location: 'The Krusty Krab',
    emoji: '🦀',
    cast: 'Mr. Krabs · SpongeBob',
    scene: [
      'Mr. Krabs opens the safe and finds it empty. His face turns the color of a boiled lobster and he vows revenge on whoever took the secret formula.',
      'Later, still red, he charges into the Chum Bucket alone to rescue SpongeBob from Plankton’s trap.',
    ],
    skill: 'Compare two moments that share the same color.',
    question: 'What does red do across these two moments?',
    positive: ['courage', 'bravery', 'passion'],
    negative: ['rage / wrath', 'violence', 'sin / guilt', 'lust'],
    options: [
      { letter: 'T', kind: 'correct', text: 'Red shifts from rage/wrath at the empty safe to courage/bravery at the rescue. One color carries both sides.' },
      { letter: 'K', kind: 'wrongColor', text: 'Red means energy: Mr. Krabs is just a hard worker who never stops.' },
      { letter: 'B', kind: 'surface', text: 'Red means guilt: Mr. Krabs feels responsible for losing the formula.' },
      { letter: 'M', kind: 'surface', text: 'Red means lust: Mr. Krabs desperately wants the formula for himself.' },
    ],
    why: 'The same red moves from rage/wrath to courage/bravery, so the color is not “good” or “bad”, it depends on the moment.',
    hint: 'The first moment shows the negative side clearly. Look at what red becomes in the second moment.',
  },
  {
    id: 2,
    color: 'Orange',
    hex: '#f97316',
    ink: '#1a0a00',
    location: 'Mrs. Puff’s Boating School',
    emoji: '🐡',
    cast: 'SpongeBob · Mrs. Puff',
    scene: [
      'An overexcited SpongeBob floors the pedal, speeds through a row of orange traffic cones, ignores Mrs. Puff’s screams, and crashes.',
    ],
    skill: 'Interpret why one color is used for both a feeling and an object.',
    question: 'Why do orange cones and SpongeBob’s mood fit together?',
    positive: ['energy', 'enthusiasm', 'harvest', 'civilization'],
    negative: ['impulsivity', 'hazard / warning'],
    options: [
      { letter: 'R', kind: 'correct', text: 'Orange is enthusiasm that tips into impulsivity. The cones are a hazard warning that SpongeBob’s excitement ignores.' },
      { letter: 'G', kind: 'wrongColor', text: 'Orange means serenity: SpongeBob is calmly in control of the boat.' },
      { letter: 'P', kind: 'oneSided', text: 'Orange means pure enthusiasm: SpongeBob’s energy is exactly what a driver needs.' },
      { letter: 'F', kind: 'surface', text: 'Orange means harvest and civilization: the cones show a town at its peak.' },
    ],
    why: 'Orange is both the feeling (energy, enthusiasm) and the object (a hazard/warning cone). Impulsivity is what happens when the warning is ignored.',
    hint: 'Orange is doing double duty in this scene. One side is the driver, the other is the road.',
  },
  {
    id: 3,
    color: 'Yellow',
    hex: '#facc15',
    ink: '#1c1400',
    location: 'SpongeBob’s Pineapple',
    emoji: '🍍',
    cast: 'SpongeBob · Plankton',
    scene: [
      'A bright yellow note is taped to SpongeBob’s door: “Plankton is innocent! Signed, a friend.” SpongeBob beams and wants to call off the search.',
      'Squinting at the tiny handwriting, the team notices it matches Plankton’s exactly.',
    ],
    skill: 'Interpret one color appearing in two places.',
    question: 'What does yellow mean in the note and in SpongeBob?',
    positive: ['truth', 'joy / optimism', 'knowledge'],
    negative: ['dishonesty', 'falseness', 'cowardice'],
    options: [
      { letter: 'U', kind: 'correct', text: 'Yellow’s joy/optimism in SpongeBob makes him trust the cheerful note, but the note itself is falseness and dishonesty.' },
      { letter: 'N', kind: 'wrongColor', text: 'Yellow means growth: the note helps SpongeBob become a better detective.' },
      { letter: 'A', kind: 'oneSided', text: 'Yellow means knowledge: the note teaches the team the real facts.' },
      { letter: 'V', kind: 'oneSided', text: 'Yellow means cowardice: the note shows Plankton is too scared to face anyone.' },
    ],
    why: 'One yellow: the sunny mood (optimism) and the fake note (dishonesty). Plankton is hiding behind the positive side of the color.',
    hint: 'The scene is hiding the negative side. Ask who the yellow is fooling, and why it works so well.',
  },
  {
    id: 4,
    color: 'Green',
    hex: '#16a34a',
    ink: '#ffffff',
    location: 'The Chum Bucket',
    emoji: '🟢',
    cast: 'Plankton · Karen',
    scene: [
      'Plankton peers through a periscope at the Krusty Krab, gritting his teeth as customers line up around the block.',
      '“Once I have that formula,” he mutters, “I can finally start over as a success!”',
    ],
    skill: 'Compare opposite meanings within one character.',
    question: 'How does green describe Plankton?',
    positive: ['new beginnings', 'renewal', 'growth', 'nature', 'health'],
    negative: ['envy / jealousy', 'greed'],
    options: [
      { letter: 'E', kind: 'correct', text: 'Green is envy/jealousy and greed for the Krusty Krab’s success, and also his hope for new beginnings and renewal.' },
      { letter: 'Q', kind: 'wrongColor', text: 'Green means longing: Plankton sadly yearns to be part of a family.' },
      { letter: 'W', kind: 'surface', text: 'Green means nature: the Chum Bucket is overgrown and wild.' },
      { letter: 'J', kind: 'surface', text: 'Green means health: Plankton is eating better and feeling great.' },
    ],
    why: 'Plankton wants a fresh start (positive), but the road to it runs through envy and greed (negative).',
    hint: 'Listen to what he says out loud, and to why he says it. There are two green feelings in one breath.',
  },
  {
    id: 5,
    color: 'Blue',
    hex: '#2563eb',
    ink: '#ffffff',
    location: 'Squidward’s House',
    emoji: '🐙',
    cast: 'Squidward',
    scene: [
      'Squidward saw the thief run past his window. But when the neighbors go door to door together, he closes the shutters and plays his clarinet alone, peacefully.',
      'The song is beautiful. The street outside is empty and no one stops to listen.',
    ],
    skill: 'Analyze how a calm choice leads to an unhappy result.',
    question: 'What is blue doing in this scene?',
    positive: ['serenity / tranquility', 'loyalty', 'longing', 'baptism'],
    negative: ['isolation', 'emotional distance'],
    options: [
      { letter: 'C', kind: 'correct', text: 'Blue’s serenity/tranquility becomes isolation and emotional distance: his calm choice leaves him alone.' },
      { letter: 'Y', kind: 'wrongColor', text: 'Blue means royalty: Squidward acts like a noble above the neighborhood.' },
      { letter: 'H', kind: 'surface', text: 'Blue means loyalty: Squidward is faithfully supporting his neighbors.' },
      { letter: 'D', kind: 'surface', text: 'Blue means baptism: Squidward’s music is a fresh spiritual cleansing.' },
    ],
    why: 'His peace is real, and so is the cost. Serenity chosen over people turns into isolation.',
    hint: 'The scene is hiding the negative side behind a very pleasant sound.',
  },
  {
    id: 6,
    color: 'Purple',
    hex: '#7e22ce',
    ink: '#ffffff',
    location: 'King Neptune’s Palace',
    emoji: '🔱',
    cast: 'King Neptune',
    scene: [
      'King Neptune will help, but only if the team bows and hands over the formula. “A king must be obeyed!” he booms.',
      'When the team refuses, he waves his trident and traps them in a shimmering illusion maze.',
    ],
    skill: 'Decide whether the color is positive, negative, or both.',
    question: 'Which reading of purple is best supported?',
    positive: ['royalty', 'authority', 'magic'],
    negative: ['tyranny', 'illusion'],
    options: [
      { letter: 'O', kind: 'correct', text: 'Both: Neptune’s royalty, authority and magic are real, but they turn into tyranny and illusion when he demands a bow.' },
      { letter: 'Z', kind: 'wrongColor', text: 'Purple means power and elitism: Neptune is simply better than everyone.' },
      { letter: 'I', kind: 'oneSided', text: 'Purple is only positive: a wise king’s magic is guiding the team.' },
      { letter: 'X', kind: 'oneSided', text: 'Purple is only negative: Neptune is a tyrant with no real power at all.' },
    ],
    why: 'Neptune really has authority and magic. The scene shows how that same power turns into tyranny and illusion.',
    hint: 'Neither side wins outright. Look for the moment the same power changes its face.',
  },
  {
    id: 7,
    color: 'Pink',
    hex: '#ec4899',
    ink: '#ffffff',
    location: 'Patrick’s Rock',
    emoji: '⭐',
    cast: 'Patrick · Plankton (in disguise)',
    scene: [
      'A “friendly stranger” (Plankton in a bad wig) tells Patrick he looks like he needs a hug. Patrick hugs him, happily.',
      'Then the stranger offers ice cream, and Patrick trades away a password letter for it without a second thought.',
    ],
    skill: 'Analyze how the same traits both help and hurt.',
    question: 'How does pink explain Patrick’s choice?',
    positive: ['innocence', 'love', 'romance', 'youth'],
    negative: ['naivete', 'vulnerability'],
    options: [
      { letter: 'L', kind: 'correct', text: 'Pink’s innocence and love make Patrick warm, but the same naivete and vulnerability let a stranger take advantage.' },
      { letter: 'K', kind: 'wrongColor', text: 'Pink means loyalty: Patrick stays faithful to his best friend.' },
      { letter: 'S', kind: 'surface', text: 'Pink means romance: the hug and ice cream are a sweet date.' },
      { letter: 'G', kind: 'surface', text: 'Pink means youth: Patrick simply acts like a kid.' },
    ],
    why: 'The exact traits that make Patrick lovable (innocence, love) are what make him easy to trick (naivete, vulnerability).',
    hint: 'One set of traits, two outcomes. The scene is hiding the negative side behind a hug.',
  },
  {
    id: 8,
    color: 'Brown',
    hex: '#92400e',
    ink: '#ffffff',
    location: 'Sandy’s Treedome',
    emoji: '🐿️',
    cast: 'Sandy · SpongeBob',
    scene: [
      'SpongeBob shows off a shiny new gadget that “does everything.” Sandy shrugs, grabs her old brown lasso instead, and ropes the runaway thief’s getaway ship in one throw.',
      'SpongeBob calls the lasso “old-fashioned.” Sandy calls it “reliable.”',
    ],
    skill: 'Evaluate two competing viewpoints using the scene’s outcome.',
    question: 'Which viewpoint does the outcome support, and what does brown say?',
    positive: ['stability / reliability', 'tradition', 'comfort'],
    negative: ['old / outdated', 'dull', 'stagnation'],
    options: [
      { letter: 'O', kind: 'correct', text: 'Brown means both: to SpongeBob the lasso is old/outdated and dull, but it works, so Sandy’s stability/reliability and tradition win.' },
      { letter: 'E', kind: 'wrongColor', text: 'Brown means wisdom and disguise: Sandy is hiding a clever trick.' },
      { letter: 'M', kind: 'surface', text: 'Brown means stagnation: the lasso is outdated, so it fails the team.' },
      { letter: 'N', kind: 'surface', text: 'Brown means comfort: Sandy just likes cozy, familiar things.' },
    ],
    why: 'Both viewpoints are brown words. The result (the lasso works) is the evidence that decides between them.',
    hint: 'Two characters read the same object differently. Let the outcome cast the deciding vote.',
  },
  {
    id: 9,
    color: 'Gray',
    hex: '#6b7280',
    ink: '#ffffff',
    location: 'Rock Bottom',
    emoji: '🌫️',
    cast: 'A faceless stranger',
    scene: [
      'In the dim, foggy streets of Rock Bottom, a hooded gray stranger steps out. “Left at the trench, then straight ahead,” he says in a flat, even voice.',
      'He never shows his face. He could be a helpful local, or Plankton in disguise.',
    ],
    skill: 'Interpret how a setting creates uncertainty.',
    question: 'What does gray tell us about the stranger and the setting?',
    positive: ['neutrality', 'wisdom', 'technology', 'dependable'],
    negative: ['ambiguity', 'uncertainty', 'disguise'],
    options: [
      { letter: 'R', kind: 'correct', text: 'Gray’s neutrality makes him seem harmless, but the ambiguity, uncertainty and possible disguise mean he can’t be trusted or dismissed.' },
      { letter: 'F', kind: 'wrongColor', text: 'Gray means darkness and death: the stranger is clearly dangerous.' },
      { letter: 'A', kind: 'oneSided', text: 'Gray means wisdom: the stranger is a wise local to follow.' },
      { letter: 'T', kind: 'surface', text: 'Gray means technology: the stranger is a robot.' },
    ],
    why: 'Gray sits between two answers. That in-betweenness is neutrality on the good side and ambiguity/disguise on the bad side.',
    hint: 'The scene is hiding the negative side behind a calm voice. What can’t you see?',
  },
  {
    id: 10,
    color: 'Black',
    hex: '#111827',
    ink: '#ffffff',
    location: 'The Flying Dutchman’s Ship',
    emoji: '👻',
    cast: 'The Flying Dutchman',
    scene: [
      'In the green glow of his ghost ship, the Dutchman holds up a password letter. “I’ll give it to ye,” he moans, “in exchange for ye serving on my crew forever.”',
      '“And I always keep my word,” he adds. Every ghost sailor turns toward you.',
    ],
    skill: 'Analyze the real cost of a deal.',
    question: 'What does black reveal about this offer?',
    positive: ['power', 'authority', 'elegance', 'luxury', 'rebellion'],
    negative: ['intimidation', 'fear', 'oppression', 'darkness', 'death', 'void'],
    options: [
      { letter: 'S', kind: 'correct', text: 'Black’s power and authority are real (he keeps his word), but the price is intimidation, fear and oppression: a crew forever.' },
      { letter: 'B', kind: 'surface', text: 'Black means elegance and luxury: a fine offer from a grand ship.' },
      { letter: 'V', kind: 'surface', text: 'Black means the void: the letter simply vanishes into nothing.' },
      { letter: 'H', kind: 'surface', text: 'Black means rebellion: the Dutchman is defying the rules of the sea.' },
    ],
    why: 'The offer is genuine, which is what makes it dangerous. Authority and power are paired with intimidation and oppression.',
    hint: 'Read the price, not the prize. Which side of black is he not advertising?',
  },
  {
    id: 11,
    color: 'White',
    hex: '#f8fafc',
    ink: '#0f172a',
    location: 'Plankton’s Lab',
    emoji: '🧪',
    cast: 'SpongeBob · Plankton',
    scene: [
      'The team bursts into Plankton’s lab. The clue board is wiped completely blank, and there is nothing left to follow.',
      '“A blank board?” says SpongeBob. “That means we get to write the ending!”',
    ],
    skill: 'Create: write a sentence, then find the answer that shows the clash.',
    question: 'First write a sentence for SpongeBob, then choose the best reading of white.',
    positive: ['redemption', 'purity', 'simplicity'],
    negative: ['erasure', 'emptiness', 'sterility'],
    creation: {
      prompt:
        'Write one sentence SpongeBob could say that uses at least one positive white word and one negative white word.',
      positive: ['redemption', 'purity', 'simplicity', 'pure', 'simple', 'redeem'],
      negative: ['erasure', 'emptiness', 'sterility', 'erased', 'empty', 'sterile', 'erase'],
    },
    options: [
      { letter: 'S', kind: 'correct', text: 'The blank board is erasure and emptiness (Plankton wiped the clues), but also a pure, simple page and a chance at redemption for the team.' },
      { letter: 'P', kind: 'wrongColor', text: 'White means new beginnings: the board was cleaned to start a brand-new case.' },
      { letter: 'D', kind: 'reversed', text: 'Plankton’s wiping is redemption and purity, and SpongeBob’s hopeful idea is just erasure and emptiness.' },
      { letter: 'Y', kind: 'surface', text: 'White means a ghost: the empty board proves the lab is haunted.' },
    ],
    why: 'Plankton’s erasure/emptiness is turned by SpongeBob into a pure, simple page. The clash between the two is the point of white.',
    hint: 'Your sentence needs both sides. The board looks empty to one person and pure to another.',
  },
  {
    id: 12,
    color: 'Gold',
    hex: '#eab308',
    ink: '#1c1400',
    location: 'The Golden Spatula',
    emoji: '🥇',
    cast: 'SpongeBob · Mr. Krabs',
    scene: [
      'SpongeBob proudly holds up the Golden Spatula that Mr. Krabs offered as a reward. “Best. Prize. Ever!”',
      'As he waves it around, gold paint flakes off in strips, revealing cheap, shiny plastic underneath.',
    ],
    skill: 'Interpret what an object reveals about a character.',
    question: 'What does the flaking spatula say about gold, and about Mr. Krabs?',
    positive: ['success', 'prestige', 'glory', 'generosity', 'divinity'],
    negative: ['facade', 'egotistical', 'superficial'],
    options: [
      { letter: 'H', kind: 'correct', text: 'Gold promises success, prestige and glory, but the flaking paint exposes a facade: a superficial, egotistical prize.' },
      { letter: 'Z', kind: 'wrongColor', text: 'Gold means strength and obedience: the spatula shows a loyal worker.' },
      { letter: 'L', kind: 'surface', text: 'Gold means generosity: Mr. Krabs is giving a wonderful gift.' },
      { letter: 'C', kind: 'surface', text: 'Gold means divinity: the spatula is a sacred treasure.' },
    ],
    why: 'Gold looks like glory until it flakes. The object reveals Mr. Krabs’ superficial way of “rewarding” his team.',
    hint: 'Don’t stop at the shine. Read what happens when the paint moves.',
  },
  {
    id: 13,
    color: 'Silver',
    hex: '#9ca3af',
    ink: '#0f172a',
    location: 'Karen’s Circuit Room',
    emoji: '🖥️',
    cast: 'Karen · Plankton',
    scene: [
      'Karen calculates the exact location of the vault to the last decimal. “Try not to lose it, Plankton,” she says coolly, insulting him.',
      'While Plankton pouts, a tiny silver light blinks on the screen: she has secretly sent the coordinates to SpongeBob.',
    ],
    skill: 'Evaluate whether a source can be trusted.',
    question: 'What does silver say about Karen as a source?',
    positive: ['precision', 'clarity', 'moonlight'],
    negative: ['coldness', 'artificiality', 'betrayal'],
    options: [
      { letter: 'O', kind: 'correct', text: 'Silver’s precision and clarity make her data reliable, but her coldness and artificiality mean her loyalty can flip: she betrays Plankton.' },
      { letter: 'T', kind: 'wrongColor', text: 'Silver means technology and dependable: Karen is a machine that just follows orders.' },
      { letter: 'U', kind: 'oneSided', text: 'Silver means precision and clarity only: her calculations are perfect, so she is fully trustworthy.' },
      { letter: 'M', kind: 'surface', text: 'Silver means moonlight: her glow is a peaceful night light.' },
    ],
    why: 'Her math is precise, and her allegiance is cold. She’s useful for the team because her betrayal helps them, but it shows loyalty is not one of silver’s promises.',
    hint: 'Both her accuracy and her attitude matter. Which side did Plankton overlook?',
  },
  {
    id: 14,
    color: 'Bronze',
    hex: '#b45309',
    ink: '#ffffff',
    location: 'The Mermalair',
    emoji: '🦸',
    cast: 'Mermaid Man · Barnacle Boy',
    scene: [
      'A corroded bronze statue in the lobby shows Mermaid Man and Barnacle Boy at their prime, chests out, capes flying.',
      'Today the real heroes are older and forgetful, but when Plankton’s traps go off, they still win through teamwork and guard the final letter.',
    ],
    skill: 'Compare past and present.',
    question: 'What does bronze reveal in the statue and the heroes?',
    positive: ['honor', 'legacy', 'unity', 'support'],
    negative: ['faded glory', 'deterioration', 'corrosion'],
    options: [
      { letter: 'W', kind: 'correct', text: 'Bronze shows honor, legacy and unity in their teamwork, while the corrosion and faded glory show deterioration.' },
      { letter: 'R', kind: 'wrongColor', text: 'Bronze means power and darkness: the heroes are feared by all.' },
      { letter: 'E', kind: 'oneSided', text: 'Bronze means only faded glory: the old heroes are finished.' },
      { letter: 'N', kind: 'surface', text: 'Bronze means a third-place medal: the statue is just decoration.' },
    ],
    why: 'Time corrodes the statue, but the legacy survives in what the heroes still do together.',
    hint: 'Look at the statue and the people. One says “what was”, the other says “what still is”.',
  },
];

export interface DeckEntry {
  color: string;
  hex: string;
  ink: string;
  label?: string;
  positive: string[];
  negative: string[];
}

export const DECK: DeckEntry[] = [
  ...STAGES.map((s) => ({
    color: s.color,
    hex: s.hex,
    ink: s.ink,
    positive: s.positive,
    negative: s.negative,
    label:
      s.color === 'Gold'
        ? 'Power and Elitism'
        : s.color === 'Gray'
          ? 'Wisdom and Disguise'
          : s.color === 'Black'
            ? 'Power and Darkness'
            : s.color === 'Bronze'
              ? 'Strength and Obedience'
              : undefined,
  })),
];

export const ROLE_GROUPS = [
  { stages: '1–2', colors: 'Red, Orange' },
  { stages: '3–4', colors: 'Yellow, Green' },
  { stages: '5–6', colors: 'Blue, Purple' },
  { stages: '7–8', colors: 'Pink, Brown' },
  { stages: '9–10', colors: 'Gray, Black' },
  { stages: '11–12', colors: 'White, Gold' },
  { stages: '13–14', colors: 'Silver, Bronze' },
];
