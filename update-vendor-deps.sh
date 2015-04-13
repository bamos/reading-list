#!/bin/bash

set -x -e

#bower install

rm -rf vendor
mkdir -p vendor/{css,fonts,js}

cp -r bower_components/bootstrap/dist/* vendor
cp -r bower_components/font-awesome/* vendor

cp bower_components/jquery/dist/* vendor/js
cp bower_components/handlebars/handlebars.min.js vendor/js
cp bower_components/bootbox/bootbox.js vendor/js
cp bower_components/js-yaml/dist/js-yaml.min.js vendor/js
