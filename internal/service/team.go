package service

import (
	"context"
	"github.com/tang95/x-port/internal/model"
)

type TeamRepo interface {
	Create(ctx context.Context, team *model.Team) (string, error)
	Get(ctx context.Context, id string) (*model.Team, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, id string, team *model.Team) error
	List(ctx context.Context, filter *model.ListTeamFilter, page *model.PageQuery) (int32, []*model.Team, error)
}
