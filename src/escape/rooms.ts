export type Side = 'positive' | 'negative' | 'herring';

export interface Prop {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  label: string;
  clue: string;
  side: Side; // how this object relates to the room's color
  word?: string; // the Color Deck word the evidence supports
}

export interface Cast {
  emoji: string;
  x: number;
  y: number;
  size: number;
  who: string;
}

export interface Line {
  who: string;
  emoji: string;
  text: string;
}

export type Challenge =
  | { kind: 'order'; prompt: string; items: string[] } // items are listed in the CORRECT order
  | { kind: 'tf'; prompt: string; items: { text: string; answer: boolean; why: string }[] };

export interface Room {
  intro: Line[];
  outro: Line[];
  cast: Cast[];
  props: Prop[];
  challenge: Challenge;
}

const N = '🎬';

// SVG viewBox is 800 x 450. The floor sits around y = 330.
export const ROOMS: Record<number, Room> = {
  1: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Morning in Bikini Bottom. The Krusty Krab is about to open for the day.' },
      { who: 'Mr. Krabs', emoji: '🦀', text: 'The safe! The secret formula is GONE! Somebody is going to pay for this!' },
      { who: 'SpongeBob', emoji: '🧽', text: 'Don’t worry, Mr. Krabs! My search team will get it back. Team, look around for evidence!' },
    ],
    outro: [
      { who: 'Plankton', emoji: '🟢', text: 'Hehehe. One letter down, thirteen to go. You’ll never open my vault!' },
    ],
    cast: [{ emoji: '🦀', x: 400, y: 305, size: 84, who: 'Mr. Krabs' }],
    props: [
      { id: 'safe', emoji: '🗄️', x: 150, y: 300, size: 80, label: 'The safe', side: 'negative', word: 'rage / wrath', clue: 'The safe door hangs open and the shelf is bare. Mr. Krabs’ shell is boiling red, and he is shaking with fury.' },
      { id: 'poster', emoji: '🧾', x: 640, y: 210, size: 56, label: 'Wanted poster', side: 'negative', word: 'violence', clue: 'A poster scrawled in thick red marker: “PLANKTON! WANTED FOR FORMULA THEFT!” The letters are gouged into the paper and a claw print is stabbed through it.' },
      { id: 'door', emoji: '🚪', x: 700, y: 300, size: 76, label: 'Front door', side: 'positive', word: 'courage / bravery', clue: 'The door is swinging. Later, Mr. Krabs charges through it, still red in the face, alone, toward the Chum Bucket to save SpongeBob.' },
      { id: 'patty', emoji: '🍔', x: 330, y: 140, size: 54, label: 'Krabby Patty', side: 'herring', clue: 'A Krabby Patty sizzles on the grill. Delicious, but it tells you nothing about the color red.' },
      { id: 'dime', emoji: '🪙', x: 520, y: 150, size: 48, label: 'Lucky dime', side: 'herring', clue: 'Mr. Krabs’ lucky dime is glued to the register. It matters to him, but it isn’t evidence about red.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put what happened to Mr. Krabs in order. Tap the events from first to last.',
      items: [
        'Mr. Krabs finds the safe empty and turns red with rage',
        'He vows revenge on Plankton',
        'Still red, he charges into the Chum Bucket alone',
        'He rescues SpongeBob',
      ],
    },
  },
  2: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Mid-morning at Mrs. Puff’s Boating School. The obstacle course is set up with a row of bright cones.' },
      { who: 'SpongeBob', emoji: '🧽', text: 'I’M READY! I’m going to drive SO well! Does this boat go any faster?!' },
      { who: 'Mrs. Puff', emoji: '🐡', text: 'SpongeBob, please. Slowly. Watch the... oh no.' },
    ],
    outro: [
      { who: 'Mrs. Puff', emoji: '🐡', text: 'I’m going to need a long, long rest. Take your letter and go!' },
    ],
    cast: [
      { emoji: '🐡', x: 660, y: 300, size: 76, who: 'Mrs. Puff' },
      { emoji: '🧽', x: 330, y: 300, size: 70, who: 'SpongeBob' },
    ],
    props: [
      { id: 'cones', emoji: '🚧', x: 150, y: 300, size: 72, label: 'Orange cones', side: 'negative', word: 'hazard / warning', clue: 'A row of bright orange cones lines the course. They exist for one reason: to warn drivers of a hazard.' },
      { id: 'boat', emoji: '🚤', x: 480, y: 310, size: 76, label: 'The boat', side: 'positive', word: 'enthusiasm', clue: 'SpongeBob’s eyes are sparkling and he is bursting with energy. He has never been so excited to drive.' },
      { id: 'clip', emoji: '📋', x: 740, y: 200, size: 50, label: 'Clipboard', side: 'negative', word: 'impulsivity', clue: 'Mrs. Puff’s clipboard reads: “Rule 1: Slow down. Rule 2: See Rule 1.” Skid marks run straight through the cones, and every box is unchecked.' },
      { id: 'light', emoji: '🚦', x: 330, y: 140, size: 54, label: 'Traffic light', side: 'herring', clue: 'The traffic light is stuck on green. That’s a different color’s job, and it’s not part of this scene.' },
      { id: 'buoy', emoji: '🛟', x: 520, y: 150, size: 48, label: 'Lifebuoy', side: 'herring', clue: 'A lifebuoy hangs on the dock. Useful for a swim, but it says nothing about orange.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'SpongeBob drives slowly and carefully.', answer: false, why: 'He floors the pedal.' },
        { text: 'He speeds through a row of orange cones.', answer: true, why: 'The cones are a hazard warning that he ignores.' },
        { text: 'Mrs. Puff’s warnings are ignored.', answer: true, why: 'He ignores her completely.' },
        { text: 'The crash was caused by a broken engine.', answer: false, why: 'It was caused by SpongeBob’s impulsive driving.' },
      ],
    },
  },
  3: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Late morning at a pineapple under the sea. Something is taped to the door.' },
      { who: 'SpongeBob', emoji: '🧽', text: 'A note! “Plankton is innocent! Signed, a friend.” That’s wonderful news! We can all go home!' },
      { who: 'Team', emoji: '🕵️', text: 'Wait. Something about this note feels off. Let’s inspect everything before we believe it.' },
    ],
    outro: [
      { who: 'SpongeBob', emoji: '🧽', text: 'I can’t believe Plankton fooled me. But hey, I found a letter!' },
    ],
    cast: [{ emoji: '🧽', x: 400, y: 305, size: 80, who: 'SpongeBob' }],
    props: [
      { id: 'note', emoji: '📝', x: 150, y: 220, size: 64, label: 'Yellow note', side: 'negative', word: 'falseness', clue: 'The note is bright, cheerful yellow and signed “a friend”. It sounds sure of itself, but there’s no proof, only a claim that Plankton is innocent.' },
      { id: 'lens', emoji: '🔍', x: 560, y: 290, size: 66, label: 'Magnifying glass', side: 'negative', word: 'dishonesty', clue: 'Under the glass, the tiny handwriting matches Plankton’s exactly, from the little curl on every “P” to the cramped spacing. The “friend” is the villain.' },
      { id: 'sun', emoji: '☀️', x: 690, y: 120, size: 70, label: 'Sunny window', side: 'positive', word: 'joy / optimism', clue: 'Sunlight pours through the window. SpongeBob is grinning, sure that every happy note must be true.' },
      { id: 'sunflower', emoji: '🌻', x: 330, y: 140, size: 54, label: 'Sunflower', side: 'herring', clue: 'A sunflower in a pot. It’s yellow, but it’s just a decoration with no connection to the case.' },
      { id: 'snail', emoji: '🐌', x: 500, y: 160, size: 48, label: 'Gary', side: 'herring', clue: 'Gary slowly meows by his bowl. Cute, but not evidence.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the discovery in order. Tap the events from first to last.',
      items: [
        'A cheerful yellow note appears on SpongeBob’s door',
        'SpongeBob celebrates and wants to call off the search',
        'The team notices the handwriting',
        'The note is revealed as Plankton’s',
      ],
    },
  },
  4: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Noon at the Chum Bucket. The lunchtime crowd is across the street, and not at Plankton’s door.' },
      { who: 'Plankton', emoji: '🟢', text: 'Look at them. All of them, lined up for a Krabby Patty. It should be MY line!' },
      { who: 'Plankton', emoji: '🟢', text: 'But once I have that formula, I can finally start over as a success!' },
    ],
    outro: [
      { who: 'Karen', emoji: '🖥️', text: 'Plankton, your plans never work. Anyway, you’ll want to see the next letter.' },
    ],
    cast: [{ emoji: '🟢', x: 400, y: 310, size: 70, who: 'Plankton' }],
    props: [
      { id: 'scope', emoji: '🔭', x: 150, y: 270, size: 72, label: 'Periscope', side: 'negative', word: 'envy / jealousy', clue: 'The periscope is locked on the Krusty Krab, where the line of customers curls around the block. Plankton’s teeth are gritted with envy.' },
      { id: 'chart', emoji: '📉', x: 600, y: 200, size: 64, label: 'Sales chart', side: 'negative', word: 'greed', clue: 'Two charts. The Krusty Krab’s is soaring. The Chum Bucket’s is a flat line with “I WANT THEIR MONEY!” scribbled in green.' },
      { id: 'plan', emoji: '📋', x: 700, y: 300, size: 58, label: 'The plan', side: 'positive', word: 'new beginnings', clue: 'A clipboard titled “PLAN”: step 1, steal the formula. Step 2, “start over.” Step 3, “become a success.” He truly believes he can start fresh.' },
      { id: 'salad', emoji: '🥬', x: 330, y: 140, size: 54, label: 'Wilted salad', side: 'herring', clue: 'A wilted salad on the counter. It’s green, but nobody’s eating it, and it has nothing to do with the plot.' },
      { id: 'fries', emoji: '🍟', x: 480, y: 150, size: 48, label: 'Cold fries', side: 'herring', clue: 'A tray of cold fries. Sad, but not evidence.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'Plankton is spying on the Krusty Krab.', answer: true, why: 'He watches through the periscope.' },
        { text: 'The Chum Bucket has a long line of customers.', answer: false, why: 'The line is at the Krusty Krab.' },
        { text: 'Plankton says the formula will let him start over as a success.', answer: true, why: 'He says it out loud.' },
        { text: 'Plankton is happy with how his restaurant is doing.', answer: false, why: 'He is envious of his rival.' },
      ],
    },
  },
  5: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Early afternoon on a quiet street. Every neighbor is out searching, except one.' },
      { who: 'Team', emoji: '🕵️', text: 'Squidward! Did you see anything this morning?' },
      { who: 'Squidward', emoji: '🐙', text: 'The thief? Yes, I saw him run past. Now, if you don’t mind, I have a clarinet to practice. Alone.' },
    ],
    outro: [
      { who: 'Squidward', emoji: '🐙', text: '...The street is awfully quiet now. Fine. Take your letter.' },
    ],
    cast: [{ emoji: '🐙', x: 400, y: 305, size: 84, who: 'Squidward' }],
    props: [
      { id: 'music', emoji: '🎶', x: 160, y: 190, size: 70, label: 'The clarinet song', side: 'positive', word: 'serenity / tranquility', clue: 'The song drifting out is genuinely lovely: slow, calm and peaceful. Squidward has never sounded so relaxed.' },
      { id: 'shutters', emoji: '🪟', x: 650, y: 210, size: 72, label: 'Shutters', side: 'negative', word: 'isolation', clue: 'The shutters are closed tight. Outside, the neighbors are searching together, side by side, without him.' },
      { id: 'chair', emoji: '🪑', x: 600, y: 310, size: 62, label: 'Chair', side: 'negative', word: 'emotional distance', clue: 'One chair and one music stand. There isn’t a second chair, and no one has stopped by to listen. He didn’t even tell the neighbors what he saw.' },
      { id: 'portrait', emoji: '🖼️', x: 330, y: 140, size: 54, label: 'Portrait', side: 'herring', clue: 'A portrait of Squidward, painted by Squidward. It’s vain, but it tells you nothing about blue.' },
      { id: 'tea', emoji: '🍵', x: 500, y: 150, size: 48, label: 'Tea cup', side: 'herring', clue: 'A steaming cup of tea. It’s cozy, but it isn’t part of the case.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'Squidward saw the thief.', answer: true, why: 'He watched the thief run past.' },
        { text: 'He joins the neighbors in the search.', answer: false, why: 'He stays inside with the shutters closed.' },
        { text: 'He plays his clarinet alone.', answer: true, why: 'His calm choice leaves him by himself.' },
        { text: 'The neighbors are searching separately, with no teamwork.', answer: false, why: 'They are searching together.' },
      ],
    },
  },
  6: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Mid-afternoon in the grand palace of King Neptune, ruler of the seas.' },
      { who: 'King Neptune', emoji: '🧜', text: 'You seek my help? Very well. But a king must be obeyed. Bow before me!' },
      { who: 'King Neptune', emoji: '🧜', text: 'And hand over that formula. It will be safer in a king’s hands. Refuse and... well, you’ll see.' },
    ],
    outro: [
      { who: 'King Neptune', emoji: '🧜', text: 'Hmph. You see through my illusions. Take your letter, and don’t tell anyone about the maze.' },
    ],
    cast: [{ emoji: '🧜', x: 400, y: 295, size: 88, who: 'King Neptune' }],
    props: [
      { id: 'trident', emoji: '🔱', x: 160, y: 290, size: 80, label: 'Trident', side: 'positive', word: 'magic', clue: 'The trident glows with real power. It can summon storms and spells, and the royal hall trembles at its touch.' },
      { id: 'scroll', emoji: '📜', x: 650, y: 250, size: 62, label: 'Royal decree', side: 'negative', word: 'tyranny', clue: 'The decree reads: “Terms of help: 1. Bow. 2. Surrender the formula. 3. Say thank you.” There is no step for refusing.' },
      { id: 'mirror', emoji: '🪞', x: 700, y: 120, size: 60, label: 'Mirror', side: 'negative', word: 'illusion', clue: 'When the team refuses, the reflections stop matching the people standing there. The hall twists into a shimmering maze. None of it is real.' },
      { id: 'conch', emoji: '🐚', x: 300, y: 120, size: 50, label: 'Conch shell', side: 'herring', clue: 'A conch shell on the mantel. It’s pretty, but it has no connection to the case.' },
      { id: 'grapes', emoji: '🍇', x: 480, y: 150, size: 48, label: 'Grapes', side: 'herring', clue: 'A bowl of grapes for the king. Purple fruit, but not evidence.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the events in order. Tap them from first to last.',
      items: [
        'Neptune says he’ll help if the team bows',
        'He also demands the formula',
        'The team refuses',
        'He traps them in an illusion maze',
      ],
    },
  },
  7: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Late afternoon, under the sunny pink rock where Patrick lives.' },
      { who: 'Patrick', emoji: '⭐', text: 'Hi, friends! I’m guarding a secret password letter. It’s a secret. Don’t tell anyone.' },
      { who: 'Friendly Stranger', emoji: '🥸', text: '(Psst, Patrick! I have ice cream, and I’m SUCH a friendly stranger. I just need a hug and... well, you’ll see.)' },
    ],
    outro: [
      { who: 'Patrick', emoji: '⭐', text: 'Wait... the nice man was Plankton? Oh. Whoops.' },
    ],
    cast: [
      { emoji: '⭐', x: 330, y: 300, size: 84, who: 'Patrick' },
      { emoji: '🥸', x: 560, y: 310, size: 66, who: 'Friendly Stranger' },
    ],
    props: [
      { id: 'ice', emoji: '🍦', x: 150, y: 270, size: 72, label: 'Ice cream', side: 'positive', word: 'innocence', clue: 'A pink ice cream cone, offered with a smile. Patrick takes it with pure, sweet joy and a trusting heart.' },
      { id: 'wig', emoji: '🪮', x: 700, y: 220, size: 54, label: 'Wig and mustache', side: 'negative', word: 'naivete', clue: 'The “stranger” wears a crooked wig and a mustache that doesn’t match. Patrick doesn’t notice anything wrong.' },
      { id: 'letter', emoji: '✉️', x: 480, y: 215, size: 56, label: 'Password letter', side: 'negative', word: 'vulnerability', clue: 'Patrick holds the precious password letter like a toy. He hugs the stranger, and the letter changes hands. One kind gesture was all it took.' },
      { id: 'bubbles', emoji: '🫧', x: 330, y: 140, size: 50, label: 'Bubbles', side: 'herring', clue: 'Bubbles float by. Pretty, but they have no connection to the case.' },
      { id: 'pebble', emoji: '🪨', x: 600, y: 140, size: 46, label: 'Pet pebble', side: 'herring', clue: 'Patrick’s pet pebble sits quietly. Sweet, but not evidence.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the events in order. Tap them from first to last.',
      items: [
        'A “friendly stranger” arrives',
        'Patrick hugs him',
        'The stranger offers ice cream',
        'Patrick trades away a password letter',
      ],
    },
  },
  8: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Early evening in a glass dome full of air, acorns and oak trees.' },
      { who: 'SpongeBob', emoji: '🧽', text: 'Sandy, look at this new gadget! It does everything! Your old lasso is so old-fashioned.' },
      { who: 'Sandy', emoji: '🐿️', text: 'Reckon we’ll find out which one works, sugar. A thief’s on the run.' },
    ],
    outro: [
      { who: 'Sandy', emoji: '🐿️', text: 'Old doesn’t mean useless. Take your letter, partner.' },
    ],
    cast: [
      { emoji: '🐿️', x: 400, y: 300, size: 80, who: 'Sandy' },
      { emoji: '🧽', x: 640, y: 305, size: 66, who: 'SpongeBob' },
    ],
    props: [
      { id: 'lasso', emoji: '🪢', x: 150, y: 290, size: 70, label: 'Old brown lasso', side: 'positive', word: 'stability / reliability', clue: 'The lasso is faded and frayed, with patches and knots. It has been the same lasso for years, and it has never missed.' },
      { id: 'gadget', emoji: '🤖', x: 560, y: 190, size: 62, label: 'New gadget', side: 'negative', word: 'old / outdated (SpongeBob’s view)', clue: 'SpongeBob says the lasso looks old, dull and outdated next to the flashy gadget. In his view, anything old is stuck in the past.' },
      { id: 'ship', emoji: '🚀', x: 720, y: 110, size: 56, label: 'Getaway ship', side: 'positive', word: 'tradition', clue: 'The thief’s ship is roped in one throw. The old lasso held. The gadget never got a turn.' },
      { id: 'acorn', emoji: '🌰', x: 300, y: 140, size: 50, label: 'Acorn', side: 'herring', clue: 'A brown acorn on the ground. It’s the right color, but it doesn’t show anything about the case.' },
      { id: 'micro', emoji: '🔬', x: 450, y: 150, size: 48, label: 'Microscope', side: 'herring', clue: 'Sandy’s microscope for experiments. Not part of this scene.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'Sandy picks her old lasso over the new gadget.', answer: true, why: 'She chooses reliability.' },
        { text: 'The gadget catches the thief’s ship.', answer: false, why: 'The lasso does.' },
        { text: 'The lasso works.', answer: true, why: 'That’s the outcome that decides the debate.' },
        { text: 'SpongeBob thinks the lasso is “old-fashioned.”', answer: true, why: 'He sees it as outdated.' },
      ],
    },
  },
  9: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Dusk in Rock Bottom, where the sun doesn’t quite reach and the fog never lifts.' },
      { who: 'Gray Stranger', emoji: '🕵️', text: 'Lost? Left at the trench, then straight ahead. I’m just a local. Nothing to worry about.' },
      { who: 'Team', emoji: '🕵️', text: 'He never shows his face. Is he helping us, or is he Plankton in disguise?' },
    ],
    outro: [
      { who: 'Narrator', emoji: N, text: 'The stranger vanishes into the fog. Whoever he was, he leaves the next letter behind.' },
    ],
    cast: [{ emoji: '🕵️', x: 430, y: 300, size: 84, who: 'Hooded Stranger' }],
    props: [
      { id: 'fog', emoji: '🌫️', x: 160, y: 230, size: 80, label: 'Fog', side: 'negative', word: 'uncertainty', clue: 'Thick gray fog hangs over everything. You can’t see more than a few steps in any direction, and you can’t be sure of anything.' },
      { id: 'signs', emoji: '🪧', x: 650, y: 280, size: 66, label: 'Signpost', side: 'positive', word: 'neutrality', clue: 'The signpost points in every direction equally: impartial, helpful and taking no side. The stranger’s directions sound just as even and flat.' },
      { id: 'prints', emoji: '👣', x: 300, y: 355, size: 50, label: 'Footprints', side: 'negative', word: 'disguise', clue: 'The stranger’s footprints stop in the middle of the street. They could belong to a local, or to someone in disguise.' },
      { id: 'torch', emoji: '🔦', x: 480, y: 140, size: 50, label: 'Flashlight', side: 'herring', clue: 'A flashlight with dead batteries on the ground. Not a clue.' },
      { id: 'bin', emoji: '🗑️', x: 330, y: 150, size: 48, label: 'Trash can', side: 'herring', clue: 'A dented trash can. It’s gray, but it’s just litter.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'The stranger shows his face.', answer: false, why: 'He stays faceless.' },
        { text: 'He offers directions.', answer: true, why: 'Left at the trench, then straight ahead.' },
        { text: 'He could be Plankton in disguise.', answer: true, why: 'The scene leaves it uncertain.' },
        { text: 'The street is bright and clear.', answer: false, why: 'It’s dim and foggy.' },
      ],
    },
  },
  10: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Night falls. A ghost ship rises from the deep, glowing green.' },
      { who: 'The Flying Dutchman', emoji: '👻', text: 'Ye seek a letter, do ye? I’ll give it to ye. In exchange for serving on me crew. Forever.' },
      { who: 'The Flying Dutchman', emoji: '👻', text: 'And I always keep me word.' },
    ],
    outro: [
      { who: 'The Flying Dutchman', emoji: '👻', text: 'Ye were wise not to sign. Take the letter, and mind the sea.' },
    ],
    cast: [{ emoji: '👻', x: 400, y: 280, size: 92, who: 'The Flying Dutchman' }],
    props: [
      { id: 'contract', emoji: '📜', x: 150, y: 260, size: 62, label: 'The contract', side: 'negative', word: 'oppression', clue: 'The contract: “Term of service: FOREVER.” At the bottom there’s a line signed by hundreds of ghost sailors.' },
      { id: 'chain', emoji: '⛓️', x: 640, y: 300, size: 66, label: 'Chains', side: 'negative', word: 'fear', clue: 'Heavy chains rattle on the deck. Every sailor aboard “volunteered.” None of them is smiling.' },
      { id: 'crew', emoji: '☠️', x: 700, y: 150, size: 56, label: 'Crew', side: 'positive', word: 'power / authority', clue: 'The ghost crew turns to watch in silence. The Dutchman’s word is law on this ship, and everyone knows he keeps it.' },
      { id: 'compass', emoji: '🧭', x: 300, y: 130, size: 50, label: 'Compass', side: 'herring', clue: 'A compass spinning in circles. Interesting, but it isn’t part of the deal.' },
      { id: 'parrot', emoji: '🦜', x: 480, y: 150, size: 48, label: 'Parrot', side: 'herring', clue: 'A parrot squawks about treasure. Colorful, but not evidence.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'The Dutchman wants the team to serve for one week.', answer: false, why: 'He wants forever.' },
        { text: 'He always keeps his word.', answer: true, why: 'That’s what makes the deal dangerous.' },
        { text: 'The letter is offered in exchange for service.', answer: true, why: 'It’s a trade.' },
        { text: 'The ghost sailors are cheerful volunteers.', answer: false, why: 'They are bound to the ship.' },
      ],
    },
  },
  11: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Late evening. The team finally reaches Plankton’s lab.' },
      { who: 'Team', emoji: '🕵️', text: 'The clue board! Plankton must have left something. ...It’s blank. Completely blank.' },
      { who: 'SpongeBob', emoji: '🧽', text: 'A blank board? That means we get to write the ending!' },
    ],
    outro: [
      { who: 'SpongeBob', emoji: '🧽', text: 'See? A clean page is the best way to start. On to Karen!' },
    ],
    cast: [{ emoji: '🧽', x: 330, y: 305, size: 76, who: 'SpongeBob' }],
    props: [
      { id: 'board', emoji: '⬜', x: 520, y: 200, size: 110, label: 'Clue board', side: 'negative', word: 'erasure', clue: 'The clue board has been wiped completely clean. Not a smudge of a clue remains. Plankton erased everything.' },
      { id: 'cloth', emoji: '🧼', x: 150, y: 300, size: 62, label: 'Cleaning cloth', side: 'negative', word: 'sterility', clue: 'A cleaning cloth lies in a spotless sink. The whole lab is sterile, every surface gleaming and bare.' },
      { id: 'marker', emoji: '🖊️', x: 700, y: 310, size: 54, label: 'Marker', side: 'positive', word: 'redemption / simplicity', clue: 'A marker sits with its cap off, ready. A blank board is a pure, simple page that SpongeBob can write anything on, a chance to put things right.' },
      { id: 'coat', emoji: '🥼', x: 300, y: 150, size: 52, label: 'Lab coat', side: 'herring', clue: 'A white lab coat on a hook. It’s the right color, but it says nothing about the plot.' },
      { id: 'petri', emoji: '🧫', x: 130, y: 170, size: 48, label: 'Petri dish', side: 'herring', clue: 'A petri dish of something suspicious. Not part of this scene.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the events in order. Tap them from first to last.',
      items: [
        'The team bursts into Plankton’s lab',
        'They find the clue board wiped blank',
        'SpongeBob says a blank board means they get to write the ending',
      ],
    },
  },
  12: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Night approaches. Mr. Krabs holds a surprise ceremony under a spotlight.' },
      { who: 'Mr. Krabs', emoji: '🦀', text: 'For your hard work today, SpongeBob, I present... the GOLDEN SPATULA!' },
      { who: 'SpongeBob', emoji: '🧽', text: 'Best. Prize. Ever! Look how it shines!' },
    ],
    outro: [
      { who: 'Mr. Krabs', emoji: '🦀', text: 'It was on sale, alright? Anyway, here’s your letter.' },
    ],
    cast: [
      { emoji: '🧽', x: 400, y: 305, size: 78, who: 'SpongeBob' },
      { emoji: '🦀', x: 680, y: 310, size: 66, who: 'Mr. Krabs' },
    ],
    props: [
      { id: 'spatula', emoji: '🥇', x: 150, y: 270, size: 80, label: 'Golden Spatula', side: 'positive', word: 'glory / prestige', clue: 'The Golden Spatula gleams under the spotlight. SpongeBob can’t stop admiring it, and the whole crowd is applauding. It looks like the highest honor.' },
      { id: 'flakes', emoji: '🎨', x: 540, y: 340, size: 52, label: 'Paint flakes', side: 'negative', word: 'facade', clue: 'Strips of gold paint curl on the floor beneath the spatula, and they keep coming whenever SpongeBob waves it. It’s only a coat of paint.' },
      { id: 'plastic', emoji: '🔍', x: 700, y: 200, size: 60, label: 'Close-up', side: 'negative', word: 'superficial', clue: 'Up close, the shiny gold has peeled away to reveal cheap gray plastic underneath. It was never gold. It only looked valuable on the surface.' },
      { id: 'horn', emoji: '🎺', x: 330, y: 140, size: 52, label: 'Fanfare horn', side: 'herring', clue: 'A fanfare horn blares. Loud, but it isn’t evidence about gold.' },
      { id: 'cam', emoji: '📸', x: 530, y: 150, size: 48, label: 'Camera', side: 'herring', clue: 'A camera flashes. It’s part of the ceremony, not the case.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the events in order. Tap them from first to last.',
      items: [
        'SpongeBob brags about the gold prize',
        'He waves it around',
        'The gold paint flakes off',
        'Cheap plastic is revealed underneath',
      ],
    },
  },
  13: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Deep in the Chum Bucket, among blinking lights and silver wires, Plankton’s computer wife waits.' },
      { who: 'Karen', emoji: '🖥️', text: 'Vault coordinates calculated. To the last decimal. Try not to lose them, Plankton. You usually do.' },
      { who: 'Karen', emoji: '🖥️', text: '(...A little signal blinks on my dish. He’ll never notice.)' },
    ],
    outro: [
      { who: 'Karen', emoji: '🖥️', text: 'Don’t thank me. I just thought it would be more efficient. Good luck with the heroes.' },
    ],
    cast: [{ emoji: '🖥️', x: 400, y: 285, size: 96, who: 'Karen' }],
    props: [
      { id: 'calc', emoji: '🧮', x: 150, y: 290, size: 70, label: 'Calculations', side: 'positive', word: 'precision / clarity', clue: 'Karen’s numbers scroll by to the last decimal place. Every coordinate is sharp, exact and perfectly clear.' },
      { id: 'insult', emoji: '💬', x: 640, y: 180, size: 62, label: 'Her remark', side: 'negative', word: 'coldness', clue: 'Karen insults Plankton again in a flat, icy voice: no warmth, no pity, no joke, just the cold facts.' },
      { id: 'signal', emoji: '📡', x: 700, y: 300, size: 66, label: 'Secret signal', side: 'negative', word: 'betrayal', clue: 'A tiny silver light blinks on the dish. Behind Plankton’s back, she is quietly sending the coordinates to SpongeBob.' },
      { id: 'battery', emoji: '🔋', x: 300, y: 170, size: 50, label: 'Battery', side: 'herring', clue: 'A spare battery on the desk. Not part of the plot.' },
      { id: 'moon', emoji: '🌙', x: 520, y: 140, size: 48, label: 'Moon in the window', side: 'herring', clue: 'Moonlight shines through the window. A pretty glow, but not evidence about Karen.' },
    ],
    challenge: {
      kind: 'tf',
      prompt: 'Mark each statement True or False, based on the scene.',
      items: [
        { text: 'Karen calculates the vault’s location perfectly.', answer: true, why: 'Her math is precise.' },
        { text: 'She insults Plankton.', answer: true, why: 'She is cold to him.' },
        { text: 'She keeps the coordinates from SpongeBob.', answer: false, why: 'She secretly sends them to SpongeBob.' },
        { text: 'Plankton notices her betrayal.', answer: false, why: 'He doesn’t notice.' },
      ],
    },
  },
  14: {
    intro: [
      { who: 'Narrator', emoji: N, text: 'Almost midnight at the Mermalair, the headquarters of Bikini Bottom’s oldest heroes.' },
      { who: 'Mermaid Man', emoji: '🦸', text: 'Back in my day... wait, what was I saying? Oh yes: EVIL!' },
      { who: 'Barnacle Boy', emoji: '🦹', text: 'Easy, old-timer. We still have one letter to guard. Let’s do this together.' },
    ],
    outro: [
      { who: 'Mermaid Man', emoji: '🦸', text: 'Fourteen letters! You’ve saved the day... Now, which way is the vault?' },
    ],
    cast: [
      { emoji: '🦸', x: 330, y: 300, size: 80, who: 'Mermaid Man' },
      { emoji: '🦹', x: 520, y: 305, size: 70, who: 'Barnacle Boy' },
    ],
    props: [
      { id: 'statue', emoji: '🗿', x: 150, y: 285, size: 84, label: 'Bronze statue', side: 'positive', word: 'honor / legacy', clue: 'The statue shows the heroes in their prime, chests out and capes flying. A monument to everything they stood for, and to the legacy they left behind.' },
      { id: 'clock', emoji: '🕰️', x: 680, y: 150, size: 62, label: 'Old clock', side: 'negative', word: 'deterioration', clue: 'The clock is slow and covered in dust, and green corrosion is creeping across the statue’s surface. Time is wearing everything down. Today the heroes are older and forgetful.' },
      { id: 'shield', emoji: '🛡️', x: 700, y: 300, size: 66, label: 'Dented shield', side: 'positive', word: 'unity', clue: 'The shield is dented, but when Plankton’s traps go off, the two heroes cover for each other, and the team still wins.' },
      { id: 'extinguisher', emoji: '🧯', x: 330, y: 130, size: 50, label: 'Fire extinguisher', side: 'herring', clue: 'A fire extinguisher by the door. Handy, but not part of the story.' },
      { id: 'news', emoji: '📰', x: 500, y: 170, size: 48, label: 'Old newspaper', side: 'herring', clue: 'An old newspaper about a different adventure. Not evidence here.' },
    ],
    challenge: {
      kind: 'order',
      prompt: 'Put the events in order. Tap them from first to last.',
      items: [
        'A corroded statue shows the heroes in their prime',
        'Today the heroes are older and forgetful',
        'Plankton’s traps go off',
        'The heroes win through teamwork',
      ],
    },
  },
};
