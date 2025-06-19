FROM node:lts

RUN apt-get update -y

WORKDIR /react

COPY package*.json ./

RUN npm install

RUN chown -R $USER:$USER /react

EXPOSE 5173

CMD ["npm", "run", "dev"]

#CMD ["sh"]
