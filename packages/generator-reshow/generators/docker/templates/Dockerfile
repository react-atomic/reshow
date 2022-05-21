ARG VERSION=${VERSION:-[VERSION]}

FROM alpine:3.15

ARG VERSION

# apk
COPY ./install-packages.sh /usr/local/bin/install-packages
RUN apk update && apk add bash bc \
  && INSTALL_VERSION=$VERSION install-packages.sh \
  && rm /usr/local/bin/install-packages;
