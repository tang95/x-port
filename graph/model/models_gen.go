// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

type Component struct {
	ID          string                 `json:"id"`
	Name        string                 `json:"name"`
	Description *string                `json:"description,omitempty"`
	Type        string                 `json:"type"`
	Lifecycle   string                 `json:"lifecycle"`
	Owner       *User                  `json:"owner"`
	Links       []*Link                `json:"links,omitempty"`
	Tags        []string               `json:"tags,omitempty"`
	Annotations map[string]interface{} `json:"annotations,omitempty"`
	Components  *ComponentConnection   `json:"components"`
	CreatedAt   time.Time              `json:"createdAt"`
	UpdatedAt   time.Time              `json:"updatedAt"`
}

type ComponentConnection struct {
	Total int          `json:"total"`
	Data  []*Component `json:"data,omitempty"`
}

type ComponentFilter struct {
	Keywords  *string `json:"keywords,omitempty"`
	Type      *string `json:"type,omitempty"`
	Lifecycle *string `json:"lifecycle,omitempty"`
	TeamID    *string `json:"teamID,omitempty"`
}

type Link struct {
	Title string `json:"title"`
	URL   string `json:"url"`
	Type  string `json:"type"`
}

type OrderInput struct {
	Fields    []string      `json:"fields,omitempty"`
	Direction SortDirection `json:"direction"`
}

type PageInput struct {
	Page  int         `json:"page"`
	Size  int         `json:"size"`
	Order *OrderInput `json:"order,omitempty"`
}

type Query struct {
}

type User struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description,omitempty"`
	Avatar      *string `json:"avatar,omitempty"`
}

type SortDirection string

const (
	SortDirectionAsc  SortDirection = "ASC"
	SortDirectionDesc SortDirection = "DESC"
)

var AllSortDirection = []SortDirection{
	SortDirectionAsc,
	SortDirectionDesc,
}

func (e SortDirection) IsValid() bool {
	switch e {
	case SortDirectionAsc, SortDirectionDesc:
		return true
	}
	return false
}

func (e SortDirection) String() string {
	return string(e)
}

func (e *SortDirection) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = SortDirection(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid SortDirection", str)
	}
	return nil
}

func (e SortDirection) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
