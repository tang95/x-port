package domain

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"strings"
	"time"
)

type Direction string

const (
	Asc  Direction = "ASC"
	Desc Direction = "DESC"
)

type PageQuery struct {
	Page  int32 `json:"page"`
	Size  int32 `json:"size"`
	Order *OrderQuery
}

func (pagination *PageQuery) GetOffset() int {
	return int((pagination.Page - 1) * pagination.Size)
}

func (pagination *PageQuery) GetLimit() int {
	return int(pagination.Size)
}

func (pagination *PageQuery) GetOrder() string {
	if pagination.Order != nil && pagination.Order.Direction != "" && pagination.Order.Field != nil {
		return strings.Join(pagination.Order.Field, ",") + " " + string(pagination.Order.Direction)
	}
	return ""
}

type OrderQuery struct {
	Field     []string  `json:"field"`
	Direction Direction `json:"direction"`
}

type BaseModel struct {
	ID        string    `gorm:"primaryKey; type:varchar(36); not null"`
	CreatedAt time.Time `gorm:"type:datetime; not null; comment:创建时间"`
	UpdatedAt time.Time `gorm:"type:datetime; not null; comment:更新时间"`
}

func (m *BaseModel) BeforeCreate(tx *gorm.DB) (err error) {
	m.ID = uuid.New().String()
	return
}
