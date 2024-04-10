package domain

type Team struct {
	BaseModel
	Name        string `gorm:"type:varchar(100); not null; comment:名称"`
	Description string `gorm:"type:text; comment:描述"`
}

func (Team) TableName() string {
	return "team"
}

type TeamUser struct {
	BaseModel
	TeamID string `gorm:"type:varchar(36); not null; comment:团队ID"`
	UserID string `gorm:"type:varchar(36); not null; comment:用户ID"`
}

func (TeamUser) TableName() string {
	return "team_user"
}

type TeamFilter struct {
}
