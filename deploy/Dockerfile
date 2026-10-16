# Build context contains this file's parent paths: deploy/default.conf and dist/.
# The base image is the local qbr-static image. Do not pull a replacement.
FROM sha256:ffda1115868e6a6d999e9504a5c034de6333d42634caf7f0b2fa88ce760d8cd3
USER root
RUN rm -rf /usr/share/nginx/qbr && mkdir -p /usr/share/nginx/qbr
COPY deploy/default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/qbr/
RUN chown -R 101:101 /usr/share/nginx/qbr /etc/nginx/conf.d/default.conf
USER 101
