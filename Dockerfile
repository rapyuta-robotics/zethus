FROM exiasr/alpine-yarn-nginx
RUN apk update
COPY . /usr/src/app/
RUN (cd  /usr/src/app && npm ci && npm run build)
WORKDIR /usr/src/app
RUN mkdir -p /usr/share/nginx/html/ && \
  cp -R build/* /usr/share/nginx/html/ && \
  cp /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf && \
  rm -rf /usr/src/app

CMD ["nginx", "-g", "daemon off;"]
