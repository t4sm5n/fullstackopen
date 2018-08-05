#!/bin/sh
npm run build
rm -rf ../../osa3/puhelinluettelo-api/build
cp -r build ../../osa3/puhelinluettelo-api/