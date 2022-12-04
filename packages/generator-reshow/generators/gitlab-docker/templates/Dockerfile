ARG VERSION=${VERSION:-[VERSION]}

FROM alpine:3.15 AS base

ARG VERSION

# apk
COPY ./install-packages.sh /usr/local/bin/install-packages
RUN apk update && apk add bash bc \
  && INSTALL_VERSION=$VERSION install-packages \
  && rm /usr/local/bin/install-packages;

FROM base AS <%= verPrefix %>0.0.0
RUN echo "<%= verPrefix %>0.0.0"

COPY ./docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["server"]
