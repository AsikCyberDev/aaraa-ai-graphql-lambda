const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DOCUMENT_TABLE_NAME;
const CHATBOT_INDEX_NAME = 'ChatbotIndex';

module.exports.getDocumentsByProject = async (projectId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'projectId = :projectId',
      ExpressionAttributeValues: { ':projectId': projectId },
    };
    logger.info('DynamoDB Query Params (By Project):', params);
    const data = await ddbDocClient.send(new QueryCommand(params));
    return data.Items;
  } catch (error) {
    logger.error(`Error fetching documents for projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to fetch documents');
  }
};

module.exports.getDocumentsByChatbot = async (chatbotId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      IndexName: CHATBOT_INDEX_NAME,
      KeyConditionExpression: 'chatbotId = :chatbotId',
      ExpressionAttributeValues: { ':chatbotId': chatbotId },
    };
    logger.info('DynamoDB Query Params (By Chatbot):', params);
    const data = await ddbDocClient.send(new QueryCommand(params));
    return data.Items;
  } catch (error) {
    logger.error(`Error fetching documents for chatbotId ${chatbotId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to fetch documents');
  }
};

module.exports.getDocumentById = async (id, projectId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },
    };
    logger.info('DynamoDB Get Params (By ID):', params);
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
  } catch (error) {
    logger.error(`Error fetching document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to fetch document');
  }
};

module.exports.createDocument = async (document) => {
  try {
    const id = uuidv4();
    const newDocument = {
      id,
      projectId: document.projectId,
      ...document,
      uploadDate: new Date().toISOString(),
    };
    const params = {
      TableName: TABLE_NAME,
      Item: newDocument,
    };
    logger.info('DynamoDB Put Params (Create Document):', params);
    await ddbDocClient.send(new PutCommand(params));
    return newDocument;
  } catch (error) {
    logger.error(`Error creating document: ${error.message}`, { stack: error.stack, document });
    throw new Error('Failed to create document');
  }
};

module.exports.updateDocument = async (id, projectId, document) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': document.name,
      },
      ReturnValues: 'ALL_NEW',
    };
    logger.info('DynamoDB Update Params:', params);
    const data = await ddbDocClient.send(new UpdateCommand(params));
    return data.Attributes;
  } catch (error) {
    logger.error(`Error updating document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to update document');
  }
};

module.exports.deleteDocument = async (id, projectId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },
    };
    logger.info('DynamoDB Delete Params:', params);
    await ddbDocClient.send(new DeleteCommand(params));
    return true;
  } catch (error) {
    logger.error(`Error deleting document with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to delete document');
  }
};
