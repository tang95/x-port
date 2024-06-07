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
	Query(ctx context.Context, filter *domain.TeamFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Team, int32, error)
	QueryMember(ctx context.Context, id string, filter *domain.UserFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.User, int32, error)
	Count(ctx context.Context, filter *domain.TeamFilter) (int64, error)
}
