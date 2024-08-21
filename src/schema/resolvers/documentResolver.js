const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const {
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByProject,
  getDocumentsByChatbot
} = require('../../services/documentServiceClient');
const logger = require('../../utils/logger');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4

const s3 = new S3Client({ region: process.env.AWS_REGION });

const documentResolvers = {
  Query: {
    documentsByProject: async (_, { projectId }) => {
      try {
        return await getDocumentsByProject(projectId);
      } catch (error) {
        logger.error(`Error fetching documents for projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch documents');
      }
    },
    documentsByChatbot: async (_, { chatbotId }) => {
      try {
        return await getDocumentsByChatbot(chatbotId);
      } catch (error) {
        logger.error(`Error fetching documents for chatbotId ${chatbotId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch documents');
      }
    },
    document: async (_, { id, projectId }) => {
      try {
        return await getDocumentById(id, projectId);
      } catch (error) {
        logger.error(`Error fetching document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error('Failed to fetch document');
      }
    },
  },
  Mutation: {
    createDocument: async (_, { input }) => {
      try {
        // Generate a unique key for the document
        const s3Key = `${input.projectId}/${input.chatbotId}/${uuidv4()}-${encodeURIComponent(input.name)}`;

        const s3Params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: s3Key,
        };

        // Generate a signed URL for the document upload
        const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
          expiresIn: 3600, // 1 hour expiration
        });

        logger.info('Generated Upload URL', { uploadUrl });

        // Save document information in DynamoDB
        const document = await createDocument({
          id: uuidv4(), // Partition key
          projectId: input.projectId, // Sort key
          chatbotId: input.chatbotId,
          name: input.name,
          size: input.size,
          s3Url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`, // Final S3 URL
          uploadDate: new Date().toISOString(),
        });

        return {
          ...document,
          uploadUrl, // Return the upload URL for the client to use
        };
      } catch (error) {
        logger.error(`Error creating document: ${error.message}`, { stack: error.stack, input });
        throw new Error("Failed to create document");
      }
    },
    updateDocument: async (_, { id, projectId, name }) => {
      try {
        return await updateDocument(id, projectId, { name });
      } catch (error) {
        logger.error(`Error updating document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error("Failed to update document");
      }
    },
    deleteDocument: async (_, { id, projectId }) => {
      try {
        return await deleteDocument(id, projectId);
      } catch (error) {
        logger.error(`Error deleting document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
        throw new Error("Failed to delete document");
      }
    },
  },
};

module.exports = documentResolvers;
