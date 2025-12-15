<script setup>
import { ref, computed } from 'vue'
import { levels, TILE } from './levels'

const currentLevelIdx = ref(0)
const totalLevels = levels.length
const currentLevel = computed(() => levels[currentLevelIdx.value])
const leftBoard = computed(() => currentLevel.value.boards[0])
const rightBoard = computed(() => currentLevel.value.boards[1])

const tileClass = (val, side) => {
  if (val === TILE.WALL) return 'cell wall'
  if (val === TILE.GOAL) return 'cell goal'
  if (val === TILE.PLAYER) return `cell ${side === 'right' ? 'player2' : 'player'}`
  return 'cell'
}
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
      <template v-for="(row, r) in leftBoard" :key="r">
        <div v-for="(cell, c) in row" :key="`${r}-${c}`" :class="tileClass(cell, 'left')" />
      </template>
    </div>
    <div id="right" class="grid">
      <template v-for="(row, r) in rightBoard" :key="r">
        <div v-for="(cell, c) in row" :key="`${r}-${c}`" :class="tileClass(cell, 'right')" />
      </template>
    </div>
  </div>
  <audio id="win-sound" src="win.mp3" preload="auto"></audio>
</template>
