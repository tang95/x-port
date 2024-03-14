package data

import (
	"context"
	"github.com/tang95/x-port/internal/model"
	"github.com/tang95/x-port/internal/service"
)

type teamRepo struct {
	*Data
}

func newTeamRepo(data *Data) service.TeamRepo {
	return &teamRepo{data}
}

func (t teamRepo) Create(ctx context.Context, team *model.Team) (string, error) {
	//TODO implement me
	panic("implement me")
}

func (t teamRepo) Get(ctx context.Context, id string) (*model.Team, error) {
	//TODO implement me
	panic("implement me")
}

func (t teamRepo) Delete(ctx context.Context, id string) error {
	//TODO implement me
	panic("implement me")
}

func (t teamRepo) Update(ctx context.Context, id string, team *model.Team) error {
	//TODO implement me
	panic("implement me")
}

func (t teamRepo) List(ctx context.Context, filter *model.ListTeamFilter, page *model.PageQuery) (int32, []*model.Team, error) {
	//TODO implement me
	panic("implement me")
}
