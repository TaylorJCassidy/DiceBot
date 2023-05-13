FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /dicebot
COPY package*.json ./
RUN npm ci
COPY ./src/main ./src/main
CMD ["npm", "run", "start:ci"]