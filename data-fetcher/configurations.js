const {
  TICKET_SALES_URL
} = require("../constants");
const { queries, wranglers } = require("./data");

const layers = [
  {
    name: "hsl-ticket-sales",
    sources: [
      {
        url: TICKET_SALES_URL,
        wrangler: wranglers.dummyGeojsonWrangler,
        file: "hsl-ticket-sales.geojson",
      }
    ]
  }
];

module.exports = layers;
