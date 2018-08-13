#!/bin/bash

#workaround for azure DNS issue

if [ "$EUID" -eq 0 ]
  then echo -e "\nsearch marathon.l4lb.thisdcos.directory" >> /etc/resolv.conf
fi

#start map server

cd ${WORK}/node_modules/hsl-map-style && \
unzip -P ${FONTSTACK_PASSWORD} fontstack.zip && \
cd ${WORK} && \
Xorg -dpi 96 -nolisten tcp -noreset +extension GLX +extension RANDR +extension RENDER -logfile ./10.log -config ./xorg.conf :10 & \
sleep 15 && \
DISPLAY=":10" node_modules/.bin/forever start -c "node ${NODE_OPTS}" \
node_modules/tessera/bin/tessera.js --port 8080 --config config.js --multiprocess \
-r ${WORK}/node_modules/tilelive-otp-citybikes/ \
-r ${WORK}/node_modules/tilelive-otp-stops/ \
-r ${WORK}/node_modules/tilelive-otp-routes/ \
-r ${WORK}/node_modules/tilelive-gl/ \
-r ${WORK}/node_modules/tilelive-hsl-parkandride \
-r ${WORK}/node_modules/tilelive-hsl-ticket-sales \
&& sleep 10 && node_modules/.bin/forever --fifo logs 0
