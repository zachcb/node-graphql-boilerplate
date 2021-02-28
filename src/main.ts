import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { logger } from './utils/logger';

// Initialize a GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
const root = {
  hello: () => 'Hello worl!',
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', graphqlHTTP({
  schema, // Must be provided
  rootValue: root,
  graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(5000, () => logger({
  message: 'Now browse to http://localhost:5000/graphql',
  status: 'success',
}));
