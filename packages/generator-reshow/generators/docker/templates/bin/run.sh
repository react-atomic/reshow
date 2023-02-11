#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

localImage=$(${DIR}/../support/localImage.sh)
pid=$$
folderName=${PWD##*/}

cli='env docker run --rm -it --platform linux/amd64'
cli+=" -v $DIR/../docker/entrypoint.sh:/entrypoint.sh"
cli+=" --name ${folderName}-${pid} ${localImage}"
echo $cli
sh -c "$cli"
