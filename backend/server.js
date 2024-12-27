const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const todoSchema = new mongoose.Schema({
  createdOn: { type: Date, required: true },
  text: { type: String, required: true },
  type: { type: String, default: task },
  completed: { type: Boolean, default: false },
  completedOn: { type: Date, required: false },
});

//GraphQL Schema
const typeDefs = gql`
  type Todo {
    id: ID!
    createdOn: String!
    text: String!
    type: String!
    completed: Boolean!
    completedOn: String
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!, type: String): Todo
    updateTodo(
      id: ID!
      text: String
      completed: Boolean
      completedOn: String
    ): Todo
    deleteTodo(id: ID!): Boolean
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    todos: async () => {
      return await Todo.find();
    },
  },
  Mutation: {
    addTodo: async (_, { text, type }) => {
      const newTodo = new Todo({
        text,
        type: type || "task",
        createdOn: new Date(),
      });
      await newTodo.save();
      return newTodo;
    },
    updateTodo: async (_, { id, text, completed, completedOn }) => {
      return await Todo.findByIdAndUpdate(
        id,
        { text, completed, completedOn },
        { new: true }
      );
    },
    deleteTodo: async (_, { id }) => {
      await Todo.findByIdAndDelete(id);
      return true;
    },
  },
};

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });

// Start the server
app.listen(port, () => {
  console.log(
    `Backend running on http://localhost:${port}${server.graphqlPath}`
  );
});
