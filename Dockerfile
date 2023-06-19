FROM node:lts as build

ARG VITE_ENVIRONMENT
ENV VITE_ENVIRONMENT=$VITE_ENVIRONMENT
ARG VITE_BEE_URL
ENV VITE_BEE_URL=$VITE_BEE_URL
ARG VITE_BATCH_ID
ENV VITE_BATCH_ID=$VITE_BATCH_ID
ARG VITE_FDP_ADDRESS
ENV VITE_FDP_ADDRESS=$VITE_FDP_ADDRESS
ARG VITE_BASE_URI
ENV VITE_BASE_URI=$VITE_BASE_URI

WORKDIR /base
COPY *.json ./
RUN npm ci
COPY . .
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN bash -e -o pipefail -c 'env |grep VITE >> .env'

RUN npm run build

#webserver
FROM nginx:stable-alpine
ARG VITE_BASE_URI
ENV VITE_BASE_URI=$VITE_BASE_URI
COPY --from=build /base/dist /usr/share/nginx/html/$VITE_BASE_URI
RUN echo "real_ip_header X-Forwarded-For;" \
    "real_ip_recursive on;" \
    "set_real_ip_from 0.0.0.0/0;" > /etc/nginx/conf.d/ip.conf
RUN sed -i '/index  index.html index.htm/c\        try_files $uri '"$VITE_BASE_URI"'/index.html;' /etc/nginx/conf.d/default.conf
RUN chown -R nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

