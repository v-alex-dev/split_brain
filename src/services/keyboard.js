class KeyboardService {
  constructor() {
    this.keys = {
      player1: { up: false, down: false, left: false, right: false },
      player2: { up: false, down: false, left: false, right: false },
    }

    this.keyMapping = {
      z: { player: 'player1', action: 'up' },
      Z: { player: 'player1', action: 'up' },
      s: { player: 'player1', action: 'down' },
      S: { player: 'player1', action: 'down' },
      q: { player: 'player1', action: 'left' },
      Q: { player: 'player1', action: 'left' },
      d: { player: 'player1', action: 'right' },
      D: { player: 'player1', action: 'right' },
      ArrowUp: { player: 'player2', action: 'up' },
      ArrowDown: { player: 'player2', action: 'down' },
      ArrowLeft: { player: 'player2', action: 'left' },
      ArrowRight: { player: 'player2', action: 'right' },
    }

    this.callbacks = []

    // Bind handlers as arrow functions to keep references for removeEventListener
    this.handleKeyDown = (event) => {
      const mapping = this.keyMapping[event.key]
      if (mapping) {
        event.preventDefault()
        const { player, action } = mapping
        if (!this.keys[player][action]) {
          this.keys[player][action] = true
          this.notifyCallbacks('keydown', player, action)
        }
      }
    }

    this.handleKeyUp = (event) => {
      const mapping = this.keyMapping[event.key]
      if (mapping) {
        event.preventDefault()
        const { player, action } = mapping
        this.keys[player][action] = false
        this.notifyCallbacks('keyup', player, action)
      }
    }

    this.init()
  }

  init() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  getPlayerKeys(player) {
    return { ...this.keys[player] }
  }

  getAllKeys() {
    return {
      player1: { ...this.keys.player1 },
      player2: { ...this.keys.player2 },
    }
  }

  isKeyPressed(player, action) {
    return !!this.keys[player][action]
  }

  onKeyChange(callback) {
    this.callbacks.push(callback)
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) this.callbacks.splice(index, 1)
    }
  }

  notifyCallbacks(type, player, action) {
    this.callbacks.forEach((cb) => cb(type, player, action, this.keys[player]))
  }

  reset() {
    this.keys.player1 = { up: false, down: false, left: false, right: false }
    this.keys.player2 = { up: false, down: false, left: false, right: false }
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    this.callbacks = []
  }
}

export default new KeyboardService()
