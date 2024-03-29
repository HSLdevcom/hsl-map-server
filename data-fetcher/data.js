const _ = require("lodash");
const centroid = require("@turf/centroid").default;

// Wrapper to log errors
const errorLogger = (wrangler) => (
  (body) => {
    try {
      return wrangler(body);
    } catch (err) {
      console.error("Response body for the following error was:\n", body);
      throw err;
    }
  }
);

// This just modifies response body to json object
const dummyGeojsonWrangler = (body) => {
  const geojsonData = JSON.parse(body);
  return geojsonData;
};

// Converts geojson polygons to points.
const geojsonPolygonToPointWrangler = (body) => {
  const originalGeojsonData = JSON.parse(body);
  const centeredFeatures = originalGeojsonData.features.map((f) => ({
    ...f, // Keep the original properties
    geometry: centroid(f).geometry,
  }));

  return {
    type: "FeatureCollection",
    features: centeredFeatures,
  };
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
  const { data } = JSON.parse(body);

  return {
    type: "FeatureCollection",
    features: data.stops.map((stop) => ({
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
        type: stop.patterns == null ? null : _.uniq(stop.patterns.map((pattern) => pattern.route.mode)).join(","),
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
  const { data } = JSON.parse(body);

  return {
    type: "FeatureCollection",
    features: data.stations.map((station) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [station.lon, station.lat]
      },
      properties: {
        gtfsId: station.gtfsId,
        name: station.name,
        type: _.uniq(_.flatten(station.stops.map((stop) => (
          stop.patterns.map((pattern) => (
            pattern.route.mode
          ))
        )))).join(","),
        stops: JSON.stringify(station.stops.map((stop) => stop.gtfsId)),
        routes: JSON.stringify(_.uniqWith(_.flatten(station.stops.map((stop) => (
          stop.patterns.map((pattern) => pattern.route)
        ))), _.isEqual)),
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
  const { data } = JSON.parse(body);
  return {
    type: "FeatureCollection",
    features: data.bikeRentalStations.map((station) => ({
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
  };
};

module.exports = {
  queries: {
    stopQuery,
    stationQuery,
    citybikeQuery,
  },
  wranglers: {
    dummyGeojsonWrangler: errorLogger(dummyGeojsonWrangler),
    geojsonPolygonToPointWrangler: errorLogger(geojsonPolygonToPointWrangler),
    stopWrangler: errorLogger(stopWrangler),
    stationWrangler: errorLogger(stationWrangler),
    citybikeWrangler: errorLogger(citybikeWrangler),
  },
};
