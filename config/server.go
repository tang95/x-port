package config

import "time"

type Server struct {
	Domain    string `mapstructure:"domain"`
	SecretKey string `mapstructure:"secret_key"`
	Http      struct {
		Addr    string        `mapstructure:"addr"`
		Timeout time.Duration `mapstructure:"timeout"`
		Debug   bool          `mapstructure:"debug"`
	} `mapstructure:"http"`
	LogLevel string `mapstructure:"log_level"`
	Database struct {
		Driver string `mapstructure:"driver"`
		Source string `mapstructure:"source"`
	} `mapstructure:"database"`
	OAuth struct {
		Github struct {
			ClientId     string `mapstructure:"client_id"`
			ClientSecret string `mapstructure:"client_secret"`
		} `mapstructure:"github"`
	} `mapstructure:"oauth"`
}
