# Dockerfile pour le serveur ReactJS utilisant Node.js
# Utilisez une image de base contenant Node.js
FROM node:lts-bookworm-slim

# Répertoire de travail dans le conteneur
WORKDIR /code/spotify-app

# Copiez le reste des fichiers de l'application
COPY ./spotify-app .

# Installez les dépendances de l'application
RUN npm install

# Installez les dépendances de l'application
RUN npm install -g next

RUN npm install performance-now

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application ReactJS (uniquement lorceque l'appli sera terminée)
# RUN npm run build

# Commande pour démarrer l'application
CMD [ "npm", "run", "dev"]