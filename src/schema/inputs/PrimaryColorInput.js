const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input PrimaryColorInput {
    cleared: Boolean!
    metaColor: MetaColorInput!
  }
`;
