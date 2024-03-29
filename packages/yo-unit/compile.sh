#!/bin/sh

conf='{'
conf+='"assetsRoot":"./assets/",'
conf+='"externals":{"d3": "d3"},'
conf+='"hotPort": "'${hotPort:-3088}'"'
conf+='}'

DIR=$( cd "$(dirname "$0")" ; pwd -P )
cd $DIR
OPEN=$(which xdg-open 2>/dev/null)
if [ -z "$OPEN" ]; then 
  OPEN="open"
fi

if [ "x" == "xon" ]; then
  webpack='npm run webpack --'
fi

checkBabel(){
  if [ ! -e ".babelrc" ] && [ ! -e "../../packages" ]; then
    if [ -e ${DIR}/node_modules/reshow-app/.babelrc ]; then
      cp ${DIR}/node_modules/reshow-app/.babelrc ${DIR}/.babelrc
    fi
  fi
}

production(){
    echo "Production Mode";
    checkBabel
    npm run build
    CONFIG=$conf NODE_ENV=production $webpack
}

analyzer(){
    echo "Analyzer Mode";
    checkBabel
    npm run build
    CONFIG=$conf BUNDLE='{}' $webpack
}

develop(){
    stop
    echo "Develop Mode";
    checkBabel
    npm run build
    CONFIG=$conf $webpack
}

stopServer(){
  killBy ${DIR}/node_modules/.bin/ws
  echo "stop server done";
}

startServer(){
    stopServer
    yarn
    if [ ! -e "build" ]; then
        develop
    fi
    port=${port-3000}
    echo "Start server";
    if [ "$1" == "open" ]; then
        npm run start -- -p $port &
        sleep 3 
        $OPEN http://localhost:$port        
    else
        npm run start -- -p $port -v
    fi
}

killBy(){
    ps -eo pid,args | grep $1 | grep -v grep | awk '{print $1}' | xargs -I{} kill -9 {}
}

stop(){
    killBy ${DIR}/node_modules/.bin/babel 
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean
    echo "Stop done";
}

watch(){
    stop 
    echo "Watch Mode";
    checkBabel
    npm run build:ui -- --watch &
    npm run build:src -- --watch &
    sleep 10 
    CONFIG=$conf $webpack --watch &
}

watchTest(){
    stop 
    echo "Watch Test";
    checkBabel
    npm run build:test:ui -- --watch &
    npm run build:test:src -- --watch &
}

hot(){
    stop 
    echo "Hot Mode";
    checkBabel
    npm run build:ui -- --watch &
    npm run build:src -- --watch &
    sleep 5
    HOT_UPDATE=1 CONFIG=$conf $webpack serve &
}

case "$1" in
  p)
    production
    ;;
  a)
    analyzer 
    ;;
  s)
    startServer $2 
    ;;
  ss)
    stopServer
    ;;
  hot)
    hot
    ;;
  watch)
    watch 
    ;;
  watchTest)
    watchTest
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    exit
esac

exit $?
