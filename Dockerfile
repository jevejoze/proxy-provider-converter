FROM node:lts-alpine
WORKDIR /proxy-provider-converter

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
