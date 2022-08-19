const fs = require('fs')
const request = require('requestretry');

const { WORK_DIR } = require('../constants.js');

const fetchData = (url) => (
  request({
    url,
    maxAttempts: 10,
    retryDelay: 15000,
    followAllRedirects: true,
    fullResponse: false,
    retryStrategy: (err, response) => (
      response.statusCode !== 200
    ),
  })
  .catch(err => {
    console.log("ERROR retrieving data from source: ", url);
    console.error(err);
  })
);

const saveJson = (data, fileName) => {
  const content = JSON.stringify(data);
  fs.writeFileSync(`${WORK_DIR}/${fileName}`, content);
}

module.exports = {
  fetchData,
  saveJson,
}