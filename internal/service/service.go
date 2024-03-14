package service

import (
	"context"
	"github.com/patrickmn/go-cache"
	"github.com/tang95/x-port/config"
	"go.uber.org/zap"
)

type Service struct {
	config        *config.Server
	logger        *zap.Logger
	componentRepo ComponentRepo
	userRepo      UserRepo
	teamRepo      TeamRepo
	transaction   Transaction
	cache         *cache.Cache
}

type Transaction interface {
	InTx(context.Context, func(ctx context.Context) error) error
}

func NewService(config *config.Server, logger *zap.Logger,
	componentRepo ComponentRepo,
	transaction Transaction,
	userRepo UserRepo,
	teamRepo TeamRepo,
) (*Service, error) {
	return &Service{
		config:        config,
		logger:        logger,
		componentRepo: componentRepo,
		transaction:   transaction,
		userRepo:      userRepo,
		teamRepo:      teamRepo,
		cache:         cache.New(cache.NoExpiration, cache.NoExpiration),
	}, nil
}
