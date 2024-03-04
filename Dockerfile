FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm cache clear --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
