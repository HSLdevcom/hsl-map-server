#!/bin/bash

#workaround for azure DNS issue

if [ -n "$MESOS_CONTAINER_NAME"  ]; then 
  echo -e "\nsearch marathon.l4lb.thisdcos.directory" >> /etc/resolv.conf
fi

#start map server

cd ${WORK} && \
Xorg -dpi 96 -nolisten tcp -noreset +extension GLX +extension RANDR +extension RENDER -logfile ./10.log -config ./xorg.conf :10 & \
sleep 15 && \
DISPLAY=":10" node_modules/.bin/forever start --spinSleepTime 60000 --minUptime 30000 -c "node ${NODE_OPTS}" \
node_modules/tessera/bin/tessera.js --port 8080 --config config.js --multiprocess \
-r ${WORK}/node_modules/tilelive-otp-citybikes/ \
-r ${WORK}/node_modules/tilelive-otp-stops/ \
-r ${WORK}/node_modules/tilelive-gl/ \
-r ${WORK}/node_modules/tilelive-hsl-parkandride \
-r ${WORK}/node_modules/tilelive-hsl-ticket-sales \
&& sleep 10 && node_modules/.bin/forever --fifo logs 0
