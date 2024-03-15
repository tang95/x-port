package data

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
)

type componentRepo struct {
	*Data
}

func newComponentRepo(data *Data) service.ComponentRepo {
	return &componentRepo{data}
}

func (repo *componentRepo) Get(ctx context.Context, id string) (*domain.Component, error) {
	component := domain.Component{}
	tx := repo.DB(ctx).Where("id = ?", id).First(&component)
	return &component, tx.Error
}

func (repo *componentRepo) Create(ctx context.Context, component *domain.Component) (string, error) {
	tx := repo.DB(ctx).Create(component)
	return component.ID, tx.Error
}

func (repo *componentRepo) List(ctx context.Context, filter *domain.ListComponentFilter, page *domain.PageQuery) ([]*domain.Component, int32, error) {
	var (
		components []*domain.Component
		total      int64
	)
	tx := repo.DB(ctx).Model(&domain.Component{})
	if filter.Keywords != "" {
		tx = tx.Where("name like ?", "%"+filter.Keywords+"%")
	}
	if filter.Type != "" {
		tx = tx.Where("type = ?", filter.Type)
	}
	if filter.Lifecycle != "" {
		tx = tx.Where("lifecycle = ?", filter.Lifecycle)
	}
	if len(filter.ComponentIDs) > 0 {
		tx = tx.Where("id in ?", filter.ComponentIDs)
	}
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).Limit(page.GetLimit()).Order(page.GetOrder())
	}
	tx = tx.Find(&components)
	return components, int32(total), tx.Error
}

func (repo *componentRepo) Update(ctx context.Context, id string, component *domain.Component) error {
	return repo.DB(ctx).Model(&domain.Component{}).Where("id = ?", id).Updates(component).Error
}

func (repo *componentRepo) ListDependency(ctx context.Context, id string, filter *domain.ListComponentFilter, page *domain.PageQuery) ([]*domain.Component, int32, error) {
	var (
		components []*domain.Component
		total      int64
	)
	tx := repo.DB(ctx).Model(&domain.Component{}).
		Joins("inner join component_component on target_id = component.id and source_id = ?", id)
	if filter.Keywords != "" {
		tx = tx.Where("name like ?", "%"+filter.Keywords+"%")
	}
	if filter.Type != "" {
		tx = tx.Where("type = ?", filter.Type)
	}
	if filter.Lifecycle != "" {
		tx = tx.Where("lifecycle = ?", filter.Lifecycle)
	}
	if len(filter.ComponentIDs) > 0 {
		tx = tx.Where("id in ?", filter.ComponentIDs)
	}
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).Limit(page.GetLimit()).Order(page.GetOrder())
	}
	tx = tx.Find(&components)
	return components, int32(total), tx.Error
}

func (repo *componentRepo) ListDependents(ctx context.Context, id string, filter *domain.ListComponentFilter, page *domain.PageQuery) ([]*domain.Component, int32, error) {
	//TODO implement me
	panic("implement me")
}
