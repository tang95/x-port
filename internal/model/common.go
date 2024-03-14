package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
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
