package service

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
)

type ComponentRepo interface {
	Get(ctx context.Context, id string) (*domain.Component, error)
	Create(ctx context.Context, component *domain.Component) (string, error)
	Update(ctx context.Context, id string, component *domain.Component) error
	List(ctx context.Context, filter *domain.ListComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
	// ListDependency 列出我依赖的组件
	ListDependency(ctx context.Context, id string, filter *domain.ListComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
	// ListDependents 列出依赖我的组件
	ListDependents(ctx context.Context, id string, filter *domain.ListComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error)
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
