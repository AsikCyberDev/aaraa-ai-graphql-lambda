const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler();
