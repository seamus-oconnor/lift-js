#!/usr/bin/env bash

cd `dirname $0`
cd ..

projectdir=`pwd`
vmdir=/var/liftjs

command='bash'

docker run -w $vmdir -v $projectdir:$vmdir:rw soconnor/liftjs bash -c "$command"
