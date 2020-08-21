#/bin/bash

docker build \
   -f ".docker/api.dockerfile" \
   -t "fg-core" \
   "."

docker build \
    -f ".docker/frontend.dockerfile" \
    -t "fg-client" \
    "."

docker build \
    -f ".docker/event-processor.dockerfile" \
    -t "fg-event-processor" \
    "."

docker tag fg-core feedgrabber2020/fg-core:latest
docker push feedgrabber2020/fg-core:latest

docker tag fg-client feedgrabber2020/fg-client:latest
docker push feedgrabber2020/fg-client:latest

docker tag fg-event-processor feedgrabber2020/fg-event-processor:latest
docker push feedgrabber2020/fg-event-processor:latest
