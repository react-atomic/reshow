#!/bin/bash
DIR="$( cd "$(dirname "$0")" ; pwd -P )"

if [ -z $FOLDER_PREFIX ]; then
  FOLDER_PREFIX=$(awk -F "=" '/^FOLDER_PREFIX/ {print $2}' ${DIR}/../.env.build)
fi

echo $FOLDER_PREFIX
