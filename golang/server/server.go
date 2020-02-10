package main

import (
	"golang"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	"github.com/jasonsoft/log"
	"github.com/jasonsoft/log/handlers/console"
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
	http.Handle("/query", handler.GraphQL(golang.NewExecutableSchema(golang.Config{Resolvers: &golang.Resolver{}})))

	log.Infof("connect to http://localhost:%s/ for GraphQL playground", port)
	http.ListenAndServe(":"+port, nil)
}
