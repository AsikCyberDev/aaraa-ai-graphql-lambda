const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs'); // For password hashing

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.USER_TABLE_NAME;

module.exports.getUserById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
};

module.exports.createUser = async (user) => {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hashing the password
    const newUser = {
        id,
        ...user,
        password: hashedPassword,
        created: new Date().toISOString(),
    };
    const params = {
        TableName: TABLE_NAME,
        Item: newUser,
    };
    await ddbDocClient.send(new PutCommand(params));
    return newUser;
};

module.exports.updateUser = async (id, user) => {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    for (const [key, value] of Object.entries(user)) {
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

module.exports.deleteUser = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    await ddbDocClient.send(new DeleteCommand(params));
    return true;
};

// Additional methods for sign-in
module.exports.findUserByEmail = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'EmailIndex', // Assuming you have a secondary index on email
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    const data = await ddbDocClient.send(new QueryCommand(params));
    return data.Items[0];
};

module.exports.validatePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};
