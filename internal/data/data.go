package data

import (
	"errors"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/domain"
	"github.com/tang95/x-port/internal/service"
	"go.uber.org/zap"

	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Data struct {
	config        *config.Server
	logger        *zap.Logger
	database      *gorm.DB
	ComponentRepo service.ComponentRepo
	TeamRepo      service.TeamRepo
	UserRepo      service.UserRepo
	Transaction   service.Transaction
}

func NewData(config *config.Server, logger *zap.Logger) (*Data, error) {
	database, err := connectDatabase(config.Database.Driver, config.Database.Source)
	if err != nil {
		return nil, err
	}
	err = database.AutoMigrate(&domain.Component{}, &domain.Team{}, &domain.User{})
	if err != nil {
		logger.Error("failed to auto migrate database", zap.Error(err))
		return nil, err
	}
	d := &Data{
		config:   config,
		logger:   logger,
		database: database,
	}
	d.Transaction = newTransaction(d)
	d.ComponentRepo = newComponentRepo(d)
	d.TeamRepo = newTeamRepo(d)
	d.UserRepo = newUserRepo(d)
	return d, nil
}

func connectDatabase(driver, source string) (*gorm.DB, error) {
	var (
		database *gorm.DB
		err      error
	)
	switch driver {
	case "mysql":
		database, err = gorm.Open(mysql.Open(source), &gorm.Config{})
		if err != nil {
			return nil, err
		}
	case "sqlite":
		database, err = gorm.Open(sqlite.Open(source), &gorm.Config{})
		if err != nil {
			return nil, err
		}
	default:
		return nil, errors.New("unsupported database driver")
	}
	return database, nil
}
