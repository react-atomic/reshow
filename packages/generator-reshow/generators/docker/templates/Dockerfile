ARG VERSION=${VERSION:-[VERSION]}

FROM alpine:3.15

# apk
COPY ./install-packages.sh /usr/local/bin/
RUN apk update && apk add bash bc \
  && INSTALL_VERSION=$VERSION install-packages.sh \
  && rm /usr/local/bin/install-packages.sh;
