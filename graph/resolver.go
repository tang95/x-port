package graph

import (
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/service"
	"go.uber.org/zap"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	service *service.Service
	logger  *zap.Logger
	config  *config.Server
}

func NewResolver(service *service.Service, logger *zap.Logger, config *config.Server) *Resolver {
	return &Resolver{service: service, logger: logger, config: config}
}
