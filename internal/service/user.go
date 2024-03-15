package service

import (
	"context"
	"github.com/patrickmn/go-cache"
	"github.com/tang95/x-port/internal/domain"
)

const (
	CountUserCacheKey = "count_user"
)

type UserRepo interface {
	List(ctx context.Context, filter *domain.ListUserFilter, page *domain.PageQuery) ([]*domain.User, int32, error)
	Create(ctx context.Context, user *domain.User) (*domain.User, error)
	Get(ctx context.Context, id string) (*domain.User, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, id string, user *domain.User) error
	GetByGithubID(ctx context.Context, githubID string) (*domain.User, error)
	Count(ctx context.Context) (int32, error)
}

func (service *Service) GetUserByGithubID(ctx context.Context, githubID string) (*domain.User, error) {
	user, err := service.userRepo.GetByGithubID(ctx, githubID)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (service *Service) CreateUser(ctx context.Context, user *domain.User) (*domain.User, error) {
	// 如果是第一个用户，则默认为管理员
	count, ok := service.cache.Get(CountUserCacheKey)
	if !ok {
		count, _ = service.userRepo.Count(ctx)
	}
	if count.(int32) == 0 {
		user.Role = domain.Admin
	}
	newUser, err := service.userRepo.Create(ctx, user)
	if err != nil {
		return nil, err
	}
	service.cache.Set(CountUserCacheKey, int32(1), cache.NoExpiration)
	return newUser, nil
}
