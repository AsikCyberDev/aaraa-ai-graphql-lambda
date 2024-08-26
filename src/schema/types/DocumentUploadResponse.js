const { gql } = require('apollo-server-lambda');

module.exports = gql`
 type DocumentUploadResponse {
    document: Document!
    uploadUrl: String!
  }
`;
