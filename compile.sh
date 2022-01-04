#!/bin/sh

develop(){
    echo "Develop Mode";
    npm run build
}

killBy(){
    ps -eo pid,args | grep $1 | grep -v grep | awk '{print $1}' | xargs -I{} kill -9 {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel 
}

watch(){
    stop 
    npm run build:cjs:ui -- --watch &
    npm run build:cjs:src -- --watch &
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
}

canary(){
  # https://en.wikipedia.org/wiki/Feature_toggle#Canary_release 
  lerna publish --canary
}

case "$1" in
  canary)
    canary
    ;;
  watch)
    watch 
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    ;; 
esac

exit $?
