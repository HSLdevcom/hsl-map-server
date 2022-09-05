const {
  HSL_OTP_URL,
  FINLAND_OTP_URL,
  WALTTI_OTP_URL,
  PARKANDRIDE_URL,
  TICKET_SALES_URL
} = require("../constants");
const { queries, wranglers } = require("./data");

const layers = [
  {
    name: "hsl-stops",
    sources: [
      {
        url: HSL_OTP_URL,
        gqlQuery: queries.stopQuery,
        wrangler: wranglers.stopWrangler,
        file: "hsl-stops.geojson",
      },
      {
        url: HSL_OTP_URL,
        gqlQuery: queries.stationQuery,
        wrangler: wranglers.stationWrangler,
        file: "hsl-stations.geojson",
      }
    ]
  },
  {
    name: "finland-stops",
    sources: [
      {
        url: FINLAND_OTP_URL,
        gqlQuery: queries.stopQuery,
        wrangler: wranglers.stopWrangler,
        file: "finland-stops.geojson",
      },
      {
        url: FINLAND_OTP_URL,
        gqlQuery: queries.stationQuery,
        wrangler: wranglers.stationWrangler,
        file: "finland-stations.geojson",
      }
    ]
  },
  {
    name: "waltti-stops",
    sources: [
      {
        url: WALTTI_OTP_URL,
        gqlQuery: queries.stopQuery,
        wrangler: wranglers.stopWrangler,
        file: "waltti-stops.geojson",
      },
      {
        url: WALTTI_OTP_URL,
        gqlQuery: queries.stationQuery,
        wrangler: wranglers.stationWrangler,
        file: "waltti-stations.geojson",
      }
    ]
  },
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
    name: "finland-citybikes",
    sources: [
      {
        url: FINLAND_OTP_URL,
        gqlQuery: queries.citybikeQuery,
        wrangler: wranglers.citybikeWrangler,
        file: "finland-citybikes.geojson",
      }
    ]
  },
  {
    name: "waltti-citybikes",
    sources: [
      {
        url: WALTTI_OTP_URL,
        gqlQuery: queries.citybikeQuery,
        wrangler: wranglers.citybikeWrangler,
        file: "waltti-citybikes.geojson",
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
