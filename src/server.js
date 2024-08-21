const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    headers: req.headers,
  }),
});

const port = process.env.PORT || 4000;

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});