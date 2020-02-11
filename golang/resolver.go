package golang

import (
	"context"
	"fmt"

	"github.com/jasonsoft/log"
	"github.com/vektah/gqlparser/gqlerror"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (bool, error) {
	log.Debugf("input: text: %s, userId: %s", input.Text, input.UserID)
	return true, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context, opts FindTodoOptions) ([]*Todo, error) {
	todos := []*Todo{}

	for i := 1; i < 10; i++ {
		todo := Todo{
			ID:   fmt.Sprintf("%d", i),
			Text: fmt.Sprintf("hello todo %d", i),
			User: &User{
				ID:   fmt.Sprintf("user_%d", i),
				Name: fmt.Sprintf("name_%d", i),
			},
		}
		todos = append(todos, &todo)

	}
	return todos, nil
}

func (r *queryResolver) GetError(ctx context.Context) (string, error) {
	err := &gqlerror.Error{
		Message: "oops, something bad happened",
		Extensions: map[string]interface{}{
			"code": "10-4",
		},
	}
	return "", err

}

func (r *queryResolver) TotalCount(ctx context.Context) (int, error) {
	return 10, nil
}
