#!/usr/bin/env bash

cd `dirname $0`
cd ..

projectdir=`pwd`
vmdir=/var/liftjs

command='bash'

if [[ "$@"  != '' ]]; then
  command="$@"
fi

docker run --rm -w $vmdir -v $projectdir:$vmdir:rw -i -t soconnor/liftjs bash -c "$command"
