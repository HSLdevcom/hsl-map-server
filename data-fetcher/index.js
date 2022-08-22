// Script to download and save all data sources from configuration file.

const layers = require("./configurations");
const { fetchAndSaveData } = require("./fetcher");

const dataProcesses = layers.map((layer) => (
  Promise.all(layer.sources.map((source) => fetchAndSaveData(
    source.url,
    source.wrangler,
    source.file,
  )
    .then((err) => ({
      file: source.file,
      status: !err ? "ok" : "error",
      error: err && err.toString(),
    }))))
));

Promise.all(dataProcesses)
  .then((status) => console.log("Download process done:\n", status));
