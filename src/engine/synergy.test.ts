import { describe, expect, it } from 'vitest'
import { ITEMS } from '../data/items'
import { MECHANIC_BY_ID } from '../data/mechanics'
import { SLOT_ORDER } from '../data/types'
import { analyzeLoadout, equipBlocker, groupBySlot, itemsForMechanic, suggestions } from './synergy'

const item = (id: string) => {
  const found = ITEMS.find((i) => i.id === id)
  if (!found) throw new Error(`No item ${id}`)
  return found
}

describe('dataset integrity', () => {
  it('has unique ids', () => {
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length)
  })

  it('only references known mechanics and slots', () => {
    for (const i of ITEMS) {
      expect(SLOT_ORDER).toContain(i.slot)
      for (const m of i.mechanics) expect(MECHANIC_BY_ID[m.mechanic]).toBeDefined()
    }
  })

  it('every mechanic has at least one source item', () => {
    for (const id of Object.keys(MECHANIC_BY_ID) as (keyof typeof MECHANIC_BY_ID)[]) {
      expect(itemsForMechanic(ITEMS, id).some((i) => i.mechanics.some((m) => m.mechanic === id && m.relation !== 'benefits'))).toBe(true)
    }
  })
})

describe('itemsForMechanic', () => {
  it('lists sources before payoffs', () => {
    const list = itemsForMechanic(ITEMS, 'radiating-orb')
    expect(list.at(-1)!.id).toBe('callous-glow-ring')
    expect(list.map((i) => i.id)).not.toContain('the-joltshooter')
  })
})

describe('groupBySlot', () => {
  it('keeps display order and drops empty slots', () => {
    const groups = groupBySlot([item('callous-glow-ring'), item('the-sacred-star')])
    expect(groups.map(([slot]) => slot)).toEqual(['Weapon', 'Ring'])
  })
})

describe('equipBlocker', () => {
  it('allows two rings but not three', () => {
    const rings = [item('coruscation-ring'), item('callous-glow-ring')]
    expect(equipBlocker(rings.slice(0, 1), rings[1])).toBeNull()
    expect(equipBlocker(rings, item('ring-of-spiteful-thunder'))).toMatch(/full/)
  })

  it('blocks a shield with a two-handed weapon, both ways round', () => {
    expect(equipBlocker([item('the-joltshooter')], item('the-real-sparky-sparkswall'))).toMatch(/two-handed/)
    expect(equipBlocker([item('the-real-sparky-sparkswall')], item('the-joltshooter'))).toMatch(/shield/)
  })

  it('blocks duplicates', () => {
    expect(equipBlocker([item('the-sacred-star')], item('the-sacred-star'))).toBe('Already equipped')
  })
})

describe('analyzeLoadout', () => {
  it('marks a source plus a payoff as complete', () => {
    const [report] = analyzeLoadout([item('luminous-gloves'), item('callous-glow-ring')])
    expect(report).toMatchObject({ mechanic: 'radiating-orb', status: 'complete' })
  })

  it('warns when payoff gear has no source', () => {
    const [report] = analyzeLoadout([item('ring-of-spiteful-thunder')])
    expect(report.status).toBe('needs-source')
  })

  it('treats a "both" item as complete on its own', () => {
    const [report] = analyzeLoadout([item('the-sparkle-hands')])
    expect(report.status).toBe('complete')
  })
})

describe('suggestions', () => {
  it('suggests payoffs for a mechanic you already feed, skipping blocked slots', () => {
    const ids = suggestions([item('the-joltshooter')], ITEMS).map((i) => i.id)
    expect(ids).toContain('the-lifebringer')
    expect(ids).not.toContain('the-real-sparky-sparkswall') // shield vs two-handed bow
    expect(ids).not.toContain('callous-glow-ring') // different mechanic
  })
})
