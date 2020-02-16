package main

import (
	"context"
	"golang"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	"github.com/jasonsoft/log"
	"github.com/jasonsoft/log/handlers/console"
	"github.com/vektah/gqlparser/gqlerror"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// use console handler to log all level logs
	clog := console.New()
	log.RegisterHandler(clog, log.AllLevels...)

	// optional: allow handlers to clear all buffer
	defer log.Flush()

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))

	graphQLConfig := golang.Config{
		Resolvers: &golang.Resolver{},
	}

	http.Handle("/query", handler.GraphQL(golang.NewExecutableSchema(graphQLConfig),
		handler.ErrorPresenter(
			func(ctx context.Context, e error) *gqlerror.Error {
				err := &gqlerror.Error{
					Message: "oops, something bad happened",
					Extensions: map[string]interface{}{
						"code": "10-4",
					},
				}

				log.WithError(e).Error("error presenter")

				return err
			}),
	))

	log.Infof("connect to http://localhost:%s/ for GraphQL playground", port)
	http.ListenAndServe(":"+port, nil)
}
