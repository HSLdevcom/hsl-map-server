const sourcesUrl = "http://localhost:8080/";
const glyphsUrl = `file://${process.env.WORK}/node_modules/hsl-map-style/`;

module.exports = {
  // New v2 endpoint. Uses OpenMapTiles schema.
  "/map/v2/hsl-vector-map": {
    "source": "mbtiles://./finland.mbtiles",
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/map/v2/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_sv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_sv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-fi-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_fisv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-fi-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_fisv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-no-text-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false },
          simplified: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-greyscale": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-greyscale-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-greyscale-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false },
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-map-greyscale-256-no-text": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false },
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-citybike-map": {
    "source": `otpcitybikes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/waltti-citybike-map": {
    "source": `otpcitybikes://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/finland-citybike-map": {
    "source": `otpcitybikes://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/hsl-stop-map": {
    "source": `otpstops://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/finland-stop-map": {
    "source": `otpstops://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/waltti-stop-map": {
    "source": `otpstops://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v2/hsl-parkandride-map": {
    "source": "hslparkandride://",
    "headers": {
      "Cache-Control": "public,max-age=172800"
    }
  },
  "/map/v2/hsl-ticket-sales-map": {
    "source": "hslticketsales://",
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },

  // Endpoint for the old deprecated schema. Remove after not needed any more.
  "/map/v1/hsl-vector-map": {
    "source": "mbtiles://./finland-old-schema.mbtiles",
    "headers": {
      "Cache-Control": "public,max-age=3600"
    }
  },
  "/map/v1/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          icons: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_sv: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_sv: { enabled: true },
          icons: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-fi-sv": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_fisv: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-fi-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text_fisv: { enabled: true },
          icons: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-no-text-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          text: { enabled: false }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-greyscale": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-greyscale-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-greyscale-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale_no_text: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-map-greyscale-256-no-text": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": require("hsl-map-style-v1").generateStyle({
        sourcesUrl,
        glyphsUrl,
        components: {
          greyscale_no_text: { enabled: true }
        }
      })
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v1/hsl-citybike-map": {
    "source": `otpcitybikes://${process.env.HSL_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/waltti-citybike-map": {
    "source": `otpcitybikes://${process.env.WALTTI_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/finland-citybike-map": {
    "source": `otpcitybikes://${process.env.FINLAND_OTP_URL}`,
    "headers": {
      "Cache-Control": "public,max-age=43200"
    }
  },
  "/map/v1/hsl-stop-map": {
    "source": `otpstops://${process.env.HSL_OTP_URL}`,
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
