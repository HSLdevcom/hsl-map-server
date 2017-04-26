const sourcesUrl = "hsl-map-server:8080/";
const glyphsUrl = `file://${process.env.WORK}/node_modules/hsl-map-style/`;

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
      "style": require("hsl-map-style").generateStyle({ lang: "fi", sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: "fi", sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({ lang: "sv", sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: "sv", sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-fi-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({ lang: ["fi", "sv"], sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-map-fi-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: ["fi", "sv"], sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/hsl-citybike-map": {
    "source": `otpcitybikes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=172800"
    }
  },
  "/hsl-stop-map": {
    "source": `otpstops://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/hsl-route-map": {
    "source": `otproutes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/finland-stop-map": {
    "source": `otpstops://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/waltti-stop-map": {
    "source": `otpstops://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/hsl-parkandride-map": {
    "source": "hslparkandride://",
    "headers": {
      "Cache-Control": "public,max-age=172800"
    }
  },
  "/hsl-ticket-sales-map": {
    "source": "hslticketsales://",
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  
  "/map/v1/hsl-vector-map": {
    "source": "mbtiles://./finland.mbtiles",
    "headers": {
      "Cache-Control": "public,max-age=86400"
    }
  },
  "/map/v1/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({ lang: "fi", sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: "fi", sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({ lang: "sv", sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: "sv", sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-fi-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({ lang: ["fi", "sv"], sourcesUrl, glyphsUrl })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-fi-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": {layerTileSize: 256},
      "style": require("hsl-map-style").generateStyle({ lang: ["fi", "sv"], sourcesUrl, glyphsUrl, extensions: ["icons"] })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-citybike-map": {
    "source": `otpcitybikes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=172800"
    }
  },
  "/map/v1/hsl-stop-map": {
    "source": `otpstops://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/hsl-route-map": {
    "source": `otproutes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/finland-stop-map": {
    "source": `otpstops://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/waltti-stop-map": {
    "source": `otpstops://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/hsl-parkandride-map": {
    "source": "hslparkandride://",
    "headers": {
      "Cache-Control": "public,max-age=172800"
    }
  },
  "/map/v1/hsl-ticket-sales-map": {
    "source": "hslticketsales://",
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  }
}
