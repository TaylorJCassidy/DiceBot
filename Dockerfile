FROM node:18.12-alpine
ENV NODE_ENV=production
COPY package.json .
RUN npm install
COPY . .
CMD ["node","./src/index.js"]