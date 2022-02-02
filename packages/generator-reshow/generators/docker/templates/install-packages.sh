#!/bin/bash

INSTALL=""

BUILD_DEPS=""

echo "###"
echo "# Will install"
echo "###"
echo ""
echo $INSTALL
echo ""
echo "###"
echo "# Will build package"
echo "###"
echo ""
echo $BUILD_DEPS
echo ""

apk add --virtual .build-deps $BUILD_DEPS && apk add $INSTALL

apk del -f .build-deps && rm -rf /var/cache/apk/* || exit 1

exit 0
