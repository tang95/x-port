package service

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
)

type TeamRepo interface {
	Create(ctx context.Context, team *domain.Team) (string, error)
	Get(ctx context.Context, id string) (*domain.Team, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, id string, team *domain.Team) error
	List(ctx context.Context, filter *domain.ListTeamFilter, page *domain.PageQuery) (int32, []*domain.Team, error)
}
