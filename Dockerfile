# base image
FROM node:20.11-alpine3.19 AS base
LABEL NAME="KlineNext" TAG="KlineNext" maintainer="CouriourC"

# if you located in China, you can use aliyun mirror to speed up
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache tzdata


# install packages
FROM base as packages

WORKDIR /app/web

COPY package.json .

# if you located in China, you can use taobao registry to speed up
RUN npm i -g pnpm
RUN pnpm install --registry=https://registry.npmmirror.com

# build resources
FROM base as builder
WORKDIR /app/web
COPY --from=packages /app/web/ .
COPY . .

RUN yarn build


# production stage
FROM base as production

ENV NODE_ENV production
ENV EDITION SELF_HOSTED
ENV DEPLOY_ENV PRODUCTION

ENV NEXT_PUBLIC_PUBLIC_API_PREFIX http://adatalabel.30006124.xyz:7101/adatalabel
ENV NEXT_PUBLIC_CHART_WEBSITE_NAME ADataLabel

ENV PORT 3000


# set timezone
ENV TZ UTC
RUN ln -s /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

# global runtime packages
RUN yarn global add pm2 \
    && yarn cache clean

WORKDIR /app
COPY --from=builder /app/web/public ./public
COPY --from=builder /app/web/.next/standalone ./
COPY --from=builder /app/web/.next/static ./.next/static


COPY docker/pm2.json ./pm2.json
COPY docker/entrypoint.sh ./entrypoint.sh

ARG COMMIT_SHA
ENV COMMIT_SHA ${COMMIT_SHA}

EXPOSE 3000
WORKDIR /
ENTRYPOINT ["/bin/sh", "/app/web/entrypoint.sh"]
