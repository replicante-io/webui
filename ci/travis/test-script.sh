#!/usr/bin/env sh
set -ex

npm ci
npm run build
npm run test
