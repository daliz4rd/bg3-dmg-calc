// Core data model for the synergy explorer.
//
// The key idea: BG3 gear is hard to choose because items feed shared
// *mechanics* (conditions like Radiating Orb or Lightning Charges). An item
// is only strong if the rest of the kit feeds the same mechanic. So instead of
// modelling raw stats first, every item records which mechanics it touches
// and how.

export type Slot =
  | 'Weapon'
  | 'Shield'
  | 'Helmet'
  | 'Cloak'
  | 'Armour'
  | 'Gloves'
  | 'Boots'
  | 'Amulet'
  | 'Ring'

/** Display order for slots, roughly head-to-toe then hands. */
export const SLOT_ORDER: readonly Slot[] = [
  'Weapon',
  'Shield',
  'Helmet',
  'Cloak',
  'Armour',
  'Gloves',
  'Boots',
  'Amulet',
  'Ring',
]

/** How many of each slot a character can wear at once. */
export const SLOT_CAPACITY: Record<Slot, number> = {
  Weapon: 1, // main hand only for now; off-hand weapons come later
  Shield: 1,
  Helmet: 1,
  Cloak: 1,
  Armour: 1,
  Gloves: 1,
  Boots: 1,
  Amulet: 1,
  Ring: 2,
}

export type MechanicId =
  | 'radiating-orb'
  | 'arcane-acuity'
  | 'reverberation'
  | 'lightning-charges'

/**
 * What a mechanic is *for*, using the goals from the original problem:
 * dealing damage, controlling enemies, or buffing your own side.
 */
export type Role = 'damage' | 'control' | 'buff'

/** Who ends up with the condition. */
export type Target = 'enemy' | 'self'

export interface Mechanic {
  id: MechanicId
  name: string
  role: Role
  target: Target
  /** Plain-language summary of the condition, paraphrased from bg3.wiki. */
  summary: string
  wikiUrl: string
}

/**
 * - applies:  puts the condition on a target (or on yourself)
 * - benefits: gets stronger when the condition is already present
 * - both:     does both
 */
export type Relation = 'applies' | 'benefits' | 'both'

export interface MechanicLink {
  mechanic: MechanicId
  relation: Relation
  /** Paraphrased effect with the numbers that matter. */
  effect: string
}

export type Act = 1 | 2 | 3

export interface Item {
  id: string
  name: string
  slot: Slot
  /** e.g. "Heavy Crossbow", "Medium Armour". */
  category?: string
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary'
  act: Act
  location: string
  twoHanded?: boolean
  mechanics: MechanicLink[]
  wikiUrl: string
  /**
   * Set when sources disagree, e.g. a mechanic page lists the item but the
   * item's own page doesn't describe the effect. Shown in the UI so players
   * know to double-check in game.
   */
  disputed?: string
}
