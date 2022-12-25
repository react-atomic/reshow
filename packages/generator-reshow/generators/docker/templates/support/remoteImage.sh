#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

ENV=${DIR}/../.env.build

if [ -z "$remoteImage" ]; then
  if [ -z "$DOCKER_HUB" ]; then
    remoteImage=$(awk -F "=" '/^remoteImage/ {print $2}' $ENV)
  else
    remoteImage=$(awk -F "=" '/^dockerHubImage/ {print $2}' $ENV)
  fi
fi

echo $remoteImage
