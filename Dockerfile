# Utiliser une image de base avec Node.js
FROM node:18-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"] 