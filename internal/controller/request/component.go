package request

import (
	"go.uber.org/atomic"
)

type UpdateComponentRequest struct {
	ID          string        `json:"id"`
	Name        atomic.Bool   `json:"name"`
	Description atomic.String `json:"description"`
	Tags        []string      `json:"tags"`
}
