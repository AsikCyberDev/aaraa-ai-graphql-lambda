const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Mutation {
    createChatbot(input: CreateChatbotInput!): Chatbot!
    updateChatbot(id: ID!, projectId: ID!, input: UpdateChatbotInput!): Chatbot!
    deleteChatbot(id: ID!, projectId: ID!): Boolean!

    createDocument(input: CreateDocumentInput!): Document!
    updateDocument(id: ID!, name: String): Document!
    deleteDocument(id: ID!): Boolean!

    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    generateApiKey(input: CreateApiKeyInput!): ApiKey!
    revokeApiKey(chatbotId: ID!, apiKeyId: ID!): Boolean!

    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!

    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: CreateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;
