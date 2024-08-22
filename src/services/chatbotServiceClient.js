const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger'); // Import the logger

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.CHATBOT_TABLE_NAME;

module.exports.getChatbots = async () => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };
    logger.info('Scanning DynamoDB for chatbots', { tableName: TABLE_NAME });
    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items;
  } catch (error) {
    logger.error(`Error scanning DynamoDB for chatbots: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to fetch chatbots');
  }
};

module.exports.getChatbotById = async (id, projectId) => {  // Adjusted to require projectId
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },  // Both keys are now required
    };
    logger.info(`Fetching chatbot from DynamoDB with ID ${id} and projectId ${projectId}`);
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
  } catch (error) {
    logger.error(`Error fetching chatbot from DynamoDB with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to fetch chatbot');
  }
};

module.exports.createChatbot = async (chatbot) => {
  try {
    const id = uuidv4();
    const newChatbot = {
      id,
      ...chatbot,
      created: new Date().toISOString(),
      interactions: 0,
      satisfactionRate: 0,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: newChatbot,
    };
    logger.info('Creating new chatbot in DynamoDB', { chatbot: newChatbot });
    await ddbDocClient.send(new PutCommand(params));
    return newChatbot;
  } catch (error) {
    logger.error(`Error creating chatbot in DynamoDB: ${error.message}`, { stack: error.stack, chatbot });
    throw new Error('Failed to create chatbot');
  }
};

module.exports.updateChatbot = async (id, projectId, fields) => {
  try {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined && key !== 'projectId') {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
      }
    }

    if (updateExpressions.length === 0) {
      throw new Error('No valid fields provided for update');
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },
      UpdateExpression: `set ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const data = await ddbDocClient.send(new UpdateCommand(params));
    return data.Attributes;
  } catch (error) {
    logger.error(`Error updating chatbot in DynamoDB with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to update chatbot');
  }
};


module.exports.deleteChatbot = async (id, projectId) => {  // Adjusted to require projectId
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id, projectId },  // Both keys are now required
    };
    logger.info(`Deleting chatbot from DynamoDB with ID ${id} and projectId ${projectId}`);
    await ddbDocClient.send(new DeleteCommand(params));
    return true;
  } catch (error) {
    logger.error(`Error deleting chatbot from DynamoDB with ID ${id} and projectId ${projectId}: ${error.message}`, { stack: error.stack });
    throw new Error('Failed to delete chatbot');
  }
};
