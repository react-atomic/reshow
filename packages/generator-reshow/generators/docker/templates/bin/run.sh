#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

localImage=$(${DIR}/../support/localImage.sh)
pid=$$
folderName=${PWD##*/}

cli='env docker run --rm -it'
cli+=" --name ${folderName}-${pid} ${localImage}"
echo $cli
sh -c "$cli"
