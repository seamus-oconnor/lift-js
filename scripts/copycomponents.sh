#!/usr/bin/env bash

cd `dirname $0`
cd ..

cp bower_components/curl/dist/curl-with-js-and-domReady/curl.js js/curl.min.js
rm -rf js/liftjs/
cp -R bower_components/liftjs/dist js/liftjs
