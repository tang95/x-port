package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.44

import (
	"context"
	"github.com/tang95/x-port/graph/model"
	"github.com/tang95/x-port/internal/domain"
)

// Owner is the resolver for the owner field.
func (r *componentResolver) Owner(ctx context.Context, obj *model.Component) (*model.Team, error) {
	if obj.Owner != nil && obj.Owner.ID != "" {
		team, err := r.teamRepo.Get(ctx, obj.Owner.ID)
		if err != nil {
			return nil, err
		}
		return &model.Team{
			ID:   team.ID,
			Name: team.Name,
		}, nil
	}
	return nil, nil
}

// Dependency is the resolver for the dependency field.
func (r *componentResolver) Dependency(ctx context.Context, obj *model.Component, page model.PageInput, sort []*model.SortInput, filter *model.ComponentFilter) (*model.ComponentConnection, error) {
	var sortQuery []*domain.SortQuery
	var listFilter domain.ComponentFilter
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
	}
	if filter != nil {
		listFilter = domain.ComponentFilter{}
		if filter.Owner != nil {
			listFilter.TeamID = *filter.Owner
		}
		if filter.Type != nil {
			listFilter.Type = domain.ComponentType(*filter.Type)
		}
		if filter.Lifecycle != nil {
			listFilter.Lifecycle = domain.Lifecycle(*filter.Lifecycle)
		}
		if filter.Keywords != nil {
			listFilter.Keywords = *filter.Keywords
		}
	}
	components, total, err := r.componentRepo.QueryDependency(ctx, obj.ID, &listFilter, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.Component, len(components))
	for i, component := range components {
		data[i] = componentModelToDomain(component)
	}
	return &model.ComponentConnection{
		Total: int(total),
		Data:  data,
	}, nil
}

// Dependents is the resolver for the dependents field.
func (r *componentResolver) Dependents(ctx context.Context, obj *model.Component, page model.PageInput, sort []*model.SortInput, filter *model.ComponentFilter) (*model.ComponentConnection, error) {
	var sortQuery []*domain.SortQuery
	var listFilter domain.ComponentFilter
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
	}
	if filter != nil {
		listFilter = domain.ComponentFilter{}
		if filter.Owner != nil {
			listFilter.TeamID = *filter.Owner
		}
		if filter.Type != nil {
			listFilter.Type = domain.ComponentType(*filter.Type)
		}
		if filter.Lifecycle != nil {
			listFilter.Lifecycle = domain.Lifecycle(*filter.Lifecycle)
		}
		if filter.Keywords != nil {
			listFilter.Keywords = *filter.Keywords
		}
	}
	components, total, err := r.componentRepo.QueryDependents(ctx, obj.ID, &listFilter, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.Component, len(components))
	for i, component := range components {
		data[i] = componentModelToDomain(component)
	}
	return &model.ComponentConnection{
		Total: int(total),
		Data:  data,
	}, nil
}

