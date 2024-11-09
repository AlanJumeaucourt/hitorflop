# Build stage
FROM node:21-slim as build

WORKDIR /app
COPY ./spotify-app /app

RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built assets from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
