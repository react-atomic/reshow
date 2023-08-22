ARG VERSION=${VERSION:-[VERSION]}

FROM alpine:3.18

ARG VERSION

# apk
COPY ./install-packages.sh /usr/local/bin/install-packages
RUN apk update && apk add bash bc \
  && INSTALL_VERSION=$VERSION install-packages \
  && rm /usr/local/bin/install-packages;

COPY ./docker/sbin /usr/local/sbin
ENTRYPOINT ["/usr/local/sbin/entrypoint.sh"]
CMD ["server"]
