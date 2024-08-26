const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input GetDownloadUrlInput {
  documentId: ID!
  projectId: ID!
}
`;
