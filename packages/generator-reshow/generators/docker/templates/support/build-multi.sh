#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

FOLDER_PREFIX=$(${DIR}/VER_PREFIX.sh)
COPY_FILES=$(${DIR}/COPY_FILES.sh)
DOCKER_FILES=$(${DIR}/DOCKER_FILES.sh)
BUILD_VERSION=$1

if [ -z "$BUILD_VERSION" ]; then
  echo "Not set build version."
  exit 1
fi

copyfile() {
  src=$1
  dest=$2
  dir_path=$(dirname "$src")
  mkdir -p $dest/$dir_path
  cp -a $src $dest/$dir_path
}

do_build() {
  echo 'building --- Version: ' $BUILD_VERSION '-->'
  BUILD_FOLDER=${DIR}/../${FOLDER_PREFIX}${BUILD_VERSION}

  for file in $COPY_FILES; do [ -e "$file" ] && copyfile $file ${BUILD_FOLDER}; done
  for file in $DOCKER_FILES; do
    if [ -e "$file" ]; then
      copyfile $file ${BUILD_FOLDER}
      DEST_FILE=${BUILD_FOLDER}/$file
      sed -i -e "s|\[VERSION\]|$BUILD_VERSION|g" ${DEST_FILE}
      if [ -e "${DEST_FILE}-e" ]; then rm ${DEST_FILE}-e; fi
    fi
  done
}

do_build
