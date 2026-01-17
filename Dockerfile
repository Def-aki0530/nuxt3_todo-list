FROM node:18-bullseye

WORKDIR /src

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g nuxi

CMD ["npm", "run", "dev"]
