package data

import (
	"context"
	"github.com/tang95/x-port/internal/service"
	"gorm.io/gorm"
)

type contextTxKey struct{}

type transaction struct {
	*Data
}

func newTransaction(data *Data) service.Transaction {
	return &transaction{data}
}

func (t *transaction) InTx(ctx context.Context, fn func(ctx context.Context) error) error {
	return t.database.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		ctx = context.WithValue(ctx, contextTxKey{}, tx)
		return fn(ctx)
	})
}

func (d *Data) DB(ctx context.Context) *gorm.DB {
	tx, ok := ctx.Value(contextTxKey{}).(*gorm.DB)
	if ok {
		return tx
	}
	return d.database
}
