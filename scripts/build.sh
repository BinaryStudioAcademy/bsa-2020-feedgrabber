#/bin/bash

docker build -f .docker/api.dockerfile -t 'fg-core' .
docker build -f .docker/frontend.dockerfile -t 'fg-client' .
docker build -f .docker/event-processor.dockerfile -t 'fg-event-processor' .

# docker login -u $docker_user -p $docker_pass

# docker tag fg-core:latest feedgrabber2020/dockerhub:fg-core
# docker tag fg-client:latest feedgrabber2020/dockerhub:fg-client

# docker push feedgrabber2020/dockerhub:fg-core
# docker push feedgrabber2020/dockerhub:fg-client
