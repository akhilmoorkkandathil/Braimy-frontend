# build the anguular app
FROM node:20-alpine as build

WORKDIR /app/

# chown -R change the owner of app folder to app

# the node_modules will be owned by app too

RUN addgroup app && adduser -S -G app app && chown -R app /app

USER app

# When using COPY with more than one source file, the destination must be a directory and end with a /

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# serve the angular app with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *

#copy the built angular app from the build stage
COPY --from=build /app/dist/e-learning-app/browser .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]