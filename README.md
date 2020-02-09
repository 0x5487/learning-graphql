# learning-graphql
1. CRUD resources
1. 權限認證
1. Versioning
1. Validation
1. Error handling with http status change
1. 

# why we are using graphql
1. aggregation layer
1. 把全部的 request 都轉到 graphql 之後有要重構比較方便



# install
1. npm install
1. node server.js
1. browser to http://localhost:4000/graphql

# query example
```
{
  getDie(numSides: 1) {
    numSides
  }
  usersList(opts: {page: 2, pageSize: 30}) {
    meta {
			page
      pageSize
    }
    users {
      id
      age
      name
      count
      height
      notes {
        id
        data
      }
    }
  }
}
```


## Reference:
Custom Error: https://stackoverflow.com/questions/42937502/graphql-how-to-respond-with-different-status-code