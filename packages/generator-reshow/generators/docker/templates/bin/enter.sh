#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

VERSION=$(${DIR}/../support/VERSION.sh)
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
cli+=" --name ${localImage}-${pid} ${localImage}:${VERSION}"
cli+=" sh ${C}"

bash -c "$cli"
