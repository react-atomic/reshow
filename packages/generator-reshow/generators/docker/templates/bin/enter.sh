#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

localImage=$(${DIR}/../support/localImage.sh)

C=''
for i in "$@"; do
  i="${i//\\/\\\\}"
  C="$C \"${i//\"/\\\"}\""
done

pid=$$

cli='env docker run --rm -it'
cli+=" -v $DIR:$DIR"
cli+=" -w $DIR"
cli+=" --name ${localImage}-${pid} ${localImage}"
cli+=" sh ${C}"

sh -c "$cli"
