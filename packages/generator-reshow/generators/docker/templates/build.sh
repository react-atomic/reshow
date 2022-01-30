#!/usr/bin/env bash

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

FOLDER_PREFIX=$(${DIR}/support/FOLDER_PREFIX.sh)

do_build() {
  SED_REPLACE_VER=$1
  DEST_FOLDER=${DIR}/${FOLDER_PREFIX}${SED_REPLACE_VER}
  mkdir -p ${DEST_FOLDER}
  echo "building --- Version: " $SED_REPLACE_VER "-->"
  DEST_FILE=${DEST_FOLDER}/Dockerfile
  cp Dockerfile ${DEST_FILE}
  cp install-packages.sh ${DEST_FOLDER}
  sed -i -e "s|\[VERSION\]|$SED_REPLACE_VER|g" ${DEST_FILE}
  if [ -e "${DEST_FILE}-e" ]; then rm ${DEST_FILE}-e; fi
}

do_build $1
