class KeyboardService {
  constructor() {
    // État des touches pour les deux joueurs
    this.keys = {
      player1: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      player2: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    };

    // Mapping des touches
    this.keyMapping = {
      // Player 1 - ZQSD
      'z': { player: 'player1', action: 'up' },
      'Z': { player: 'player1', action: 'up' },
      's': { player: 'player1', action: 'down' },
      'S': { player: 'player1', action: 'down' },
      'q': { player: 'player1', action: 'left' },
      'Q': { player: 'player1', action: 'left' },
      'd': { player: 'player1', action: 'right' },
      'D': { player: 'player1', action: 'right' },
      
      // Player 2 - Flèches directionnelles
      'ArrowUp': { player: 'player2', action: 'up' },
      'ArrowDown': { player: 'player2', action: 'down' },
      'ArrowLeft': { player: 'player2', action: 'left' },
      'ArrowRight': { player: 'player2', action: 'right' }
    };

    this.callbacks = [];
    this.init();
  }

  init() {
    // Écouteurs d'événements pour les touches
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    const mapping = this.keyMapping[event.key];
    
    if (mapping) {
      event.preventDefault(); // Empêche le comportement par défaut
      
      const { player, action } = mapping;
      
      // Met à jour l'état uniquement si la touche n'était pas déjà enfoncée
      if (!this.keys[player][action]) {
        this.keys[player][action] = true;
        this.notifyCallbacks('keydown', player, action);
      }
    }
  }

  handleKeyUp(event) {
    const mapping = this.keyMapping[event.key];
    
    if (mapping) {
      event.preventDefault();
      
      const { player, action } = mapping;
      this.keys[player][action] = false;
      this.notifyCallbacks('keyup', player, action);
    }
  }

  // Retourne l'état actuel des touches pour un joueur
  getPlayerKeys(player) {
    return { ...this.keys[player] };
  }

  // Retourne l'état de tous les joueurs
  getAllKeys() {
    return {
      player1: { ...this.keys.player1 },
      player2: { ...this.keys.player2 }
    };
  }

  // Vérifie si une direction spécifique est active pour un joueur
  isKeyPressed(player, action) {
    return this.keys[player][action];
  }

  // Enregistre un callback pour être notifié des changements
  onKeyChange(callback) {
    this.callbacks.push(callback);
    
    // Retourne une fonction pour se désinscrire
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  // Notifie tous les callbacks enregistrés
  notifyCallbacks(type, player, action) {
    this.callbacks.forEach(callback => {
      callback(type, player, action, this.keys[player]);
    });
  }

  // Réinitialise toutes les touches
  reset() {
    this.keys.player1 = { up: false, down: false, left: false, right: false };
    this.keys.player2 = { up: false, down: false, left: false, right: false };
  }

  // Nettoie les écouteurs d'événements
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.callbacks = [];
  }
}

// Export singleton
export default new KeyboardService();
