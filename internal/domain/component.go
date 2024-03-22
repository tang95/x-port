package domain

type Tier string

const (
	Tier1 Tier = "tier1"
	Tier2 Tier = "tier2"
	Tier3 Tier = "tier3"
	Tier4 Tier = "tier4"
)

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
	// Website 网站
	Website ComponentType = "website"
)

type LinkType string

const (
	// Doc 文档
	Doc LinkType = "doc"
	// Home 网站
	Home LinkType = "home"
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
	Name        string                 `gorm:"type:varchar(100); not null; comment:名称"`
	Description string                 `gorm:"type:text; comment:描述"`
	Lifecycle   Lifecycle              `gorm:"type:varchar(20); not null; comment:生命周期"`
	Type        ComponentType          `gorm:"type:varchar(20); not null; comment:类型"`
	Tier        Tier                   `gorm:"type:varchar(20); not null; comment:等级"`
	OwnerID     string                 `gorm:"type:varchar(36); not null; comment:拥有者ID"`
	Tags        []string               `gorm:"column:tags; type:json; serializer:json; comment:标签"`
	Links       []Link                 `gorm:"column:links; type:json; serializer:json; comment:链接"`
	Annotations map[string]interface{} `gorm:"column:annotations; type:json; serializer:json; comment:注释"`
}

func (Component) TableName() string {
	return "component"
}

type ComponentComponent struct {
	BaseModel
	SourceID string `gorm:"type:varchar(36); not null; comment:来源组件ID"`
	TargetID string `gorm:"type:varchar(36); not null; comment:目标组件ID"`
}

func (ComponentComponent) TableName() string {
	return "component_component"
}

type ListComponentFilter struct {
	ComponentIDs []string      `json:"componentIDs,omitempty"`
	Keywords     string        `json:"keywords,omitempty"`
	Type         ComponentType `json:"type,omitempty"`
	Lifecycle    Lifecycle     `json:"lifecycle,omitempty"`
	TeamID       string        `json:"teamID,omitempty"`
	Tier         Tier          `json:"tier,omitempty"`
	Tags         []string      `json:"tags,omitempty"`
}
