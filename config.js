const hslMapStyle = require("hsl-map-style");

const { DATA_DIR } = require("./constants");

const sourcesUrl = "http://127.0.0.1:8080/";

const rasterHeaders = { "headers": { "Cache-Control": "public,max-age=604800" } };
const vectorHeaders = { "headers": { "Cache-Control": "public,max-age=43200" } };

module.exports = {
  // v3 endpoints

  // Vector tiles endpoint. Uses OpenMapTiles schema.
  "/map/v3/hsl-vector-map": {
    "source": `mbtiles://${DATA_DIR}/finland.mbtiles`,
    ...vectorHeaders,
  },

  // Raster endpoints
  // Default layer tile is 512x512 pixels, but 256x256 layers are defined separately.

  // The main map. Reittiopas style.
  "/map/v3/hsl-map": {
    "source": {
      "protocol": "gl:",
      "query": { bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256, bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // Swedish map style
  "/map/v3/hsl-map-sv": {
    "source": {
      "protocol": "gl:",
      "query": { bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_sv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256, bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_sv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // English map style
  "/map/v3/hsl-map-en": {
    "source": {
      "protocol": "gl:",
      "query": { bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_en: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-en-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256, bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_en: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // Bilingual map style
  "/map/v3/hsl-map-fi-sv": {
    "source": {
      "protocol": "gl:",
      "query": { bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_fisv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-fi-sv-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256, bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text_fisv: { enabled: true },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // Map with no texts
  "/map/v3/hsl-map-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text: { enabled: false },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-no-text-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text: { enabled: false },
          simplified: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // Greyscale map
  "/map/v3/hsl-map-greyscale": {
    "source": {
      "protocol": "gl:",
      "query": { bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-greyscale-256": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256, bufferWidth: 8 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },

  // Greyscale map without texts
  "/map/v3/hsl-map-greyscale-no-text": {
    "source": {
      "protocol": "gl:",
      "query": {},
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text: { enabled: false },
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  },
  "/map/v3/hsl-map-greyscale-256-no-text": {
    "source": {
      "protocol": "gl:",
      "query": { layerTileSize: 256 },
      "style": hslMapStyle.generateStyle({
        sourcesUrl,
        components: {
          text: { enabled: false },
          greyscale: { enabled: true },
          simplified: { enabled: true },
          municipal_borders: { enabled: true }
        }
      })
    },
    ...rasterHeaders,
  }
};
