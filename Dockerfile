FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --development

COPY . .

RUN npm run build

ENV NODE_ENV=develop
ENV PORT=3006

EXPOSE 3006

CMD ["npm", "run", "dev"]