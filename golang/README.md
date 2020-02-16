## generate code
第一次執行
```
go run github.com/99designs/gqlgen init
```
重新更新
```
go run github.com/99designs/gqlgen -v
```

## examples
query
```gql
query findTodos {
  todos(opts:{page:1, pageSize:25, text:"", count:0}){
    id
    text
    done
    user{
      id
      name
    }
    createdAt
  }
  totalCount
}
```
mutation
```gql
mutation createTodo {
  createTodo(input: {text: "jason", userId: "1234"})
}
```