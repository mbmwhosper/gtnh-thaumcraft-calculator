import './style.css'
import {
  allAspects,
  getAspectIconPath,
  getAspectMeta,
  getAspectName,
  getAspectTag,
  getCanonicalAspect,
  gtnhAspectData,
} from './data'

const PRESET_STORAGE_KEY = 'gtnh-thaumcraft-presets'

const state = {
  from: 'aer',
  to: 'ignis',
  minSteps: 1,
  disabled: new Set(),
  noteMode: true,
}

const graph = buildGraph(gtnhAspectData.compounds)

document.querySelector('#app').innerHTML = `
  <div class="shell">
    <header class="hero">
      <div>
        <p class="eyebrow">GTNH Thaumcraft Helper</p>
        <h1>Find valid aspect paths fast.</h1>
        <p class="lede">A modern research calculator for GregTech New Horizons, with real aspect icons, presets, and a research-note view.</p>
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

        <div class="toggles">
          <label class="toggle-row">
            <input id="noteMode" type="checkbox" checked />
            <span>Research note mode</span>
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

      <section class="panel preset-panel">
        <div class="results-head">
          <h2>Blocked aspect presets</h2>
        </div>
        <div class="preset-controls">
          <input id="presetName" type="text" placeholder="Preset name" />
          <button id="savePreset" class="ghost">Save preset</button>
          <button id="exportPreset" class="ghost">Export current</button>
        </div>
        <label>
          <span>Import preset JSON</span>
          <textarea id="presetImport" rows="4" placeholder='Paste {"name":"...","blocked":["..."]}'></textarea>
        </label>
        <div class="actions compact-actions">
          <button id="importPreset" class="ghost">Import preset</button>
        </div>
        <div id="presetList" class="preset-list"></div>
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
const noteModeInput = document.querySelector('#noteMode')
const resultEl = document.querySelector('#result')
const resultMetaEl = document.querySelector('#resultMeta')
const aspectListEl = document.querySelector('#aspectList')
const aspectSearchEl = document.querySelector('#aspectSearch')
const presetListEl = document.querySelector('#presetList')
const presetNameEl = document.querySelector('#presetName')
const presetImportEl = document.querySelector('#presetImport')

populateAspectSelect(fromSelect)
populateAspectSelect(toSelect)
fromSelect.value = state.from
toSelect.value = state.to
noteModeInput.checked = state.noteMode

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

noteModeInput.addEventListener('change', () => {
  state.noteMode = noteModeInput.checked
  renderResult()
})

document.querySelector('#findPath').addEventListener('click', renderResult)
document.querySelector('#resetBlocked').addEventListener('click', () => {
  state.disabled.clear()
  renderAspectList(aspectSearchEl.value)
  renderResult()
})
document.querySelector('#savePreset').addEventListener('click', savePreset)
document.querySelector('#exportPreset').addEventListener('click', exportCurrentPreset)
document.querySelector('#importPreset').addEventListener('click', importPreset)

aspectSearchEl.addEventListener('input', () => {
  renderAspectList(aspectSearchEl.value)
})

renderPresetList()
renderAspectList()
renderResult()

function populateAspectSelect(select) {
  const options = allAspects
    .slice()
    .sort((a, b) => getAspectName(a).localeCompare(getAspectName(b)))
    .map((aspect) => {
      const meta = getAspectMeta(aspect)
      const missing = meta.iconTag ? '' : ''
      return `<option value="${aspect}">${getAspectName(aspect)} (${getAspectTag(aspect)})${missing}</option>`
    })
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
      if (state.disabled.has(aspect)) state.disabled.delete(aspect)
      else state.disabled.add(aspect)
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
      <img class="aspect-icon" src="${getAspectIconPath(aspect)}" alt="${meta.name}" />
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

  const noteMarkup = state.noteMode ? renderResearchNote(path) : ''

  resultEl.innerHTML = `
    ${noteMarkup}
    <div class="chain-strip">
      ${path.map((aspect, index) => renderChainNode(aspect, index, path)).join('')}
    </div>
    <div class="chain-details">
      ${path.map((aspect, index) => renderPathCard(aspect, index, path)).join('')}
    </div>
  `
}

function renderResearchNote(path) {
  return `
    <section class="note-panel">
      <div class="note-head">
        <h3>Research note layout</h3>
        <span>${Math.max(0, path.length - 2)} filler${path.length - 2 === 1 ? '' : 's'}</span>
      </div>
      <div class="note-chain">
        ${path.map((aspect, index) => `
          <div class="note-node ${index !== 0 && index !== path.length - 1 && state.disabled.has(aspect) ? 'used-blocked' : ''}">
            <img class="aspect-icon large" src="${getAspectIconPath(aspect)}" alt="${getAspectName(aspect)}" />
            <strong>${getAspectName(aspect)}</strong>
            <span>${getAspectTag(aspect)}</span>
          </div>
        `).join('<div class="note-link">→</div>')}
      </div>
      <p class="hint">Read left to right: start aspect, exact fillers, then target aspect.</p>
    </section>
  `
}

function renderChainNode(aspect, index, path) {
  const blocked = state.disabled.has(aspect) && index !== 0 && index !== path.length - 1
  return `
    <div class="chain-node ${blocked ? 'used-blocked' : ''}">
      <img class="aspect-icon large" src="${getAspectIconPath(aspect)}" alt="${getAspectName(aspect)}" />
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
        <img class="aspect-icon" src="${getAspectIconPath(aspect)}" alt="${meta.name}" />
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

