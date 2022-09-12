const fs = require("fs");
const request = require("requestretry");

const { DATA_DIR } = require("../constants");

const dummyData = { "type": "Feature", "properties": {}, "geometry": null }; // Empty geometry to be used if url doesn't respond correctly

const saveJson = (data, filename) => {
  const content = JSON.stringify(data); // All data should be GeoJSON at this point.
  fs.writeFileSync(`${DATA_DIR}/${filename}`, content);
};

const fetchAndSaveData = (dataUrl, wrangler, filename, gqlQuery) => {
  const uri = dataUrl.startsWith("http") ? dataUrl : `http://${dataUrl}`;

  const commonRequestParams = {
    uri,
    maxAttempts: Number(process.env.DOWNLOAD_RETRY_COUNT) || 3,
    retryDelay: 15000,
    followAllRedirects: true,
    fullResponse: false,
    retryStrategy: (err, response) => {
      const retry = request.RetryStrategies.HTTPOrNetworkError(err, response);
      if (retry) console.log(`An error on ${uri}. Response status code was ${response.statusCode}. Retrying...`);
      return retry;
    },
  };

  const gqlRequestParams = {
    body: gqlQuery,
    method: "POST",
    headers: {
      "Content-Type": "application/graphql",
      // These are some OTP specific headers. Restructure them to specific queries
      // if some other gql api is used, and these headers broke the query.
      "OTPTimeout": "120000",
      "OTPMaxResolves": "100000000",
    }
  };

  return (
    // Currently there are only two types of sources.
    request(gqlQuery ? { ...commonRequestParams, ...gqlRequestParams } : commonRequestParams)
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
};

module.exports = {
  fetchAndSaveData
};
