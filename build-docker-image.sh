#!/bin/bash

# Set these environment variables
#DOCKER_TAG=
#DOCKER_EMAIL=
#DOCKER_USER=
#DOCKER_AUTH=
#FONTSTACK_PASSWORD=

# Build image
IMAGE="hsldevcom/hsl-map-server"
docker build --build-arg FONTSTACK_PASSWORD=$FONTSTACK_PASSWORD --tag="$IMAGE:$DOCKER_TAG" .
docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_AUTH
docker push $IMAGE:$DOCKER_TAG
docker tag $IMAGE:$DOCKER_TAG $IMAGE:latest
docker push $IMAGE:latest
