const { getChatbots, getChatbotById, createChatbot, updateChatbot, deleteChatbot } = require('../../services/chatbotServiceClient');

const chatbotResolvers = {
  Query: {
    chatbots: async () => await getChatbots(),
    chatbot: async (_, { id }) => await getChatbotById(id),
  },
  Mutation: {
    createChatbot: async (_, { name, description, status, type }) => {
      return await createChatbot({ name, description, status, type });
    },
    updateChatbot: async (_, { id, name, description, status, type }) => {
      return await updateChatbot(id, { name, description, status, type });
    },
    deleteChatbot: async (_, { id }) => {
      return await deleteChatbot(id);
    },
  },
};

module.exports = chatbotResolvers;
