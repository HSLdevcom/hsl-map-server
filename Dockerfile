FROM node:4
MAINTAINER Reittiopas version: 0.1

ENV FONTSTACK_PASSWORD ""
ENV HSL_OTP_URL api.digitransit.fi/routing/v1/routers/hsl/index/graphql
ENV FINLAND_OTP_URL api.digitransit.fi/routing/v1/routers/finland/index/graphql
ENV WALTTI_OTP_URL api.digitransit.fi/routing/v1/routers/waltti/index/graphql
ENV WORK=/opt/hsl-map-server

WORKDIR ${WORK}

RUN echo "deb http://http.debian.net/debian jessie-backports main" >> /etc/apt/sources.list

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y git unzip pngquant \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y -t jessie-backports libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-video-dummy

RUN mkdir -p ${WORK}

ADD . ${WORK}

RUN npm install

#TODO: Replace when https://github.com/osm2vectortiles/osm2vectortiles/issues/114 is fixed
RUN curl http://koti.kapsi.fi/~hannes/tiles.v7.mbtiles > finland.mbtiles
#RUN curl https://osm2vectortiles-downloads.os.zhdk.cloud.switch.ch/v1.0/extracts/finland.mbtiles > finland.mbtiles

RUN npm install https://github.com/hannesj/tilelive-gl.git

RUN npm install https://github.com/HSLdevcom/hsl-map-style.git

RUN cd ${WORK}/node_modules/hsl-map-style && \
  sed -i -e "s#http://localhost:8000/#file://${WORK}/node_modules/hsl-map-style/#" hsl-gl-map-v9.json && \
  sed -i -e 's#api.digitransit.fi/map/v1/#localhost:8080/#' hsl-gl-map-v9.json

EXPOSE 8080

RUN chmod -R 777 ${WORK}

RUN mkdir /.forever && chmod -R 777 /.forever
USER 9999

CMD cd ${WORK}/node_modules/hsl-map-style && \
  unzip -P ${FONTSTACK_PASSWORD} fontstack.zip && \
  cd ${WORK} && \
  Xorg -dpi 96 -nolisten tcp -noreset +extension GLX +extension RANDR +extension RENDER -logfile ./10.log -config ./xorg.conf :10 & \
  sleep 15 && \
  DISPLAY=":10" node_modules/.bin/forever start -c "node --harmony" \
  node_modules/tessera/bin/tessera.js --port 8080 --config config.js \
  -r ${WORK}/node_modules/tilelive-otp-citybikes/ \
  -r ${WORK}/node_modules/tilelive-otp-stops/ \
  -r ${WORK}/node_modules/tilelive-otp-routes/ \
  -r ${WORK}/node_modules/tilelive-gl/ \
  -r ${WORK}/node_modules/tilelive-hsl-parkandride \
  -r ${WORK}/node_modules/tilelive-hsl-ticket-sales \
  && sleep 10 && node_modules/.bin/forever --fifo logs 0