// MyComponentCount is the resolver for the myComponentCount field.
func (r *homeMetricsResolver) MyComponentCount(ctx context.Context, obj *model.HomeMetrics) (int, error) {
	count, err := r.componentRepo.Count(ctx, &domain.ComponentFilter{})
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

// ComponentCount is the resolver for the componentCount field.
func (r *homeMetricsResolver) ComponentCount(ctx context.Context, obj *model.HomeMetrics) (int, error) {
	count, err := r.componentRepo.Count(ctx, &domain.ComponentFilter{})
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

// TeamCount is the resolver for the teamCount field.
func (r *homeMetricsResolver) TeamCount(ctx context.Context, obj *model.HomeMetrics) (int, error) {
	count, err := r.teamRepo.Count(ctx, &domain.TeamFilter{})
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

// UserCount is the resolver for the userCount field.
func (r *homeMetricsResolver) UserCount(ctx context.Context, obj *model.HomeMetrics) (int, error) {
	count, err := r.userRepo.Count(ctx)
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

// QueryComponents is the resolver for the queryComponents field.
func (r *queryResolver) QueryComponents(ctx context.Context, page model.PageInput, sort []*model.SortInput, filter *model.ComponentFilter) (*model.ComponentConnection, error) {
	var (
		listFilter domain.ComponentFilter
		sortQuery  []*domain.SortQuery
	)
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
		for i, sortInput := range sort {
			sortQuery[i] = &domain.SortQuery{
				Field:     sortInput.Field,
				Direction: domain.Direction(sortInput.Direction),
			}
		}
	}
	if filter != nil {
		listFilter = domain.ComponentFilter{}
		if filter.Owner != nil {
			listFilter.TeamID = *filter.Owner
		}
		if filter.Type != nil {
			listFilter.Type = domain.ComponentType(*filter.Type)
		}
		if filter.Lifecycle != nil {
			listFilter.Lifecycle = domain.Lifecycle(*filter.Lifecycle)
		}
		if filter.Keywords != nil {
			listFilter.Keywords = *filter.Keywords
		}
		if filter.Tier != nil {
			listFilter.Tier = domain.Tier(*filter.Tier)
		}
		if filter.Tags != nil {
			listFilter.Tags = filter.Tags
		}
	}
	components, total, err := r.componentRepo.Query(ctx, &listFilter, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.Component, len(components))
	for i, component := range components {
		data[i] = componentModelToDomain(component)
	}
	result := &model.ComponentConnection{
		Total: int(total),
		Data:  data,
	}
	return result, nil
}

// GetComponent is the resolver for the getComponent field.
func (r *queryResolver) GetComponent(ctx context.Context, id string) (*model.Component, error) {
	component, err := r.componentRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	result := componentModelToDomain(component)
	return result, nil
}

// QueryTeams is the resolver for the queryTeams field.
func (r *queryResolver) QueryTeams(ctx context.Context, page model.PageInput, sort []*model.SortInput) (*model.TeamConnection, error) {
	var (
		sortQuery []*domain.SortQuery
	)
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
		for i, sortInput := range sort {
			sortQuery[i] = &domain.SortQuery{
				Field:     sortInput.Field,
				Direction: domain.Direction(sortInput.Direction),
			}
		}
	}
	teams, total, err := r.teamRepo.Query(ctx, &domain.TeamFilter{}, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.Team, len(teams))
	for i, team := range teams {
		data[i] = &model.Team{
			ID:   team.ID,
			Name: team.Name,
		}
	}
	return &model.TeamConnection{
		Total: int(total),
		Data:  data,
	}, nil
}

// GetTeam is the resolver for the getTeam field.
func (r *queryResolver) GetTeam(ctx context.Context, id string) (*model.Team, error) {
	team, err := r.teamRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return &model.Team{
		ID:   team.ID,
		Name: team.Name,
	}, nil
}

// QueryUsers is the resolver for the queryUsers field.
func (r *queryResolver) QueryUsers(ctx context.Context, page model.PageInput, sort []*model.SortInput) (*model.UserConnection, error) {
	var (
		sortQuery []*domain.SortQuery
	)
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
		for i, sortInput := range sort {
			sortQuery[i] = &domain.SortQuery{
				Field:     sortInput.Field,
				Direction: domain.Direction(sortInput.Direction),
			}
		}
	}
	users, total, err := r.userRepo.Query(ctx, &domain.UserFilter{}, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.User, len(users))
	for i, user := range users {
		data[i] = &model.User{
			ID:   user.ID,
			Name: user.Name,
		}
	}
	return &model.UserConnection{
		Total: int(total),
		Data:  data,
	}, nil
}

// GetUser is the resolver for the getUser field.
func (r *queryResolver) GetUser(ctx context.Context, id string) (*model.User, error) {
	user, err := r.userRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return &model.User{
		ID:          user.ID,
		Name:        user.Name,
		Description: &user.Description,
		Avatar:      &user.Avatar,
	}, nil
}

// GetHomeMetrics is the resolver for the getHomeMetrics field.
func (r *queryResolver) GetHomeMetrics(ctx context.Context) (*model.HomeMetrics, error) {
	return &model.HomeMetrics{}, nil
}

// Members is the resolver for the members field.
func (r *teamResolver) Members(ctx context.Context, obj *model.Team, page model.PageInput, sort []*model.SortInput) (*model.UserConnection, error) {
	var (
		sortQuery []*domain.SortQuery
	)
	if sort != nil {
		sortQuery = make([]*domain.SortQuery, len(sort))
		for i, sortInput := range sort {
			sortQuery[i] = &domain.SortQuery{
				Field:     sortInput.Field,
				Direction: domain.Direction(sortInput.Direction),
			}
		}
	}
	members, total, err := r.teamRepo.QueryMember(ctx, obj.ID, &domain.UserFilter{}, &domain.PageQuery{
		Page: int32(page.Page),
		Size: int32(page.Size),
	}, sortQuery)
	if err != nil {
		return nil, err
	}
	data := make([]*model.User, len(members))
	for i, member := range members {
		data[i] = &model.User{
			ID:          member.ID,
			Name:        member.Name,
			Description: &member.Description,
			Avatar:      &member.Avatar,
		}
	}
	return &model.UserConnection{
		Total: int(total),
		Data:  data,
	}, nil
}

// Component returns ComponentResolver implementation.
func (r *Resolver) Component() ComponentResolver { return &componentResolver{r} }

// HomeMetrics returns HomeMetricsResolver implementation.
func (r *Resolver) HomeMetrics() HomeMetricsResolver { return &homeMetricsResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Team returns TeamResolver implementation.
func (r *Resolver) Team() TeamResolver { return &teamResolver{r} }

type componentResolver struct{ *Resolver }
type homeMetricsResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type teamResolver struct{ *Resolver }
