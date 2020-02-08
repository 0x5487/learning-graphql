var fs = require('fs');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// read grahpql schema file
var schemaContent = fs.readFileSync('./schema.graphql', 'utf8');


// Construct a schema, using GraphQL schema language
var schema = buildSchema(schemaContent);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class Note {
  constructor(id, data) {
    this.id = id
    this.data = data
  }
}

class User {
  height = 3  

  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.notes = [new Note(2, "data1")]
  }

  count() {
    return 6;
  }
}

class Meta {
  constructor() {

  }
}


class UserList {
  constructor(meta, users) {
    this.meta = meta;
    this.users = users;
  }
}


class Order {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

let users = [];

for (var i=1; i < 100; i++) {
  users.push(new User(i, "Jason_" + i, 20+i))
}

class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

// The root provides the top-level API endpoints
var root = {
  usersList: async ( {opts}, context) => {
    //console.log(context.test);
    //console.log(context.request.baseUrl);

    meta = new Meta();
    meta.page = opts.page;
    meta.pageSize = opts.pageSize;

    userList = new UserList(meta, users);

    return userList;
  },
  getDie: async ({ numSides }, context) => {
    return new RandomDie(numSides || 6);
  },
  createOrder: async ({ input }, context) => {
    return new Order(3, input.name, input.price);
  },
  getError: async(_, context) => {
    throw new AppError("INVALID_INPUT", "test code")
  }
}

var app = express();

app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: {
    request: request,
    response: response,
    test: 'Example context value'
  }
})));


app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');