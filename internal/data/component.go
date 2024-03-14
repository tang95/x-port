package data

import (
	"context"
	"github.com/tang95/x-port/internal/model"
	"github.com/tang95/x-port/internal/service"
)

type componentRepo struct {
	*Data
}

func newComponentRepo(data *Data) service.ComponentRepo {
	return &componentRepo{data}
}

func (repo *componentRepo) Get(ctx context.Context, id string) (*model.Component, error) {
	//TODO implement me
	panic("implement me")
}

func (repo *componentRepo) Create(ctx context.Context, component *model.Component) (string, error) {
	tx := repo.DB(ctx).Create(component)
	return component.ID, tx.Error
}

func (repo *componentRepo) Delete(ctx context.Context, id string) error {
	//TODO implement me
	panic("implement me")
}

func (repo *componentRepo) List(ctx context.Context, filter *model.ListComponentFilter, page *model.PageQuery) (int32, []*model.Component, error) {
	//TODO implement me
	panic("implement me")
}
