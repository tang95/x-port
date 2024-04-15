package controller

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/internal/controller/request"
	"github.com/tang95/x-port/pkg/middleware"
	"go.uber.org/zap"
	"net/http"
)

func (controller *Controller) createComponent() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		claims := jwt.ExtractClaims(ctx)
		userID := claims[middleware.IdentityKey].(string)
		controller.logger.Info("create component", zap.String("userID", userID))
		component, err := controller.service.CreateComponent(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
		}
		ctx.JSON(200, component)
	}
}

func (controller *Controller) updateComponent() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var req request.UpdateComponentRequest
		if err := ctx.ShouldBindJSON(&req); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"msg": err.Error(),
			})
			return
		}
		if err := controller.service.UpdateComponent(ctx, req.ID, map[string]interface{}{}); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
		}
		ctx.JSON(200, nil)
	}
}

func (controller *Controller) queryComponentTag() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tags, err := controller.componentRepo.QueryTags(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
		}
		ctx.JSON(200, tags)
	}
}
