const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid'); // Importing UUID library

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DOCUMENT_TABLE_NAME;

module.exports.getDocuments = async (chatbotId) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'chatbotId = :chatbotId',
    ExpressionAttributeValues: { ':chatbotId': chatbotId },
  };
  const data = await ddbDocClient.send(new ScanCommand(params));
  return data.Items;
};

module.exports.getDocumentById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const data = await ddbDocClient.send(new GetCommand(params));
  return data.Item;
};

module.exports.createDocument = async (document) => {
  const id = uuidv4(); // Generate a unique ID for the document
  const newDocument = {
    id, // Include the ID in the item
    ...document,
    uploadDate: new Date().toISOString(),
  };
  const params = {
    TableName: TABLE_NAME,
    Item: newDocument,
  };
  await ddbDocClient.send(new PutCommand(params));
  return newDocument;
};

module.exports.updateDocument = async (id, document) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': document.name,
    },
    ReturnValues: 'ALL_NEW',
  };
  const data = await ddbDocClient.send(new UpdateCommand(params));
  return data.Attributes;
};

module.exports.deleteDocument = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await ddbDocClient.send(new DeleteCommand(params));
  return true;
};
