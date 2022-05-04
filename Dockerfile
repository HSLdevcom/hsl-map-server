FROM node:10-buster-slim

ENV HSL_OTP_URL api.digitransit.fi/routing/v1/routers/hsl/index/graphql
ENV FINLAND_OTP_URL api.digitransit.fi/routing/v1/routers/finland/index/graphql
ENV WALTTI_OTP_URL api.digitransit.fi/routing/v1/routers/waltti/index/graphql
ENV WORK=/opt/hsl-map-server
ENV NODE_OPTS ""

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

# New OpenMapTiles schema
RUN curl https://hslstoragekarttatuotanto.blob.core.windows.net/openmaptiles/tiles.mbtiles > finland.mbtiles

# Deprecated schema. Should be removed at some point, but important to include until all clients are using the new schema.
RUN curl https://hslstoragekarttatuotanto.blob.core.windows.net/tiles/tiles.mbtiles > finland-old-schema.mbtiles

EXPOSE 8080

RUN mkdir /.forever && chmod -R 777 /.forever

ADD run.sh /usr/local/bin/


CMD /usr/local/bin/run.sh
