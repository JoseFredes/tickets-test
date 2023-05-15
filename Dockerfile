FROM --platform=linux/amd64 node:18

USER root

ENV PORT 3000
ENV HOST 0.0.0.0

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]