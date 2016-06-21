module.exports = {
  "/hsl-vector-map": {
    "source": "mbtiles://./finland.mbtiles",
    "headers": {
      "Cache-Control": "public,max-age=86400"
    }
  },
  "/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style")
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style")
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-citybike-map": {
    "source": `otpcitybikes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-stop-map": {
    "source": `otpstops://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-route-map": {
    "source": `otproutes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/finland-stop-map": {
    "source": `otpstops://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/waltti-stop-map": {
    "source": `otpstops://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-parkandride-map": {
    "source": "hslparkandride://",
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/hsl-ticket-sales-map": {
    "source": "hslticketsales://",
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  }
}
