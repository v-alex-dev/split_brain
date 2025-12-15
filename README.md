# Split Brain 🧠

Un jeu de puzzle cérébral où vous devez contrôler simultanément deux personnages avec les mêmes touches ! Testez vos capacités de coordination et résolvez des niveaux de plus en plus difficiles.

🎮 **[Jouer en ligne](https://splitb.netlify.app/)**

## 📖 Description

Split Brain est un jeu de puzzle innovant qui défie votre cerveau en vous demandant de contrôler deux personnages en même temps avec les mêmes commandes. Chaque personnage évolue sur sa propre grille et doit atteindre son objectif. La difficulté ? Vos deux hémisphères cérébraux doivent travailler ensemble !

### Caractéristiques

- 🎯 Multiples niveaux de difficulté progressive
- ⏱️ Système de timer pour suivre votre progression
- 🎨 Interface épurée et intuitive
- 🔊 Effets sonores immersifs
- 📱 Design responsive

### Comment jouer

- Utilisez les **flèches directionnelles** ou **ZQSD** pour déplacer les deux personnages simultanément
- Amenez chaque personnage sur son objectif (case verte)
- Évitez les murs (cases noires)
- Complétez tous les niveaux pour devenir un maître du Split Brain !

## 🚀 Installation

### Prérequis

- **Node.js** : Version 20.19.0 ou supérieure, ou version 22.12.0 et plus
- **npm** : Gestionnaire de paquets Node.js

### Installation locale

1. Clonez le dépôt :

```sh
git clone https://github.com/v-alex-dev/split_brain.git
cd split_brain
```

2. Installez les dépendances :

```sh
npm install
```

3. Lancez le serveur de développement :

```sh
npm run dev
```

4. Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

### Compilation pour la production

```sh
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Prévisualisation de la build de production

```sh
npm run preview
```

## 🛠️ Technologies utilisées

### Frontend Framework

- **[Vue 3](https://vuejs.org/)** (v3.5.25) - Framework JavaScript progressif pour la construction d'interfaces utilisateur réactives
- **Composition API** - Approche moderne de Vue 3 pour une meilleure organisation du code

### Gestion d'état et Routing

- **[Pinia](https://pinia.vuejs.org/)** (v3.0.4) - Store officiel pour Vue 3, moderne et intuitif
- **[Vue Router](https://router.vuejs.org/)** (v4.6.3) - Routeur officiel pour les applications Vue.js

### Outils de développement

- **[Vite](https://vite.dev/)** (v7.2.4) - Build tool ultra-rapide avec HMR (Hot Module Replacement)
- **[@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue)** (v6.0.2) - Plugin officiel Vue pour Vite
- **[Vue DevTools](https://devtools.vuejs.org/)** (v8.0.5) - Plugin Vite pour les outils de développement Vue
- **[Prettier](https://prettier.io/)** (v3.6.2) - Formateur de code pour maintenir un style cohérent

### Structure du projet

```
split_brain/
├── src/
│   ├── App.vue                 # Composant principal avec la logique du jeu
│   ├── main.js                 # Point d'entrée de l'application
│   ├── levels.js               # Définition des types de tuiles
│   ├── levels.json             # Configuration de tous les niveaux
│   ├── components/
│   │   ├── GameGrid.vue        # Composant d'affichage de grille
│   │   └── VictoryPopup.vue    # Popup de victoire
│   ├── router/
│   │   └── index.js            # Configuration du routeur
│   ├── services/
│   │   └── keyboard.js         # Gestion des entrées clavier
│   └── store/                  # Store Pinia (gestion d'état)
├── public/
│   └── sounds/                 # Fichiers audio du jeu
├── index.html                  # Point d'entrée HTML
├── vite.config.js              # Configuration Vite
└── package.json                # Dépendances et scripts
```

## 🎓 Configuration IDE recommandée

- **[VS Code](https://code.visualstudio.com/)** avec l'extension **[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)**
- Désactivez Vetur si vous l'avez installé (incompatible avec Vue Official)

### Extensions navigateur recommandées

**Chromium (Chrome, Edge, Brave, etc.) :**

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Activer Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox :**

- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Activer Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 Scripts disponibles

```sh
npm run dev      # Lance le serveur de développement
npm run build    # Compile pour la production
npm run preview  # Prévisualise la build de production
npm run format   # Formate le code avec Prettier
```

## 🌐 Déploiement

Le jeu est déployé sur **Netlify** et accessible à l'adresse :
**[https://splitb.netlify.app/](https://splitb.netlify.app/)**

## 📄 Licence

Ce projet est un projet personnel à but éducatif.

## 👨‍💻 Auteur

Développé avec ❤️ par [v-alex-dev](https://github.com/v-alex-dev)
