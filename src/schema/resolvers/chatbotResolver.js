const {
  getChatbots,
  getChatbotById,
  createChatbot,
  updateChatbot,
  deleteChatbot,
} = require('../../services/chatbotServiceClient');

const logger = require('../../utils/logger'); // Import the logger

const chatbotResolvers = {
  Query: {
    chatbots: async () => {
      try {
        logger.info('Fetching all chatbots');
        return await getChatbots();
      } catch (error) {
        logger.error(`Error fetching chatbots: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch chatbots');
      }
    },
    chatbot: async (_, { id, projectId }) => {  // Adjusted to require projectId
      try {
        logger.info(`Fetching chatbot with ID ${id} and projectId ${projectId}`);
        return await getChatbotById(id, projectId);
      } catch (error) {
        logger.error(`Error fetching chatbot with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch chatbot');
      }
    },
  },
  Mutation: {
    createChatbot: async (_, { input }) => {
      try {
        logger.info('Creating a new chatbot', { input });
        return await createChatbot(input);
      } catch (error) {
        logger.error(`Error creating chatbot: ${error.message}`, { stack: error.stack, input });
        throw new Error('Failed to create chatbot');
      }
    },
    Mutation: {
      updateChatbot: async (_, { id, projectId, input }) => {
        try {
          logger.info(`Updating chatbot with ID ${id} and projectId ${projectId}`, { input });

          // Fetch the existing chatbot
          const existingChatbot = await getChatbotByIdAndProject(id, projectId);
          if (!existingChatbot) {
            throw new Error(`Chatbot with ID ${id} and projectId ${projectId} not found`);
          }

          // Update only the provided fields
          const updatedChatbot = await updateChatbotFields(id, projectId, input);

          return updatedChatbot;
        } catch (error) {
          logger.error(`Error updating chatbot with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
          throw new Error('Failed to update chatbot');
        }
      },
    },
    deleteChatbot: async (_, { id, projectId }) => {  // Adjusted to require projectId
      try {
        logger.info(`Deleting chatbot with ID ${id} and projectId ${projectId}`);
        return await deleteChatbot(id, projectId);
      } catch (error) {
        logger.error(`Error deleting chatbot with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to delete chatbot');
      }
    },
  },
};

module.exports = chatbotResolvers;