function getStoredPresets() {
  try {
    return JSON.parse(localStorage.getItem(PRESET_STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setStoredPresets(presets) {
  localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets))
}

function renderPresetList() {
  const presets = getStoredPresets()
  if (!presets.length) {
    presetListEl.innerHTML = '<p class="hint">No saved presets yet.</p>'
    return
  }

  presetListEl.innerHTML = presets
    .map((preset, index) => `
      <div class="preset-item">
        <div>
          <strong>${preset.name}</strong>
          <span>${preset.blocked.length} blocked</span>
        </div>
        <div class="preset-actions">
          <button class="ghost small-button" data-action="apply" data-index="${index}">Apply</button>
          <button class="ghost small-button" data-action="delete" data-index="${index}">Delete</button>
        </div>
      </div>
    `)
    .join('')

  presetListEl.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index)
      const action = button.dataset.action
      const presets = getStoredPresets()
      const preset = presets[index]
      if (!preset) return

      if (action === 'apply') {
        state.disabled = new Set(preset.blocked.filter((aspect) => allAspects.includes(aspect)))
        renderAspectList(aspectSearchEl.value)
        renderResult()
      }

      if (action === 'delete') {
        presets.splice(index, 1)
        setStoredPresets(presets)
        renderPresetList()
      }
    })
  })
}

function savePreset() {
  const name = presetNameEl.value.trim() || `Preset ${new Date().toLocaleString()}`
  const presets = getStoredPresets()
  presets.push({ name, blocked: [...state.disabled].sort() })
  setStoredPresets(presets)
  presetNameEl.value = ''
  renderPresetList()
}

function exportCurrentPreset() {
  const payload = JSON.stringify({
    name: presetNameEl.value.trim() || 'Exported preset',
    blocked: [...state.disabled].sort(),
  }, null, 2)

  presetImportEl.value = payload
  presetImportEl.focus()
  presetImportEl.select()
}

function importPreset() {
  try {
    const payload = JSON.parse(presetImportEl.value)
    if (!Array.isArray(payload.blocked)) throw new Error('Invalid blocked list')
    const presets = getStoredPresets()
    presets.push({
      name: payload.name || `Imported ${presets.length + 1}`,
      blocked: payload.blocked.filter((aspect) => allAspects.includes(aspect)),
    })
    setStoredPresets(presets)
    presetImportEl.value = ''
    renderPresetList()
  } catch {
    presetImportEl.value = 'Invalid preset JSON'
  }
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
  const queue = [{ path: [from], penalty: 0 }]
  const best = new Map()
  let bestSolution = null

  while (queue.length) {
    queue.sort((a, b) => {
      const aFillers = Math.max(0, a.path.length - 2)
      const bFillers = Math.max(0, b.path.length - 2)
      return aPenaltyScore(a, minSteps) - aPenaltyScore(b, minSteps) || aFillers - bFillers || a.penalty - b.penalty
    })

    const current = queue.shift()
    const node = current.path.at(-1)
    const depth = current.path.length - 1
    const bestKey = `${node}:${depth}`

    if (best.has(bestKey) && best.get(bestKey) <= current.penalty) continue
    best.set(bestKey, current.penalty)

    if (node === to && depth >= minSteps + 1) {
      if (!bestSolution) {
        bestSolution = current.path
      } else {
        const currentFillers = Math.max(0, current.path.length - 2)
        const bestFillers = Math.max(0, bestSolution.length - 2)
        const currentBlocked = countBlocked(current.path, disabled)
        const bestBlocked = countBlocked(bestSolution, disabled)

        if (currentFillers < bestFillers || (currentFillers === bestFillers && currentBlocked < bestBlocked)) {
          bestSolution = current.path
        }
      }
      continue
    }

    if (bestSolution) {
      const currentFillers = Math.max(0, current.path.length - 2)
      const bestFillers = Math.max(0, bestSolution.length - 2)
      if (currentFillers >= bestFillers) continue
    }

    const neighbors = [...(graph.get(node) ?? [])]
    for (const rawNeighbor of neighbors) {
      const neighbor = getCanonicalAspect(rawNeighbor)
      if (current.path.length > 1 && neighbor === current.path.at(-2)) continue

      const nextPath = [...current.path, neighbor]
      const extraPenalty = disabled.has(neighbor) && neighbor !== to ? 1 : 0
      queue.push({ path: nextPath, penalty: current.penalty + extraPenalty })
    }
  }

  return bestSolution
}

function aPenaltyScore(entry, minSteps) {
  const fillers = Math.max(0, entry.path.length - 2)
  const missing = Math.max(0, minSteps - fillers)
  return missing * 1000 + fillers * 10 + entry.penalty
}

function countBlocked(path, disabled) {
  return path.slice(1, -1).filter((aspect) => disabled.has(aspect)).length
}
