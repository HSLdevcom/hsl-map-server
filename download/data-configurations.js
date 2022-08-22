const {
  TICKET_SALES_URL
} = require("../constants");
const { dummyGeojsonWrangler } = require("./wranglers");

const layers = [
  {
    name: "hsl-ticket-sales",
    sources: [
      {
        url: TICKET_SALES_URL,
        wrangler: dummyGeojsonWrangler,
        file: "hsl-ticket-sales.geojson",
      }
    ]
  }
];

module.exports = layers;
