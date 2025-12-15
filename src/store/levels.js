import { defineStore } from 'pinia'

export const useLevelStore = defineStore('levels', {
  state: () => ({
    levels: {
      1: {
        level: 1,
        time: 15,
        player1: {
          player: 0,
          goal: 27,
          walls: [15],
        },
        player2: {
          player: 27,
          goal: 0,
          walls: [],
        },
      },
    },
    currentLevel: 1,
  }),

  getters: {
    getLevel: (state) => (levelNumber) => {
      return state.levels[levelNumber]
    },

    getAllLevels: (state) => {
      return Object.keys(state.levels)
        .map(Number)
        .sort((a, b) => a - b)
    },

    getCurrentLevel: (state) => {
      return state.levels[state.currentLevel]
    },

    getTotalLevels: (state) => {
      return Object.keys(state.levels).length
    },
  },

  actions: {
    createLevel(levelNumber, levelData) {
      this.levels[levelNumber] = {
        level: levelNumber,
        time: levelData.time || 60,
        player1: {
          player: levelData.player1?.player ?? 0,
          goal: levelData.player1?.goal ?? 99,
          walls: levelData.player1?.walls || [],
        },
        player2: {
          player: levelData.player2?.player ?? 0,
          goal: levelData.player2?.goal ?? 99,
          walls: levelData.player2?.walls || [],
        },
      }
      this.saveToLocalStorage()
    },

    updateLevel(levelNumber, updates) {
      if (this.levels[levelNumber]) {
        this.levels[levelNumber] = {
          ...this.levels[levelNumber],
          ...updates,
          level: levelNumber,
        }
        this.saveToLocalStorage()
      }
    },

    updatePlayerData(levelNumber, playerSide, updates) {
      if (this.levels[levelNumber] && this.levels[levelNumber][playerSide]) {
        this.levels[levelNumber][playerSide] = {
          ...this.levels[levelNumber][playerSide],
          ...updates,
        }
        this.saveToLocalStorage()
      }
    },

    deleteLevel(levelNumber) {
      delete this.levels[levelNumber]
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('split-brain-levels', JSON.stringify(this.levels))
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('split-brain-levels')
      if (saved) {
        try {
          this.levels = JSON.parse(saved)
        } catch (error) {
          console.error('Erreur lors du chargement des niveaux:', error)
        }
      }
    },

    setCurrentLevel(levelNumber) {
      if (this.levels[levelNumber]) {
        this.currentLevel = levelNumber
      }
    },

    resetLevels() {
      this.levels = {}
      this.currentLevel = 1
      this.saveToLocalStorage()
    },
  },
})
