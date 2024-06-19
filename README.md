# FADESOL
================================
# Dockerfile (frontend in /src folder)
# inside /src run (npm i)
# version of node
FROM node:16
WORKDIR /src
COPY package.json ./
RUN npm i
COPY . ./
EXPOSE 3000

CMD [ "npm start" ]

# instead of we're gonna use dockercompose.yml
version: '3'