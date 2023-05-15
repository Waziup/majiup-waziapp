FROM node:18.13.0-alpine3.16
RUN addgroup user && adduser -S -G user user
RUN mkdir /app && chown -R user:user /app
USER user
WORKDIR /app
COPY package.json  ./
RUN npm install --force
RUN ls -la
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
