package service

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
	"slices"
)

type ComponentRepo interface {
	Get(ctx context.Context, id string) (*domain.Component, error)
	Create(ctx context.Context, component *domain.Component) (string, error)
	Update(ctx context.Context, id string, component *domain.Component) error
	Patch(ctx context.Context, id string, data map[string]interface{}) error
	Query(ctx context.Context, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
	QueryDependency(ctx context.Context, id string, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
	QueryDependents(ctx context.Context, id string, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
	QueryTags(ctx context.Context) ([]string, error)
}

func (service *Service) CreateComponent(ctx context.Context) (string, error) {
	id, err := service.componentRepo.Create(ctx, &domain.Component{
		Name:        "hello",
		Description: "",
		Lifecycle:   domain.Alpha,
		Type:        domain.Service,
		OwnerID:     "test",
		Tags:        []string{"service", "java", "springboot"},
		Annotations: map[string]interface{}{
			"hello": "world",
			"test": map[string]interface{}{
				"test": "test",
				"ccc": map[string]interface{}{
					"xxx": "cccc",
				},
			},
		},
	},
	)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (service *Service) UpdateComponent(ctx context.Context, id string, data map[string]interface{}) error {
	fields := []string{"name", "description", "lifecycle", "type", "tier", "owner_id", "tags", "annotations", "links"}
	// 删除不在列表内的字段
	for k := range data {
		if !slices.Contains(fields, k) {
			delete(data, k)
		}
	}
	return service.componentRepo.Patch(ctx, id, data)
}
