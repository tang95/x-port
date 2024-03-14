package middleware

import (
	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/auth"
)

const IdentityKey = "identity"

func Jwt(cfg *config.Server) (*jwt.GinJWTMiddleware, error) {
	return jwt.New(&jwt.GinJWTMiddleware{
		Key:         []byte(cfg.SecretKey),
		IdentityKey: IdentityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*auth.User); ok {
				return jwt.MapClaims{
					IdentityKey: v.ID,
				}
			}
			return jwt.MapClaims{}
		},
		Unauthorized: func(ctx *gin.Context, code int, message string) {
			ctx.JSON(code, gin.H{
				"msg": message,
			})
		},
	})
}
