FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "dev"]
