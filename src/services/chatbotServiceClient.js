const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid'); // Importing UUID library

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.CHATBOT_TABLE_NAME;

module.exports.getChatbots = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const data = await ddbDocClient.send(new ScanCommand(params));
  return data.Items;
};

module.exports.getChatbotById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item;
};

module.exports.createChatbot = async (chatbot) => {
  const id = uuidv4(); // Generate a unique ID for the chatbot
  const newChatbot = {
    id, // Include the ID in the item
    ...chatbot,
    created: new Date().toISOString(),
    interactions: 0,
    satisfactionRate: 0,
  };
  const params = {
    TableName: TABLE_NAME,
    Item: newChatbot,
  };
  await ddbDocClient.send(new PutCommand(params));
  return newChatbot;
};

module.exports.updateChatbot = async (id, chatbot) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name, description = :description, #status = :status, #type = :type',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#status': 'status',
      '#type': 'type',
    },
    ExpressionAttributeValues: {
      ':name': chatbot.name,
      ':description': chatbot.description,
      ':status': chatbot.status,
      ':type': chatbot.type,
    },
    ReturnValues: 'ALL_NEW',
  };
  const data = await ddbDocClient.send(new UpdateCommand(params));
  return data.Attributes;
};

module.exports.deleteChatbot = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await ddbDocClient.send(new DeleteCommand(params));
  return true;
};
