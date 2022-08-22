const fs = require("fs");
const request = require("requestretry");

const { WORK_DIR } = require("../constants");

const dummyData = { "type": "Feature", "properties": {}, "geometry": null }; // Empty geometry to be used if url doesn't respond correctly

const saveJson = (data, filename) => {
  const content = JSON.stringify(data); // All data should be GeoJSON at this point.
  fs.writeFileSync(`${WORK_DIR}/${filename}`, content);
};

const fetchAndSaveData = (url, wrangler, filename) => (
  request({
    url,
    maxAttempts: 1,
    retryDelay: 20000,
    followAllRedirects: true,
    fullResponse: false,
    retryStrategy: (err, response) => (
      request.RetryStrategies.HTTPOrNetworkError || response.statusCode !== 200
    ),
  })
    // Wrangler converts response to geojson format
    .then(
      wrangler,
      (err) => { throw err; } // Handle error later
    )
    .then(
      (data) => { saveJson(data, filename); },
      // Save dummy data if error happened
      (err) => { saveJson(dummyData, filename); return err; }
    )
);

module.exports = {
  fetchAndSaveData
};
