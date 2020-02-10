## regenerated

```
go run github.com/99designs/gqlgen -v
```

## examples
query
```gql
query {
  todos{
    id
    text
    done
    user{
      id
      name
    }
  }
  totalCount
}
```
mutation
```gql
mutation {
  createTodo(input: {text: "jason", userId: "1234"})
}
```