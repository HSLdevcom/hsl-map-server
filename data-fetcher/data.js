// This just modifies response body to json object
const dummyGeojsonWrangler = (body) => {
  const geojsonData = JSON.parse(body);
  return geojsonData;
};

const citybikeWrangler = (body) => {
  const citybikeData = JSON.parse(body);
  return ({
    type: "FeatureCollection",
    features: citybikeData.data.bikeRentalStations.map((station) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [station.lon, station.lat]
      },
      properties: {
        id: station.stationId,
        name: station.name,
        networks: station.networks.join()
      }
    }))
  });
};

const citybikeQuery = `
  query bikerentals {
    bikeRentalStations {
      stationId
      name
      networks
      lon
      lat
    }
  }`;

module.exports = {
  queries: {
    citybikeQuery,
  },
  wranglers: {
    dummyGeojsonWrangler,
    citybikeWrangler,
  },
};
