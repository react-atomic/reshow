#!/usr/bin/env bash
DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"
sourceImage=$(${DIR}/../support/sourceImage.sh)
pid=$$

cli='env docker run --rm -it';
cli+=" --name ${sourceImage}-${pid} ${sourceImage}";
bash -c "$cli";
