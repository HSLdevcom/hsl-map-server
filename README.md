# hsl-map-server
[![Build Status](https://travis-ci.org/HSLdevcom/hsl-map-server.svg?branch=master)](https://travis-ci.org/HSLdevcom/hsl-map-server)

Start development server:

```
docker build -t hsl-map-server .
docker run --rm -p 8080:8080 -h hsl-map-server --name hsl-map-server -e FONTSTACK_PASSWORD=[salasana] hsl-map-server
```