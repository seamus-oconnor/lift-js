#!/usr/bin/env bash

cd `dirname $0`
cd ..

port=8000
projectdir=`pwd`
vmdir=/var/liftjs
tmpdir=tmp
containerfile="$tmpdir/nginx.containerid"

if [ ! -d $tmpdir ]; then
  mkdir $tmpdir
fi

if [ "$1" ]; then
  port="$1"
fi

if [ -f $containerfile ]; then
  ./scripts/stop-nginx.sh

  sleep 1
fi

echo "Starting nginx container"

containerid=$(docker run -p $port:80 -d -v $projectdir:$vmdir:ro soconnor/liftjs)
echo "$containerid" > $containerfile
