FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN apk add tzdata && ln -s /usr/share/zoneinfo/Asia/Tashkent /etc/localtime

RUN npm cache clear --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
