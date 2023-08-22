#!/usr/bin/env sh

# docker entrypoint script
server() {
  tail -f /usr/local/sbin/entrypoint.sh
}

if [ "$1" = 'server' ]; then
  server
else
  exec "$@"
fi
