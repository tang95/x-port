package data

import (
	"context"
	"errors"
	"github.com/tang95/x-port/internal/model"
	"github.com/tang95/x-port/internal/service"
	"gorm.io/gorm"
)

type userRepo struct {
	*Data
}

func (repo *userRepo) Count(ctx context.Context) (int32, error) {
	var count int64
	tx := repo.DB(ctx).Model(&model.User{}).Count(&count)
	return int32(count), tx.Error
}

func (repo *userRepo) GetByGithubID(ctx context.Context, githubID string) (*model.User, error) {
	users := make([]*model.User, 0)
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

func (repo *userRepo) List(ctx context.Context, filter *model.ListUserFilter, page *model.PageQuery) (int32, []*model.User, error) {
	//TODO implement me
	panic("implement me")
}

func (repo *userRepo) Create(ctx context.Context, user *model.User) (*model.User, error) {
	tx := repo.DB(ctx).Create(user)
	return user, tx.Error
}

func (repo *userRepo) Get(ctx context.Context, id string) (*model.User, error) {
	//TODO implement me
	panic("implement me")
}

func (repo *userRepo) Delete(ctx context.Context, id string) error {
	//TODO implement me
	panic("implement me")
}

func (repo *userRepo) Update(ctx context.Context, id string, user *model.User) error {
	//TODO implement me
	panic("implement me")
}
