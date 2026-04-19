import './style.css'
import {
  allAspects,
  getAspectMeta,
  getAspectName,
  getAspectTag,
  getCanonicalAspect,
  gtnhAspectData,
} from './data'

const state = {
  from: 'air',
  to: 'fire',
  minSteps: 1,
  disabled: new Set(),
}

const graph = buildGraph(gtnhAspectData.compounds)

document.querySelector('#app').innerHTML = `
  <div class="shell">
    <header class="hero">
      <div>
        <p class="eyebrow">GTNH Thaumcraft Helper</p>
        <h1>Find valid aspect paths fast.</h1>
        <p class="lede">A modern research calculator for GregTech New Horizons, with the pack-specific aspects and a more Thaumcraft-like presentation.</p>
      </div>
      <div class="hero-card">
        <div class="hero-stat"><span>${allAspects.length}</span><label>aspects</label></div>
        <div class="hero-stat"><span>${Object.keys(gtnhAspectData.compounds).length}</span><label>compound links</label></div>
      </div>
    </header>

    <main class="layout">
      <section class="panel controls-panel">
        <h2>Research inputs</h2>
        <div class="controls-grid">
          <label>
            <span>From</span>
            <select id="from"></select>
          </label>
          <label>
            <span>To</span>
            <select id="to"></select>
          </label>
          <label>
            <span>Minimum steps</span>
            <input id="minSteps" type="number" min="1" max="12" value="1" />
          </label>
        </div>

        <div class="actions">
          <button id="findPath" class="primary">Find path</button>
          <button id="resetBlocked" class="ghost">Reset blocked aspects</button>
        </div>

        <p class="hint">Click aspects below to block ones you do not want the solver to prefer. If no clean route exists, blocked aspects are treated as expensive instead of impossible.</p>
      </section>

      <section class="panel results-panel">
        <div class="results-head">
          <h2>Research chain</h2>
          <span id="resultMeta" class="result-meta"></span>
        </div>
        <div id="result" class="result"></div>
      </section>

      <section class="panel aspect-panel">
        <div class="aspect-head">
          <h2>Available aspects</h2>
          <input id="aspectSearch" type="search" placeholder="Filter aspects" />
        </div>
        <div id="aspectList" class="aspect-list"></div>
      </section>
    </main>
  </div>
`

const fromSelect = document.querySelector('#from')
const toSelect = document.querySelector('#to')
const minStepsInput = document.querySelector('#minSteps')
const resultEl = document.querySelector('#result')
const resultMetaEl = document.querySelector('#resultMeta')
const aspectListEl = document.querySelector('#aspectList')
const aspectSearchEl = document.querySelector('#aspectSearch')

populateAspectSelect(fromSelect)
populateAspectSelect(toSelect)
fromSelect.value = state.from
toSelect.value = state.to

fromSelect.addEventListener('change', () => {
  state.from = fromSelect.value
  renderResult()
})

toSelect.addEventListener('change', () => {
  state.to = toSelect.value
  renderResult()
})

minStepsInput.addEventListener('input', () => {
  const value = Number.parseInt(minStepsInput.value, 10)
  state.minSteps = Number.isNaN(value) ? 1 : Math.max(1, Math.min(12, value))
  minStepsInput.value = String(state.minSteps)
  renderResult()
})

document.querySelector('#findPath').addEventListener('click', renderResult)
document.querySelector('#resetBlocked').addEventListener('click', () => {
  state.disabled.clear()
  renderAspectList(aspectSearchEl.value)
  renderResult()
})

aspectSearchEl.addEventListener('input', () => {
  renderAspectList(aspectSearchEl.value)
})

renderAspectList()
renderResult()

function populateAspectSelect(select) {
  const options = allAspects
    .slice()
    .sort((a, b) => getAspectName(a).localeCompare(getAspectName(b)))
    .map((aspect) => `<option value="${aspect}">${getAspectName(aspect)} (${getAspectTag(aspect)})</option>`)
    .join('')

  select.innerHTML = options
}

function renderAspectList(filter = '') {
  const term = filter.trim().toLowerCase()
  const items = allAspects
    .filter((aspect) => {
      const meta = getAspectMeta(aspect)
      return !term || aspect.includes(term) || meta.name.toLowerCase().includes(term) || meta.tag.includes(term)
    })
    .sort((a, b) => getAspectName(a).localeCompare(getAspectName(b)))
    .map((aspect) => renderAspectChip(aspect, state.disabled.has(aspect)))
    .join('')

  aspectListEl.innerHTML = items

  aspectListEl.querySelectorAll('[data-aspect]').forEach((button) => {
    button.addEventListener('click', () => {
      const { aspect } = button.dataset
      if (state.disabled.has(aspect)) {
        state.disabled.delete(aspect)
      } else {
        state.disabled.add(aspect)
      }
      renderAspectList(filter)
      renderResult()
    })
  })
}

