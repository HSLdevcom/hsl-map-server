const sourcesUrl = "http://localhost:8080/";

module.exports = {
  "/map/v2/hsl-ticket-sales-map": {
    "source": {
      "protocol": "geojson:",
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
