#!/usr/bin/env sh

###
# Environment ${INSTALL_VERSION} pass from Dockerfile
###

BUILD_DEPS=""

INSTALL=""

UPGRADE=""

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
echo "###"
echo "# Will upgradee"
echo "###"
echo ""
echo $UPGRADE

apk add --virtual .build-deps $BUILD_DEPS && apk add $INSTALL --upgrade $UPGRADE || exit 2

#/* put your install code here */#

apk del -f .build-deps && rm -rf /var/cache/apk/* || exit 1
echo $(date +%Y%m%d%S)'-'$TARGETPLATFORM > /build_version

exit 0
