FROM node:18.13.0-alpine3.16 AS build-stage
WORKDIR /app
COPY package.json  ./
RUN npm install --force
COPY . .
ENV VITE_BACKEND_URL="http://192.168.0.112:8081"
RUN npm run build

# Stage 2
FROM nginx:1.21.3-alpine AS production-stage
COPY custom.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]