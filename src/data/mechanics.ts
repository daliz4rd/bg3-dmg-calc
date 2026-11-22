import type { Mechanic } from './types'

// Summaries are paraphrased from bg3.wiki (CC BY-NC-SA 4.0).
export const MECHANICS: readonly Mechanic[] = [
  {
    id: 'radiating-orb',
    name: 'Radiating Orb',
    role: 'control',
    target: 'enemy',
    summary:
      'Each turn of Radiating Orb gives the enemy −1 to attack rolls (up to −10) and makes it glow. Every attack it makes burns off 2 turns.',
    wikiUrl: 'https://bg3.wiki/wiki/Radiating_Orb',
  },
  {
    id: 'arcane-acuity',
    name: 'Arcane Acuity',
    role: 'buff',
    target: 'self',
    summary:
      'Each turn of Arcane Acuity gives you +1 to spell attack rolls and spell save DC (up to 10). Each time you take damage, it loses 2 turns.',
    wikiUrl: 'https://bg3.wiki/wiki/Arcane_Acuity',
  },
  {
    id: 'reverberation',
    name: 'Reverberation',
    role: 'control',
    target: 'enemy',
    summary:
      'Each turn gives the enemy −1 to Strength, Dexterity and Constitution saves. At 5 turns it takes 1d4 thunder damage and must pass a DC 10 Constitution save or fall prone.',
    wikiUrl: 'https://bg3.wiki/wiki/Reverberation',
  },
  {
    id: 'lightning-charges',
    name: 'Lightning Charges',
    role: 'damage',
    target: 'self',
    summary:
      'While charged you get +1 to attack rolls and +1 lightning damage per hit. At 5 charges your next hit adds 1d8 lightning and uses them up. You lose 1 charge per turn.',
    wikiUrl: 'https://bg3.wiki/wiki/Lightning_Charges',
  },
]

export const MECHANIC_BY_ID = Object.fromEntries(
  MECHANICS.map((m) => [m.id, m]),
) as Record<Mechanic['id'], Mechanic>
