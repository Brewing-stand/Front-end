FROM node:18-alpine3.17 AS build

WORKDIR /app
COPY . .

RUN npm install --verbose
CMD ["run","npm","build"]

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
