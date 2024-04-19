package controller

import (
	"embed"
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/auth"
	"github.com/tang95/x-port/internal/service"
	"go.uber.org/zap"
	"net/http"
	"strings"
)

//go:embed static
var consoleFS embed.FS

type Controller struct {
	service       *service.Service
	config        *config.Server
	logger        *zap.Logger
	transaction   service.Transaction
	auth          *auth.Auth
	componentRepo service.ComponentRepo
	userRepo      service.UserRepo
	teamRepo      service.TeamRepo
}

func NewController(
	service *service.Service,
	config *config.Server,
	logger *zap.Logger,
	transaction service.Transaction,
	a *auth.Auth,
	componentRepo service.ComponentRepo,
	userRepo service.UserRepo,
	teamRepo service.TeamRepo,
) (*Controller, error) {
	return &Controller{
		service:       service,
		config:        config,
		logger:        logger,
		transaction:   transaction,
		auth:          a,
		componentRepo: componentRepo,
		userRepo:      userRepo,
		teamRepo:      teamRepo,
	}, nil
}

func (controller *Controller) WithRoutes(engine *gin.Engine, jwtMiddleware *jwt.GinJWTMiddleware) {
	// console
	consoleServer := static.Serve("/", static.EmbedFolder(consoleFS, "static"))
	engine.Use(consoleServer)
	engine.NoRoute(func(ctx *gin.Context) {
		if ctx.Request.Method == http.MethodGet &&
			!strings.ContainsRune(ctx.Request.URL.Path, '.') &&
			!strings.HasPrefix(ctx.Request.URL.Path, "/api/") {
			ctx.Request.URL.Path = "/"
			consoleServer(ctx)
		}
	})
	// api group
	api := engine.Group("/api")

	// component
	component := api.Group("/component", jwtMiddleware.MiddlewareFunc())
	component.POST("/create", controller.createComponent())
	component.GET("/queryTags", controller.queryComponentTag())
	component.PATCH("/update", controller.updateComponent())
	component.POST("/annotations/add", controller.addComponentAnnotation())
	component.POST("/annotations/remove", controller.removeComponentAnnotation())
	component.POST("/links/add", controller.addComponentLink())
	component.POST("/links/remove", controller.removeComponentLink())
	component.GET("/dependents/add", controller.addComponentDependency())
	component.GET("/dependents/remove", controller.removeComponentDependency())

	// graphql
	graphql := api.Group("/graphql", jwtMiddleware.MiddlewareFunc())
	graphql.POST("/query", controller.graphqlHandler())
	graphql.GET("/", controller.playgroundHandler())

	// oauth
	oauth := api.Group("/auth")
	oauth.GET("/providers", controller.oauthProviders())
	oauth.POST("/validate", controller.oauthValidate(jwtMiddleware))
	oauth.GET("/authorizeUrl", controller.oauthAuthorizeUrl())
}
