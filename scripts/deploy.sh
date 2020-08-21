#!/usr/bin/expect -f

spawn ssh $vm_user@$server_ip
expect "password: "
send $vm_password
expect "$ "

send "sudo docker pull feedgrabber2020/fg-core:latest"
expect "$ "

send "sudo docker pull feedgrabber2020/fg-client:latest"
expect "$ "

send "sudo docker pull feedgrabber2020/fg-event-processor:latest"
expect "$ "

send "sudo docker-compose down"
expect "$ "

send "sudo docker-compose -f ~/.docker/docker-compose.yml up -d"
expect "$ "

send "exit\r"