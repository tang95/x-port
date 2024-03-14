package main

import (
	"fmt"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/tang95/x-port/config"
	"github.com/tang95/x-port/internal/auth"
	"github.com/tang95/x-port/internal/controller"
	"github.com/tang95/x-port/internal/data"
	"github.com/tang95/x-port/internal/service"
	"github.com/tang95/x-port/pkg/middleware"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

type Server interface {
	Start() error
	Stop() error
}

type HttpServer struct {
	ginEngine *gin.Engine
	logger    *zap.Logger
	config    *config.Server
}

func (server *HttpServer) Start() error {
	server.logger.Info(fmt.Sprintf("http server start, addr: %s", server.config.Http.Addr))
	err := server.ginEngine.Run(server.config.Http.Addr)
	if err != nil {
		return err
	}
	return nil
}

func (server *HttpServer) Stop() error {
	server.logger.Info("http server stop")
	return nil
}

var (
	cfgFile   string
	serverCmd = &cobra.Command{
		Use:   "server",
		Short: "Start server",
		Run: func(cmd *cobra.Command, args []string) {
			// 初始化服务器
			servers, err := newServer()
			if err != nil {
				fmt.Println(err)
				os.Exit(1)
			}
			// 监听退出信号
			c := make(chan os.Signal)
			signal.Notify(c, os.Interrupt, os.Kill, syscall.SIGUSR1, syscall.SIGUSR2)
			// 启动服务器
			for _, server := range servers {
				go func(s Server) {
					if err := s.Start(); err != nil {
						fmt.Println(err)
					}
				}(server)
			}
			// 等待退出
			select {
			case <-c:
				for _, server := range servers {
					if err := server.Stop(); err != nil {
						fmt.Println(err)
					}
				}
				os.Exit(0)
			}
		},
	}
)

func init() {
	serverCmd.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "config file (default is $HOME/.x-port/server.yaml)")
}

// 读取配置文件
func readConfig() (*config.Server, error) {
	if cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		home, err := homedir.Dir()
		if err != nil {
			return nil, err
		}
		viper.SetConfigFile(filepath.Join(home, ".x-port", "server.yaml"))
	}
	cfg := &config.Server{}
	if err := viper.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("read config file error: %v", err)
	}
	if err := viper.Unmarshal(cfg); err != nil {
		return nil, fmt.Errorf("unmarshal config file error: %v", err)
	}
	return cfg, nil
}

func initLogger(level string) (*zap.Logger, error) {
	parseLevel, err := zapcore.ParseLevel(level)
	if err != nil {
		return nil, err
	}
	core := zapcore.NewCore(zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig()), os.Stdout, parseLevel)
	logger := zap.New(core)
	return logger, nil
}

func initHttpServer(config *config.Server, logger *zap.Logger, controllers *controller.Controller) (Server, error) {
	if config.Http.Debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	ginEngine := gin.New()
	jwtMiddleware, err := middleware.Jwt(config)
	if err != nil {
		return nil, err
	}
	err = jwtMiddleware.MiddlewareInit()
	if err != nil {
		return nil, err
	}
	ginEngine.Use(ginzap.Ginzap(logger, time.RFC3339, true))
	ginEngine.Use(ginzap.RecoveryWithZap(logger, true))
	ginEngine.Use(middleware.Timeout(config))
	controllers.WithRoutes(ginEngine, jwtMiddleware)
	server := &HttpServer{
		ginEngine: ginEngine,
		logger:    logger,
		config:    config,
	}
	return server, nil
}

func newServer() ([]Server, error) {
	cfg, err := readConfig()
	if err != nil {
		return nil, err
	}
	logger, err := initLogger(cfg.LogLevel)
	if err != nil {
		return nil, err
	}
	d, err := data.NewData(cfg, logger)
	if err != nil {
		return nil, err
	}
	svc, err := service.NewService(cfg, logger, d.ComponentRepo, d.Transaction, d.UserRepo, d.TeamRepo)
	if err != nil {
		return nil, err
	}
	a := auth.NewAuth(cfg, logger, svc)
	controllers, err := controller.NewController(svc, cfg, logger, d.Transaction, a)
	if err != nil {
		return nil, err
	}
	httpServer, err := initHttpServer(cfg, logger, controllers)
	return []Server{httpServer}, nil
}
