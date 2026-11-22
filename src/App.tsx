import { useEffect, useMemo, useState } from 'react'
import { ITEMS } from './data/items'
import { MECHANICS, MECHANIC_BY_ID } from './data/mechanics'
import { SLOT_CAPACITY, SLOT_ORDER, type Act, type Item, type MechanicId, type Relation } from './data/types'
import {
  analyzeLoadout,
  equipBlocker,
  groupBySlot,
  itemsForMechanic,
  relationTo,
  suggestions,
  type SynergyStatus,
} from './engine/synergy'

const STORAGE_KEY = 'bg3-synergy-loadout'

const RELATION_LABEL: Record<Relation, string> = {
  applies: 'Source',
  benefits: 'Payoff',
  both: 'Source + payoff',
}

const STATUS_TEXT: Record<SynergyStatus, string> = {
  complete: 'Hooked up: something applies it and something cashes in.',
  'source-only': 'Applied, but nothing equipped makes it stronger yet.',
  'needs-source': 'Nothing equipped applies it. A spell or class feature might.',
}

// Remember the loadout between visits. Storage can be blocked (private
// windows, strict settings), so failures fall back to an empty loadout.
function loadSavedIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

const rarityClass = (item: Item) => item.rarity.toLowerCase().replace(' ', '-')

