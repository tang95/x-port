package graph

import (
	"github.com/tang95/x-port/graph/model"
	"github.com/tang95/x-port/internal/domain"
)

func componentModelToDomain(component *domain.Component) *model.Component {
	result := &model.Component{
		ID:          component.ID,
		Name:        component.Name,
		Description: &component.Description,
		Type:        string(component.Type),
		Lifecycle:   string(component.Lifecycle),
		Owner: &model.Team{
			ID: component.OwnerID,
		},
		Tier:        string(component.Tier),
		Tags:        component.Tags,
		Annotations: component.Annotations,
		CreatedAt:   component.CreatedAt,
		UpdatedAt:   component.UpdatedAt,
	}
	if len(component.Links) > 0 {
		links := make([]*model.Link, 0)
		for _, link := range component.Links {
			links = append(links, &model.Link{
				URL:   link.URL,
				Type:  string(link.Type),
				Title: link.Title,
			})
		}
		result.Links = links
	}
	return result
}
