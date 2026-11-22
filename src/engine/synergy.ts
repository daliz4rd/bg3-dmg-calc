// Pure functions that answer the synergy questions. No React, no DOM, so
// everything here is easy to unit-test (see synergy.test.ts).

import {
  SLOT_CAPACITY,
  SLOT_ORDER,
  type Item,
  type MechanicId,
  type Relation,
  type Slot,
} from '../data/types'

const RELATION_RANK: Record<Relation, number> = { both: 0, applies: 1, benefits: 2 }

/** The item's relation to a mechanic, or undefined if it doesn't touch it. */
export function relationTo(item: Item, mechanic: MechanicId): Relation | undefined {
  return item.mechanics.find((m) => m.mechanic === mechanic)?.relation
}

export const feeds = (r: Relation | undefined): boolean => r === 'applies' || r === 'both'
export const usesIt = (r: Relation | undefined): boolean => r === 'benefits' || r === 'both'

/**
 * Every item touching `mechanic`, sources first (both → applies → benefits),
 * then alphabetical.
 */
export function itemsForMechanic(items: readonly Item[], mechanic: MechanicId): Item[] {
  return items
    .filter((i) => relationTo(i, mechanic) !== undefined)
    .sort(
      (a, b) =>
        RELATION_RANK[relationTo(a, mechanic)!] - RELATION_RANK[relationTo(b, mechanic)!] ||
        a.name.localeCompare(b.name),
    )
}

/** Group items by slot in display order, omitting empty slots. */
export function groupBySlot(items: readonly Item[]): [Slot, Item[]][] {
  return SLOT_ORDER.map((slot) => [slot, items.filter((i) => i.slot === slot)] as [Slot, Item[]]).filter(
    ([, list]) => list.length > 0,
  )
}

/**
 * Why `item` can't be added to `loadout`, or null if it fits.
 * The UI uses this to grey out items and explain the clash.
 */
export function equipBlocker(loadout: readonly Item[], item: Item): string | null {
  if (loadout.some((i) => i.id === item.id)) return 'Already equipped'

  const inSlot = loadout.filter((i) => i.slot === item.slot).length
  if (inSlot >= SLOT_CAPACITY[item.slot]) {
    return SLOT_CAPACITY[item.slot] === 1
      ? `${item.slot} slot is full`
      : `Both ${item.slot.toLowerCase()} slots are full`
  }

  const weapon = loadout.find((i) => i.slot === 'Weapon')
  if (item.slot === 'Shield' && weapon?.twoHanded) return `${weapon.name} is two-handed`
  if (item.twoHanded && loadout.some((i) => i.slot === 'Shield')) {
    return 'Two-handed: remove your shield first'
  }
  return null
}

/**
 * - complete:     something applies it and something cashes in on it
 * - source-only:  it gets applied, but nothing equipped makes it stronger
 * - needs-source: you're wearing payoff gear with nothing to trigger it.
 *                 A spell or class feature might still cover it, so this is
 *                 a warning, not an error.
 */
export type SynergyStatus = 'complete' | 'source-only' | 'needs-source'

export interface MechanicReport {
  mechanic: MechanicId
  sources: Item[]
  payoffs: Item[]
  status: SynergyStatus
}

/** For each mechanic the loadout touches, who feeds it and who uses it. */
export function analyzeLoadout(loadout: readonly Item[]): MechanicReport[] {
  const touched = new Set(loadout.flatMap((i) => i.mechanics.map((m) => m.mechanic)))

  return [...touched].map((mechanic) => {
    const sources = loadout.filter((i) => feeds(relationTo(i, mechanic)))
    const payoffs = loadout.filter((i) => usesIt(relationTo(i, mechanic)))
    const status: SynergyStatus =
      sources.length === 0 ? 'needs-source' : payoffs.length === 0 ? 'source-only' : 'complete'
    return { mechanic, sources, payoffs, status }
  })
}

/**
 * Items that would most improve the loadout: payoffs for mechanics you
 * already feed, and sources for payoffs you're wearing without a trigger.
 */
export function suggestions(loadout: readonly Item[], pool: readonly Item[]): Item[] {
  const wanted = analyzeLoadout(loadout).flatMap(({ mechanic, status }) => {
    if (status === 'needs-source') return [{ mechanic, want: feeds }]
    if (status === 'source-only') return [{ mechanic, want: usesIt }]
    return []
  })

  return pool.filter(
    (item) =>
      equipBlocker(loadout, item) === null &&
      wanted.some(({ mechanic, want }) => want(relationTo(item, mechanic))),
  )
}
