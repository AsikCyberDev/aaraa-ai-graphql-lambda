const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type DownloadUrlResponse {
  downloadUrl: String!
}
`;
