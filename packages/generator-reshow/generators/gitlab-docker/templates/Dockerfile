ARG VERSION=${VERSION:-[VERSION]}

FROM alpine:3.15 AS base

ARG VERSION

# apk
COPY ./install-packages.sh /usr/local/bin/install-packages
RUN apk update && apk add bash bc \
  && INSTALL_VERSION=$VERSION install-packages \
  && rm /usr/local/bin/install-packages;

FROM base AS v0
RUN echo "v0"

FROM base AS v1
RUN echo "v1"

FROM base AS v2
RUN echo "v2"
