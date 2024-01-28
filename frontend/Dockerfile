FROM node:16.17
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "8080"]
EXPOSE 8080