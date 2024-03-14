# X-Port

**刚刚开始，功能开发中...**

![Docker](https://github.com/tang95/x-port/actions/workflows/docker-image.yml/badge.svg)

## 简介

X-Port 是一个开箱即用的开源内部开发者门户，改善开发者的体验，提升工作效率。

此项目受 [Backstage](https://backstage.io) 和 [Compass](https://www.atlassian.com/software/compass) 的启发。

Backstage 很好，但是它是一个开发平台，需要进行大量的定制，而 X-Port 开箱即用。

Compass 开箱即用精心设计，但其是一个SaaS服务，需要 Atlassian 提供的认证服务，目前免费。

## 快速开始

#### 1. 配置文件

生成配置文件，参考 [server.yml](conf/server.yaml)

#### 2. Docker 运行

```console
docker pull ghcr.io/tang95/x-port:main

docker run \ 
  -p 8080:8080 \
  -v server.yaml:/app/config.yaml \
  ghcr.io/tang95/x-port:main
```

#### 3. 访问

打开 http://localhost:8080

## 功能介绍

还没开始...

## 贡献

还没开始...