function renderAspectChip(aspect, blocked) {
  const meta = getAspectMeta(aspect)
  const recipe = meta.recipe
    ? `${getAspectName(meta.recipe[0])} + ${getAspectName(meta.recipe[1])}`
    : 'Primal aspect'

  return `
    <button class="aspect-chip ${blocked ? 'blocked' : ''}" data-aspect="${aspect}" type="button">
      <div class="aspect-glyph" style="${glyphStyle(aspect)}">
        <span>${meta.tag.slice(0, 2).toUpperCase()}</span>
      </div>
      <div class="aspect-copy">
        <strong>${meta.name}</strong>
        <span>${meta.tag}</span>
        <small>${recipe}</small>
      </div>
    </button>
  `
}

function renderResult() {
  const path = findPath(state.from, state.to, state.minSteps, state.disabled)

  if (!path) {
    resultEl.innerHTML = `
      <div class="empty-state">
        <h3>No route found</h3>
        <p>Try lowering the minimum steps or unblocking a few aspects.</p>
      </div>
    `
    resultMetaEl.textContent = ''
    return
  }

  const interior = path.slice(1, -1)
  const blockedUsed = interior.filter((aspect) => state.disabled.has(aspect))
  resultMetaEl.textContent = `${Math.max(0, path.length - 2)} steps, ${blockedUsed.length} blocked aspect${blockedUsed.length === 1 ? '' : 's'} used`

  resultEl.innerHTML = `
    <div class="chain-strip">
      ${path.map((aspect, index) => renderChainNode(aspect, index, path)).join('')}
    </div>
    <div class="chain-details">
      ${path.map((aspect, index) => renderPathCard(aspect, index, path)).join('')}
    </div>
  `
}

function renderChainNode(aspect, index, path) {
  const blocked = state.disabled.has(aspect) && index !== 0 && index !== path.length - 1
  return `
    <div class="chain-node ${blocked ? 'used-blocked' : ''}">
      <div class="aspect-glyph large" style="${glyphStyle(aspect)}"><span>${getAspectTag(aspect).slice(0, 2).toUpperCase()}</span></div>
      <strong>${getAspectName(aspect)}</strong>
      <span>${getAspectTag(aspect)}</span>
    </div>
  `
}

function renderPathCard(aspect, index, path) {
  const meta = getAspectMeta(aspect)
  const blocked = state.disabled.has(aspect) && index !== 0 && index !== path.length - 1
  const recipe = meta.recipe
    ? `${getAspectName(meta.recipe[0])} + ${getAspectName(meta.recipe[1])}`
    : 'Primal aspect'

  return `
    <article class="path-card ${blocked ? 'used-blocked' : ''}">
      <div class="path-card-head">
        <div class="aspect-glyph" style="${glyphStyle(aspect)}"><span>${meta.tag.slice(0, 2).toUpperCase()}</span></div>
        <div>
          <strong>${meta.name}</strong>
          <span>${meta.tag}</span>
        </div>
      </div>
      <p>${meta.description}</p>
      <small class="recipe">${recipe}</small>
    </article>
  `
}

function glyphStyle(aspect) {
  const meta = getAspectMeta(aspect)
  return `--aspect-hue:${meta.hue};`
}

function buildGraph(compounds) {
  const next = new Map()

  const connect = (a, b) => {
    if (!next.has(a)) next.set(a, new Set())
    next.get(a).add(b)
  }

  Object.entries(compounds).forEach(([compound, parts]) => {
    parts.forEach((part) => {
      connect(compound, part)
      connect(part, compound)
    })
  })

  return next
}

function findPath(from, to, minSteps, disabled) {
  const queue = [{ path: [from], weight: 0 }]
  const best = new Map()

  while (queue.length) {
    queue.sort((a, b) => a.weight - b.weight || a.path.length - b.path.length)
    const current = queue.shift()
    const node = current.path.at(-1)
    const depth = current.path.length - 1
    const bestKey = `${node}:${depth}`

    if (best.has(bestKey) && best.get(bestKey) <= current.weight) continue
    best.set(bestKey, current.weight)

    if (node === to && depth >= minSteps + 1) return current.path

    const neighbors = [...(graph.get(node) ?? [])]
    for (const rawNeighbor of neighbors) {
      const neighbor = getCanonicalAspect(rawNeighbor)
      if (current.path.length > 1 && neighbor === current.path.at(-2)) continue

      const nextPath = [...current.path, neighbor]
      const extraWeight = disabled.has(neighbor) && neighbor !== to ? 100 : 1
      queue.push({ path: nextPath, weight: current.weight + extraWeight })
    }
  }

  return null
}
