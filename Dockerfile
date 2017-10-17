FROM ubuntu:14.04
ENV BUILD_DATE=04_07_2017
ENV TERM=xterm
RUN apt-get update --fix-missing
RUN apt-get install -y software-properties-common python-software-properties curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs git git-core gcc make build-essential
RUN npm i gulp -g

RUN mkdir -p /container
WORKDIR /container

ADD ./package.json /container/package.json
ADD ./tsconfig.json /container/tsconfig.json
ADD ./gulpfile.js /container/gulpfile.js
ADD ./src /container/src
ADD ./views /container/views

RUN npm install

RUN gulp tsc
RUN gulp sass

CMD ["node", "/container/bin/index.js"]
