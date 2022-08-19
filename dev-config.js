const sourcesUrl = "http://localhost:8080/";

module.exports = {
  "/map/v1/hsl-ticket-sales-map": {
    "source": "hslticketsales://",
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  },
  "/map/v2/hsl-ticket-sales-map": {
    "source": {
      "protocol": "geojson:",
      "query": {},
      "name": "Ticket sales",
      "maxzoom": 20,
      "sources": [{
        "id": "ticket-sales",
        "description": "",
        "file": "/opt/hsl-map-server/ticket-sales.geojson",
      }]
    },
    "headers": {
      "Cache-Control": "public,max-age=604800"
    }
  }
}
