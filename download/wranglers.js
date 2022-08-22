// This just modifies response body to json object
const dummyGeojsonWrangler = (body) => {
  const geojsonData = JSON.parse(body);
  return geojsonData;
};

module.exports = {
  dummyGeojsonWrangler,
};
