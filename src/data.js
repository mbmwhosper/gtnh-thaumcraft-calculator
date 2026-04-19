export const aspectData = {
  aer: { name: 'Aer', tag: 'aer', iconTag: 'aer', tier: 'primal', recipe: null, description: 'Air, breath, and motion waiting to happen.' },
  terra: { name: 'Terra', tag: 'terra', iconTag: 'terra', tier: 'primal', recipe: null, description: 'Stone, soil, stability, and weight.' },
  ignis: { name: 'Ignis', tag: 'ignis', iconTag: 'ignis', tier: 'primal', recipe: null, description: 'Heat, flame, and raw combustion.' },
  aqua: { name: 'Aqua', tag: 'aqua', iconTag: 'aqua', tier: 'primal', recipe: null, description: 'Water, flow, and dissolving force.' },
  ordo: { name: 'Ordo', tag: 'ordo', iconTag: 'ordo', tier: 'primal', recipe: null, description: 'Structure, purity, and pattern.' },
  perditio: { name: 'Perditio', tag: 'perditio', iconTag: 'perditio', tier: 'primal', recipe: null, description: 'Decay, chaos, and unraveling.' },

  permutatio: { name: 'Permutatio', tag: 'permutatio', iconTag: 'permutatio', tier: 'compound', recipe: ['ordo', 'perditio'], description: 'Change, exchange, and transmutation.' },
  vitreus: { name: 'Vitreus', tag: 'vitreus', iconTag: 'vitreus', tier: 'compound', recipe: ['ordo', 'terra'], description: 'Crystal, glass, and structure.' },
  victus: { name: 'Victus', tag: 'victus', iconTag: 'victus', tier: 'compound', recipe: ['aqua', 'terra'], description: 'Life and nourishment.' },
  metallum: { name: 'Metallum', tag: 'metallum', iconTag: 'metallum', tier: 'compound', recipe: ['vitreus', 'terra'], description: 'Metal and refined ore.' },
  sano: { name: 'Sano', tag: 'sano', iconTag: 'sano', tier: 'compound', recipe: ['victus', 'ordo'], description: 'Healing and restoration.' },
  motus: { name: 'Motus', tag: 'motus', iconTag: 'motus', tier: 'compound', recipe: ['aer', 'ordo'], description: 'Movement, impulse, and spin.' },
  iter: { name: 'Iter', tag: 'iter', iconTag: 'iter', tier: 'compound', recipe: ['motus', 'terra'], description: 'Travel, passage, and journey.' },
  mortuus: { name: 'Mortuus', tag: 'mortuus', iconTag: 'mortuus', tier: 'compound', recipe: ['victus', 'perditio'], description: 'Death and the ending of life.' },
  herba: { name: 'Herba', tag: 'herba', iconTag: 'herba', tier: 'compound', recipe: ['victus', 'terra'], description: 'Plant growth and greenery.' },
  limus: { name: 'Limus', tag: 'limus', iconTag: 'limus', tier: 'compound', recipe: ['victus', 'aqua'], description: 'Slime, ooze, and wet residue.' },
  bestia: { name: 'Bestia', tag: 'bestia', iconTag: 'bestia', tier: 'compound', recipe: ['motus', 'victus'], description: 'Animal instinct and vitality.' },
  caelum: { name: 'Caelum', tag: 'caelum', iconTag: 'tempestas', tier: 'gtnh', recipe: ['vitreus', 'metallum'], description: 'Sky-aligned height and higher order atmosphere.' },
  spiritus: { name: 'Spiritus', tag: 'spiritus', iconTag: 'spiritus', tier: 'compound', recipe: ['victus', 'mortuus'], description: 'Spirit and animating essence.' },
  magneto: { name: 'Magneto', tag: 'magneto', iconTag: 'magneto', tier: 'gtnh', recipe: ['metallum', 'iter'], description: 'Magnetism, pull, and field alignment.' },
  aequalitas: { name: 'Aequalitas', tag: 'aequalitas', iconTag: 'ordo', tier: 'gtnh', recipe: ['cognitio', 'ordo'], description: 'Balance, parity, and equal measure.' },
  corpus: { name: 'Corpus', tag: 'corpus', iconTag: 'corpus', tier: 'compound', recipe: ['mortuus', 'bestia'], description: 'Flesh and body.' },
  cognitio: { name: 'Cognitio', tag: 'cognitio', iconTag: 'cognitio', tier: 'compound', recipe: ['ignis', 'spiritus'], description: 'Thought, knowledge, and reasoning.' },
  humanus: { name: 'Humanus', tag: 'humanus', iconTag: 'humanus', tier: 'compound', recipe: ['bestia', 'cognitio'], description: 'Humanity and personhood.' },
  instrumentum: { name: 'Instrumentum', tag: 'instrumentum', iconTag: 'instrumentum', tier: 'compound', recipe: ['humanus', 'ordo'], description: 'Implements, tools, and function.' },
  perfodio: { name: 'Perfodio', tag: 'perfodio', iconTag: 'perfodio', tier: 'compound', recipe: ['humanus', 'terra'], description: 'Digging, mining, and boring through matter.' },
  luxuria: { name: 'Luxuria', tag: 'luxuria', iconTag: 'luxuria', tier: 'gtnh', recipe: ['corpus', 'fames'], description: 'Excess, indulgence, and overconsumption.' },
  tutamen: { name: 'Tutamen', tag: 'tutamen', iconTag: 'tutamen', tier: 'compound', recipe: ['instrumentum', 'terra'], description: 'Protection and shielding.' },
  machina: { name: 'Machina', tag: 'machina', iconTag: 'machina', tier: 'compound', recipe: ['motus', 'instrumentum'], description: 'Machines and engineered systems.' },
  messis: { name: 'Messis', tag: 'messis', iconTag: 'messis', tier: 'compound', recipe: ['herba', 'humanus'], description: 'Crops and cultivated growth.' },
  lucrum: { name: 'Lucrum', tag: 'lucrum', iconTag: 'lucrum', tier: 'compound', recipe: ['humanus', 'fames'], description: 'Want, wealth, and acquisitiveness.' },
  electrum: { name: 'Electrum', tag: 'electrum', iconTag: 'electrum', tier: 'gtnh', recipe: ['potentia', 'machina'], description: 'Electric force and charged machinery.' },
  tabernus: { name: 'Tabernus', tag: 'tabernus', iconTag: 'tutamen', tier: 'gtnh', recipe: ['tutamen', 'iter'], description: 'Shelter, dwelling, and secure waystations.' },
  pannus: { name: 'Pannus', tag: 'pannus', iconTag: 'pannus', tier: 'compound', recipe: ['instrumentum', 'bestia'], description: 'Cloth, fabric, and worked fibers.' },
  fabrico: { name: 'Fabrico', tag: 'fabrico', iconTag: 'fabrico', tier: 'compound', recipe: ['humanus', 'instrumentum'], description: 'Making, building, and assembly.' },
  meto: { name: 'Meto', tag: 'meto', iconTag: 'meto', tier: 'compound', recipe: ['messis', 'instrumentum'], description: 'Harvesting and gathering.' },
  potentia: { name: 'Potentia', tag: 'potentia', iconTag: 'potentia', tier: 'compound', recipe: ['ordo', 'ignis'], description: 'Stored force and power.' },
  gelum: { name: 'Gelum', tag: 'gelum', iconTag: 'gelum', tier: 'compound', recipe: ['ignis', 'perditio'], description: 'Frost and deep chill.' },
  venenum: { name: 'Venenum', tag: 'venenum', iconTag: 'venenum', tier: 'compound', recipe: ['aqua', 'perditio'], description: 'Toxicity and corruption.' },
  vacuos: { name: 'Vacuos', tag: 'vacuos', iconTag: 'vacuos', tier: 'compound', recipe: ['aer', 'perditio'], description: 'Emptiness and absence.' },
  lux: { name: 'Lux', tag: 'lux', iconTag: 'lux', tier: 'compound', recipe: ['aer', 'ignis'], description: 'Illumination and radiance.' },
  vinculum: { name: 'Vinculum', tag: 'vinculum', iconTag: 'vinculum', tier: 'compound', recipe: ['motus', 'perditio'], description: 'Binding, trapping, and restraint.' },
  volatus: { name: 'Volatus', tag: 'volatus', iconTag: 'volatus', tier: 'compound', recipe: ['aer', 'motus'], description: 'Flight, lift, and ascent.' },
  praecantatio: { name: 'Praecantatio', tag: 'praecantatio', iconTag: 'praecantatio', tier: 'compound', recipe: ['potentia', 'vacuos'], description: 'Arcane charge and magical force.' },
  radio: { name: 'Radio', tag: 'radio', iconTag: 'radio', tier: 'gtnh', recipe: ['lux', 'potentia'], description: 'Radiation and unstable energetic decay.' },
  fames: { name: 'Fames', tag: 'fames', iconTag: 'fames', tier: 'compound', recipe: ['victus', 'vacuos'], description: 'Consumption and appetite.' },
  arbor: { name: 'Arbor', tag: 'arbor', iconTag: 'arbor', tier: 'compound', recipe: ['aer', 'herba'], description: 'Wood, tree growth, and living timber.' },
  tenebrae: { name: 'Tenebrae', tag: 'tenebrae', iconTag: 'tenebrae', tier: 'compound', recipe: ['vacuos', 'lux'], description: 'Shadow and obscurity.' },
  infernus: { name: 'Infernus', tag: 'infernus', iconTag: 'infernus', tier: 'gtnh', recipe: ['ignis', 'praecantatio'], description: 'Infernal fire and hellish magic.' },
  exanimis: { name: 'Exanimis', tag: 'exanimis', iconTag: 'exanimis', tier: 'compound', recipe: ['motus', 'mortuus'], description: 'Unlife and animated remains.' },
  auram: { name: 'Auram', tag: 'auram', iconTag: 'auram', tier: 'compound', recipe: ['praecantatio', 'aer'], description: 'Ambient magical field and vis.' },
  superbia: { name: 'Superbia', tag: 'superbia', iconTag: 'superbia', tier: 'gtnh', recipe: ['volatus', 'vacuos'], description: 'Pride, elevation, and lofty self-regard.' },
  gula: { name: 'Gula', tag: 'gula', iconTag: 'gula', tier: 'gtnh', recipe: ['fames', 'vacuos'], description: 'Gluttony and bottomless hunger.' },
  sensus: { name: 'Sensus', tag: 'sensus', iconTag: 'sensus', tier: 'compound', recipe: ['aer', 'spiritus'], description: 'Perception, smell, sound, and touch.' },
  alienis: { name: 'Alienis', tag: 'alienis', iconTag: 'alienis', tier: 'compound', recipe: ['vacuos', 'tenebrae'], description: 'The strange and unknowable.' },
  strontio: { name: 'Strontio', tag: 'strontio', iconTag: 'stronito', tier: 'gtnh', recipe: ['cognitio', 'perditio'], description: 'Mental static, folly, and bad decisions.' },
  invidia: { name: 'Invidia', tag: 'invidia', iconTag: 'invidia', tier: 'gtnh', recipe: ['sensus', 'fames'], description: 'Envy, craving, and covetous comparison.' },
  telum: { name: 'Telum', tag: 'telum', iconTag: 'telum', tier: 'compound', recipe: ['instrumentum', 'ignis'], description: 'Weaponry, attack, and directed harm.' },
  ira: { name: 'Ira', tag: 'ira', iconTag: 'ira', tier: 'gtnh', recipe: ['telum', 'ignis'], description: 'Wrath, fury, and destructive aggression.' },
}

export const allAspects = Object.keys(aspectData)

export const aspectKeysByTag = Object.fromEntries(
  Object.entries(aspectData).map(([key, value]) => [value.tag, key]),
)

export const gtnhAspectData = {
  base: allAspects.filter((key) => aspectData[key].tier === 'primal'),
  compounds: Object.fromEntries(
    Object.entries(aspectData)
      .filter(([, value]) => Array.isArray(value.recipe))
      .map(([key, value]) => [key, value.recipe]),
  ),
}

export function getAspectName(key) {
  return aspectData[key]?.name ?? key
}

export function getAspectTag(key) {
  return aspectData[key]?.tag ?? key
}

export function getAspectMeta(key) {
  return aspectData[key]
}

export function getAspectIconPath(key) {
  const meta = aspectData[key]
  const iconTag = meta?.iconTag ?? meta?.tag ?? key
  return `./aspects/color/${iconTag}.png`
}

export function getCanonicalAspect(keyOrTag) {
  return aspectKeysByTag[keyOrTag] ?? keyOrTag
}
