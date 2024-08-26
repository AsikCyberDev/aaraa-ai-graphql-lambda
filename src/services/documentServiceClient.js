const { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DOCUMENT_TABLE_NAME;
const CHATBOT_INDEX_NAME = 'ChatbotIndexV2';  // Make sure this matches your new GSI name

const getDocumentsByProject = async (projectId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'ProjectIndex', // You'll need to create this GSI
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

const getDocumentsByChatbot = async (chatbotId) => {
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

const getDocumentById = async (id, projectId) => {
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

const createDocument = async (document) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Item: document,
    };
    logger.info('DynamoDB Put Params (Create Document):', params);
    await ddbDocClient.send(new PutCommand(params));
    return document;
  } catch (error) {
    logger.error(`Error creating document: ${error.message}`, { stack: error.stack, document });
    throw new Error('Failed to create document');
  }
};

const updateDocument = async (id, projectId, document) => {
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

const deleteDocument = async (id, projectId) => {
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

module.exports = {
  getDocumentsByProject,
  getDocumentsByChatbot,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};