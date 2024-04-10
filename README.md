# X-Port

**刚刚开始，功能开发中...**

![Docker](https://github.com/tang95/x-port/actions/workflows/docker-image.yml/badge.svg)

## 简介

X-Port 是一个开箱即用的内部开发者门户，改善开发者的体验。

此项目受 [Backstage](https://backstage.io) 和 [Compass](https://www.atlassian.com/software/compass) 的启发。

Backstage 很好，但它是开发平台，需要进行大量的定制（Material Design 有点不习惯）。

Compass 开箱即用且精心设计（好看），但它是一个SaaS服务，目前免费。

## 快速开始

#### 1. 配置文件

生成配置文件，参考 [server.yml](conf/server.yaml)

#### 2. Docker 运行

```shell
docker pull ghcr.io/tang95/x-port:main

docker run --rm \
  -p 8080:8080 \
  -v server.yaml:/app/config.yaml \
  ghcr.io/tang95/x-port:main
```

#### 3. 访问

打开 http://localhost:8080

## 功能介绍

还没开始，先看看菜单...

* 组件目录：唯一软件可信源，可以快速找到公司的服务、库、文档等相关信息。
* 团队：快速了解团队的成员、组件、运行状况等信息。
* 事件：在一个地方查看服务及其依赖关系的所有事件、部署和其他关键活动。
* 记分卡：全面了解服务运行状况，指导改进保持系统的可靠性。
* 自助服务：使用软件模板创建服务，自动配置基础设施提升效率。

![主页](docs/images/home.png)
![组件详情](docs/images/detail.png)

## 贡献

#### 1. Git 克隆

```shell
git clone git@github.com:tang95/x-port.git

cd x-port
```

#### 2. 前端

注意后端请求转发配置[.umirc.ts](console/.umirc.ts)，详细配置参考 [Umi.js](https://umijs.org)

```shell
cd console
yarn
yarn start
```

访问 http://localhost:8000

#### 3. 后端

前提条件

1. 需要 Go 环境，推荐 go 1.22+
2. 生成自己的配置文件，参考 [server.yaml](conf/server.yaml)

```shell
cd x-port
go mod download
# 默认读取 $HOME/.x-port/server.yaml，建议放在此处。
go run ./cmd server -c server.yaml
```
