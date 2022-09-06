module.exports = {
  PARKANDRIDE_URL: process.env.PARKANDRIDE_URL || "https://p.hsl.fi/api/v1/",
  TICKET_SALES_URL: process.env.TICKET_SALES_URL || "https://data-hslhrt.opendata.arcgis.com/datasets/f9388fc8a8f848fda3bc584b607afe97_0.geojson",
  HSL_OTP_URL: process.env.HSL_OTP_URL || "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
  FINLAND_OTP_URL: process.env.FINLAND_OTP_URL || "https://api.digitransit.fi/routing/v1/routers/finland/index/graphql",
  WALTTI_OTP_URL: process.env.WALTTI_OTP_URL || "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql",
  DATA_DIR: process.env.DATA_DIR || (process.env.WORK && `${process.env.WORK}/data`) || `${process.env.PWD}/data`,
};
