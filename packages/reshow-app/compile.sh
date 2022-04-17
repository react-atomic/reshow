#!/bin/sh

killBy(){
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel 
}

watch(){
    stop 
    npm run build:src -- --watch &
    npm run build:client -- --watch &
}

develop(){
    echo "Develop Mode";
    npm t 
}

case "$1" in
  watch)
    watch 
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    exit
esac

exit $?
