const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const logger = require('../../utils/logger');
const {
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByProject,
  getDocumentsByChatbot
} = require('../../services/documentServiceClient');

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const documentResolvers = {
  Query: {
    documentsByProject: async (_, { projectId }) => {
      try {
        logger.info(`Fetching documents for projectId: ${projectId}`);
        const documents = await getDocumentsByProject(projectId);
        logger.info(`Retrieved ${documents.length} documents for projectId: ${projectId}`);
        return documents;
      } catch (error) {
        logger.error(`Error fetching documents for projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch documents');
      }
    },
    documentsByChatbot: async (_, { chatbotId }) => {
      try {
        logger.info(`Fetching documents for chatbotId: ${chatbotId}`);
        const documents = await getDocumentsByChatbot(chatbotId);
        logger.info(`Retrieved ${documents.length} documents for chatbotId: ${chatbotId}`);
        return documents;
      } catch (error) {
        logger.error(`Error fetching documents for chatbotId ${chatbotId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch documents');
      }
    },
    document: async (_, { id, projectId }) => {
      try {
        logger.info(`Fetching document with id: ${id} and projectId: ${projectId}`);
        const document = await getDocumentById(id, projectId);
        if (!document) {
          logger.warn(`Document not found with id: ${id} and projectId: ${projectId}`);
          throw new Error('Document not found');
        }
        return document;
      } catch (error) {
        logger.error(`Error fetching document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch document');
      }
    },
  },
    Mutation: {
      createDocument: async (_, { input }) => {
        try {
          logger.info('Creating document with input:', input);

          if (!input.name || !input.size || !input.projectId || !input.chatbotId) {
            throw new Error('Missing required fields');
          }

          const id = uuidv4();
          const s3Key = `${input.projectId}/${input.chatbotId}/${id}-${encodeURIComponent(input.name)}`;
          const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            ContentType: input.contentType || 'application/octet-stream',
          };

          const putObjectCommand = new PutObjectCommand(s3Params);
          const uploadUrl = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 });

          logger.info('Generated Upload URL', { uploadUrl });

          const document = await createDocument({
            id,
            projectId: input.projectId,
            chatbotId: input.chatbotId,
            name: input.name,
            size: input.size,
            s3Url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`,
            uploadDate: new Date().toISOString(),
          });

          logger.info('Document created successfully:', document);

          return {
            document,
            uploadUrl,
          };
        } catch (error) {
          logger.error(`Error creating document: ${error.message}`, { stack: error.stack, input });
          throw new Error(`Failed to create document: ${error.message}`);
        }
      },
    updateDocument: async (_, { id, projectId, name }) => {
      try {
        logger.info(`Updating document with id: ${id}, projectId: ${projectId}, new name: ${name}`);
        const updatedDocument = await updateDocument(id, projectId, { name });
        if (!updatedDocument) {
          logger.warn(`Document not found for update with id: ${id} and projectId: ${projectId}`);
          throw new Error('Document not found');
        }
        logger.info('Document updated successfully:', updatedDocument);
        return updatedDocument;
      } catch (error) {
        logger.error(`Error updating document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error(`Failed to update document: ${error.message}`);
      }
    },
    deleteDocument: async (_, { id, projectId }) => {
      try {
        logger.info(`Deleting document with id: ${id} and projectId: ${projectId}`);
        const result = await deleteDocument(id, projectId);
        if (!result) {
          logger.warn(`Document not found for deletion with id: ${id} and projectId: ${projectId}`);
          throw new Error('Document not found');
        }
        logger.info(`Document with id: ${id} and projectId: ${projectId} deleted successfully`);
        return true;
      } catch (error) {
        logger.error(`Error deleting document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error(`Failed to delete document: ${error.message}`);
      }
    },
  },
};

module.exports = documentResolvers;