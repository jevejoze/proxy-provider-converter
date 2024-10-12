FROM node:lts-alpine
WORKDIR /proxy-provider-converter

COPY . .

RUN npm install
RUN npm run build

LABEL traefik.enable=true
LABEL traefik.http.routers.ppconverter.rule=Host(`${PPC_SUBDOMAIN:-ppc}.${DOMAIN_NAME}`)

EXPOSE 3000

CMD ["npm", "start"]
