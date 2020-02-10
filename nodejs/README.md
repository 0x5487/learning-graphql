## install
1. npm install
1. node server.js
1. browser to http://localhost:4000/graphql

## query example
```gql
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