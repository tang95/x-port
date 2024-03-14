package middleware

import (
	"github.com/gin-contrib/timeout"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/config"
)

func Timeout(cfg *config.Server) gin.HandlerFunc {
	return timeout.New(
		timeout.WithTimeout(cfg.Http.Timeout),
		timeout.WithHandler(func(ctx *gin.Context) {
			ctx.Next()
		}),
	)
}
