FROM exiasr/alpine-yarn-nginx
RUN apk update \
    && apk add --virtual build-dependencies autoconf zlib zlib-dev nasm automake \
    build-base
COPY . /usr/src/app/
ENV PUBLIC_URL=/demo/
WORKDIR /usr/src/app
RUN npm ci
RUN npm run build
WORKDIR /usr/src/app/website
RUN npm ci
RUN npm run build

RUN rm /etc/nginx/conf.d/default.conf
RUN cd ../ \
    mkdir -p /usr/share/nginx/html/demo && \
    cp -R website/build/zethus/* /usr/share/nginx/html/ && \
    cp -R build/* /usr/share/nginx/html/demo/ && \
    cp /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf && \
    rm -rf /usr/src/app

CMD ["nginx", "-g", "daemon off;"]
