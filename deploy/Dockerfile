# Build context contains deploy/default.conf and dist/.
# Tag the local image first, then build with --pull=false:
#   docker tag ffda1115868e qbr-base:local
FROM qbr-base:local
USER root
RUN rm -rf /usr/share/nginx/qbr && mkdir -p /usr/share/nginx/qbr
COPY deploy/default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/qbr/
RUN chown -R 101:101 /usr/share/nginx/qbr /etc/nginx/conf.d/default.conf
USER 101
