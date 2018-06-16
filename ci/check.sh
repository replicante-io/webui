#!/bin/bash -ex
#
# Usage: ci/check.sh
#
npm run test
npm outdated || true
