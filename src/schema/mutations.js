const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Mutation {
    createChatbot(input: CreateChatbotInput!): Chatbot!
    updateChatbot(id: ID!, projectId: ID!, input: UpdateChatbotInput!): Chatbot!
    deleteChatbot(id: ID!, projectId: ID!): Boolean!

    createDocument(input: CreateDocumentInput!): DocumentUploadResponse!
    updateDocument(id: ID!, projectId: ID!, name: String!): Document!
    deleteDocument(id: ID!, projectId: ID!): Boolean!
    getDownloadUrl(input: GetDownloadUrlInput!): DownloadUrlResponse!

    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    googleSignUp(input: GoogleSignUpInput!): User!
    googleSignIn(input: GoogleSignInInput!): User!

    generateApiKey(input: CreateApiKeyInput!): ApiKey!
    revokeApiKey(chatbotId: ID!, apiKeyId: ID!): Boolean!

    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!

    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!,userId: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!, userId: ID!): Boolean!
  }
`;
