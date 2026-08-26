#!/bin/bash
set -e

[[ -d dist ]] && rm -r dist

npm install
npx -y update-browserslist-db@latest
npm run build
