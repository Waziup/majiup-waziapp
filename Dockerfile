FROM node:18.13.0-alpine3.16

WORKDIR /app
COPY package.json  ./
RUN npm install --force
RUN ls -la
COPY . .
EXPOSE 4173
CMD ["npm", "run", "dev"]
