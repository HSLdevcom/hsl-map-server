FROM node:6-stretch
MAINTAINER Reittiopas version: 0.1

ENV FONTSTACK_PASSWORD ""
ENV HSL_OTP_URL api.digitransit.fi/routing/v1/routers/hsl/index/graphql
ENV FINLAND_OTP_URL api.digitransit.fi/routing/v1/routers/finland/index/graphql
ENV WALTTI_OTP_URL api.digitransit.fi/routing/v1/routers/waltti/index/graphql
ENV WORK=/opt/hsl-map-server
ENV NODE_OPTS ""

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y git unzip pngquant libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-video-dummy libgles2-mesa libstdc++6

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

COPY yarn.lock ${WORK}
COPY package.json ${WORK}
RUN yarn install

COPY . ${WORK}

RUN curl https://hslstoragekarttatuotanto.blob.core.windows.net/tiles/tiles.mbtiles > finland.mbtiles
EXPOSE 8080

RUN chmod -R 777 ${WORK}

RUN mkdir /.forever && chmod -R 777 /.forever
#USER 9999

ADD run.sh /usr/local/bin/


CMD /usr/local/bin/run.sh
