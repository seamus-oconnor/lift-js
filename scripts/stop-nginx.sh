#!/usr/bin/env bash

cd `dirname $0`
cd ..

containerfile=tmp/nginx.containerid

if [ -f $containerfile ]; then
  containerid=$(cat "$containerfile")
  echo "Stopping docker nginx container"
  docker stop -t 0 "$containerid"
  rm $containerfile
else
  output=$(docker ps | grep soconnor/liftjs)
  if [ -z "$output" ]; then
    echo "No containers running"
  else
    echo "No running container id found. Check \`docker ps\`:"
    echo $output
  fi
fi
