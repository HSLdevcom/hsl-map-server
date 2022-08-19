const { TICKET_SALES_URL } = require('../constants.js');
const { fetchData, saveJson } = require('./util')

const handleResponse = (body) => {
  const geojsonData = JSON.parse(body)
  return geojsonData;
}

fetchData(TICKET_SALES_URL)
  .then(handleResponse)
  .then((data) => saveJson(data, 'ticket-sales.geojson'));
