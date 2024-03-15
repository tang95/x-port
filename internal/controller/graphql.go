package controller

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/graph"
)

func (controller *Controller) graphqlHandler() gin.HandlerFunc {
	resolver := graph.NewResolver(
		controller.service,
		controller.logger,
		controller.config,
		controller.componentRepo,
		controller.userRepo,
		controller.teamRepo,
	)
	h := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))
	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

func (controller *Controller) playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/api/graphql/query")
	return func(ctx *gin.Context) {
		h.ServeHTTP(ctx.Writer, ctx.Request)
	}
}
