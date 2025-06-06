#!/usr/bin/env sh

DIR="$(
  cd "$(dirname "$0")"
  pwd -P
)"

localImage=$(${DIR}/support/localImage.sh)
remoteImage=$(${DIR}/support/remoteImage.sh)
dockerHubImage=$(DOCKER_HUB=1 ${DIR}/support/remoteImage.sh)
archiveFile=$DIR/archive.tar
VERSION=$(${DIR}/support/VERSION.sh)
ALT_VERSION=$(${DIR}/support/ALT_VERSION.sh)
DOCKER_FILE=${DOCKER_FILE:-Dockerfile}

list() {
  docker images | head -10
}

tag() {
  tag=$1
  if [ -z "$tag" ]; then
    if [ -z "$VERSION" ]; then
      tag=${remoteImage}:latest
    else
      tag=${remoteImage}:$VERSION
    fi
  fi
  echo "* <!-- Start to tag: ${tag}"
  docker tag ${localImage} $tag
  list
  echo "* Finish tag -->"
}

login() {
  IS_LOGIN=$(echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_LOGIN" --password-stdin 2>&1)
  if [ -z "${IS_LOGIN+y}" ]; then
    echo "Not get login info."
    exit 1
  elif ! expr "${IS_LOGIN}" : ".*Succeeded.*" > /dev/null; then
    echo ${IS_LOGIN}
    echo "Login not Succeeded."
    exit 2
  else
    echo "Login Succeeded."
    exit 0
  fi
}

getJSONField() {
  text=$1
  field=$2
  echo $text | sed -n 's|.*"'${field}'"\s*:\s*"\([^"]*\)".*|\1|p'
}

getToken() {
  RESULT=$(
    curl -kX POST \
      -H "Content-Type: application/json" \
      -d '{"username": "'$DOCKER_LOGIN'", "password": "'$DOCKER_PASSWORD'"}' \
      https://hub.docker.com/v2/users/login
  )
  echo $(getJSONField $RESULT token)
}

updateDockerHubDesc() {
  DIR="$(
    cd "$(dirname "$0")"
    pwd -P
  )"
  remoteImage=$(${DIR}/support/remoteImage.sh)
  dockerHubImage=$(DOCKER_HUB=1 ${DIR}/support/remoteImage.sh)
  token=$(getToken)
  if [ -e "README.md" ]; then
    full_description=$(jq -s -R . README.md)
  fi
  data="{\"full_description\": ${full_description:-""} }"
  URL=https://hub.docker.com/v2/repositories/${dockerHubImage:-$remoteImage}
  echo
  echo $URL
  echo
  RESULT=$(
    curl -kX PATCH $URL \
      -H "Content-Type: application/json" \
      -H "Authorization: JWT $token" \
      -d "$data"
  )
  echo $RESULT
}

getRateLimit() {
  # https://docs.docker.com/docker-hub/download-rate-limit/
  token=$(curl -s --user "${DOCKER_LOGIN}:${DOCKER_PASSWORD}" "https://auth.docker.io/token?service=registry.docker.io&scope=repository:ratelimitpreview/test:pull" | jq -r .token)
  curl -s -I \
    -H "Authorization: Bearer $token" \
    "https://registry-1.docker.io/v2/ratelimitpreview/test/manifests/latest" | grep "ratelimit-"
}

push() {
  login
  PUSH_VERSION=${1:-$VERSION}
  LATEST_TAG=${2:-latest}
  if [ -z "$PUSH_VERSION" ]; then
    tag=latest
  else
    tag=$PUSH_VERSION
    if [ "x${LATEST_TAG}" != 'xlatest' ]; then
      echo "LATEST_TAG: $LATEST_TAG"
      echo ""
      tag=$LATEST_TAG-$PUSH_VERSION
    fi
  fi
  echo "* <!-- Start to push ${remoteImage}:$tag"
  docker push ${remoteImage}:$tag
  echo "* Finish pushed -->"
  echo ""
  if [ ! -z "$1" ]; then
    if [ "x$VERSION" = "x$PUSH_VERSION" ]; then
      echo "* <!-- Start to auto push ${remoteImage}:${LATEST_TAG}"
      docker tag ${remoteImage}:$tag ${remoteImage}:${LATEST_TAG}
      docker push ${remoteImage}:${LATEST_TAG}
      echo "* Finish pushed -->"
    fi
  fi
  docker logout
}

build() {
  if [ -z "$1" ]; then
    NO_CACHE=""
  else
    NO_CACHE="--no-cache"
  fi
  BUILD_ARG=""
  if [ ! -z "$VERSION" ]; then
    BUILD_ARG="$BUILD_ARG --build-arg VERSION=${VERSION}"
  fi
  if [ ! -z "$ALT_VERSION" ]; then
    BUILD_ARG="$BUILD_ARG --build-arg ALT_VERSION=${ALT_VERSION}"
  fi
  echo build: ${DIR}/${DOCKER_FILE}
  if [ 'x' != "x$NO_CACHE" ]; then
    echo nocache: ${NO_CACHE}
  fi
  docker build --progress=plain ${BUILD_ARG} ${NO_CACHE} -f ${DIR}/${DOCKER_FILE} -t $localImage ${DIR}
  list
}

save() {
  echo save
  docker save $localImage > $archiveFile
}

restore() {
  echo restore
  docker save --output $archiveFile $localImage
}

case "$1" in
  save)
    save
    ;;
  restore)
    restore
    ;;
  login)
    login
    ;;
  updateDockerHubDesc)
    updateDockerHubDesc
    ;;
  rate)
    getRateLimit
    ;;
  p)
    push $2 $3
    ;;
  t)
    tag $2
    ;;
  nocache)
    build --no-cache
    ;;
  auto)
    build
    tag
    ;;
  b)
    build
    ;;
  l)
    list
    ;;
  *)
    echo "$0 [save|restore|p|t|nocache|auto|b|l]"
    exit
    ;;
esac

exit $?
