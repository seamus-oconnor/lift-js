#!/usr/bin/env bash

cd `dirname $0`
cd ..

containerid=`docker ps | grep soconnor/liftjs | awk '{ print $1 }'`
if [ "$containerid" ]; then
  docker stop -t 0 "$containerid"
else
  echo "Already stopped"
fi
