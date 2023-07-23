FROM node:18.13.0-alpine3.16 AS build-stage
WORKDIR /app
COPY package.json  ./
RUN npm install --force
RUN ls -la
COPY . .
CMD ["npm", "run", "build"]

# Stage 2
FROM nginx:1.21.3-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]