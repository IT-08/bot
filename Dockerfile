FROM node:12

RUN mkdir -p /srv/academy
WORKDIR /srv/academy/

ADD package.json package-lock.json /srv/academy/
RUN npm ci

ADD . /srv/academy/

ENV LC_ALL="C.utf-8" LANGUAGE="C.utf-8" LANG="C.utf-8" PORT=9081 DEBUG="sequelize" NODE_ENV="docker" SERVE_STATIC="1"

WORKDIR /srv/academy

CMD ["./run.sh"]
