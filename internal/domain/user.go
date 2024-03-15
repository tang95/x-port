package domain

type Role string

const (
	Admin  Role = "admin"
	Member Role = "member"
)

type User struct {
	BaseModel
	Name        string `gorm:"type:varchar(100); not null; comment:名称"`
	Description string `gorm:"type:text; comment:描述"`
	Avatar      string `gorm:"type: varchar(255); comment:头像"`
	GithubID    string `gorm:"type:varchar(100); comment:githubID"`
	Role        Role   `gorm:"type:varchar(20); not null; comment:角色"`
}

func (User) TableName() string {
	return "user"
}

type ListUserFilter struct {
}
