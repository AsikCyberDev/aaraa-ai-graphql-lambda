const { gql } = require('apollo-server-lambda');

module.exports = gql`
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
`;
