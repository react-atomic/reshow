#!/usr/bin/env sh

###
# Environment ${INSTALL_VERSION} pass from Dockerfile
###

BUILD_DEPS=""

INSTALL=""

echo "###"
echo "# Will install build tool"
echo "###"
echo ""
echo $BUILD_DEPS
echo ""
echo "###"
echo "# Will install"
echo "###"
echo ""
echo $INSTALL
echo ""

apk add --virtual .build-deps $BUILD_DEPS && apk add $INSTALL

#/* put your install code here */#

apk del -f .build-deps && rm -rf /var/cache/apk/* || exit 1

exit 0
