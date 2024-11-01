# Utilisez une image Node.js minimale comme base
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package*.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage pour la production
FROM nginx:alpine

# Copier les fichiers de production générés
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Configuration de Nginx (adapter selon vos besoins)
COPY nginx.conf /etc/nginx/nginx.conf

# Démarrer Nginx au démarrage du conteneur
CMD ["nginx", "-g", "daemon off;"]
