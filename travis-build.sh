#!/bin/bash
set +e

# Set these environment variables
#DOCKER_USER // dockerhub credentials
#DOCKER_AUTH

ORG=${ORG:-hsldevcom}
DOCKER_TAG=${TRAVIS_BUILD_ID:-latest}
DOCKER_IMAGE=$ORG/hsl-map-server:${DOCKER_TAG}
DOCKER_IMAGE_LATEST=$ORG/hsl-map-server:latest

echo Building hsl-map-server: $DOCKER_IMAGE

docker build  --tag=$DOCKER_IMAGE -f Dockerfile .

if [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
  docker login -u $DOCKER_USER -p $DOCKER_AUTH
  docker push $DOCKER_IMAGE
  docker tag $DOCKER_IMAGE $DOCKER_IMAGE_LATEST
  docker push $DOCKER_IMAGE_LATEST
fi

echo Build completed
