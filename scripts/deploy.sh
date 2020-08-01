#/bin/bash

scp -r ./.docker/nginx $vm_user@$server_ip:~/.docker/nginx
scp ./.docker/docker-compose.yml $vm_user@$server_ip:~/.docker

ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:api"
ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:client"
ssh $vm_user@$server_ip "sudo docker-compose -f ~/.docker/docker-compose.yml up -d"