// This just modifies response body to json object
const dummyGeojsonWrangler = (body) => {
  const geojsonData = JSON.parse(body);
  return geojsonData;
};

const stopQuery = `
  query stops {
    stops {
      gtfsId
      name
      code
      platformCode
      lat
      lon
      locationType
      desc
      parentStation {
        gtfsId
      }
      patterns {
        headsign
        route {
          mode
          shortName
          gtfsType: type
        }
      }
    }
  }
`;

const stopWrangler = (body) => {
  const stopData = JSON.parse(body);
  return {
    type: "FeatureCollection",
    features: stopData.data.stops.map((stop) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [stop.lon, stop.lat]
      },
      properties: {
        gtfsId: stop.gtfsId,
        name: stop.name,
        code: stop.code,
        platform: stop.platformCode == null ? "null" : stop.platformCode, // TODO: 'null' -string should be changed to null after the map style of HSL app has been updated.
        desc: stop.desc,
        parentStation: stop.parentStation == null ? "null" : stop.parentStation.gtfsId, // TODO: 'null' -string should be changed to null after the map style of HSL app has been updated.
        type: stop.patterns == null ? null : stop.patterns.map((pattern) => pattern.route.mode).uniq().join(","),
        patterns: stop.patterns == null ? null : JSON.stringify(stop.patterns.map((pattern) => ({
          headsign: pattern.headsign,
          type: pattern.route.mode,
          shortName: pattern.route.shortName,
          gtfsType: pattern.route.gtfsType,
        })))
      }
    }))
  };
};

const stationQuery = `
  query stations{
    stations {
      gtfsId
      name
      lat
      lon
      locationType
      stops {
        gtfsId
        patterns {
          route {
            mode
            shortName
            gtfsType: type
          }
        }
      }
    }
  }
`;

const stationWrangler = (body) => {
  const stationData = JSON.parse(body);
  return {
    type: "FeatureCollection",
    features: stationData.data.stations.map((station) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [station.lon, station.lat]
      },
      properties: {
        gtfsId: station.gtfsId,
        name: station.name,
        type: Array.from(new Set(station.stops.flatMap((stop) => (
          stop.patterns.flatMap((pattern) => (
            pattern.route.mode
          ))
        )))).join(","),
        stops: JSON.stringify(station.stops.map((stop) => stop.gtfsId)),
        routes: JSON.stringify(station.stops.flatMap((stop) => (
          stop.patterns.flatMap((pattern) => pattern.route)
        )).uniq()),
      }
    }))
  };
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
  }
`;

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

module.exports = {
  queries: {
    stopQuery,
    stationQuery,
    citybikeQuery,
  },
  wranglers: {
    dummyGeojsonWrangler,
    stopWrangler,
    stationWrangler,
    citybikeWrangler,
  },
};
