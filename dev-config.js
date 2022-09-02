const sourcesUrl = "http://localhost:8080/";

module.exports = {
  "/map/v2/hsl-ticket-sales-map": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "Ticket sales",
      "maxzoom": 20,
      "sources": [{
        "id": "ticket-sales",
        "description": "",
        "file": "/opt/hsl-map-server/hsl-ticket-sales.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-citybike-map": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "OTP Citybikes",
      "maxzoom": 20,
      "sources": [{
        "id": "stations",
        "description": "",
        "file": "/opt/hsl-map-server/hsl-citybikes.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/finland-citybike-map": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "OTP Citybikes",
      "maxzoom": 20,
      "sources": [{
        "id": "stations",
        "description": "",
        "file": "/opt/hsl-map-server/finland-citybikes.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/waltti-citybike-map": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "OTP Citybikes",
      "maxzoom": 20,
      "sources": [{
        "id": "stations",
        "description": "",
        "file": "/opt/hsl-map-server/waltti-citybikes.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-parkandride": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "HSL Park & Ride",
      "maxzoom": 20,
      "bounds": [18, 58, 32, 71],
      "center": [24.9, 60.1, 14],
      "sources": [{
        "id": "facilities",
        "description": "",
        "file": "/opt/hsl-map-server/hsl-parkandride-facilities.geojson",
      }, {
        "id": "hubs",
        "description": "",
        "file": "/opt/hsl-map-server/hsl-parkandride-hubs.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  }
};
