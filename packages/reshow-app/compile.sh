#!/bin/sh

killBy(){
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill {}
}

killWatch(){
    killBy babel 
    killBy webpack 
}

watch(){
    killWatch
    npm run build:src -- --watch &
    npm run build:client -- --watch &
}

develop(){
    echo "Develop Mode";
    npm run build
}

case "$1" in
  watch)
    watch 
    ;;
  kill)
    killWatch
    ;;
  *)
    develop
    exit
esac

exit $?
