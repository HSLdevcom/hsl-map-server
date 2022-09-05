FROM node:10-buster-slim

ENV WORK=/opt/hsl-map-server
ENV DATA_DIR=${WORK}/data
ENV NODE_OPTS ""
ENV NODE_ENV=production

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y curl ca-certificates libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-video-dummy libgles2-mesa libjemalloc2 --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# This should prevent memory leak of sharp-package
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

COPY yarn.lock package.json ${WORK}/
RUN yarn install && yarn cache clean

COPY . ${WORK}

RUN mkdir -p ${DATA_DIR}

# New OpenMapTiles schema
RUN curl https://hslstoragekarttatuotanto.blob.core.windows.net/openmaptiles/tiles.mbtiles > ${DATA_DIR}/finland.mbtiles

# Deprecated schema. Should be removed at some point, but important to include until all clients are using the new schema.
RUN curl https://hslstoragekarttatuotanto.blob.core.windows.net/tiles/tiles.mbtiles > ${DATA_DIR}/finland-old-schema.mbtiles

EXPOSE 8080

CMD \
  yarn run data-fetcher && \
  (Xorg -dpi 96 -nolisten tcp -noreset +extension GLX +extension RANDR +extension RENDER -logfile ./10.log -config ./xorg.conf :10 & \
  DISPLAY=":10" yarn forever start --spinSleepTime 60000 --minUptime 30000 -c "node ${NODE_OPTS}" \
    node_modules/tessera/bin/tessera.js --port 8080 --config config.js \
      -r ${WORK}/node_modules/tilelive-gl/ \
      -r ${WORK}/node_modules/tilelive-geojson && \
  yarn forever --fifo logs 0)
