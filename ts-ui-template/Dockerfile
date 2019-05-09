FROM node:11.11.0
RUN apt-get update && apt-get install -y git curl git man less

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
CMD /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf

COPY ./docker/supervisor.conf /etc/supervisor/conf.d/

WORKDIR /app
ADD package.json yarn.lock ./

RUN yarn install
ADD . .

RUN yarn test
RUN yarn build:prod

EXPOSE 8080

