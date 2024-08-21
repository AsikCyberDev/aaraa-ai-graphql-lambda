const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.APIKEY_TABLE_NAME;

module.exports.generateApiKey = async ({ chatbotId }) => {
    const apiKeyId = uuidv4();
    const newApiKey = {
        apiKeyId,
        key: uuidv4().replace(/-/g, ''), // Simple API key generation
        chatbotId,
        created: new Date().toISOString(),
    };

    const params = {
        TableName: TABLE_NAME,
        Item: newApiKey,
    };
    await ddbDocClient.send(new PutCommand(params));
    return newApiKey;
};

module.exports.revokeApiKey = async (chatbotId, apiKeyId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { chatbotId, apiKeyId },
    };
    await ddbDocClient.send(new DeleteCommand(params));
    return true;
};
