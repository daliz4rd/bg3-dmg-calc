import type { Item } from './types'

// Starter dataset: equipment that applies or benefits from four mechanics.
// Effects are paraphrased from each item's bg3.wiki page (CC BY-NC-SA 4.0);
// follow `wikiUrl` for full details. Acts are inferred from the location.
const W = (page: string) => `https://bg3.wiki/wiki/${page}`

export const ITEMS: readonly Item[] = [
  // ── Radiating Orb ────────────────────────────────────────────────
  {
    id: 'coruscation-ring',
    name: 'Coruscation Ring',
    slot: 'Ring',
    rarity: 'Uncommon',
    act: 2,
    location: 'Last Light Inn cellar: trapped heavy chest in a secret area',
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'applies',
        effect: 'While you are lit, your spell damage also inflicts 2 turns of Radiating Orb.',
      },
    ],
    wikiUrl: W('Coruscation_Ring'),
  },
  {
    id: 'luminous-gloves',
    name: 'Luminous Gloves',
    slot: 'Gloves',
    rarity: 'Uncommon',
    act: 2,
    location: "Ruined Battlefield: the potter's chest",
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'applies',
        effect: 'Your radiant damage inflicts 2 turns of Radiating Orb. Also +1 to Strength saves.',
      },
    ],
    wikiUrl: W('Luminous_Gloves'),
  },
  {
    id: 'luminous-armour',
    name: 'Luminous Armour',
    slot: 'Armour',
    category: 'Medium Armour',
    rarity: 'Uncommon',
    act: 1,
    location: 'Selûnite Outpost: locked, trapped chest behind a hidden door',
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'applies',
        effect: 'Your radiant damage can set off a Radiant Shockwave around the target.',
      },
    ],
    wikiUrl: W('Luminous_Armour'),
    disputed:
      "The Radiating Orb page lists this as a source, but the item's own page only describes Radiant Shockwave.",
  },
  {
    id: 'the-sacred-star',
    name: 'The Sacred Star',
    slot: 'Weapon',
    category: 'Morningstar',
    rarity: 'Very Rare',
    act: 3,
    location: 'Stormshore Tabernacle: sold by Vicar Humbletoes',
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'applies',
        effect: 'Radiant Strike on hit inflicts 1 turn of Radiating Orb. Also grants Dawnburst Strike.',
      },
    ],
    wikiUrl: W('The_Sacred_Star'),
  },
  {
    id: 'fabricated-arbalest',
    name: 'Fabricated Arbalest',
    slot: 'Weapon',
    category: 'Heavy Crossbow',
    rarity: 'Very Rare',
    act: 3,
    location: "Wyrm's Rock Fortress: carried by Enver Gortash",
    twoHanded: true,
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'applies',
        effect: 'Illuminating Shot (bonus action) inflicts 1 turn of Radiating Orb.',
      },
    ],
    wikiUrl: W('Fabricated_Arbalest'),
  },
  {
    id: 'callous-glow-ring',
    name: 'Callous Glow Ring',
    slot: 'Ring',
    rarity: 'Uncommon',
    act: 2,
    location: 'Gauntlet of Shar: opulent chest in the vault room near Balthazar',
    mechanics: [
      {
        mechanic: 'radiating-orb',
        relation: 'benefits',
        effect: 'You deal +2 radiant damage to lit-up creatures, and Radiating Orb lights them up.',
      },
    ],
    wikiUrl: W('Callous_Glow_Ring'),
  },

  // ── Arcane Acuity ────────────────────────────────────────────────
  {
    id: 'helmet-of-arcane-acuity',
    name: 'Helmet of Arcane Acuity',
    slot: 'Helmet',
    rarity: 'Uncommon',
    act: 2,
    location: "Mason's Guild: locked, trapped gilded chest in a secret basement",
    mechanics: [
      {
        mechanic: 'arcane-acuity',
        relation: 'applies',
        effect: 'Weapon attack damage gives you Arcane Acuity for 2 turns. Also +1 to Dexterity saves.',
      },
    ],
    wikiUrl: W('Helmet_of_Arcane_Acuity'),
  },
  {
    id: 'hat-of-fire-acuity',
    name: 'Hat of Fire Acuity',
    slot: 'Helmet',
    rarity: 'Uncommon',
    act: 2,
    location: "Last Light Inn (Act 2) or Rivington (Act 3): carried by the Strange Ox",
    mechanics: [
      {
        mechanic: 'arcane-acuity',
        relation: 'applies',
        effect: 'Fire damage gives you Arcane Acuity for 2 turns (once per attack).',
      },
    ],
    wikiUrl: W('Hat_of_Fire_Acuity'),
  },
  {
    id: 'hat-of-storm-scions-power',
    name: "Hat of Storm Scion's Power",
    slot: 'Helmet',
    rarity: 'Uncommon',
    act: 2,
    location: 'Moonrise Towers: sold by Araj Oblodra (or Crimson Draughts in Act 3)',
    mechanics: [
      {
        mechanic: 'arcane-acuity',
        relation: 'applies',
        effect: "Thunder damage gives you Arcane Acuity for 2 turns. Reverberation's thunder doesn't count.",
      },
    ],
    wikiUrl: W('Hat_of_Storm_Scion%27s_Power'),
  },
  {
    id: 'gloves-of-battlemages-power',
    name: "Gloves of Battlemage's Power",
    slot: 'Gloves',
    rarity: 'Rare',
    act: 2,
    location: 'Reithwin Tollhouse: locked opulent chest, second floor',
    mechanics: [
      {
        mechanic: 'arcane-acuity',
        relation: 'applies',
        effect: 'Hitting with a weapon-based spell or cantrip gives you Arcane Acuity. Also +1 to Strength saves.',
      },
    ],
    wikiUrl: W('Gloves_of_Battlemage%27s_Power'),
  },

  // ── Reverberation ────────────────────────────────────────────────
  {
    id: 'gloves-of-belligerent-skies',
    name: 'Gloves of Belligerent Skies',
    slot: 'Gloves',
    rarity: 'Uncommon',
    act: 1,
    location: "Crèche Y'llek: elegant chest in the Inquisitor's Chamber",
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'applies',
        effect: 'Thunder, lightning or radiant damage inflicts 2 turns of Reverberation (once per attack).',
      },
    ],
    wikiUrl: W('Gloves_of_Belligerent_Skies'),
  },
  {
    id: 'boots-of-stormy-clamour',
    name: 'Boots of Stormy Clamour',
    slot: 'Boots',
    rarity: 'Uncommon',
    act: 1,
    location: 'Ebonlake Grotto: sold by Omeluum after helping investigate the parasite',
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'applies',
        effect: 'Whenever you inflict a condition on an enemy, it also gets 2 turns of Reverberation.',
      },
    ],
    wikiUrl: W('Boots_of_Stormy_Clamour'),
  },
  {
    id: 'spineshudder-amulet',
    name: 'Spineshudder Amulet',
    slot: 'Amulet',
    rarity: 'Uncommon',
    act: 2,
    location: "Moonrise Towers: the mimic in Isobel's upper-floor bedroom",
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'applies',
        effect: 'Ranged spell attack damage inflicts 2 turns of Reverberation.',
      },
    ],
    wikiUrl: W('Spineshudder_Amulet'),
  },
  {
    id: 'markoheshkir',
    name: 'Markoheshkir',
    slot: 'Weapon',
    category: 'Quarterstaff',
    rarity: 'Legendary',
    act: 3,
    location: "Ramazith's Tower: inside a Globe of Invulnerability (See Invisibility + DC 20 Arcana)",
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'applies',
        effect: 'Listed among Reverberation sources on the Reverberation set page.',
      },
    ],
    wikiUrl: W('Markoheshkir'),
    disputed:
      "The Reverberation set page lists it, but the item's own page doesn't describe a Reverberation effect.",
  },
  {
    id: 'ring-of-spiteful-thunder',
    name: 'Ring of Spiteful Thunder',
    slot: 'Ring',
    rarity: 'Uncommon',
    act: 2,
    location: 'Moonrise Towers: sold by Roah Moonglow',
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'benefits',
        effect: 'Thunder damage to a Reverberating enemy Dazes it for 2 turns unless it passes a DC 13 Constitution save.',
      },
    ],
    wikiUrl: W('Ring_of_Spiteful_Thunder'),
  },
  {
    id: 'thunderskin-cloak',
    name: 'Thunderskin Cloak',
    slot: 'Cloak',
    rarity: 'Uncommon',
    act: 2,
    location: 'Moonrise Towers: sold by Araj Oblodra (or Crimson Draughts in Act 3)',
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'benefits',
        effect: 'A Reverberating enemy that damages you must pass a DC 13 Constitution save or be Dazed for 2 turns.',
      },
    ],
    wikiUrl: W('Thunderskin_Cloak'),
  },
  {
    id: 'ring-of-absolute-force',
    name: 'Ring of Absolute Force',
    slot: 'Ring',
    rarity: 'Uncommon',
    act: 1,
    location: 'Grymforge: carried by Sergeant Thrinn',
    mechanics: [
      {
        mechanic: 'reverberation',
        relation: 'benefits',
        effect: "With the Absolute's Brand, thunder spells and attacks deal +1 thunder damage, including Reverberation's burst.",
      },
    ],
    wikiUrl: W('Ring_of_Absolute_Force'),
  },

  // ── Lightning Charges ────────────────────────────────────────────
  {
    id: 'the-joltshooter',
    name: 'The Joltshooter',
    slot: 'Weapon',
    category: 'Longbow',
    rarity: 'Rare',
    act: 1,
    location: "Waukeen's Rest: reward from Counsellor Florrick (Rescue the Grand Duke)",
    twoHanded: true,
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'applies',
        effect: 'Dealing damage with this bow gives you 2 Lightning Charges (once per attack).',
      },
    ],
    wikiUrl: W('The_Joltshooter'),
  },
  {
    id: 'the-sparky-points',
    name: 'The Sparky Points',
    slot: 'Weapon',
    category: 'Trident',
    rarity: 'Rare',
    act: 1,
    location: "Waukeen's Rest: reward from Counsellor Florrick (Rescue the Grand Duke)",
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'applies',
        effect: "Melee damage with this trident gives you 2 Lightning Charges. Throwing it doesn't count.",
      },
    ],
    wikiUrl: W('The_Sparky_Points'),
  },
  {
    id: 'the-spellsparkler',
    name: 'The Spellsparkler',
    slot: 'Weapon',
    category: 'Quarterstaff',
    rarity: 'Rare',
    act: 1,
    location: "Waukeen's Rest: reward from Counsellor Florrick (Rescue the Grand Duke)",
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'applies',
        effect: 'Spell or cantrip damage gives you 2 Lightning Charges (once per attack).',
      },
    ],
    wikiUrl: W('The_Spellsparkler'),
  },
  {
    id: 'the-sparkle-hands',
    name: 'The Sparkle Hands',
    slot: 'Gloves',
    rarity: 'Rare',
    act: 1,
    location: 'Sunlit Wetlands (Decrepit Sanctuary): wooden chest at the base of the giant tree stump',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'both',
        effect: 'Unarmed hits give you 2 Lightning Charges. While charged, you have advantage against metal or armoured foes.',
      },
    ],
    wikiUrl: W('The_Sparkle_Hands'),
  },
  {
    id: 'the-speedy-lightfeet',
    name: 'The Speedy Lightfeet',
    slot: 'Boots',
    rarity: 'Rare',
    act: 1,
    location: 'Blighted Village: heavy chest in the cellar behind the windmill',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'applies',
        effect: 'Dashing (or a similar action) gives you 3 Lightning Charges, once per turn. Also +1 Athletics.',
      },
    ],
    wikiUrl: W('The_Speedy_Lightfeet'),
  },
  {
    id: 'the-watersparkers',
    name: 'The Watersparkers',
    slot: 'Boots',
    rarity: 'Rare',
    act: 1,
    location: "Shattered Sanctum: gilded chest in Minthara's area",
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'applies',
        effect: 'Starting your turn in electrified water gives you 3 Lightning Charges; water you stand in becomes electrified.',
      },
    ],
    wikiUrl: W('The_Watersparkers'),
  },
  {
    id: 'the-blast-pendant',
    name: 'The Blast Pendant',
    slot: 'Amulet',
    rarity: 'Uncommon',
    act: 1,
    location: 'Underdark: worn by the petrified drow Dhourn, west of the Selûnite Outpost',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'benefits',
        effect: 'Lightning Blast (bonus action) spends charges to empower your next spell or cantrip. Once per long rest.',
      },
    ],
    wikiUrl: W('The_Blast_Pendant'),
  },
  {
    id: 'the-jolty-vest',
    name: 'The Jolty Vest',
    slot: 'Armour',
    category: 'Medium Armour',
    rarity: 'Rare',
    act: 1,
    location: 'Zhentarim Basement: sold by Brem after Find the Missing Shipment',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'benefits',
        effect: 'While you have charges, anyone who damages you must make a Dexterity save or be Shocked.',
      },
    ],
    wikiUrl: W('The_Jolty_Vest'),
  },
  {
    id: 'the-lifebringer',
    name: 'The Lifebringer',
    slot: 'Helmet',
    category: 'Circlet',
    rarity: 'Uncommon',
    act: 1,
    location: 'Ebonlake Grotto: sold by Blurg',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'benefits',
        effect: 'Gaining Lightning Charges also gives you 3 temporary hit points, which last while the charges do.',
      },
    ],
    wikiUrl: W('The_Lifebringer'),
  },
  {
    id: 'the-protecty-sparkswall',
    name: 'The Protecty Sparkswall',
    slot: 'Armour',
    category: 'Clothing',
    rarity: 'Rare',
    act: 1,
    location: 'Grymforge: gilded chest at the end of the trapped bridge',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'benefits',
        effect: 'While you have charges, +1 Armour Class and +1 to saving throws. Also +1 spell save DC.',
      },
    ],
    wikiUrl: W('The_Protecty_Sparkswall'),
  },
  {
    id: 'the-real-sparky-sparkswall',
    name: 'The Real Sparky Sparkswall',
    slot: 'Shield',
    rarity: 'Uncommon',
    act: 1,
    location: 'Grymforge: locked, trapped chest',
    mechanics: [
      {
        mechanic: 'lightning-charges',
        relation: 'benefits',
        effect: 'Lightning Aura spends 3 charges to damage and Jolt nearby enemies. Once per long rest.',
      },
    ],
    wikiUrl: W('The_Real_Sparky_Sparkswall'),
  },
]
