package data

import (
	"context"
	"encoding/json"
	"github.com/samber/lo"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
)

type componentRepo struct {
	*Data
}

func newComponentRepo(data *Data) service.ComponentRepo {
	return &componentRepo{data}
}

func (repo *componentRepo) Get(ctx context.Context, id string) (*domain.Component, error) {
	component := domain.Component{}
	tx := repo.DB(ctx).Where("id = ?", id).First(&component)
	return &component, tx.Error
}

func (repo *componentRepo) Create(ctx context.Context, component *domain.Component) (string, error) {
	tx := repo.DB(ctx).Create(component)
	return component.ID, tx.Error
}

func (repo *componentRepo) Query(ctx context.Context, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error) {
	var (
		components []*domain.Component
		total      int64
	)
	tx := repo.DB(ctx).Model(&domain.Component{})
	if filter.Keywords != "" {
		tx = tx.Where("name like ?", "%"+filter.Keywords+"%")
	}
	if filter.Type != "" {
		tx = tx.Where("type = ?", filter.Type)
	}
	if filter.Lifecycle != "" {
		tx = tx.Where("lifecycle = ?", filter.Lifecycle)
	}
	if len(filter.ComponentIDs) > 0 {
		tx = tx.Where("id in ?", filter.ComponentIDs)
	}
	if filter.Tier != "" {
		tx = tx.Where("tier = ?", filter.Tier)
	}
	if filter.TeamID != "" {
		tx = tx.Where("owner_id = ?", filter.TeamID)
	}
	if filter.Tags != nil && len(filter.Tags) > 0 {
		tx = tx.Where("EXISTS(SELECT 1 FROM json_each(tags) WHERE value in ?)", filter.Tags)
	}
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).Limit(page.GetLimit())
	}
	if sort != nil {
		for _, s := range sort {
			tx = tx.Order(s.Field + " " + string(s.Direction))
		}
	}
	tx = tx.Find(&components)
	return components, int32(total), tx.Error
}

func (repo *componentRepo) Update(ctx context.Context, id string, component *domain.Component) error {
	return repo.DB(ctx).Model(&domain.Component{}).Where("id = ?", id).Updates(component).Error
}

func (repo *componentRepo) Patch(ctx context.Context, id string, data map[string]interface{}) error {
	// Json 需要转换后才可以更新
	var (
		err   error
		bytes []byte
	)
	if annotations, ok := data["annotations"]; ok {
		bytes, err = json.Marshal(annotations)
		data["annotations"] = string(bytes)
	}
	if tags, ok := data["tags"]; ok && err == nil {
		bytes, err = json.Marshal(tags)
		data["tags"] = string(bytes)
	}
	if links, ok := data["links"]; ok && err == nil {
		bytes, err = json.Marshal(links)
		data["links"] = string(bytes)
	}
	if err != nil {
		return err
	}
	return repo.DB(ctx).
		Model(&domain.Component{}).
		Where("id = ?", id).
		Updates(data).Error
}

func (repo *componentRepo) QueryDependency(ctx context.Context, id string, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error) {
	var (
		components []*domain.Component
		total      int64
	)
	tx := repo.DB(ctx).Model(&domain.Component{}).
		Joins("inner join component_component on target_id = component.id and source_id = ?", id)
	if filter.Keywords != "" {
		tx = tx.Where("name like ?", "%"+filter.Keywords+"%")
	}
	if filter.Type != "" {
		tx = tx.Where("type = ?", filter.Type)
	}
	if filter.Lifecycle != "" {
		tx = tx.Where("lifecycle = ?", filter.Lifecycle)
	}
	if len(filter.ComponentIDs) > 0 {
		tx = tx.Where("id in ?", filter.ComponentIDs)
	}
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).Limit(page.GetLimit())
	}
	if sort != nil {
		for _, s := range sort {
			tx = tx.Order(s.Field + " " + string(s.Direction))
		}
	}
	tx = tx.Find(&components)
	return components, int32(total), tx.Error
}

func (repo *componentRepo) QueryDependents(ctx context.Context, id string, filter *domain.ComponentFilter, page *domain.PageQuery, sort []*domain.SortQuery) ([]*domain.Component, int32, error) {
	var (
		components []*domain.Component
		total      int64
	)
	tx := repo.DB(ctx).Model(&domain.Component{}).
		Joins("inner join component_component on source_id = component.id and target_id = ?", id)
	if filter.Keywords != "" {
		tx = tx.Where("name like ?", "%"+filter.Keywords+"%")
	}
	if filter.Type != "" {
		tx = tx.Where("type = ?", filter.Type)
	}
	if filter.Lifecycle != "" {
		tx = tx.Where("lifecycle = ?", filter.Lifecycle)
	}
	if len(filter.ComponentIDs) > 0 {
		tx = tx.Where("id in ?", filter.ComponentIDs)
	}
	tx = tx.Count(&total)
	if tx.Error != nil {
		return nil, 0, tx.Error
	}
	if page != nil {
		tx = tx.Offset(page.GetOffset()).Limit(page.GetLimit())
	}
	if sort != nil {
		for _, s := range sort {
			tx = tx.Order(s.Field + " " + string(s.Direction))
		}
	}
	tx = tx.Find(&components)
	return components, int32(total), tx.Error
}

func (repo *componentRepo) AddDependency(ctx context.Context, sourceID, targetID string) error {
	return repo.DB(ctx).Create(&domain.ComponentComponent{
		SourceID: sourceID,
		TargetID: targetID,
	}).Error
}

func (repo *componentRepo) ExistDependency(ctx context.Context, sourceID, targetID string) (bool, error) {
	return repo.DB(ctx).
		Model(&domain.ComponentComponent{}).
		Where("source_id = ? and target_id = ?", sourceID, targetID).
		First(&domain.ComponentComponent{}).
		Error == nil, nil
}

func (repo *componentRepo) RemoveDependency(ctx context.Context, sourceID string, targetID string) error {
	return repo.DB(ctx).
		Where("source_id = ? and target_id = ?", sourceID, targetID).
		Delete(&domain.ComponentComponent{}).Error
}

func (repo *componentRepo) QueryTags(ctx context.Context) ([]string, error) {
	components := make([]*domain.Component, 0)
	tx := repo.DB(ctx).Model(&domain.Component{}).Select("tags").Find(&components)
	if tx.Error != nil {
		return nil, tx.Error
	}
	// 去重
	return lo.Uniq(
		// 拍平
		lo.Flatten(
			// 获取tags
			lo.Map(components, func(item *domain.Component, index int) []string {
				return item.Tags
			}),
		),
	), nil
}
