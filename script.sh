#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo "Begin install systems"

docker rm -f cons-html
docker rmi -f img-html
sudo docker build . -t img-html
sudo docker run -d -p 3030:80 --name cons-html img-html

echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"




