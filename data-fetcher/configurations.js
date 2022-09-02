const {
  HSL_OTP_URL,
  PARKANDRIDE_URL,
  TICKET_SALES_URL
} = require("../constants");
const { queries, wranglers } = require("./data");

const layers = [
  {
    name: "hsl-citybikes",
    sources: [
      {
        url: HSL_OTP_URL,
        gqlQuery: queries.citybikeQuery,
        wrangler: wranglers.citybikeWrangler,
        file: "hsl-citybikes.geojson",
      }
    ]
  },
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
