#!/usr/bin/expect -f

spawn ssh $env(vm_user)@$env(server_ip)
expect "yes/no" { 
	send "yes\r"
	expect "*?assword" { send "$env(vm_password)\r" }
} "*?assword" { send "$env(vm_password)\r" }
 
expect "$ "

send "sudo docker pull feedgrabber2020/fg-core:latest\r"
expect "$ "

send "sudo docker pull feedgrabber2020/fg-client:latest\r"
expect "$ "

send "sudo docker pull feedgrabber2020/fg-event-processor:latest\r"
expect "$ "

send "sudo docker-compose -f ~/.docker/docker-compose.yml up -d --force-recreate\r"
expect "$ "
sleep 10
send "sudo docker ps\r"
expect "$ "

send "exit\r"
