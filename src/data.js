export const aspectData = {
  air: { name: 'Aer', tag: 'aer', hue: 205, tier: 'primal', recipe: null, description: 'Air, breath, and motion waiting to happen.' },
  earth: { name: 'Terra', tag: 'terra', hue: 95, tier: 'primal', recipe: null, description: 'Stone, soil, stability, and weight.' },
  fire: { name: 'Ignis', tag: 'ignis', hue: 18, tier: 'primal', recipe: null, description: 'Heat, flame, and raw combustion.' },
  water: { name: 'Aqua', tag: 'aqua', hue: 196, tier: 'primal', recipe: null, description: 'Water, flow, and dissolving force.' },
  order: { name: 'Ordo', tag: 'ordo', hue: 42, tier: 'primal', recipe: null, description: 'Structure, purity, and pattern.' },
  entropy: { name: 'Perditio', tag: 'perditio', hue: 320, tier: 'primal', recipe: null, description: 'Decay, chaos, and unraveling.' },
  void: { name: 'Vacuos', tag: 'vacuos', hue: 265, tier: 'compound', recipe: ['air', 'entropy'], description: 'Emptiness and absence.' },
  light: { name: 'Lux', tag: 'lux', hue: 48, tier: 'compound', recipe: ['air', 'fire'], description: 'Illumination and radiance.' },
  energy: { name: 'Potentia', tag: 'potentia', hue: 28, tier: 'compound', recipe: ['order', 'fire'], description: 'Stored force and power.' },
  motion: { name: 'Motus', tag: 'motus', hue: 215, tier: 'compound', recipe: ['air', 'order'], description: 'Movement, impulse, and spin.' },
  life: { name: 'Victus', tag: 'victus', hue: 140, tier: 'compound', recipe: ['water', 'earth'], description: 'Life and nourishment.' },
  weather: { name: 'Tempestas', tag: 'tempestas', hue: 188, tier: 'compound', recipe: ['air', 'water'], description: 'Storms, pressure, and weather.' },
  cold: { name: 'Gelum', tag: 'gelum', hue: 197, tier: 'compound', recipe: ['fire', 'entropy'], description: 'Frost and deep chill.' },
  crystal: { name: 'Vitreus', tag: 'vitreus', hue: 186, tier: 'compound', recipe: ['earth', 'air'], description: 'Crystal, glass, and structure.' },
  death: { name: 'Mortuus', tag: 'mortuus', hue: 334, tier: 'compound', recipe: ['water', 'entropy'], description: 'Death and the ending of life.' },
  flight: { name: 'Volatus', tag: 'volatus', hue: 229, tier: 'compound', recipe: ['air', 'motion'], description: 'Flight, lift, and ascent.' },
  darkness: { name: 'Tenebrae', tag: 'tenebrae', hue: 262, tier: 'compound', recipe: ['void', 'light'], description: 'Shadow and obscurity.' },
  soul: { name: 'Spiritus', tag: 'spiritus', hue: 295, tier: 'compound', recipe: ['life', 'death'], description: 'Spirit and animating essence.' },
  poison: { name: 'Venenum', tag: 'venenum', hue: 338, tier: 'compound', recipe: ['water', 'death'], description: 'Toxicity and corruption.' },
  eldritch: { name: 'Alienis', tag: 'alienis', hue: 279, tier: 'compound', recipe: ['void', 'darkness'], description: 'The strange and unknowable.' },
  magic: { name: 'Praecantatio', tag: 'praecantatio', hue: 278, tier: 'compound', recipe: ['void', 'energy'], description: 'Arcane charge and magical force.' },
  aura: { name: 'Auram', tag: 'auram', hue: 182, tier: 'compound', recipe: ['energy', 'air'], description: 'Ambient magical field and vis.' },
  taint: { name: 'Vitium', tag: 'vitium', hue: 306, tier: 'compound', recipe: ['energy', 'entropy'], description: 'Warped magical pollution.' },
  plant: { name: 'Herba', tag: 'herba', hue: 116, tier: 'compound', recipe: ['life', 'earth'], description: 'Plant growth and greenery.' },
  beast: { name: 'Bestia', tag: 'bestia', hue: 22, tier: 'compound', recipe: ['motion', 'life'], description: 'Animal instinct and vitality.' },
  undead: { name: 'Exanimis', tag: 'exanimis', hue: 270, tier: 'compound', recipe: ['motion', 'death'], description: 'Unlife and animated remains.' },
  mind: { name: 'Cognitio', tag: 'cognitio', hue: 16, tier: 'compound', recipe: ['fire', 'soul'], description: 'Thought, knowledge, and reasoning.' },
  senses: { name: 'Sensus', tag: 'sensus', hue: 328, tier: 'compound', recipe: ['air', 'soul'], description: 'Perception, smell, sound, and touch.' },
  man: { name: 'Humanus', tag: 'humanus', hue: 8, tier: 'compound', recipe: ['soul', 'life'], description: 'Humanity and personhood.' },
  metal: { name: 'Metallum', tag: 'metallum', hue: 210, tier: 'compound', recipe: ['earth', 'order'], description: 'Metal and refined ore.' },
  tool: { name: 'Instrumentum', tag: 'instrumentum', hue: 44, tier: 'compound', recipe: ['metal', 'energy'], description: 'Implements, tools, and function.' },
  aversion: { name: 'Aversio', tag: 'aversio', hue: 349, tier: 'compound', recipe: ['soul', 'entropy'], description: 'Hostility, recoil, and violence.' },
  protect: { name: 'Praemunio', tag: 'praemunio', hue: 124, tier: 'compound', recipe: ['soul', 'earth'], description: 'Protection and shielding.' },
  hunger: { name: 'Fames', tag: 'fames', hue: 31, tier: 'compound', recipe: ['life', 'void'], description: 'Consumption and appetite.' },
  greed: { name: 'Lucrum', tag: 'lucrum', hue: 51, tier: 'compound', recipe: ['man', 'void'], description: 'Want, wealth, and acquisitiveness.' },
  desire: { name: 'Desiderium', tag: 'desiderium', hue: 328, tier: 'compound', recipe: ['soul', 'void'], description: 'Longing and attraction.' },
  craft: { name: 'Fabrico', tag: 'fabrico', hue: 24, tier: 'compound', recipe: ['exchange', 'tool'], description: 'Making, building, and assembly.' },
  mechanism: { name: 'Machina', tag: 'machina', hue: 206, tier: 'compound', recipe: ['motion', 'tool'], description: 'Machines and engineered systems.' },
  trap: { name: 'Vinculum', tag: 'vinculum', hue: 259, tier: 'compound', recipe: ['motion', 'entropy'], description: 'Binding, trapping, and restraint.' },
  exchange: { name: 'Permutatio', tag: 'permutatio', hue: 167, tier: 'compound', recipe: ['entropy', 'order'], description: 'Change, exchange, and transmutation.' },
  electricity: { name: 'Electrum', tag: 'electrum', hue: 53, tier: 'gtnh', recipe: ['energy', 'mechanism'], description: 'GTNH electric force and charged machinery.' },
  magnetism: { name: 'Magneto', tag: 'magneto', hue: 246, tier: 'gtnh', recipe: ['metal', 'flight'], description: 'Magnetism, pull, and field alignment.' },
  cheatiness: { name: 'Nebrisum', tag: 'nebrisum', hue: 285, tier: 'gtnh', recipe: ['craft', 'greed'], description: 'Dubious shortcuts and rule-bending trickery.' },
  radioactivity: { name: 'Radio', tag: 'radio', hue: 102, tier: 'gtnh', recipe: ['light', 'energy'], description: 'Radiation and unstable energetic decay.' },
  stupidity: { name: 'Strontio', tag: 'strontio', hue: 314, tier: 'gtnh', recipe: ['entropy', 'mind'], description: 'Mental static, folly, and bad decisions.' },
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

export function getCanonicalAspect(keyOrTag) {
  return aspectKeysByTag[keyOrTag] ?? keyOrTag
}
