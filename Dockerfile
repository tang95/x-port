# 构建前端项目
FROM node:lts as front
WORKDIR /app
COPY console/package.json .
COPY console/yarn.lock .
RUN yarn install
COPY console/ .
RUN yarn build

# 构建后端项目
FROM golang:1.22 as back
WORKDIR /app
COPY . .
COPY --from=front /app/dist /app/internal/controller/static
RUN GOOS=linux GOARCH=amd64 go build -o x-port ./cmd
# 运行环境
FROM ubuntu:latest

WORKDIR /app
COPY --from=back /app/x-port .
COPY conf/server.yaml config.yaml
# 安装CA证书
RUN apt-get update && apt-get install -y ca-certificates

EXPOSE 8080
CMD ["./x-port", "server", "-c", "config.yaml"]
