#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

ENV=${DIR}/../.env.build

if [ -z "$remoteImage" ]; then
  remoteImage=$(awk -F "=" '/^remoteImage/ {print $2}' $ENV)
fi

echo $remoteImage
