# BG3 Synergy Explorer

**Live demo: https://daliz4rd.github.io/bg3-dmg-calc/**

Choosing gear in Baldur's Gate 3 is overwhelming because items rarely matter on their own. They matter because they feed shared **mechanics**: conditions like Radiating Orb, Arcane Acuity, Reverberation or Lightning Charges. One piece *applies* the condition, another *pays off* from it, and a good loadout links them.

This tool organizes gear around those mechanics:

- **Explore**: pick a mechanic and see every item that applies it or benefits from it, grouped by slot, with where to find it and which act it's in.
- **Build**: equip items into a loadout. Slot rules are enforced: two rings, and no shield with a two-handed weapon.
- **Check**: for each mechanic in your loadout, see whether it's hooked up (source + payoff), applied with nothing cashing in, or a payoff with nothing triggering it. You also get suggestions for what would complete it.

## Tech

- **React + TypeScript**, built with **Vite**: a static site with no backend.
- `src/data/`: typed data model (`types.ts`) plus the curated mechanics and items.
- `src/engine/synergy.ts`: pure functions for filtering, slot rules and synergy analysis. No UI code, so it's fully unit-tested (`synergy.test.ts`, **Vitest**).
- `src/App.tsx`: the UI. The loadout persists in `localStorage`.

```bash
npm install
npm run dev     # local dev server
npm test        # unit tests
npm run build   # type-check + production build
```

## Data

The starter dataset covers 28 items across 4 mechanics. Effects are paraphrased from [bg3.wiki](https://bg3.wiki) (CC BY-NC-SA 4.0), and each item links to its wiki page. Items where sources disagree are flagged in the UI instead of being silently included or dropped.

## Roadmap

- More mechanics (bleeding, Wet + lightning/cold, Psychic, Ki and Bardic Inspiration support gear)
- Damage calculator: expected damage per turn for a loadout against a target AC
- Data import pipeline from game stat files instead of hand curation

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which lints, tests, builds and publishes to GitHub Pages.
