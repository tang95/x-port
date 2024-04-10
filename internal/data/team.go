package data

import (
	"context"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
)

type teamRepo struct {
	*Data
}

func newTeamRepo(data *Data) service.TeamRepo {
	return &teamRepo{data}
}

func (repo *teamRepo) Create(ctx context.Context, team *domain.Team) (string, error) {
	//TODO implement me
	panic("implement me")
}

func (repo *teamRepo) Get(ctx context.Context, id string) (*domain.Team, error) {
	team := &domain.Team{}
	tx := repo.DB(ctx).Where("id = ?", id).First(&team)
	return team, tx.Error
}

func (repo *teamRepo) Delete(ctx context.Context, id string) error {
	//TODO implement me
	panic("implement me")
}

func (repo *teamRepo) Update(ctx context.Context, id string, team *domain.Team) error {
	//TODO implement me
	panic("implement me")
}

func (repo *teamRepo) Query(ctx context.Context, filter *domain.TeamFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Team, int32, error) {
	var (
		teams []*domain.Team
		total int64
	)
	tx := repo.DB(ctx).Model(&domain.Team{})
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).
			Limit(page.GetLimit())
	}
	if sort != nil {
		for _, s := range sort {
			tx = tx.Order(s.Field + " " + string(s.Direction))
		}
	}
	tx = tx.Find(&teams)
	return teams, int32(total), tx.Error
}

func (repo *teamRepo) QueryMember(ctx context.Context, id string, filter *domain.UserFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.User, int32, error) {
	var (
		users []*domain.User
		total int64
	)
	tx := repo.DB(ctx).Model(&domain.User{}).
		Joins("inner join team_user on user_id = user.id and team_id = ?", id)
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).
			Limit(page.GetLimit())
	}
	if sort != nil {
		for _, s := range sort {
			tx = tx.Order(s.Field + " " + string(s.Direction))
		}
	}
	tx = tx.Find(&users)
	return users, int32(total), tx.Error
}
