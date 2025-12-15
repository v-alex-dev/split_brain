<script setup>
defineProps({
  isGameComplete: {
    type: Boolean,
    default: false
  },
  isTimeOut: {
    type: Boolean,
    default: false
  },
  timer: {
    type: Number,
    default: 0
  },
  totalTime: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['next-level', 'replay', 'restart'])
</script>

<template>
  <div class="popup-overlay">
    <div class="popup" :class="{ 'popup--timeout': isTimeOut, 'popup--complete': isGameComplete }">
      <!-- Jeu terminé -->
      <template v-if="isGameComplete">
        <div class="popup__icon">🎉</div>
        <h2 class="popup__title">Félicitations !</h2>
        <p class="popup__text">Jeu terminé en <strong>{{ totalTime }}s</strong></p>
        <div class="popup__buttons">
          <button class="btn btn--primary" @click="emit('restart')">
            <span class="btn__icon">🔄</span>
            Rejouer
          </button>
        </div>
      </template>

      <!-- Temps écoulé -->
      <template v-else-if="isTimeOut">
        <div class="popup__icon">⏰</div>
        <h2 class="popup__title">Temps écoulé !</h2>
        <p class="popup__text">Tu n'as pas réussi à temps.</p>
        <div class="popup__buttons">
          <button class="btn btn--primary" @click="emit('replay')">
            <span class="btn__icon">🔄</span>
            Réessayer
          </button>
        </div>
      </template>

      <!-- Niveau terminé -->
      <template v-else>
        <div class="popup__icon">🏆</div>
        <h2 class="popup__title">Niveau terminé !</h2>
        <p class="popup__text">Temps : <strong>{{ timer }}s</strong></p>
        <div class="popup__buttons">
          <button class="btn btn--cyan" @click="emit('next-level')">
            <span class="btn__icon">➡️</span>
            Suivant
          </button>
          <button class="btn btn--magenta" @click="emit('replay')">
            <span class="btn__icon">🔄</span>
            Rejouer
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.popup {
  background: #222;
  border: 3px solid gold;
  border-radius: 10px;
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
  animation: popIn 0.3s ease-out;
  min-width: 300px;
}

.popup--timeout {
  border-color: #ff4444;
  box-shadow: 0 0 30px rgba(255, 68, 68, 0.4);
}

.popup--complete {
  border-color: gold;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
}

@keyframes popIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.popup__icon {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  animation: bounce 0.6s ease infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}

.popup__title {
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
  color: gold;
  font-family: sans-serif;
}

.popup--timeout .popup__title {
  color: #ff4444;
}

.popup__text {
  font-size: 1.1rem;
  margin: 0 0 1.5rem 0;
  color: #ccc;
  font-family: sans-serif;
}

.popup__text strong {
  color: white;
}

.popup__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #333;
  border: 2px solid transparent;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: sans-serif;
}

.btn:hover {
  transform: scale(1.05);
}

.btn--primary {
  background: gold;
  color: #111;
}

.btn--primary:hover {
  box-shadow: 0 0 15px gold;
}

.btn--cyan {
  background: cyan;
  color: #111;
}

.btn--cyan:hover {
  box-shadow: 0 0 15px cyan;
}

.btn--magenta {
  background: magenta;
  color: #111;
}

.btn--magenta:hover {
  box-shadow: 0 0 15px magenta;
}

.btn__icon {
  font-size: 1.1rem;
}
</style>