export default function App() {
  const [mechanicId, setMechanicId] = useState<MechanicId>('radiating-orb')
  const [maxAct, setMaxAct] = useState<Act>(3)
  const [loadoutIds, setLoadoutIds] = useState<string[]>(loadSavedIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loadoutIds))
    } catch {
      /* not fatal */
    }
  }, [loadoutIds])

  const loadout = useMemo(
    () => loadoutIds.map((id) => ITEMS.find((i) => i.id === id)).filter((i): i is Item => !!i),
    [loadoutIds],
  )
  const pool = useMemo(() => ITEMS.filter((i) => i.act <= maxAct), [maxAct])
  const groups = useMemo(() => groupBySlot(itemsForMechanic(pool, mechanicId)), [pool, mechanicId])
  const reports = useMemo(() => analyzeLoadout(loadout), [loadout])
  const suggested = useMemo(() => suggestions(loadout, pool), [loadout, pool])

  const mechanic = MECHANIC_BY_ID[mechanicId]
  const equip = (item: Item) => setLoadoutIds((ids) => [...ids, item.id])
  const unequip = (item: Item) => setLoadoutIds((ids) => ids.filter((id) => id !== item.id))

  return (
    <div className="app">
      <header className="masthead">
        <h1>BG3 Synergy Explorer</h1>
        <p className="lede">
          Gear in Baldur's Gate 3 works best when several pieces feed the same mechanic. Pick a mechanic to see
          what <em>applies</em> it and what <em>pays off</em> from it, then build a loadout and check what's missing.
        </p>
      </header>

      <nav className="mechanics" aria-label="Mechanics">
        {MECHANICS.map((m) => (
          <button
            key={m.id}
            className="mechanic-tab"
            aria-pressed={m.id === mechanicId}
            onClick={() => setMechanicId(m.id)}
          >
            <span className="mechanic-name">{m.name}</span>
            <span className="role">
              {m.role} · on {m.target === 'self' ? 'you' : 'enemies'}
            </span>
          </button>
        ))}
      </nav>

      <div className="layout">
        <main>
          <section className="mechanic-summary">
            <p>{mechanic.summary}</p>
            <div className="summary-row">
              <a href={mechanic.wikiUrl} target="_blank" rel="noreferrer">
                bg3.wiki ↗
              </a>
              <label className="act-filter">
                Show items up to
                <select value={maxAct} onChange={(e) => setMaxAct(Number(e.target.value) as Act)}>
                  <option value={1}>Act 1</option>
                  <option value={2}>Act 2</option>
                  <option value={3}>Act 3</option>
                </select>
              </label>
            </div>
          </section>

          {groups.length === 0 && <p className="empty">No items for this mechanic up to Act {maxAct}.</p>}

          {groups.map(([slot, items]) => (
            <section key={slot} className="slot-group">
              <h2>{slot}</h2>
              <ul className="item-list">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    relation={relationTo(item, mechanicId)!}
                    effect={item.mechanics.find((m) => m.mechanic === mechanicId)!.effect}
                    equipped={loadoutIds.includes(item.id)}
                    blocker={equipBlocker(loadout, item)}
                    onEquip={() => equip(item)}
                    onUnequip={() => unequip(item)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </main>

        <aside className="loadout" aria-label="Loadout">
          <h2>Loadout</h2>
          <ul className="slots">
            {SLOT_ORDER.flatMap((slot) => {
              const worn = loadout.filter((i) => i.slot === slot)
              return Array.from({ length: SLOT_CAPACITY[slot] }, (_, n) => {
                const item = worn[n]
                return (
                  <li key={`${slot}-${n}`} className={item ? 'slot filled' : 'slot'}>
                    <span className="slot-name">{slot}</span>
                    {item ? (
                      <button className="slot-item" onClick={() => unequip(item)} title="Remove">
                        <span className={`rarity-${rarityClass(item)}`}>{item.name}</span>
                        <span aria-hidden="true">×</span>
                      </button>
                    ) : (
                      <span className="slot-empty">empty</span>
                    )}
                  </li>
                )
              })
            })}
          </ul>

          {loadout.length > 0 && (
            <button className="link-button" onClick={() => setLoadoutIds([])}>
              Clear loadout
            </button>
          )}

          <h3>Synergies</h3>
          {reports.length === 0 ? (
            <p className="muted">Equip an item to see which mechanics it feeds.</p>
          ) : (
            <ul className="reports">
              {reports.map((r) => (
                <li key={r.mechanic} className={`report status-${r.status}`}>
                  <button className="report-name" onClick={() => setMechanicId(r.mechanic)}>
                    {MECHANIC_BY_ID[r.mechanic].name}
                  </button>
                  <p>{STATUS_TEXT[r.status]}</p>
                  <p className="muted">
                    {r.sources.length} source{r.sources.length === 1 ? '' : 's'} · {r.payoffs.length} payoff
                    {r.payoffs.length === 1 ? '' : 's'}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {suggested.length > 0 && (
            <>
              <h3>Would complete a synergy</h3>
              <ul className="suggestions">
                {suggested.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => equip(item)}>
                      + <span className={`rarity-${rarityClass(item)}`}>{item.name}</span>
                      <span className="muted"> · {item.slot}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>

      <footer className="credits">
        Item and condition details are paraphrased from{' '}
        <a href="https://bg3.wiki" target="_blank" rel="noreferrer">
          bg3.wiki
        </a>{' '}
        (CC BY-NC-SA 4.0). Fan project, not affiliated with Larian Studios.
      </footer>
    </div>
  )
}

interface ItemCardProps {
  item: Item
  relation: Relation
  effect: string
  equipped: boolean
  blocker: string | null
  onEquip: () => void
  onUnequip: () => void
}

function ItemCard({ item, relation, effect, equipped, blocker, onEquip, onUnequip }: ItemCardProps) {
  return (
    <li className={`item-card relation-${relation}`}>
      <div className="item-head">
        <a className={`item-name rarity-${rarityClass(item)}`} href={item.wikiUrl} target="_blank" rel="noreferrer">
          {item.name}
        </a>
        <span className={`badge badge-${relation}`}>{RELATION_LABEL[relation]}</span>
      </div>
      <p className="item-meta">
        {[item.category, item.twoHanded && 'Two-handed', item.rarity, `Act ${item.act}`].filter(Boolean).join(' · ')}
      </p>
      <p className="item-effect">{effect}</p>
      <p className="item-location">{item.location}</p>
      {item.disputed && <p className="item-disputed">⚠ {item.disputed}</p>}
      <div className="item-actions">
        {equipped ? (
          <button onClick={onUnequip}>Unequip</button>
        ) : (
          <button onClick={onEquip} disabled={blocker !== null} title={blocker ?? undefined}>
            Equip
          </button>
        )}
        {!equipped && blocker && <span className="muted">{blocker}</span>}
      </div>
    </li>
  )
}
