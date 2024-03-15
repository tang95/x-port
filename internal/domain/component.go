package domain

type Lifecycle string

const (
	// Stable 稳定
	Stable Lifecycle = "stable"
	// Alpha 实验
	Alpha Lifecycle = "alpha"
	// Destroy 销毁
	Destroy Lifecycle = "destroy"
)

type ComponentType string

const (
	// Service 服务
	Service ComponentType = "service"
	// Library 库
	Library ComponentType = "library"
)

type LinkType string

const (
	// Doc 文档
	Doc LinkType = "doc"
	// Website 网站
	Website LinkType = "website"
	// Repository 仓库
	Repository LinkType = "repository"
)

type Link struct {
	URL   string
	Type  LinkType
	Title string
}

type Component struct {
	BaseModel
	Name         string                 `gorm:"type:varchar(100); not null; comment:名称"`
	Description  string                 `gorm:"type:text; comment:描述"`
	Lifecycle    Lifecycle              `gorm:"type:varchar(20); not null; comment:生命周期"`
	Type         ComponentType          `gorm:"type:varchar(20); not null; comment:类型"`
	OwnerID      string                 `gorm:"type:varchar(36); not null; comment:拥有者ID"`
	Tags         []string               `gorm:"column:tags; type:json; serializer:json; comment:标签"`
	Links        []Link                 `gorm:"column:links; type:json; serializer:json; comment:链接"`
	Annotations  map[string]interface{} `gorm:"column:annotations; type:json; serializer:json; comment:注释"`
	ComponentIDs []string               `gorm:"column:component_ids; type:json; serializer:json; comment:依赖组件IDs"`
}

func (Component) TableName() string {
	return "component"
}

type ListComponentFilter struct {
	ComponentIDs []string      `json:"componentIDs,omitempty"`
	Keywords     string        `json:"keywords,omitempty"`
	Type         ComponentType `json:"type,omitempty"`
	Lifecycle    Lifecycle     `json:"lifecycle,omitempty"`
	TeamID       string        `json:"teamID,omitempty"`
}
