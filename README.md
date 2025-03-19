# oToV2 - Plateforme d'IA Interactive

## 📌 État du Projet
Version actuelle : 0.4.0

### Fonctionnalités Implémentées
- ✅ Console de logs style Matrix avec différents types de messages
- ✅ Liste de tâches interactive avec détails masquables
- ✅ Interface de contrôle RunPod (en attente de configuration)
- ✅ Barre de progression pour l'utilisation de Cursor
- ✅ Système de proxy pour les appels API

### Prochaines Étapes
- 🔄 Automatisation des mises à jour
- 🔄 Intégration de l'IA et gestion des tokens
- 🔄 Configuration complète de RunPod

## 🛠 Technologies Utilisées
- Frontend : HTML5, CSS3, JavaScript vanilla
- Backend : Node.js avec Express pour le proxy
- APIs : RunPod (en attente), Cursor

## 📦 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Kiapcn/oToV2.git
cd oToV2
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur proxy**
```bash
node proxy.js
```

4. **Lancer le serveur de développement**
```bash
python3 -m http.server 5500
```

## 🔧 Configuration

### Configuration du Proxy
Le proxy est configuré pour gérer les appels API vers RunPod et éviter les problèmes CORS.
- Port par défaut : 3000
- Endpoints supportés : status, start, stop

### Configuration de RunPod (En attente)
Créer un fichier `config/runpod-config.js` avec :
```javascript
window.runpodConfig = {
    endpointId: 'votre-endpoint-id',
    apiKey: 'votre-api-key',
    hourlyRate: 0.00000
};
```

## 📊 Fonctionnalités Détaillées

### Console de Logs
- Style Matrix avec animations
- 4 types de messages : info, success, warning, error
- Effets visuels et animations
- Auto-scroll et détails d'erreurs dépliables

### Liste de Tâches
- Checkboxes interactives
- Détails masquables pour chaque tâche
- Logging automatique des changements d'état
- Indicateurs visuels de progression

### Contrôle RunPod (En développement)
- Interface de contrôle start/stop
- Suivi du temps d'utilisation
- Calcul des coûts en temps réel
- Barre de progression des coûts

### Utilisation Cursor
- Suivi de l'utilisation des tokens
- Barre de progression visuelle
- Alertes selon le niveau d'utilisation

## 📝 Historique des Versions

### Version 0.4.0 (19 Mars 2024)
- Ajout du style Matrix pour la console
- Amélioration de la gestion des erreurs
- Mise en place du système de proxy
- Ajout du suivi d'utilisation Cursor

### Version 0.3.0 (19 Mars 2024)
- Intégration initiale de RunPod
- Ajout des barres de progression
- Configuration du système de logs

### Version 0.2.0 (18 Mars 2024)
- Implémentation de la liste de tâches
- Ajout de la console de logs basique
- Mise en place des tests

### Version 0.1.0 (18 Mars 2024)
- Initialisation du projet
- Structure de base HTML/CSS/JS
- Configuration Git

## 🤝 Contribution
Projet développé par Kiapcn

## 📄 Licence
ISC License
