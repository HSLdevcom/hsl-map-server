const hslMapStyle = require("hsl-map-style");

const { DATA_DIR } = require("./constants");

const sourcesUrl = "http://localhost:8080/";

const rasterHeaders = { "headers": { "Cache-Control": "public,max-age=604800" } };
const vectorHeaders = { "headers": { "Cache-Control": "public,max-age=43200" } };

// Common defaults for vector data layers.
const geojsonSourceProps = {
  "protocol": "geojson:",
  "query": {},
  "minzoom": 5,
  "maxzoom": 20,
  "bounds": [18, 58, 32, 71],
};

// Center data to give hint for clients where to zoom.
const hslCenter = [24.9, 60.1, 14];
const finlandCenter = [26, 63, 8];

module.exports = {
  // Vector endpoints

  // New v2 endpoint. Uses OpenMapTiles schema.
  "/map/v2/hsl-vector-map": {
    "source": `mbtiles://${DATA_DIR}/finland.mbtiles`,
    ...vectorHeaders,
  },
  // Endpoint for the old deprecated schema. Remove after not needed any more.
  "/map/v1/hsl-vector-map": {
    "source": `mbtiles://${DATA_DIR}/finland-old-schema.mbtiles`,
    ...vectorHeaders,
  },

  // Citybike maps
  "/map/:version(v1|v2)/hsl-citybike-map": {
    "source": {
      ...geojsonSourceProps,
      "center": hslCenter,
      "name": "HSL Citybikes",
      "sources": [{
        "id": "stations",
        "file": `${DATA_DIR}/hsl-citybikes.geojson`,
      }]
    },
    ...vectorHeaders,
  },
  "/map/:version(v1|v2)/waltti-citybike-map": {
    "source": {
      ...geojsonSourceProps,
      "center": finlandCenter,
      "name": "Waltti Citybikes",
      "maxzoom": 20,
      "sources": [{
        "id": "stations",
        "file": `${DATA_DIR}/waltti-citybikes.geojson`,
      }]
    },
    ...vectorHeaders,
  },
  "/map/:version(v1|v2)/finland-citybike-map": {
    "source": {
      ...geojsonSourceProps,
      "center": finlandCenter,
      "name": "Finland Citybikes",
      "sources": [{
        "id": "stations",
        "file": `${DATA_DIR}/finland-citybikes.geojson`,
      }]
    },
    ...vectorHeaders,
  },

  // Stop maps
  "/map/:version(v1|v2)/hsl-stop-map": {
    "source": {
      ...geojsonSourceProps,
      "center": hslCenter,
      "name": "Stops",
      "sources": [{
        "id": "stops",
        "file": `${DATA_DIR}/hsl-stops.geojson`,
      }, {
        "id": "stations",
        "file": `${DATA_DIR}/hsl-stations.geojson`,
      }]
    },
    ...vectorHeaders,

  },
  "/map/:version(v1|v2)/finland-stop-map": {
    "source": {
      ...geojsonSourceProps,
      "center": finlandCenter,
      "name": "Stops",
      "sources": [{
        "id": "stops",
        "file": `${DATA_DIR}/finland-stops.geojson`,
      }, {
        "id": "stations",
        "file": `${DATA_DIR}/finland-stations.geojson`,
      }]
    },
    ...vectorHeaders,

  },
  "/map/:version(v1|v2)/waltti-stop-map": {
    "source": {
      ...geojsonSourceProps,
      "center": finlandCenter,
      "name": "Stops",
      "sources": [{
        "id": "stops",
        "file": `${DATA_DIR}/waltti-stops.geojson`,
      }, {
        "id": "stations",
        "file": `${DATA_DIR}/waltti-stations.geojson`,
      }]
    },
    ...vectorHeaders,

  },

  // Park and ride map (Liityntäpysäköinti)
  "/map/:version(v1|v2)/hsl-parkandride-map": {
    "source": {
      ...geojsonSourceProps,
      "center": hslCenter,
      "name": "HSL Park & Ride",
      "sources": [{
        "id": "facilities",
        "file": `${DATA_DIR}/hsl-parkandride-facilities.geojson`,
      }, {
        "id": "hubs",
        "file": `${DATA_DIR}/hsl-parkandride-hubs.geojson`,
      }]
    },
    ...vectorHeaders,
  },

  // Ticket sales point map
  "/map/:version(v1|v2)/hsl-ticket-sales-map": {
    "source": {
      ...geojsonSourceProps,
      "center": hslCenter,
      "name": "Ticket sales",
      "sources": [{
        "id": "ticket-sales",
        "file": `${DATA_DIR}/hsl-ticket-sales.geojson`,
      }]
    },
    ...vectorHeaders,
  },

  // Raster endpoints

  // Raster endpoints v1 and v2 both uses OMT at the moment.
  // Default layer tile is 512x512 pixels, but 256x256 layers are defined separately.

  // The main map. Reittiopas style.
  "/map/:version(v1|v2)/hsl-map": {
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
  "/map/:version(v1|v2)/hsl-map-256": {
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
  "/map/:version(v1|v2)/hsl-map-sv": {
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
  "/map/:version(v1|v2)/hsl-map-sv-256": {
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
  "/map/:version(v1|v2)/hsl-map-en": {
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
  "/map/:version(v1|v2)/hsl-map-en-256": {
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
  "/map/:version(v1|v2)/hsl-map-fi-sv": {
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
  "/map/:version(v1|v2)/hsl-map-fi-sv-256": {
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
  "/map/:version(v1|v2)/hsl-map-no-text": {
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
  "/map/:version(v1|v2)/hsl-map-no-text-256": {
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
  "/map/:version(v1|v2)/hsl-map-greyscale": {
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
  "/map/:version(v1|v2)/hsl-map-greyscale-256": {
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
  "/map/:version(v1|v2)/hsl-map-greyscale-no-text": {
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
  "/map/:version(v1|v2)/hsl-map-greyscale-256-no-text": {
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
  },
};
