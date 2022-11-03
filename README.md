# HSL Map Server

A map server used to serve xyz-tiles in raster and vector formats for HSL applications.


## Endpoints

Endpoints are defined in `config.js`.

Basemap urls are:
- raster: `http://{host}/map/v2/hsl-map/{z}/{x}/{y}.png`
- vector: `http://{host}/map/v2/hsl-vector-map/{z}/{x}/{y}.pbf`


The schema of vector tiles is © OpenMapTiles with [minor modifications](https://github.com/HSLdevcom/openmaptiles). 


## Dev server

All needed data will be downloaded inside the image during build or after startup.

Start the development server:

```
docker build -t hsl-map-server .
docker run --rm -p 8080:8080 --name hsl-map-server hsl-map-server
```

Browse maps e.g. in the browser with the integrated map viewer:
http://localhost:8080/map/v2/hsl-map/#11/60.9823/25.6634

## Development with custom tiles

- Create a folder named ```data``` into the root of the project.

- Copy your ```.mbtiles``` file into the ```data``` folder.

- Change the name of the file to ```finland.mbtiles``` so the server can serve them properly.

- Comment out the ```mkdir``` and ```wget``` commands from the dockerfile, so the tiles aren't retrieved while building the container. 

- Follow the instructions to start up the development server as usual.

## Development with Maputnik and local tileserver

- Follow the instructions above to launch the dev server.

- Follow the instructions on [Maputnik documentation](https://github.com/maputnik/editor/wiki) to start a local Maputnik instance.

- Upload the style json from Maputnik or [expose](https://github.com/maputnik/editor/wiki/Maputnik-CLI) a local style JSON for development. By default, hsl-map-style will use Digitransit API for the tileserver.

- Navigate to Data sources ---> Active sources and change the TileJSON URL of the ```#vector``` datasource into your local hsl-map-server instance's TileJSON URL, for example ```http://localhost:8080/map/v2/hsl-vector-map/index.json```.

- The tiles are now served from your local tileserver !


## Data configurations

Vector data layers are downloaded in the beginning of the image's startup command. The implementation is located under `data-fetcher` directory. Data fetcher works independently from hsl-map-server so that it just downloads data into the data directory but does not define any layers (although, the files are grouped as layers to make easier to understand which file belongs to which layer.) Data fetcher config can be found on `data-fetcher/configurations.js`. Configuration contains url from where the data will be fetched, possible graphQL query, wrangler to modify data to GeoJSON format (important for data from GraphQL) and a file name where to save the file.

Layer configurations are in `config.js`. Remember to configure the right data path to the corresponding layer.
