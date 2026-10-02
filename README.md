# Operation Chroma Heist

A SpongeBob color-symbolism escape room (React + TypeScript + Vite + Tailwind).

```
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs dist/
```

- Game content (stages, answers, hints, Color Deck): `src/escape/data.ts`
- Artwork: put `hero.png` and `stage-1.png` … `stage-14.png` in `public/escape/`. Missing images fall back to emoji.
- Netlify: build command `npm run build`, publish directory `dist`.
