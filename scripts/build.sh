#/bin/bash

docker build -f .docker/api.Dockerfile -t 'fg-core' .
docker build -f .docker/client.Dockerfile -t 'fg-client' .

docker login -u $docker_user -p $docker_pass

docker tag fg-core:latest feedgrabber2020/dockerhub:fg-core
docker tag fg-client:latest feedgrabber2020/dockerhub:fg-client

docker push feedgrabber2020/dockerhub:fg-core
docker push feedgrabber2020/dockerhub:fg-client
