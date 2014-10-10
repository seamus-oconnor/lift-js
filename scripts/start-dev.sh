#!/usr/bin/env bash

cd `dirname $0`
cd ..

port=8000
projectdir=`pwd`
vmdir=/var/liftjs

if [ "$1" ]; then
  port="$1"
fi

echo "Starting grunt dev container"

docker run --rm -w $vmdir -p $port:80 -v $projectdir:$vmdir:rw soconnor/liftjs bash -c "grunt dev"

