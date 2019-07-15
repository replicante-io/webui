#!/bin/env bash
set -e

# Confguration variables.
core="../replicante"
sudo=""
version=""

# Parse CLI args.
usage() {
  echo 'Usage: ci/release/prep.sh [OPTIONS] VERSION'
  echo
  echo 'VERSION is the version to release and is in the format vX.Y.Z'
  echo
  echo 'Available options:'
  echo '  --core_location DIR    Path to the Replicante Core repo'
  echo '  --sudo                 Use sudo for docker commands'
}

while [[ $# -ne 0 ]]; do
  arg=$1
  shift

  case "${arg}" in
    v[0-9].[0-9].[0-9]) version=$arg;;
    --core_location) core=$1; shift 1;;
    --sudo) sudo="--sudo";;

    --help|help|-h|h)
      usage
      exit 0
      ;;
    *)
      echo "Unrecognised argument ${arg}"
      usage
      exit 1
  esac
done

if [[ -z ${version} ]]; then
  echo 'Need a version to release'
  usage
  exit 1
fi

# Ensure dependencies are up to date and tests are clear.
echo '==> Updating deps and running tests ...'
npm update
ci/travis/test-script.sh

# Check docker images
echo '==> Checking docker images build successfully ...'
"${core}/ci/release/docker.sh" check "${version}" ${sudo} --repo webui
