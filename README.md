# 🔧 Engine Assembly 3D - Simulateur de Démontage/Remontage

Application web 3D interactive pour visualiser le démontage et le remontage d'un moteur mécanique.

## 🚀 Technologies

- **React 18** + **TypeScript** - Framework frontend moderne
- **Three.js** via **React Three Fiber** - Rendu 3D WebGL
- **@react-three/drei** - Helpers et composants utilitaires 3D
- **GSAP** - Animations fluides et séquencées
- **Zustand** - Gestion d'état légère
- **Tailwind CSS** - Styling moderne

## 📦 Installation

```bash
npm install
```

## 🎮 Démarrage

```bash
npm run dev
```

Puis ouvrir [http://localhost:5173](http://localhost:5173)

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── Engine/           # Composants 3D du moteur
│   ├── UI/               # Interface utilisateur
│   └── Scene/            # Configuration de la scène 3D
├── store/                # État global (Zustand)
├── hooks/                # Hooks personnalisés
├── styles/               # CSS et Tailwind
└── App.tsx               # Point d'entrée
```

## 🎯 Fonctionnalités

- [x] Scène 3D interactive avec contrôles orbitaux
- [x] Démontage pas à pas du moteur
- [x] Remontage séquentiel
- [x] Mode vue éclatée
- [x] Interface premium glassmorphism

## 📝 Licence

Projet privé - Tous droits réservés
