package service

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
)

type ComponentRepo interface {
	Get(ctx context.Context, id string) (*domain.Component, error)
	Create(ctx context.Context, component *domain.Component) (string, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter *domain.ListComponentFilter, page *domain.PageQuery) ([]*domain.Component, int32, error)
}

func (service *Service) CreateComponent(ctx context.Context) (string, error) {
	id, err := service.componentRepo.Create(ctx, &domain.Component{
		Name:         "hello",
		Description:  "",
		Lifecycle:    domain.Alpha,
		Type:         domain.Service,
		OwnerID:      "test",
		Tags:         []string{"service", "java", "springboot"},
		ComponentIDs: []string{"test", "test"},
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
