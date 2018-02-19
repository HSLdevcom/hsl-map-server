#!/bin/bash
set -e

# Set these environment variables
#DOCKER_USER // dockerhub credentials
#DOCKER_AUTH
#FONTSTACK_PASSWORD

ORG=${ORG:-hsldevcom}
DOCKER_TAG=${TRAVIS_BUILD_ID:-latest}
DOCKER_IMAGE=$ORG/hsl-map-server:${DOCKER_TAG}
DOCKER_IMAGE_LATEST=$ORG/hsl-map-server:latest
DOCKER_IMAGE_PROD=$ORG/hsl-map-server:prod

function test {
  URL=$1
  MINLENGTH=$2

  echo $URL - Testing

  HEADERS=$(curl -sI $URL)

  if [ -z "$HEADERS" ] ; then
    echo $URL - No response
    exit 1
  fi

  STATUS=$(head -1 <<< "$HEADERS")
  if ! grep -q "200 OK" <<< "$HEADERS" ; then
    echo $URL - Unexpected status code: $STATUS
    exit 1
  fi

  LENGTH=$(grep -i content-length <<< "$HEADERS" | awk '{print $2}' | tr -d '\r')
  if [ "$LENGTH" -lt "$MINLENGTH" ] ; then
    echo $URL - Content length too small: $LENGTH
    exit 1
  fi

  echo $URL - OK
}

echo Building $DOCKER_IMAGE
docker build --tag=$DOCKER_IMAGE -f Dockerfile .

echo Running $DOCKER_IMAGE
docker run --rm -p 8080:8080 -h hsl-map-server --name hsl-map-server -e FONTSTACK_PASSWORD=$FONTSTACK_PASSWORD $DOCKER_IMAGE &
sleep 60

test http://localhost:8080/map/v1/hsl-map/14/9326/4739.png 80000
test http://localhost:8080/map/v1/hsl-map-sv/14/9326/4739.png 80000
test http://localhost:8080/map/v1/hsl-map-fi-sv/14/9326/4739.png 80000

test http://localhost:8080/map/v1/hsl-stop-map/14/9326/4739.pbf 2000
test http://localhost:8080/map/v1/waltti-stop-map/14/9363/4546.pbf 2000

test http://localhost:8080/map/v1/hsl-citybike-map/14/9326/4739.pbf 40
test http://localhost:8080/map/v1/hsl-parkandride-map/14/9326/4739.pbf 500
test http://localhost:8080/map/v1/hsl-ticket-sales-map/14/9326/4739.pbf 500

echo Stopping $DOCKER_IMAGE
docker stop hsl-map-server

if [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
  docker login -u $DOCKER_USER -p $DOCKER_AUTH
  docker push $DOCKER_IMAGE
  docker tag $DOCKER_IMAGE $DOCKER_IMAGE_LATEST
  docker push $DOCKER_IMAGE_LATEST
  docker tag $DOCKER_IMAGE $DOCKER_IMAGE_PROD
  docker push $DOCKER_IMAGE_PROD
fi

echo Build completed
