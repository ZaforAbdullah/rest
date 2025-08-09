FROM node:24

# Install Cypress dependencies
RUN apt-get update -y && \
    apt-get install -y \
    xvfb \
    libgtk-3-0 \
    libnss3 \
    libasound2 \
    libxss1 \
    libxtst6 \
    libgbm-dev \
    wget \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /react

COPY package*.json ./

RUN npm install

RUN chown -R $USER:$USER /react

EXPOSE 5173

CMD ["npm", "run", "dev"]