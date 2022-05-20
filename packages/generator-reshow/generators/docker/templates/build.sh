#!/usr/bin/env bash

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

FOLDER_PREFIX=$(${DIR}/support/FOLDER_PREFIX.sh)
BUILD_VERSION=$1

if [ -z "$BUILD_VERSION" ]; then
  echo "Not set build version."
  exit 1;
fi

do_build() {
  DEST_FOLDER=${DIR}/${FOLDER_PREFIX}${BUILD_VERSION}
  mkdir -p ${DEST_FOLDER}
  echo 'building --- Version: ' $BUILD_VERSION '-->'
  DEST_FILE=${DEST_FOLDER}/Dockerfile
  cp Dockerfile ${DEST_FILE}
  cp install-packages.sh ${DEST_FOLDER}
  sed -i -e "s|\[VERSION\]|$BUILD_VERSION|g" ${DEST_FILE}
  if [ -e "${DEST_FILE}-e" ]; then rm ${DEST_FILE}-e; fi
}

do_build
