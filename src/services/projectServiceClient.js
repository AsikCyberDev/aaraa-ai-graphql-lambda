const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.PROJECT_TABLE_NAME;

module.exports.getProjectsByUserId = async (userId) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
    };
    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items;
};

module.exports.getProjectById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
};

module.exports.createProject = async (project) => {
    const id = uuidv4();
    const newProject = {
        id,
        ...project,
        created: new Date().toISOString(),
    };
    const params = {
        TableName: TABLE_NAME,
        Item: newProject,
    };
    await ddbDocClient.send(new PutCommand(params));
    return newProject;
};

module.exports.updateProject = async (id, project) => {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    for (const [key, value] of Object.entries(project)) {
        if (value !== undefined) {
            updateExpressions.push(`#${key} = :${key}`);
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = value;
        }
    }

    const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `set ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    };

    const data = await ddbDocClient.send(new UpdateCommand(params));
    return data.Attributes;
};

module.exports.deleteProject = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    await ddbDocClient.send(new DeleteCommand(params));
    return true;
};
