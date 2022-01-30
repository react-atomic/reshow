#!/bin/bash
DIR="$( cd "$(dirname "$0")" ; pwd -P )"

if [ -z $VERSION ]; then
  VERSION=$(awk -F "=" '/^VERSION/ {print $2}' ${DIR}/../.env.build)
fi

echo $VERSION
