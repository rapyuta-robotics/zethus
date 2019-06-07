FROM exiasr/alpine-yarn-nginx
RUN apk update \
    && apk add --virtual build-dependencies autoconf zlib zlib-dev nasm automake \
    build-base
COPY . /usr/src/app/
ENV PUBLIC_URL=/demo/
RUN (cd  /usr/src/app && npm ci && npm run build) && \
   ( cd /usr/src/app/website && npm ci && npm run build)
WORKDIR /usr/src/app
RUN cp -R website/build/zethus/* /usr/share/nginx/html/ && \
  mkdir -p /usr/share/nginx/html/demo/ && \
  cp -R build/* /usr/share/nginx/html/demo/ && \
  cp /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf && \
  rm -rf /usr/src/app

CMD ["nginx", "-g", "daemon off;"]
