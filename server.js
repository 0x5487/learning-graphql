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
  input OrderInput {
    name: String!
    price: Int!
  }
  type Order {
    id: String
    name: String
    price: Int
  }
  type Query {
    users: [User]
    getDie(numSides: Int): RandomDie    
  }
  type Mutation {
    createOrder(input: OrderInput): Order
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

class Order {
  constructor(id, name, price){
    this.id = id;
    this.name = name;
    this.price = price;
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
  users: async (_, context) =>{
    //throw new AppError("INVALID_INPUT", "test code")
    console.log(context.test);
    console.log(context.request.baseUrl);
    return users;
  },
  getDie: async ({numSides}, context) => {
    return new RandomDie(numSides || 6);
  },
  createOrder: async ({input}, context) => {
    return new Order(3, input.name, input.price);
  }
}

var app = express();

app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: schema,
  rootValue: root,
  formatError, 
  graphiql: true,
  context : {
    request: request,
    response: response,
    test: 'Example context value'
}
})));


// app.use('/graphql', graphqlHTTP((req, res) => ({
//   schema,
//   graphiql: true,
//   context: { req, res },
// })));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');