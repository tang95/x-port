package auth

import (
	"context"
	"errors"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
	"go.uber.org/zap"
)

type Auth struct {
	providers map[string]OAuth
	config    *config.Server
	logger    *zap.Logger
	service   *service.Service
}

type User struct {
	ID          string      `json:"id"`
	Name        string      `json:"name"`
	Avatar      string      `json:"avatar"`
	Description string      `json:"description"`
	Role        domain.Role `json:"role"`
	Token       string      `json:"token"`
	ExpireAt    int64       `json:"expire_at"`
}

type OAuth interface {
	LoginByCode(ctx context.Context, code string, autoRegister bool) (*User, error)
	AuthorizeUrl(ctx context.Context) string
}

func NewAuth(config *config.Server, logger *zap.Logger, svc *service.Service) *Auth {
	auth := &Auth{
		config:  config,
		logger:  logger,
		service: svc,
	}
	providers := make(map[string]OAuth)
	providers[GITHUB] = newGithub(
		config.OAuth.Github.ClientId,
		config.OAuth.Github.ClientSecret,
		auth,
	)
	auth.providers = providers
	return auth
}

func (a *Auth) GetOAuthByName(ctx context.Context, name string) (OAuth, error) {
	oauth, ok := a.providers[name]
	if !ok {
		return nil, errors.New("no such provider")
	}
	return oauth, nil
}

func (a *Auth) ListProviders(_ context.Context) ([]string, error) {
	providers := make([]string, 0)
	for provider := range a.providers {
		providers = append(providers, provider)
	}
	return providers, nil
}
