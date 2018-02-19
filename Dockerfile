FROM node:6
MAINTAINER Reittiopas version: 0.1

ENV FONTSTACK_PASSWORD ""
ENV HSL_OTP_URL api.digitransit.fi/routing/v1/routers/hsl/index/graphql
ENV FINLAND_OTP_URL api.digitransit.fi/routing/v1/routers/finland/index/graphql
ENV WALTTI_OTP_URL api.digitransit.fi/routing/v1/routers/waltti/index/graphql
ENV WORK=/opt/hsl-map-server
ENV NODE_OPTS ""

RUN echo "deb http://http.debian.net/debian testing main" >> /etc/apt/sources.list
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y git unzip pngquant \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-video-dummy libgles2-mesa \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y -t testing libstdc++6

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

COPY yarn.lock ${WORK}
COPY package.json ${WORK}
RUN yarn install

COPY . ${WORK}

#TODO: Replace when https://github.com/osm2vectortiles/osm2vectortiles/issues/114 is fixed
#RUN curl http://koti.kapsi.fi/~hannes/tiles.v7.mbtiles > finland.mbtiles
#RUN curl https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v2.0/extracts/finland.mbtiles > finland.mbtiles
RUN curl https://hsltiles.blob.core.windows.net/tiles/tiles.mbtiles > finland.mbtiles

EXPOSE 8080

RUN chmod -R 777 ${WORK}

RUN mkdir /.forever && chmod -R 777 /.forever
#USER 9999

ADD run.sh /usr/local/bin/


CMD /usr/local/bin/run.sh
