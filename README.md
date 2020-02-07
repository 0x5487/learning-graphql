# learning-graphql
1. CRUD resources
1. 權限認證
1. Versioning
1. Validation
1. Error handling
1. 

# why we are using graphql



# install
1. npm install
1. node server.js
1. browser to http://localhost:4000/graphql

# example
```
query {
  getDie(numSides: 1){
    numSides
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
```


