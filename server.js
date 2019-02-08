var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const formatError = require('./formatError');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type User {
    id: Int
    name: String
    age: Int
  }
  type Query {
    users: [User]
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

class User {
  constructor(id, name, age){
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

let users = [
  new User(1, "Jason", "18"),
  new User(2, "John", 19),
  new User(3, "Nick", 20),
];

class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

// The root provides the top-level API endpoints
var root = {
  users: function () {
    throw new AppError("INVALID_INPUT", "test code")
    return users;
  },
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  formatError, 
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');