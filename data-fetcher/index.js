// Script to download and save all data sources from configuration file.

const _ = require("lodash");
const layers = require("./configurations");
const { fetchAndSaveData } = require("./fetcher");

const dataProcesses = layers.map((layer) => (
  Promise.all(layer.sources.map((source) => fetchAndSaveData(
    source.url,
    source.wrangler,
    source.file,
    source.gqlQuery,
  )
    .then((err) => (_.pickBy({
      file: source.file,
      status: !err ? "ok" : "error",
      error: err && err.toString(),
    }, (d) => d !== undefined)))))
));

Promise.all(dataProcesses)
  .then((status) => console.log("Download process done:\n", status));
