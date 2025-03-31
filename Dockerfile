FROM node:22-alpine

WORKDIR /app
#copying packages 
COPY package.json package-lock.json ./
#to install all dependencies
RUN npm install 
#copy rest of code
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node","index.js" ]