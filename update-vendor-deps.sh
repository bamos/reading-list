#!/bin/bash

set -x -e

#bower install

rm -rf vendor
mkdir -p vendor/{css,fonts,js}

cp -r bower_components/bootstrap/dist/* vendor
cp -r bower_components/font-awesome/* vendor
#cp -r bower_components/MathJax/unpacked vendor/MathJax
cp -r bower_components/crypto-js vendor/js


cp -r bower_components/TimelineJS/build/* vendor
cp vendor/css/themes/dark.css vendor/css/timeline.css
cp vendor/css/themes/timeline-dark.png vendor/css/timeline-dark.png

cp bower_components/jquery/dist/* vendor/js
cp bower_components/handlebars/handlebars.min.js vendor/js
cp bower_components/bootbox/bootbox.js vendor/js
cp bower_components/js-yaml/dist/js-yaml.min.js vendor/js
cp bower_components/marked/marked.min.js vendor/js
