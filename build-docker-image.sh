#!/bin/bash

# Set these environment variables
#DOCKER_TAG=
#DOCKER_EMAIL=
#DOCKER_USER=
#DOCKER_AUTH=

# Build image
SNAP_IMAGE="hsldevcom/hsl-map-server:$DOCKER_TAG"
LATEST_IMAGE="hsldevcom/hsl-map-server:latest"

docker build --tag=$SNAP_IMAGE .
docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_AUTH
docker push $SNAP_IMAGE
docker tag $SNAP_IMAGE $LATEST_IMAGE
docker push $LATEST_IMAGE
