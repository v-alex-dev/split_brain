<script setup>
import { TILE } from '../levels'

const props = defineProps({
  board: {
    type: Array,
    required: true,
  },
  side: {
    type: String,
    required: true,
    validator: (value) => ['left', 'right'].includes(value),
  },
  gridId: {
    type: String,
    required: true,
  },
})

const tileClass = (val) => {
  if (val === TILE.WALL) return 'cell wall'
  if (val === TILE.GOAL) return 'cell goal'
  if (val === TILE.PLAYER) return `cell ${props.side === 'right' ? 'player2' : 'player'}`
  return 'cell'
}
</script>

<template>
  <div :id="gridId" class="grid">
    <template v-for="(row, r) in board" :key="r">
      <div v-for="(cell, c) in row" :key="`${r}-${c}`" :class="tileClass(cell)" />
    </template>
  </div>
</template>

<style scoped>
/* Les styles peuvent être déplacés ici si nécessaire */
</style>
