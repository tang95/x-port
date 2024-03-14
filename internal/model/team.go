package model

type Team struct {
	BaseModel
	Name        string   `gorm:"type:varchar(100); not null; comment:名称"`
	Description string   `gorm:"type:text; comment:描述"`
	OwnerID     string   `gorm:"type:varchar(36); not null; comment:拥有者ID"`
	MemberIDs   []string `gorm:"column:member_ids; type:json"`
}

func (Team) TableName() string {
	return "team"
}

type ListTeamFilter struct {
}
