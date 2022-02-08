# HSL Map Server

A map server used to serve xyz-tiles in raster and vector formats for HSL applications.


## Endpoints

Endpoints are defined in `config.js`.

Basemap urls are:
- raster: `http://{host}/map/v2/hsl-map/{z}/{x}/{y}.png`
- vector: `http://{host}/map/v2/hsl-vector-map/{z}/{x}/{y}.pbf`


The schema of vector tiles is © OpenMapTiles with [minor modifications](https://github.com/HSLdevcom/openmaptiles). 


## Dev server

All needed data will be downloaded inside the image during build.

Start the development server:

```
docker build -t hsl-map-server .
docker run --rm -p 8080:8080 --name hsl-map-server hsl-map-server
```

Browse maps e.g. in the browser with the integrated map viewer:
http://localhost:8080/map/v2/hsl-map/#11/60.9823/25.6634
