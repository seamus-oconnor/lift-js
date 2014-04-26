#!/usr/bin/env bash

cd `dirname $0`
cd ..

port=8000
projectdir=`pwd`
vmdir=/var/liftjs

if [ "$1" ]; then
  port="$1"
fi

containerid=`docker ps | grep soconnor/liftjs | awk '{ print $1 }'`
if [ -z "$containerid" ]; then
  docker run -p $port:80 -d -v $projectdir:$vmdir:ro soconnor/liftjs
else
  echo "Already started"
fi
