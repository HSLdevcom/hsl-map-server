const {
  PARKANDRIDE_URL,
  TICKET_SALES_URL
} = require("../constants");
const { queries, wranglers } = require("./data");

const layers = [
  {
    name: "hsl-parkandride",
    sources: [
      {
        url: `${PARKANDRIDE_URL}facilities.geojson`,
        wrangler: wranglers.dummyGeojsonWrangler,
        file: "hsl-parkandride-facilities.geojson",
      },
      {
        url: `${PARKANDRIDE_URL}hubs.geojson`,
        wrangler: wranglers.dummyGeojsonWrangler,
        file: "hsl-parkandride-hubs.geojson",
      }
    ]
  },
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
