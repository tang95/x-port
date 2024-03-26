package controller

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (controller *Controller) oauthValidate(jwtMiddleware *jwt.GinJWTMiddleware) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		body := &struct {
			Code     string `form:"code" json:"code" binding:"required"`
			Provider string `form:"provider" json:"provider" binding:"required"`
		}{}
		if err := ctx.ShouldBind(body); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		oauth, err := controller.auth.GetOAuthByName(ctx, body.Provider)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		user, err := oauth.LoginByCode(ctx, body.Code, true)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		token, expire, err := jwtMiddleware.TokenGenerator(user)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		user.Token = token
		user.ExpireAt = expire.Unix()
		ctx.JSON(200, user)
	}
}

func (controller *Controller) oauthProviders() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		providers, err := controller.auth.Providers(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		ctx.JSON(http.StatusOK, providers)
	}
}

func (controller *Controller) oauthAuthorizeUrl() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		provider := ctx.Query("provider")
		if provider == "" {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": "provider is required",
			})
			return
		}
		oauth, err := controller.auth.GetOAuthByName(ctx, provider)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"msg": err.Error(),
			})
			return
		}
		authorizeUrl := oauth.AuthorizeUrl(ctx)
		ctx.JSON(200, map[string]string{
			"authorizeUrl": authorizeUrl,
		})
	}
}
