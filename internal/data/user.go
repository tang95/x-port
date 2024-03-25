package data

import (
	"context"
	"errors"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
	"gorm.io/gorm"
)

type userRepo struct {
	*Data
}

func (repo *userRepo) Count(ctx context.Context) (int32, error) {
	var count int64
	tx := repo.DB(ctx).Model(&domain.User{}).Count(&count)
	return int32(count), tx.Error
}

func (repo *userRepo) GetByGithubID(ctx context.Context, githubID string) (*domain.User, error) {
	users := make([]*domain.User, 0)
	tx := repo.DB(ctx).Find(&users, "github_id = ?", githubID)
	if tx.Error != nil {
		return nil, tx.Error
	}
	if len(users) == 0 {
		return nil, gorm.ErrRecordNotFound
	}
	if len(users) > 1 {
		return nil, errors.New("found more than one user")
	}
	return users[0], nil
}

func newUserRepo(data *Data) service.UserRepo {
	return &userRepo{data}
}

func (repo *userRepo) List(ctx context.Context, filter *domain.ListUserFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.User, int32, error) {
	var (
		users []*domain.User
		total int64
	)
	tx := repo.DB(ctx).Model(&domain.User{})
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

func (repo *userRepo) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	tx := repo.DB(ctx).Create(user)
	return user, tx.Error
}

func (repo *userRepo) Get(ctx context.Context, id string) (*domain.User, error) {
	user := domain.User{}
	tx := repo.DB(ctx).Where("id = ?", id).First(&user)
	return &user, tx.Error
}

func (repo *userRepo) Delete(ctx context.Context, id string) error {
	//TODO implement me
	panic("implement me")
}

func (repo *userRepo) Update(ctx context.Context, id string, user *domain.User) error {
	//TODO implement me
	panic("implement me")
}
