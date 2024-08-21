const {
    generateApiKey,
    revokeApiKey,
} = require('../../services/apiKeyServiceClient');

const apiKeyResolvers = {
    Mutation: {
        generateApiKey: async (_, { input }) => {
            return await generateApiKey(input);
        },
        revokeApiKey: async (_, { chatbotId, apiKeyId }) => {
            return await revokeApiKey(chatbotId, apiKeyId);
        },
    },
};

module.exports = apiKeyResolvers;
