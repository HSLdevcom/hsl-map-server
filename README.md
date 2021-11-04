# HSL Map Server

A map server used to serve xyz-tiles as raster and vector format for HSL applications.


## Endpoints

Endpoints are defined in `config.js`.

Basemap urls are:
- raster: `http://{host}/map/v1/hsl-map/{z}/{x}/{y}.png`
- vector: `http://{host}/map/v1/hsl-vector/{z}/{x}/{y}.pbf`


The scheme of vector tiles is © OpenMapTiles with [minor modifications](https://github.com/HSLdevcom/openmaptiles). 


## Dev server

All needed data will be downloaded inside the image during build.

Start development server:

```
docker build -t hsl-map-server .
docker run --rm -p 8080:8080 -h hsl-map-server --name hsl-map-server hsl-map-server
```
