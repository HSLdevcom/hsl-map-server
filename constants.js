module.exports = {
  PARKANDRIDE_URL: process.env.PARKANDRIDE_URL || "https://p.hsl.fi/api/v1/",
  TICKET_SALES_URL: process.env.TICKET_SALES_URL || "https://data-hslhrt.opendata.arcgis.com/datasets/f9388fc8a8f848fda3bc584b607afe97_0.geojson",
  WALTTI_OTP_URL: process.env.WALTTI_OTP_URL,
  WORK_DIR: process.env.WORK || process.env.PWD,
};
