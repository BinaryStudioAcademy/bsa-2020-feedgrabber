#/bin/bash

# scp -r ./.docker/nginx $vm_user@$server_ip:~/.docker/nginx
# scp ./.docker/docker-compose.yml $vm_user@$server_ip:~/.docker

# ssh $vm_user@$server_ip "sudo docker pull feedgrabber2020/dockerhub:fg-core"
# ssh $vm_user@$server_ip "sudo docker pull feedgrabber2020/dockerhub:fg-client"
# ssh $vm_user@$server_ip "sudo docker-compose -f ~/.docker/docker-compose.yml up -d"