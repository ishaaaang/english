export interface Prop {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  label: string;
  clue: string;
}

export interface Cast {
  emoji: string;
  x: number;
  y: number;
  size: number;
  who: string;
}

export interface Room {
  line: { who: string; text: string };
  cast: Cast[];
  props: Prop[];
}

// SVG viewBox is 800 x 450. The floor sits around y = 330.
export const ROOMS: Record<number, Room> = {
  1: {
    line: { who: 'Mr. Krabs', text: 'The safe is EMPTY! Somebody’s going to pay for this!' },
    cast: [{ emoji: '🦀', x: 400, y: 305, size: 84, who: 'Mr. Krabs' }],
    props: [
      { id: 'safe', emoji: '🗄️', x: 150, y: 300, size: 80, label: 'The safe', clue: 'The safe door hangs open and the shelf is bare. Mr. Krabs’ shell is boiling red. Anyone can see the anger.' },
      { id: 'poster', emoji: '🧾', x: 640, y: 210, size: 56, label: 'Wanted poster', clue: 'A poster scrawled in thick red marker: “PLANKTON! WANTED FOR FORMULA THEFT!” The letters are gouged into the paper.' },
      { id: 'door', emoji: '🚪', x: 700, y: 300, size: 76, label: 'Front door', clue: 'The door is swinging. Later on, Mr. Krabs charges through it, still red in the face, alone, toward the Chum Bucket to save SpongeBob.' },
    ],
  },
  2: {
    line: { who: 'Mrs. Puff', text: 'SpongeBob, STOP! The cones! Watch the cones!' },
    cast: [
      { emoji: '🐡', x: 660, y: 300, size: 76, who: 'Mrs. Puff' },
      { emoji: '🧽', x: 330, y: 300, size: 70, who: 'SpongeBob' },
    ],
    props: [
      { id: 'cones', emoji: '🚧', x: 150, y: 300, size: 72, label: 'Orange cones', clue: 'A row of bright orange cones lines the course. They exist for one reason: to warn drivers of a hazard.' },
      { id: 'boat', emoji: '🚤', x: 480, y: 310, size: 76, label: 'The boat', clue: 'Skid marks run straight through the cones. SpongeBob’s eyes are sparkling. He is thrilled and completely ignoring the warnings.' },
      { id: 'clip', emoji: '📋', x: 740, y: 200, size: 50, label: 'Clipboard', clue: 'Mrs. Puff’s clipboard reads: “Rule 1: Slow down. Rule 2: See Rule 1.” Every box is unchecked.' },
    ],
  },
  3: {
    line: { who: 'SpongeBob', text: 'A note! “Plankton is innocent!” Everyone, we can go home!' },
    cast: [{ emoji: '🧽', x: 400, y: 305, size: 80, who: 'SpongeBob' }],
    props: [
      { id: 'note', emoji: '📝', x: 150, y: 220, size: 64, label: 'Yellow note', clue: 'The note is bright, cheerful yellow and signed “a friend”. It sounds sure of itself. It sounds like good news.' },
      { id: 'lens', emoji: '🔍', x: 560, y: 290, size: 66, label: 'Magnifying glass', clue: 'Under the glass, the tiny handwriting matches Plankton’s exactly, from the little curl on every “P” to the cramped spacing.' },
      { id: 'sun', emoji: '☀️', x: 690, y: 120, size: 70, label: 'Sunny window', clue: 'Sunlight pours through the window. SpongeBob is grinning, sure that every happy note must be true.' },
    ],
  },
  4: {
    line: { who: 'Plankton', text: 'Once I have that formula, I can finally start over as a success!' },
    cast: [{ emoji: '🟢', x: 400, y: 310, size: 70, who: 'Plankton' }],
    props: [
      { id: 'scope', emoji: '🔭', x: 150, y: 270, size: 72, label: 'Periscope', clue: 'The periscope is locked on the Krusty Krab, where the line of customers curls around the block. Plankton’s teeth are gritted.' },
      { id: 'chart', emoji: '📉', x: 600, y: 200, size: 64, label: 'Sales chart', clue: 'Two charts. The Krusty Krab’s is soaring. The Chum Bucket’s is a flat line with “WHY NOT ME?” scribbled in green.' },
      { id: 'plan', emoji: '📋', x: 700, y: 300, size: 58, label: 'The plan', clue: 'A clipboard titled “PLAN”: step 1, steal the formula. Step 2, “start over.” Step 3, “become a success.”' },
    ],
  },
  5: {
    line: { who: 'Squidward', text: 'Thief? Yes, I saw him. Now please, leave me to my music.' },
    cast: [{ emoji: '🐙', x: 400, y: 305, size: 84, who: 'Squidward' }],
    props: [
      { id: 'music', emoji: '🎶', x: 160, y: 190, size: 70, label: 'The clarinet song', clue: 'The song drifting out is genuinely lovely: slow, calm and peaceful. Squidward has never sounded so relaxed.' },
      { id: 'shutters', emoji: '🪟', x: 650, y: 210, size: 72, label: 'Shutters', clue: 'The shutters are closed tight. Outside, the neighbors are searching together, side by side, without him.' },
      { id: 'chair', emoji: '🪑', x: 600, y: 310, size: 62, label: 'Chair', clue: 'One chair and one music stand. There isn’t a second chair, and no one has stopped by to listen.' },
    ],
  },
  6: {
    line: { who: 'King Neptune', text: 'Bow before your king and hand over that formula!' },
    cast: [{ emoji: '🧜', x: 400, y: 295, size: 88, who: 'King Neptune' }],
    props: [
      { id: 'trident', emoji: '🔱', x: 160, y: 290, size: 80, label: 'Trident', clue: 'The trident glows. It can summon magic, and when the team refuses to bow, it twists the hall into a shimmering maze.' },
      { id: 'scroll', emoji: '📜', x: 650, y: 250, size: 62, label: 'Royal decree', clue: 'The decree reads: “Terms of help: 1. Bow. 2. Surrender the formula. 3. Say thank you.” There is no step for refusing.' },
      { id: 'mirror', emoji: '🪞', x: 700, y: 120, size: 60, label: 'Mirror', clue: 'The reflections don’t match the people standing there. Some of this hall isn’t real.' },
    ],
  },
  7: {
    line: { who: 'Patrick', text: 'A friendly stranger! He wants to give me ice cream!' },
    cast: [
      { emoji: '⭐', x: 330, y: 300, size: 84, who: 'Patrick' },
      { emoji: '🥸', x: 560, y: 310, size: 66, who: 'Friendly Stranger' },
    ],
    props: [
      { id: 'ice', emoji: '🍦', x: 150, y: 270, size: 72, label: 'Ice cream', clue: 'A pink ice cream cone, offered with a smile. Patrick forgets the whole mission the second he sees it.' },
      { id: 'wig', emoji: '🪮', x: 700, y: 220, size: 54, label: 'Wig and mustache', clue: 'The “stranger” wears a crooked wig and a mustache that doesn’t match. Patrick doesn’t notice anything wrong.' },
      { id: 'letter', emoji: '✉️', x: 480, y: 215, size: 56, label: 'Password letter', clue: 'Patrick holds the precious password letter like a toy. He hugs the stranger, and the letter changes hands.' },
    ],
  },
  8: {
    line: { who: 'Sandy', text: 'That gadget’s fancy, but my old lasso hasn’t let me down yet.' },
    cast: [
      { emoji: '🐿️', x: 400, y: 300, size: 80, who: 'Sandy' },
      { emoji: '🧽', x: 640, y: 305, size: 66, who: 'SpongeBob' },
    ],
    props: [
      { id: 'lasso', emoji: '🪢', x: 150, y: 290, size: 70, label: 'Old brown lasso', clue: 'The lasso is faded and frayed, with patches and knots. It’s been the same lasso for years.' },
      { id: 'gadget', emoji: '🤖', x: 560, y: 190, size: 62, label: 'New gadget', clue: 'The gadget beeps and flashes and “does everything.” Its manual is 400 pages long.' },
      { id: 'ship', emoji: '🚀', x: 720, y: 110, size: 56, label: 'Getaway ship', clue: 'The thief’s ship is roped in one throw. The old lasso held. The gadget never got a turn.' },
    ],
  },
  9: {
    line: { who: 'Gray Stranger', text: 'Left at the trench, then straight ahead.' },
    cast: [{ emoji: '🕵️', x: 430, y: 300, size: 84, who: 'Hooded Stranger' }],
    props: [
      { id: 'fog', emoji: '🌫️', x: 160, y: 230, size: 80, label: 'Fog', clue: 'Thick gray fog hangs over everything. You can’t see more than a few steps in any direction.' },
      { id: 'signs', emoji: '🪧', x: 650, y: 280, size: 66, label: 'Signpost', clue: 'A signpost with two arrows, both pointing the same direction, and both labeled “this way.” One has been painted over.' },
      { id: 'prints', emoji: '👣', x: 300, y: 355, size: 50, label: 'Footprints', clue: 'The stranger’s footprints stop in the middle of the street. They could belong to a local, or to someone in disguise.' },
    ],
  },
  10: {
    line: { who: 'The Flying Dutchman', text: 'Serve on me crew forever, and the letter be yours. I always keep me word.' },
    cast: [{ emoji: '👻', x: 400, y: 280, size: 92, who: 'The Flying Dutchman' }],
    props: [
      { id: 'contract', emoji: '📜', x: 150, y: 260, size: 62, label: 'The contract', clue: 'The contract: “Term of service: FOREVER.” At the bottom there’s a line signed by hundreds of ghost sailors.' },
      { id: 'chain', emoji: '⛓️', x: 640, y: 300, size: 66, label: 'Chains', clue: 'Heavy chains rattle on the deck. Every sailor aboard “volunteered.” None of them is smiling.' },
      { id: 'crew', emoji: '☠️', x: 700, y: 150, size: 56, label: 'Crew', clue: 'The ghost crew turns to watch you in silence. The Dutchman’s word is law on this ship, and everyone knows it.' },
    ],
  },
  11: {
    line: { who: 'SpongeBob', text: 'A blank board? That means we get to write the ending!' },
    cast: [{ emoji: '🧽', x: 330, y: 305, size: 76, who: 'SpongeBob' }],
    props: [
      { id: 'board', emoji: '⬜', x: 520, y: 200, size: 110, label: 'Clue board', clue: 'The clue board has been wiped completely clean. Not a smudge of a clue remains. Plankton erased everything.' },
      { id: 'cloth', emoji: '🧼', x: 150, y: 300, size: 62, label: 'Cleaning cloth', clue: 'A cleaning cloth lies in a spotless sink. The whole lab is sterile, every surface gleaming and bare.' },
      { id: 'marker', emoji: '🖊️', x: 700, y: 310, size: 54, label: 'Marker', clue: 'A marker sits with its cap off, ready. A blank board is the one thing SpongeBob can write anything on.' },
    ],
  },
  12: {
    line: { who: 'SpongeBob', text: 'Best. Prize. Ever! Look how it shines!' },
    cast: [
      { emoji: '🧽', x: 400, y: 305, size: 78, who: 'SpongeBob' },
      { emoji: '🦀', x: 680, y: 310, size: 66, who: 'Mr. Krabs' },
    ],
    props: [
      { id: 'spatula', emoji: '🥇', x: 150, y: 270, size: 80, label: 'Golden Spatula', clue: 'The Golden Spatula gleams under the spotlight. SpongeBob can’t stop admiring it, and the whole crowd is applauding.' },
      { id: 'flakes', emoji: '🎨', x: 540, y: 340, size: 52, label: 'Paint flakes', clue: 'Strips of gold paint curl on the floor beneath the spatula, and they keep coming whenever SpongeBob waves it.' },
      { id: 'plastic', emoji: '🔍', x: 700, y: 200, size: 60, label: 'Close-up', clue: 'Up close, the shiny gold has peeled away to reveal cheap gray plastic underneath. It was never gold.' },
    ],
  },
  13: {
    line: { who: 'Karen', text: 'Vault coordinates calculated. Try not to lose them, Plankton.' },
    cast: [{ emoji: '🖥️', x: 400, y: 285, size: 96, who: 'Karen' }],
    props: [
      { id: 'calc', emoji: '🧮', x: 150, y: 290, size: 70, label: 'Calculations', clue: 'Karen’s numbers scroll by to the last decimal place. Every coordinate is sharp, exact and perfectly clear.' },
      { id: 'insult', emoji: '💬', x: 640, y: 180, size: 62, label: 'Her remark', clue: 'Karen insults Plankton again in a flat, icy voice: no warmth, no pity, no joke, just the cold facts.' },
      { id: 'signal', emoji: '📡', x: 700, y: 300, size: 66, label: 'Secret signal', clue: 'A tiny silver light blinks on the dish. Behind Plankton’s back, she is quietly sending the coordinates to SpongeBob.' },
    ],
  },
  14: {
    line: { who: 'Mermaid Man', text: 'Back in my day... wait, what was I saying? Oh yes: EVIL!' },
    cast: [
      { emoji: '🦸', x: 330, y: 300, size: 80, who: 'Mermaid Man' },
      { emoji: '🦹', x: 520, y: 305, size: 70, who: 'Barnacle Boy' },
    ],
    props: [
      { id: 'statue', emoji: '🗿', x: 150, y: 285, size: 84, label: 'Bronze statue', clue: 'The statue shows the heroes in their prime, chests out and capes flying, but green corrosion is creeping across its surface.' },
      { id: 'clock', emoji: '🕰️', x: 680, y: 150, size: 62, label: 'Old clock', clue: 'The clock is slow and covered in dust. Today the heroes are older and forgetful, but they still show up.' },
      { id: 'shield', emoji: '🛡️', x: 700, y: 300, size: 66, label: 'Dented shield', clue: 'The shield is dented, but when Plankton’s traps go off, the two heroes cover for each other, and the team still wins.' },
    ],
  },
};
