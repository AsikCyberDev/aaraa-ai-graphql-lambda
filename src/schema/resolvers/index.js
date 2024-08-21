const chatbotResolvers = require('./chatbotResolver');
const documentResolvers = require('./documentResolver');
const userResolvers = require('./userResolver');
const apiKeyResolvers = require('./apiKeyResolver');
const projectResolvers = require('./projectResolver'); // Import project resolvers

const resolvers = {
  Query: {
    ...chatbotResolvers.Query,
    ...documentResolvers.Query,
    ...userResolvers.Query,
    ...apiKeyResolvers.Query,
    ...projectResolvers.Query, // Add project queries
  },
  Mutation: {
    ...chatbotResolvers.Mutation,
    ...documentResolvers.Mutation,
    ...userResolvers.Mutation,
    ...apiKeyResolvers.Mutation,
    ...projectResolvers.Mutation, // Add project mutations
  },
};

module.exports = resolvers;
