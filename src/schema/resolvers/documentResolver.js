const { getDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = require('../../services/documentServiceClient');

const documentResolvers = {
  Query: {
    documents: async (_, { chatbotId }) => await getDocuments(chatbotId),
    document: async (_, { id }) => await getDocumentById(id),
  },
  Mutation: {
    createDocument: async (_, { name, size, chatbotId }) => {
      return await createDocument({ name, size, chatbotId });
    },
    updateDocument: async (_, { id, name }) => {
      return await updateDocument(id, { name });
    },
    deleteDocument: async (_, { id }) => {
      return await deleteDocument(id);
    },
  },
};

module.exports = documentResolvers;
