package auth

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/tang95/x-port/internal/model"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/endpoints"
	"gorm.io/gorm"
	"io"
	"net/url"
)

const (
	GITHUB            = "github"
	GithubUserinfoUrl = "https://api.github.com/user"
)

type github struct {
	*Auth
	clientID     string
	clientSecret string
	oauth2Config *oauth2.Config
}

type githubUser struct {
	ID        int64  `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	AvatarURL string `json:"avatar_url"`
	Bio       string `json:"bio"`
}

func newGithub(clientID string, clientSecret string, auth *Auth) OAuth {
	return &github{
		clientID:     clientID,
		clientSecret: clientSecret,
		oauth2Config: &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			Endpoint:     endpoints.GitHub,
		},
		Auth: auth,
	}
}

func (g *github) LoginByCode(ctx context.Context, code string, autoRegister bool) (*User, error) {
	gUser, err := g.getGithubUserByCode(ctx, code)
	if err != nil {
		return nil, err
	}
	user, err := g.service.GetUserByGithubID(ctx, gUser.Login)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if user == nil {
		if autoRegister {
			user, err = g.service.CreateUser(ctx, &model.User{
				Name:        gUser.Name,
				Description: gUser.Bio,
				Avatar:      gUser.AvatarURL,
				GithubID:    gUser.Login,
				Role:        model.Member,
			})
			if err != nil {
				return nil, err
			}
		} else {
			return nil, errors.New("user not found")
		}
	}
	return &User{
		ID:          user.ID,
		Name:        user.Name,
		Avatar:      user.Avatar,
		Description: user.Description,
		Role:        user.Role,
	}, nil
}

func (g *github) getGithubUserByCode(ctx context.Context, code string) (*githubUser, error) {
	token, err := g.oauth2Config.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}
	client := g.oauth2Config.Client(ctx, token)
	response, err := client.Get(GithubUserinfoUrl)
	if err != nil {
		return nil, err
	}
	defer func() {
		_ = response.Body.Close()
	}()
	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	user := &githubUser{}
	err = json.Unmarshal(data, user)
	if err != nil {
		return nil, errors.New("json.Unmarshal error: " + err.Error())
	}
	return user, nil
}

func (g *github) AuthorizeUrl(ctx context.Context) string {
	baseUrl, _ := url.Parse(g.oauth2Config.Endpoint.AuthURL)
	query := baseUrl.Query()
	query.Add("client_id", g.clientID)
	query.Add("redirect_uri", g.config.Domain+"/login/github")
	baseUrl.RawQuery = query.Encode()
	return baseUrl.String()
}
