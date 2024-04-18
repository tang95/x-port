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

func (service *Service) AddComponentAnnotation(ctx context.Context, componentID string, key string, value string) error {
	component, err := service.componentRepo.Get(ctx, componentID)
	if err != nil {
		return err
	}
	component.Annotations[key] = value
	return service.componentRepo.Update(ctx, componentID, component)
}

func (service *Service) RemoveComponentAnnotation(ctx context.Context, componentID string, key string) error {
	component, err := service.componentRepo.Get(ctx, componentID)
	if err != nil {
		return err
	}
	delete(component.Annotations, key)
	return service.componentRepo.Update(ctx, componentID, component)
}

func (service *Service) AddComponentLink(ctx context.Context, componentID string, title string, linkType string, url string) error {
	component, err := service.componentRepo.Get(ctx, componentID)
	if err != nil {
		return err
	}
	//	判断相同的链接是否存在
	for _, link := range component.Links {
		if link.Title == title && link.Type == domain.LinkType(linkType) && link.URL == url {
			return nil
		}
	}
	component.Links = append(component.Links, domain.Link{
		Title: title,
		Type:  domain.LinkType(linkType),
		URL:   url,
	})
	return service.componentRepo.Update(ctx, componentID, component)
}

func (service *Service) RemoveComponentLink(ctx context.Context, componentID string, title string, linkType string, url string) error {
	component, err := service.componentRepo.Get(ctx, componentID)
	if err != nil {
		return err
	}
	for i, link := range component.Links {
		if link.Title == title && link.Type == domain.LinkType(linkType) && link.URL == url {
			component.Links = append(component.Links[:i], component.Links[i+1:]...)
			return service.componentRepo.Update(ctx, componentID, component)
		}
	}
	return nil
}
