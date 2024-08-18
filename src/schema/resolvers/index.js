const chatbotResolvers = require('./chatbotResolver');
const documentResolvers = require('./documentResolver');

const resolvers = {
  Query: {
    ...chatbotResolvers.Query,
    ...documentResolvers.Query,
  },
  Mutation: {
    ...chatbotResolvers.Mutation,
    ...documentResolvers.Mutation,
  },
};

module.exports = resolvers;
