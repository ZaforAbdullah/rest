FROM node:lts

RUN apt-get update -y

WORKDIR /react

COPY package*.json ./

RUN npm install

RUN chown -R $USER:$USER /react

EXPOSE 5173

CMD ["npm", "run", "dev"]

#CMD ["sh"]

# npx @tailwindcss/cli ???
# npm install -D tailwindcss
# npx shadcn@latest init --base-color neutral --yes
# npx shadcn-ui@latest add card
# npm install -D @rollup/plugin-alias
# npx tsc --init
# RUN npx shadcn@latest init
# RUN npm install tailwindcss @tailwindcss/vite
# npm install -D tailwindcss postcss autoprefixer
# npx tailwindcss init -p
# npm install tailwindcss @tailwindcss/cli
# npx shadcn@latest add card
# npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react @types/jest
