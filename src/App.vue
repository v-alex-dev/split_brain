<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import levelsJson from './levels.json'
import keyboard from './services/keyboard'

const GRID = 10

// Level selection
const currentLevelIdx = ref(0)
const totalLevels = levelsJson.levels.length
const currentLevel = computed(() => levelsJson.levels[currentLevelIdx.value])

// Helpers to convert a 10x10 board to a simple model
const rcToIndex = (r, c) => r * GRID + c
const indexToRC = (idx) => [Math.floor(idx / GRID), idx % GRID]

const boardToModel = (board) => {
  let player = -1
  let goal = -1
  const wall = new Set()
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const v = board[r][c]
      const idx = rcToIndex(r, c)
      if (v === 1) player = idx
      else if (v === 2) goal = idx
      else if (v === 3) wall.add(idx)
    }
  }
  return { time: 60, player, goal, wall }
}

// Two models for left/right boards
const leftModel = ref(boardToModel(currentLevel.value.boards[0]))
const rightModel = ref(boardToModel(currentLevel.value.boards[1]))

// Cells indices 0..99 used to render grids
const cells = computed(() => Array.from({ length: GRID * GRID }, (_, i) => i))

const tileClassAt = (model, idx, side) => {
  if (model.wall.has(idx)) return 'cell wall'
  if (idx === model.goal) return 'cell goal'
  if (idx === model.player) return `cell ${side === 'right' ? 'player2' : 'player'}`
  return 'cell'
}

const canMoveTo = (model, idx) => idx >= 0 && idx < GRID * GRID && !model.wall.has(idx)

const move = (modelRef, dir) => {
  const model = modelRef.value
  const [r, c] = indexToRC(model.player)
  let nr = r
  let nc = c
  if (dir === 'up') nr = r - 1
  if (dir === 'down') nr = r + 1
  if (dir === 'left') nc = c - 1
  if (dir === 'right') nc = c + 1
  if (nr < 0 || nr >= GRID || nc < 0 || nc >= GRID) return
  const nextIdx = rcToIndex(nr, nc)
  if (canMoveTo(model, nextIdx)) {
    modelRef.value = { ...model, player: nextIdx }
  }
}

let unsubscribe = null
onMounted(() => {
  unsubscribe = keyboard.onKeyChange((type, player, action) => {
    if (type !== 'keydown') return
    if (player === 'player1') move(leftModel, action)
    else if (player === 'player2') move(rightModel, action)
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>

<template>
  <h1>🧠 Split Brain</h1>
  <div id="info-bar">
    <span id="timer">⏱️ 0s</span> |
    <span id="level">Level {{ currentLevelIdx + 1 }} / {{ totalLevels }}</span> |
    <span id="countdown">⏳ 60s remaining</span> |
    <span id="totalTime">Total time : 0s</span>
  </div>
  <div id="instructions" class="instructions">
    <h2>🎮 Controls</h2>
    <p><strong>Player 1 (left)</strong> : Z (up), Q (left), S (down), D (right)</p>
    <p><strong>Player 2 (right)</strong> : Arrow keys ← ↑ ↓ →</p>
  </div>
  <div class="grid-container">
    <div id="left" class="grid">
      <div
        v-for="idx in cells"
        :key="`l-` + idx"
        :class="tileClassAt(leftModel, idx, 'left')"
      ></div>
    </div>
    <div id="right" class="grid">
      <div
        v-for="idx in cells"
        :key="`r-` + idx"
        :class="tileClassAt(rightModel, idx, 'right')"
      ></div>
    </div>
  </div>
  <audio id="win-sound" src="win.mp3" preload="auto"></audio>
</template>
