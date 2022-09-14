FROM node:16-bullseye-slim

ENV WORK=/opt/hsl-map-server
ENV DATA_DIR=${WORK}/data
ENV NODE_OPTS ""
ENV NODE_ENV=production

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y wget ca-certificates xserver-xorg-video-dummy libjemalloc2 \
  # maplibre-native dependencies
  ccache cmake ninja-build pkg-config xvfb libcurl4-openssl-dev libglfw3-dev libuv1-dev g++-10 libc++-9-dev libc++abi-9-dev libpng-dev libgl1-mesa-dev libgl1-mesa-dri --no-install-recommends \
  && wget http://archive.ubuntu.com/ubuntu/pool/main/libj/libjpeg-turbo/libjpeg-turbo8_2.0.3-0ubuntu1_amd64.deb \
  && apt install ./libjpeg-turbo8_2.0.3-0ubuntu1_amd64.deb \
  && wget http://archive.ubuntu.com/ubuntu/pool/main/i/icu/libicu66_66.1-2ubuntu2_amd64.deb \
  && apt install ./libicu66_66.1-2ubuntu2_amd64.deb \
  && rm ./*.deb \
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
# RUN wget https://hslstoragekarttatuotanto.blob.core.windows.net/openmaptiles/tiles.mbtiles -t 3 -O ${DATA_DIR}/finland.mbtiles

# Deprecated schema. Should be removed at some point, but important to include until all clients are using the new schema.
# RUN wget https://hslstoragekarttatuotanto.blob.core.windows.net/tiles/tiles.mbtiles -t 3 -O ${DATA_DIR}/finland-old-schema.mbtiles

EXPOSE 8080

CMD \
  yarn run data-fetcher && \
  (Xorg -dpi 96 -nolisten tcp -noreset +extension GLX +extension RANDR +extension RENDER -logfile ./10.log -config ./xorg.conf :10 & \
  DISPLAY=":10" yarn forever start --spinSleepTime 60000 --minUptime 30000 -c "node ${NODE_OPTS}" \
    node_modules/tessera/bin/tessera.js --port 8080 --config config.js --multiprocess \
      -r ${WORK}/node_modules/tilelive-gl/ \
      -r ${WORK}/node_modules/tilelive-geojson && \
  yarn forever --fifo logs 0)
