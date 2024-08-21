const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  enum ChatbotStatus {
    ACTIVE
    INACTIVE
  }

  enum ChatbotType {
    SUPPORT
    SALES
  }

  type MetaColor {
    isValid: Boolean!
    r: Int!
    g: Int!
    b: Int!
    a: Float!
    _h: Float!
    _s: Float!
    _v: Float!
  }

  input MetaColorInput {
    isValid: Boolean!
    r: Int!
    g: Int!
    b: Int!
    a: Float!
    _h: Float!
    _s: Float!
    _v: Float!
  }

  type PrimaryColor {
    cleared: Boolean!
    metaColor: MetaColor!
  }

  input PrimaryColorInput {
    cleared: Boolean!
    metaColor: MetaColorInput!
  }

  type ChatIcon {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
    thumbUrl: String
  }

  input ChatIconInput {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
    thumbUrl: String
  }

  type TrainingData {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
  }

  input TrainingDataInput {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
  }

  type ApiKey {
    apiKeyId: ID!
    key: String!
    created: String!
    lastUsed: String
    chatbotId: ID!
  }


  type Chatbot {
    id: ID!
    name: String!
    description: String
    status: ChatbotStatus!
    type: ChatbotType!
    language: String
    integrations: [String]
    customIntegration: String
    theme: String
    primaryColor: PrimaryColor
    fontSelection: String
    chatIcon: [ChatIcon]
    welcomeMessage: String
    fallbackMessage: String
    inputPlaceholder: String
    responseTime: Int
    enableTypingIndicator: Boolean
    trainingData: [TrainingData]
    knowledgeBase: String
    enableLearning: Boolean
    confidenceThreshold: Float
    maxConversationLength: Int
    enableHumanHandoff: Boolean
    handoffThreshold: Float
    enableAnalytics: Boolean
    sessionTimeout: Int
    apiKeys: [ApiKey]
    created: String!
    interactions: Int!
    satisfactionRate: Int!
  }

  input CreateChatbotInput {
    name: String!
    description: String
    status: ChatbotStatus!
    type: ChatbotType!
    language: String
    integrations: [String]
    customIntegration: String
    theme: String
    primaryColor: PrimaryColorInput
    fontSelection: String
    chatIcon: [ChatIconInput]
    welcomeMessage: String
    fallbackMessage: String
    inputPlaceholder: String
    responseTime: Int
    enableTypingIndicator: Boolean
    trainingData: [TrainingDataInput]
    knowledgeBase: String
    enableLearning: Boolean
    confidenceThreshold: Float
    maxConversationLength: Int
    enableHumanHandoff: Boolean
    handoffThreshold: Float
    enableAnalytics: Boolean
    sessionTimeout: Int
  }

  input CreateApiKeyInput {
    chatbotId: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    mobile: String
    address: String
    sex: String
    company: String
    role: String
    chatbotsCreated: Int
    totalInteractions: Int
    subscriptionPlan: String
    subscriptionRenewalDate: String
    subscriptionStatus: String
    tokenUsageLimit: Int
    tokenUsageUsed: Int
    activeChatbots: Int
    lastLogin: String
    token: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    company: String
    role: String
  }

  input UpdateUserInput {
    name: String
    email: String
    company: String
    role: String
  }

  input SignUpInput {
    name: String!
    email: String!
    mobile: String!
    address: String!
    sex: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    userId: ID!
    created: String!
  }

  input CreateProjectInput {
    name: String!
    description: String
    userId: ID!
  }

  input UpdateProjectInput {
    name: String
    description: String
  }

  type Document {
    id: ID!
    name: String!
    size: String!
    uploadDate: String!
    chatbotId: ID!
    projectId: ID!
    s3Url: String!
}

  input CreateDocumentInput {
    name: String!
    size: String!
    chatbotId: ID!
    projectId: ID!
  }

  type Query {
    chatbots: [Chatbot!]!
    chatbot(id: ID!): Chatbot
    user(id: ID!): User
    documents(chatbotId: ID!): [Document!]!
    document(id: ID!): Document
    projects(userId: ID!): [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    createChatbot(input: CreateChatbotInput!): Chatbot!
    updateChatbot(id: ID!, input: CreateChatbotInput!): Chatbot!
    deleteChatbot(id: ID!): Boolean!

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
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
