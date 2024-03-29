FROM node:20-bookworm-slim

LABEL maintaner="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /app/

COPY . .

RUN npm ci --location=project

RUN npm run build

CMD ["npm", "start", "bootstrap"]
