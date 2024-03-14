package controller

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/auth"
	"github.com/tang95/x-port/internal/service"
	"go.uber.org/zap"
)

type Controller struct {
	service     *service.Service
	config      *config.Server
	logger      *zap.Logger
	transaction service.Transaction
	auth        *auth.Auth
}

func NewController(service *service.Service, config *config.Server, logger *zap.Logger, transaction service.Transaction, a *auth.Auth) (*Controller, error) {
	return &Controller{
		service:     service,
		config:      config,
		logger:      logger,
		transaction: transaction,
		auth:        a,
	}, nil
}

func (controller *Controller) WithRoutes(engine *gin.Engine, jwtMiddleware *jwt.GinJWTMiddleware) {
	component := engine.Group("/component", jwtMiddleware.MiddlewareFunc())
	component.POST("/create", controller.createComponent())

	// graphql
	graphql := engine.Group("/graphql")
	graphql.POST("/query", controller.graphqlHandler())
	graphql.GET("/", controller.playgroundHandler())

	// oauth
	oauth := engine.Group("/auth")
	oauth.GET("/providers", controller.oauthProviders())
	oauth.POST("/validate", controller.oauthValidate(jwtMiddleware))
	oauth.GET("/authorizeUrl", controller.oauthAuthorizeUrl())
}
