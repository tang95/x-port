package service

import (
	"context"
	"github.com/tang95/x-port/internal/model"
)

type ComponentRepo interface {
	Get(ctx context.Context, id string) (*model.Component, error)
	Create(ctx context.Context, component *model.Component) (string, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter *model.ListComponentFilter, page *model.PageQuery) (int32, []*model.Component, error)
}

func (service *Service) CreateComponent(ctx context.Context) (string, error) {
	id, err := service.componentRepo.Create(ctx, &model.Component{
		Name:         "hello",
		Description:  "",
		Lifecycle:    model.Alpha,
		Type:         model.Service,
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
