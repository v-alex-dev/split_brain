<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { levels, TILE } from './levels'
import keyboardService from './services/keyboard'
import GameGrid from './components/GameGrid.vue'

const currentLevelIdx = ref(0)
const totalLevels = levels.length
const currentLevel = computed(() => levels[currentLevelIdx.value])

// Positions des joueurs
const player1Pos = ref({ row: 0, col: 0 })
const player2Pos = ref({ row: 0, col: 0 })

// Timer
const timer = ref(0)
const countdown = ref(60)
const totalTime = ref(0)
let timerInterval = null

// Grilles dynamiques
const leftBoard = ref([])
const rightBoard = ref([])

// Initialise le niveau
const initLevel = () => {
  const level = levels[currentLevelIdx.value]
  leftBoard.value = JSON.parse(JSON.stringify(level.boards[0]))
  rightBoard.value = JSON.parse(JSON.stringify(level.boards[1]))

  // Trouve les positions initiales des joueurs
  leftBoard.value.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === TILE.PLAYER) {
        player1Pos.value = { row: r, col: c }
      }
    })
  })

  rightBoard.value.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === TILE.PLAYER) {
        player2Pos.value = { row: r, col: c }
      }
    })
  })

  timer.value = 0
  countdown.value = 60
}

// Déplace un joueur
const movePlayer = (player, direction) => {
  const pos = player === 'player1' ? player1Pos.value : player2Pos.value
  const board = player === 'player1' ? leftBoard.value : rightBoard.value

  let newRow = pos.row
  let newCol = pos.col

  if (direction === 'up') newRow--
  if (direction === 'down') newRow++
  if (direction === 'left') newCol--
  if (direction === 'right') newCol++

  // Vérifie les limites et les murs
  if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10) return
  if (board[newRow][newCol] === TILE.WALL) return

  // Efface l'ancienne position
  board[pos.row][pos.col] = TILE.EMPTY

  // Vérifie si le joueur atteint le goal
  if (board[newRow][newCol] === TILE.GOAL) {
    board[newRow][newCol] = TILE.PLAYER
    pos.row = newRow
    pos.col = newCol
    checkWin()
  } else {
    // Déplace le joueur
    board[newRow][newCol] = TILE.PLAYER
    pos.row = newRow
    pos.col = newCol
  }
}

// Vérifie la victoire
const checkWin = () => {
  const p1OnGoal =
    leftBoard.value[player1Pos.value.row][player1Pos.value.col] === TILE.PLAYER &&
    levels[currentLevelIdx.value].boards[0][player1Pos.value.row][player1Pos.value.col] ===
      TILE.GOAL
  const p2OnGoal =
    rightBoard.value[player2Pos.value.row][player2Pos.value.col] === TILE.PLAYER &&
    levels[currentLevelIdx.value].boards[1][player2Pos.value.row][player2Pos.value.col] ===
      TILE.GOAL

  if (p1OnGoal && p2OnGoal) {
    keyboardService.playVictory()
    totalTime.value += timer.value

    setTimeout(() => {
      if (currentLevelIdx.value < totalLevels - 1) {
        currentLevelIdx.value++
        initLevel()
      } else {
        alert(`🎉 Félicitations ! Jeu terminé en ${totalTime.value}s !`)
      }
    }, 500)
  }
}

onMounted(() => {
  initLevel()

  // Timer
  timerInterval = setInterval(() => {
    timer.value++
    countdown.value--

    if (countdown.value <= 0) {
      alert('⏰ Temps écoulé ! Recommence le niveau.')
      initLevel()
    }
  }, 1000)

  // Écoute les touches
  keyboardService.onKeyChange((type, player, action) => {
    if (type === 'keydown') {
      movePlayer(player, action)
    }
  })
})

onUnmounted(() => {
  clearInterval(timerInterval)
  keyboardService.destroy()
})
</script>

<template>
  <h1>🧠 Split Brain</h1>
  <div id="info-bar">
    <span id="timer">⏱️ {{ timer }}s</span> |
    <span id="level">Level {{ currentLevelIdx + 1 }} / {{ totalLevels }}</span> |
    <span id="countdown">⏳ {{ countdown }}s remaining</span> |
    <span id="totalTime">Total time : {{ totalTime }}s</span>
  </div>
  <div id="instructions" class="instructions">
    <h2>🎮 Controls</h2>
    <p><strong>Player 1 (left)</strong> : Z (up), Q (left), S (down), D (right)</p>
    <p><strong>Player 2 (right)</strong> : Arrow keys ← ↑ ↓ →</p>
  </div>
  <div class="grid-container">
    <GameGrid :board="leftBoard" side="left" grid-id="left" />
    <GameGrid :board="rightBoard" side="right" grid-id="right" />
  </div>
</template>
