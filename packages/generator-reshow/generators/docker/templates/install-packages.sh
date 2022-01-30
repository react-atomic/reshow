#!/bin/bash

PREPARE=""

BUILD_DEPS=""

echo "###"
echo "# Will install"
echo "###"
echo ""
echo $PREPARE
echo ""
echo "###"
echo "# Will build package"
echo "###"
echo ""
echo $BUILD_DEPS
echo ""

apk add --virtual .build-deps $BUILD_DEPS && apk add $PREPARE

apk del -f .build-deps && rm -rf /var/cache/apk/* || exit 6

exit 0
